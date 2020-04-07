let db;

//initialize database
function initDB(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAXj5b0wW7sI7YNLGOa-3YF5SDFIRAbgMA",
        authDomain: "apptop-ea05d.firebaseapp.com",
        databaseURL: "https://apptop-ea05d.firebaseio.com",
        projectId: "apptop-ea05d",
        storageBucket: "apptop-ea05d.appspot.com",
        messagingSenderId: "259042364213",
        appId: "1:259042364213:web:1a7d6fabff0f4997b45a7c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db = firebase.firestore();
}
initDB();

//login function using firebase widget
function login(){
    // Initialize the FirebaseUI Widget using Firebase.
    document.getElementById("signUpButton").style.display = 'none';
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                var user = authResult.user;
                if (authResult.additionalUserInfo.isNewUser) {
                    db.collection("users").doc(user.uid).set({
                            name: user.displayName,
                            email: user.email
                        }).then(function () {
                            console.log("New user added to firestore");
                            window.location.assign("main.html");
                        })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        });
                } else {
                    return true;
                }
                return false;
            },

            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInSuccessUrl: 'main.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'main.html',
        // Privacy policy url.
        privacyPolicyUrl: 'main.html',
        accountChooserEnabled: true
    };
    // The start method will wait until the DOM is loaded.
    // Inject the login interface into the HTML
    ui.start('#firebaseui-auth-container', uiConfig);
}