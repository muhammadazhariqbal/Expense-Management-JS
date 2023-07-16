

var resetPassword = () => {
    console.log("reset password!")
    firebase.auth().getUserByEmail(email)
    .then(userRecord => {
      // Step 2: Generate a password reset link
      return admin.auth().generatePasswordResetLink(userRecord.uid);
    })
    .then(passwordResetLink => {
      // Step 3: Send the password reset link to the user via email or other means
      // (In this example, we simply log it to the console)
      console.log('Password reset link:', passwordResetLink);

    })
    .catch(error => {
      console.error('Error resetting password:', error);
      
    });
}