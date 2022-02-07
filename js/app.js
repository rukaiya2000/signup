const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
function signUp(){
    var userFullName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            userEmail: userEmail,
            userPassword: userPassword,
            userFb: "https://www.facebook.com/",
            userTw: "https://twitter.com/",
            userGp: "https://plus.google.com/",
            userBio: "User biography",
        }
        firebaseRef.child(uid).set(userData);
        swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });

}

function signIn(){
    var userSIEmail = document.getElementById("signInEmail").value;
    var userSIPassword = document.getElementById("signInPassword").value;
    firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
        alert('Successfully Signed In'); window.location = './profile.html';
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
    });
}

