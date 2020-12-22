
var addCategory=event=>{
    event.preventDefault()
    document.getElementById("btn-load").style.display="none";
   
    var categoryName=document.getElementById("add-category").value;
    
         (!categoryName) ? (document.getElementById("show-message").innerHTML= "Enter a Category Name!", document.getElementById("show-message").style.color="red",
         document.getElementById("btn-load").style.display="block")
          :
         AddingCategoryNameUsingFirebase();
      
        
    
}
var AddingCategoryNameUsingFirebase=()=>{
    
    firebase.auth().onAuthStateChanged(user=>{
        (user) ? firebase.firestore().collection('categories').add({
        categoryName:document.getElementById("add-category").value,
        CreatedAt:firebase.firestore.FieldValue.serverTimestamp(),
        userID:user.uid
        }) 
        .then(doc=>{
            console.log("Successfully added!")
            document.getElementById("show-message").innerHTML="Successfully added!", document.getElementById("show-message").style.color="green" 
            document.getElementById("btn-load").style.display="block";
          
        })
        .catch(error=>{
            console.log(error)
            document.getElementById("show-message").innerHTML=error;
            document.getElementById("show-message").style.color="red" 
            document.getElementById("btn-load").style.display="block";
        }) :  window.location="../index.html";
    })
}

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