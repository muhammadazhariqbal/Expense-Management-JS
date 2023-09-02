// Function to add a category
var addCategory = event => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Hide the "Load" button
    document.getElementById("btn-load").style.display = "none";

    // Get the category name from the input
    var categoryName = document.getElementById("add-category").value;

    // Check if categoryName is empty
    if (!categoryName) {
        // Display an error message and show the "Load" button
        document.getElementById("show-message").innerHTML = "Enter a Category Name!";
        document.getElementById("show-message").style.color = "red";
        document.getElementById("btn-load").style.display = "block";
    } else {
        // Call the function to add category using Firebase
        AddingCategoryNameUsingFirebase();
    }
}

// Function to add category using Firebase
var AddingCategoryNameUsingFirebase = () => {
    // Check if a user is authenticated
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Add category details to Firestore
            firebase.firestore().collection('categories').add({
                categoryName: document.getElementById("add-category").value,
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                userID: user.uid
            })
                .then(doc => {
                    console.log("Successfully added!");
                    document.getElementById("show-message").innerHTML = "Successfully added!";
                    document.getElementById("show-message").style.color = "green";
                    document.getElementById("btn-load").style.display = "block";
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("show-message").innerHTML = error;
                    document.getElementById("show-message").style.color = "red";
                    document.getElementById("btn-load").style.display = "block";
                });
        } else {
            // Redirect to index.html if user is not authenticated
            window.location = "../index.html";
        }
    });
}

// Function to log out the user
var logout = event => {
    event.preventDefault(); // Prevent the default link behavior

    // Sign out the user using Firebase authentication
    firebase.auth().signOut()
        .then(action => {
            console.log("Logout!");
            window.location = "../index.html"; // Redirect to index.html after logout
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}
