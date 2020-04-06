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
}

function updateName(){
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById("main-card-name").innerHTML = user.displayName;
      });
}

//function updateUser() {
//    firebase.auth().onAuthStateChanged(function (user) {
//        db.collection("users").doc(user.uid).update({
//            "haircolor": "blonde"
//        });
//    });
//}
//updateUser();

updateProfileCard();

function logID(){
    firebase.auth().onAuthStateChanged(function (user){
        console.log(user.uid);   //print the ugly id
        console.log(user.displayName); //print elmo
    });
}
logID();




function hideProfile() {

    document.getElementById("maincard").classList.replace("d-fluid", "d-none");

}

function showProfile() {

    document.getElementById("maincard").classList.replace("d-none", "d-fluid");

}