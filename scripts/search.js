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
    let minBound = document.getElementById("searchInputMin").value;
    let maxBound = document.getElementById("searchInputMax").value;
    getResults(minBound, maxBound)
}

//gets the min and max bound and uses the to 
function getBounds(){
    let minBound = document.getElementById("searchInputMin").value;
    let maxBound = document.getElementById("searchInputMax").value;
    console.log(minBound);
    console.log(maxBound);
    getResults(minBound, maxBound);
}

function getResults(min, max){
    let laptopCards = document.getElementById("laptopCards");
    let i = 1;

    db.collection("Laptops").orderBy('Price', 'desc').get()
    .then(function(querySnapshot){ 
        querySnapshot.forEach(function(doc){
            if(doc.exists){
                console.log("Document data:", doc.data());
                let row = document.createElement("tr");
                let head = document.createElement("th");
                head.scope = "row";
                
                if(doc.data().Price <= max && doc.data().Price >= min){
                    let laptopName = document.createElement("td");
                    laptopName.innerHTML = doc.data().Name;

                    let laptopBrand = document.createElement("td");
                    laptopBrand.innerHTML = doc.data().Brand;

                    let laptopPrice = document.createElement("td");
                    laptopPrice.innerHTML = doc.data().Price;

                    laptopCards.append(row);
                    laptopCards.append(head);
                    laptopCards.append(laptopName);
                    laptopCards.append(laptopBrand);
                    laptopCards.append(laptopBrand);
                } else {
                    console.log("not in range")
                }
            } else {
                console.log("no such document");
            }
        }

    )}
    )}

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