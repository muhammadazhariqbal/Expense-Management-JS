
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
       
//         firebase.firestore().collection("categories").get().then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                        if(doc.data().userID==user.uid){
//                         console.log(doc.data().categoryName)
//                         console.log(doc.data())
//                        }
                
                
//                    // console.log(doc.id, " => ", doc.data());
                    
                 
                    
                    
                
//             });
//         });
       
//     } else {
//         console.log('No user logged in')
//         // No user is signed in.
//     }
// });
var logout=(event)=>{
    event.preventDefault()
    firebase.auth().signOut()
    .then(action=>{
        console.log("Logout!")
        window.location='../index.html';
    })
    .catch(error=>{
        var errorCode = error.code;
        var errorMessage = error.message;
       console.log(errorMessage)
        
    })
}
firebase.auth().onAuthStateChanged(user=>{
    (user) ? firebase.firestore().collection("categories").get()
    .then(querySnapshot=>{
         var list= document.getElementById("list");
        querySnapshot.forEach(doc=>{
          if(doc.data().userID==user.uid){
               var listElement=document.createElement('li');
               var listItemText=document.createTextNode(doc.data().categoryName);
           //    <button id="delete-btn" onclick=""><i class="fas fa-trash-alt"></i></button>
           // creating delete button 
        var btn=document.createElement('button');
        btn.classList.add('delete-btn');
        var deleteIcon=document.createElement('span');
         deleteIcon.classList.add('fas','fa-trash-alt');
         btn.appendChild(deleteIcon)
         listElement.appendChild(btn)
          listElement.appendChild(listItemText);
          list.appendChild(listElement);
          btn.addEventListener('click',(e)=>{
              e.preventDefault();
              
              firebase.firestore().collection("categories").doc(doc.id).delete()
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
    })
    .catch(error=>{
        console.log(error)
    }) : window.location='../index.html';
})
