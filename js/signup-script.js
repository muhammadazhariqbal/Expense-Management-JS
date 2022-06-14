var RegisterUser=(event)=>{
  
    event.preventDefault();
    // GETTING USER DATA 

    var userFullName=document.getElementById("userFullName").value;
    var userEmail=document.getElementById("userEmail").value;
    var userPassword=document.getElementById("userPassword").value;
    var userRepeatedPassword=document.getElementById("userRepeatedPassword").value;
    document.getElementById("loader").style.display="block";
  
   


    // FORM VALIDATION
    (!userFullName||!userEmail||!userPassword||!userRepeatedPassword) ? 
    (document.getElementById("show-message").innerHTML="Please Fill all required Fields!", document.getElementById("show-message").style.color="red",document.getElementById("loader").style.display="none"):
    (userPassword.length<8) ? (document.getElementById("show-message").innerHTML="Your password must be at least 8 characters.", document.getElementById("show-message").style.color="red", document.getElementById("loader").style.display="none") : 
    (userPassword!=userRepeatedPassword) ? (document.getElementById("show-message").innerHTML="Your Password did not matched.", document.getElementById("show-message").style.color="red", document.getElementById("loader").style.display="none") :
    firebaseAuthenticationandStoringData();
   

 
    
}
var firebaseAuthenticationandStoringData=()=>{
   
    firebase.auth().createUserWithEmailAndPassword(userEmail.value,userPassword.value)
    .then(doc=>{
         // GETTING USER DATA 

    var userFullName=document.getElementById("userFullName").value;
    var userEmail=document.getElementById("userEmail").value;
        document.getElementById("show-message").innerHTML="Your Account has been created Successfully!.";
        document.getElementById("show-message").style.color="green";
        document.getElementById("loader").style.display="none";
        document.getElementById("sign-up").reset();
        var userData={
            name:userFullName,
            email:userEmail,
           userId:doc.user.uid,
            //firebase method of time when the data will set 
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
         }

      
        // storing user data on successfull registering account
        
        // firebase.firestore().collection('users').add(userData)
        // saving data using user id 
             return firebase.firestore().collection('users').doc(doc.user.uid).set(userData)
            .then(data=>{
                console.log("User Details added!")
                console.log(userData)
                
              })
            .catch(error=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("show-message").innerHTML=errorMessage;
                document.getElementById("show-message").style.color="red";
                document.getElementById("loader").style.display="none";
              })
    })
    .catch(error=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("show-message").innerHTML=errorMessage;
         document.getElementById("show-message").style.color="red";
         document.getElementById("loader").style.display="none";
    })
}
