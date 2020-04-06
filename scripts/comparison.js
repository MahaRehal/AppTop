let laptop1Db = "Example";
let laptop2Db = "Example2";
let laptop1 = "laptop1";
let laptop2 = "laptop2";

//comparisons with numerical values
function getBattery(one, two){
    //getting battery values
    firebase.auth().onAuthStateChanged(function (user)){
        db.collection("Laptops").doc(one)
        .get()
        .then(
            function(snap) {
                document.getElementById(two).innerHTML = snap.data().Battery;
            }
        );
    }
    
}

getBattery(laptop1Db, laptop1);
getBattery(laptop2Db, laptop2);

let batteryOneValue = parseInt(document.getElementById(laptop1).innerHTML);
let batteryTwoValue = parseInt(document.getElementById(laptop2).innerHTML);

console.log(batteryOneValue);
console.log(batteryTwoValue);

//comparison
if (batteryOneValue > batteryTwoValue){
    laptop1.innerHTML = laptop1 + "has better battery life at: " + batteryOneValue;
    laptop2.innerHTML = laptop2 + "has worse battery life at: " + batteryTwoValue;
} else if (batteryTwoValue > batteryOneValue){
    laptop2.innerHTML = laptop2 + "has better battery life at: " + batteryTwoValue;
    laptop1.innerHTML = laptop1 + "has worse battery life at: " + batteryOneValue;
} else if (batteryOneValue == batteryTwoValue){
    let even = document.createElement("h1");
    document.body.appendChild(even);
    even.innerHTML = "Both laptops have the same battery life at: " + batteryOneValue;
}

//comparison with rankings from database
// cpu, graphics, etc
//initializing functions