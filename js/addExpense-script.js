// Check if a user is authenticated
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Fetch categories from Firestore and populate the category select dropdown
        firebase.firestore().collection("categories").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (doc.data().userID == user.uid) {
                    var select = document.getElementById("category-select");
                    var option = document.createElement('option');
                    var optionValue = document.createTextNode(doc.data().categoryName);
                    option.appendChild(optionValue);
                    select.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });

        // Define a function to get and add expense details using Firebase
        getExpenseDetails = event => {
            document.getElementById("btn-load").style.display = "none";
            event.preventDefault();
            
            // Get input values
            var selectedValue = document.getElementById("category-select").value;
            var expenseTextDetails = document.getElementById("ExpenseTextDetails").value;
            var expensePrice = document.getElementById("expensePrice").value;
            var date = new Date();
            var currentDate = date.getDate();
            var month = date.getMonth();
            var day = date.getDay();
            var year = date.getFullYear();

            var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var todaysDay = week[day];
            
            // Add expense details to Firestore
            firebase.firestore().collection("expenseDetails").add({
                selectedValue,
                expenseTextDetails,
                expensePrice,
                CreatedAt: `${currentDate} / ${months[month]} / ${year}`,
                userID: user.uid
            })
            .then(data => {
                document.getElementById("show-message").innerHTML = "Successfully added!";
                document.getElementById("show-message").style.color = "green";
                document.getElementById("btn-load").style.display = "block";
            })
            .catch(error => {
                console.log(error);
            });
        };
    } else {
        // Redirect to index.html if user is not authenticated
        window.location = "../index.html";
    }
});
