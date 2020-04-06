let db;

function initializeFirebase(){
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

initializeFirebase();

function startSearch(){
    hideSearch();
    showSearchResults();
}

function getResults(){
    
}

function hideSearch() {
    document.getElementById("searchInputDiv").classList.replace("d-fluid", "d-none");
}

function showSearch() {
    document.getElementById("searchInputDiv").classList.replace("d-none", "d-fluid");
}

function hideSearchResults() {
    document.getElementById("searchResultsDiv").classList.replace("d-fluid", "d-none");
}

function showSearchResults() {
    document.getElementById("searchResultsDiv").classList.replace("d-none", "d-fluid");
}