// Function to handle user logout
var logout = (event) => {
    event.preventDefault();
    
    // Sign out the user using Firebase authentication
    firebase.auth().signOut()
    .then(action => {
        console.log("Logout!");
        window.location = '../index.html'; // Redirect to index.html after logout
    })
    .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

// Check if a user is authenticated
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Fetch categories from Firestore and populate a list
        firebase.firestore().collection("categories").get()
        .then(querySnapshot => {
            var list = document.getElementById("list"); // Get the list element
            
            querySnapshot.forEach(doc => {
                if (doc.data().userID == user.uid) {
                    // Create a list element for each category
                    var listElement = document.createElement('li');
                    var listItemText = document.createTextNode(doc.data().categoryName);
                    
                    // Create a delete button and icon
                    var btn = document.createElement('button');
                    btn.classList.add('delete-btn');
                    var deleteIcon = document.createElement('span');
                    deleteIcon.classList.add('fas', 'fa-trash-alt');
                    btn.appendChild(deleteIcon);
                    listElement.appendChild(btn);
                    listElement.appendChild(listItemText);
                    list.appendChild(listElement);
                    
                    // Add event listener to the delete button
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        // Delete the category document from Firestore
                        firebase.firestore().collection("categories").doc(doc.id).delete()
                        .then(deleteItem => {
                            console.log("Deleted!");
                            window.location.reload(); // Refresh the page after deleting
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    });
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        // Redirect to index.html if user is not authenticated
        window.location = '../index.html';
    }
});
