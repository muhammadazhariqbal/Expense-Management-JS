firebase.auth().onAuthStateChanged(user=>{
    (user) ? (firebase.firestore().collection("categories").get()
    .then(querySnapshot=>{
        
        querySnapshot.forEach(doc=>{
          if(doc.data().userID==user.uid){
            var select=document.getElementById("category-select");
            var option=document.createElement('option');
            var optionValue=document.createTextNode(doc.data().categoryName);
            option.appendChild(optionValue);
            select.appendChild(option)
           
           
     
         
          } 
        })
    })
    .catch(error=>{
        console.log(error)
    }),
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            getExpenseDetails=(event)=>{
                document.getElementById("btn-load").style.display="none";
                event.preventDefault()
                var selectedValue=document.getElementById("category-select").value;
                var expenseTextDetails=document.getElementById("ExpenseTextDetails").value;
                var expensePrice=document.getElementById("expensePrice").value;
                var date = new Date();
                var currentDate = date.getDate();
                var day=date.getDay();
                var week = ['Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
                var todaysDay = week[day];
                firebase.firestore().collection("Expense Details").add({
                    selectedValue,
                    expenseTextDetails,
                    expensePrice,
                    CreatedAt:`${currentDate} ${todaysDay}`,
                     userID:user.uid
                })
                .then(data=>{ 
                document.getElementById("show-message").innerHTML="Successfully added!",
                document.getElementById("show-message").style.color="green" 
                document.getElementById("btn-load").style.display="block";
            })
                .catch(error=>{console.log(error)})
  
            }
        }
    }))
        
    
    
   : window.location='../index.html';
})
