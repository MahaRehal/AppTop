updateName();
updateProfileCard();

//update name on profile card with logged in user's name from database
function updateName(){
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById("main-card-name").innerHTML = user.displayName;
   });
}

//save changes
function saveChanges(){
    updateUserDB();
    updateProfileCard();
}

//updating database with input from textboxes
function updateUserDB() {
    let updateOccupation = document.getElementById("modalInputOcc").value;
    let updatePreference = document.getElementById("modalInputPref").value;
    let updateBudget = document.getElementById("modalInputBudg").value;
    let updateQuote = document.getElementById("modalInputQuote").value;
    let updateURL = document.getElementById("modalInputImg").value;

    firebase.auth().onAuthStateChanged(function (user) {
        if(updateOccupation == null){
            console.log(user.data().occupation);
        } else {
            db.collection("users").doc(user.uid).update({
                "occupation": updateOccupation
            });
        }
        if(updatePreference == null){
            console.log(user.data().preference);
        } else {
            db.collection("users").doc(user.uid).update({
                "preference": updatePreference
            });
        }
        if(updateBudget == null){
            console.log(user.data().budget);
        } else {
            db.collection("users").doc(user.uid).update({
                "budget": updateBudget
            });
        }
        if(updateQuote == null){
            console.log(user.data().quote);
        } else {
            db.collection("users").doc(user.uid).update({
                "quote": updateQuote
            });
        }
        if(updateURL == null){
            console.log(user.data().url);
        } else {
            db.collection("users").doc(user.uid).update({
                "url": updateURL
            });
        }
    });
}

//updating profile card with unput values
function updateProfileCard(){
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("users").doc(user.uid).get()
        .then(function(doc){
            document.getElementById("occupation").innerHTML = "Occupation: " + doc.data().occupation;
            document.getElementById("preference").innerHTML = "Preference: " + doc.data().preference;
            document.getElementById("budget").innerHTML = "Budget: " + doc.data().budget;
            document.getElementById("quote").innerHTML = "Quote: " + doc.data().quote;
            document.getElementById("mainCardImg").setAttribute("src", doc.data().url);
        })
    });

}

//hide profile card
function hideProfile() {
    document.getElementById("maincard").classList.replace("d-fluid", "d-none");
}

//show profile card
function showProfile() {
    document.getElementById("maincard").classList.replace("d-none", "d-fluid");
}

