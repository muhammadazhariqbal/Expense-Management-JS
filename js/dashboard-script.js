firebase.auth().onAuthStateChanged(user=>{
    (user) ? (firebase.firestore().collection('users').doc(user.uid).get() 
    .then(doc=>{
        (doc) ? document.getElementById("userName").innerHTML=doc.data().name : window.location="../index.html";
    })
    .catch(error=>{
        console.log(error)
    }), 
    firebase.firestore().collection("Expense Details").get()
    .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            
            if(doc.data().userID==user.uid){
                var ExpenseCategoryName=doc.data().selectedValue;
                var ExpenseTextDetails=doc.data().expenseTextDetails;
                var ExpensePrice=doc.data().expensePrice;
                var createdDay=doc.data().CreatedAt;
              
                // createdDate=doc.data().CreatedAt;
                var iduser=doc.data().userID;
                var div=document.getElementById("expense-details-list");
              var ul=document.createElement("ul")
              var li=document.createElement('li')
              var span=document.createElement('span')
              span.classList.add("x")
                        // creating delete button 
                var btn=document.createElement('button');
                
                btn.classList.add('delete-btn');
                var deleteIcon=document.createElement('span');
                
                deleteIcon.classList.add('fas','fa-trash-alt');
                btn.appendChild(deleteIcon)
              
              var liCategoryValue=document.createTextNode(ExpenseCategoryName+'\u00A0 : \u00A0')
              var createdDay=document.createTextNode("On\u00A0"+createdDay+',\u00A0 ')
              var liTextValue=document.createTextNode(ExpenseTextDetails+'\u00A0')
              var liPriceValue=document.createTextNode("\u00A0"+ExpensePrice)
             // var liDateValue=document.createTextNode(createdDate)
             span.appendChild(createdDay)
              span.appendChild(liCategoryValue)
              span.appendChild(liTextValue)
              span.appendChild(liPriceValue)
             
              //span.appendChild(liDateValue)
              li.appendChild(span)
              li.appendChild(btn)
              ul.appendChild(li)
              div.appendChild(ul)
              btn.addEventListener('click',(e)=>{
                e.preventDefault();
                
                firebase.firestore().collection("Expense Deatils").doc(doc.id).delete()
                .then(deleteItem=>{
                    console.log("Deleted!")
                    window.location.reload()
                  })
                .catch(error=>{
                    console.log(error)
                })
                
            
            })
               
                
                

                

            }
           
          
        
        })
    })) :  window.location="../index.html";
})

var logout=(event)=>{
    event.preventDefault()
    firebase.auth().signOut()
    .then(action=>{
        console.log("Logout!")
        window.location="../index.html";
    })
    .catch(error=>{
        var errorCode = error.code;
        var errorMessage = error.message;
       console.log(errorMessage)
        
    })
}
// Functions for printing date and time

var showDate = () => {
    // Date Method
    var date = new Date();

    // getting day using date prototype Method
    var day = date.getDay();
    var week = ['Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var todaysDay = week[day];
 
    // Printing day name
    document.getElementById("day").innerHTML = todaysDay;

    //Getting current date using date method
    var currentDate = date.getDate();
    // printing date 
    document.getElementById("date").innerHTML = currentDate;

    // getting month using date prototype Method
    var month = date.getMonth();
    var AllMonths = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // printing month name
    var currentMonth = AllMonths[month];
    document.getElementById("month").innerHTML = currentMonth;
}
showDate();
