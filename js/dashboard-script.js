

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
        var sno = 0;
        querySnapshot.forEach((doc,index)=>{
            sno+=1;
            if(doc.data().userID==user.uid){
                var ExpenseCategoryName=doc.data().selectedValue;
                var ExpenseTextDetails=doc.data().expenseTextDetails;
                var ExpensePrice=doc.data().expensePrice;
                var createdDay=doc.data().CreatedAt;
                
                // createdDate=doc.data().CreatedAt;
                var table = document.getElementById("expense-table");
                var tr = document.createElement("tr");
                var tdDate = document.createElement("td");
                var tdCatName = document.createElement("td");
                var tdItem = document.createElement("td");
                var tdPrice = document.createElement("td");
                var tdAction = document.createElement("td");
                var btn=document.createElement('button');
                btn.classList.add('delete-btn');
                var deleteIcon=document.createElement('span');
                deleteIcon.classList.add('fas','fa-trash-alt');
                btn.appendChild(deleteIcon)
                
               
                tdDate.innerText=createdDay;
                tdCatName.innerText=ExpenseCategoryName;
                tdItem.innerText=ExpenseTextDetails;
                tdPrice.innerText=ExpensePrice;
                tdAction.appendChild(btn)
               
                tr.appendChild(tdDate)
                tr.appendChild(tdCatName)
                tr.appendChild(tdItem)
                tr.appendChild(tdPrice)
                tr.appendChild(tdAction)
                table.append(tr)
                
                

                var iduser=doc.data().userID;
            //     var div=document.getElementById("expense-details-list");
            //   var ul=document.createElement("ul")
            //   var li=document.createElement('li')
            //   var span=document.createElement('span')
            //   span.classList.add("x")
                        // creating delete button 
               
              
            //   var liCategoryValue=document.createTextNode(ExpenseCategoryName+'\u00A0 : \u00A0')
            //   var createdDay=document.createTextNode("On\u00A0"+createdDay+',\u00A0 ')
            //   var liTextValue=document.createTextNode(ExpenseTextDetails+'\u00A0')
            //   var liPriceValue=document.createTextNode("\u00A0"+ExpensePrice)
             // var liDateValue=document.createTextNode(createdDate)
            //  span.appendChild(createdDay)
            //   span.appendChild(liCategoryValue)
            //   span.appendChild(liTextValue)
            //   span.appendChild(liPriceValue)
             
              //span.appendChild(liDateValue)
            //   li.appendChild(span)
            //   li.appendChild(btn)
            //   ul.appendChild(li)
            //   div.appendChild(ul)
              btn.addEventListener('click',(e)=>{
                e.preventDefault();
                
                firebase.firestore().collection("Expense Details").doc(doc.id).delete()
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

function genReport(){// Landscape export, 2×4 inches
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#table-cont')[0];
   console.log(pdf)

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 10,
        width: 700
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);
}