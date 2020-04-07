let db;

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
    db = firebase.firestore();
}
initDB();

function updateProfileCard(){
    updateName();
    updateProfile();
}

function updateName(){
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById("main-card-name").innerHTML = user.displayName;
   });
}


function updateUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
            "haircolor": "blonde"
        });
    });
}
updateUser();

updateProfileCard();

updatePreferences();

function saveChanges() {
    var authRef = firebase.auth();
    authRef.onAuthStateChanged(function(user) {
        if (user) {
            console.log('Display name onAuthStateChanged : '+user.displayName);
            updatePreferences();
        } else {
            console.log('not login');
        }
    });
}

function updatePreferences(){
    let updateOccupation = document.getElementById("modalInputOcc").value;
    let updatePreference = document.getElementById("modalInputPref").value;
    let updateBudget = document.getElementById("modalInputBudg").value;
    let updateQuote = document.getElementById("modalInputQuote").value;

    var userNow = firebase.auth().currentUser;
        userNow.updateProfile({
            occupation: updateOccupation,
            preference: updatePreference,
            budget: updateBudget,
            quote: updateQuote
        }).then(function() {
            document.getElementById("occupation").innerHTML = "Occupation: " + updateOccupation;
            document.getElementById("preference").innerHTML = "Preference: " + userNow.preference;
            document.getElementById("budget").innerHTML = "Budget: " + userNow.budget;
            document.getElementById("quote").innerHTML = "Quote + \"" + userNow.quote + "\""
        }, function(error) {
            
        });

}

function hideProfile() {

    document.getElementById("maincard").classList.replace("d-fluid", "d-none");

}

function showProfile() {

    document.getElementById("maincard").classList.replace("d-none", "d-fluid");

}

