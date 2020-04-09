//initialize seach function
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
    //laptop div
    let laptopCards = document.getElementById("laptopCards");
    let i = 0;
    let j = 0;

    db.collection("Laptops").orderBy('Price').get()
    .then(function(querySnapshot){ 
        querySnapshot.forEach(function(doc){
            if(doc.exists){
                console.log("Document data:", doc.data());
                
                if(doc.data().Price <= max && doc.data().Price >= min){
                    let modalId = "modal" + i;

                    //laptop card
                    let newLaptopCard = document.createElement("div");
                    newLaptopCard.setAttribute("class", "card");
                    newLaptopCard.setAttribute("id", "newLaptopCard");
                    
                    //laptop image
                    let laptopImage = document.createElement("img");
                    laptopImage.setAttribute("class", "card-img-top");
                    laptopImage.setAttribute("src", doc.data().Image);
                    laptopImage.setAttribute("alt", "Laptop Image");
                    laptopImage.setAttribute("id", "laptopImage");
                    laptopImage.setAttribute("id", "laptopImage");
                    //append laptop image
                    newLaptopCard.append(laptopImage);

                    //laptop Info
                    let laptopInfo = document.createElement("div");
                    laptopInfo.setAttribute("class", "card-body");
                    laptopInfo.setAttribute("id", "laptopInfo");

                    //laptop name
                    let laptopName = document.createElement("h5");
                    laptopName.setAttribute("class", "card-title")
                    laptopName.innerHTML = doc.data().Name;
                    laptopName.setAttribute("id", "laptopName");

                    //price
                    let laptopPrice = document.createElement("p");
                    laptopPrice.innerHTML = "Price: " + doc.data().Price;
                    laptopPrice.setAttribute("id", "laptopPrice");

                    //footer div for show info button
                    let buttonDiv = document.createElement("div");
                    buttonDiv.setAttribute("class", "btn-group");

                    //info button
                    let infoButton = document.createElement("button");
                    infoButton.setAttribute("type", "button");
                    infoButton.setAttribute("class", "btn btn-primary");
                    infoButton.setAttribute("data-toggle","modal");
                    infoButton.setAttribute("data-target", "#"+modalId);
                    infoButton.innerHTML = "Show Info";
                    infoButton.setAttribute("id", "infoButton");

                    buttonDiv.append(infoButton);

                    laptopInfo.append(laptopName);
                    laptopInfo.append(laptopPrice);
                    laptopInfo.append(buttonDiv);

                    newLaptopCard.append(laptopInfo);

                    laptopCards.append(newLaptopCard);

                    //MODAL add to seperate function
                    let modal = document.createElement("div");
                    modal.setAttribute("class", "modal fade");
                    modal.setAttribute("id", modalId);
                    modal.setAttribute("tabindex", "-1");
                    modal.setAttribute("role", "dialog");
                    modal.setAttribute("aria-labelledby", "exampleModalCenterTitle");
                    modal.setAttribute("aria-hidden", "true");

                    //modal
                    let modaldialog = document.createElement("div");
                    modaldialog.setAttribute("class", "modal-dialog modal-dialog-centered");
                    modaldialog.setAttribute("role", "document");
                    
                    //modal dialog
                    let modalContent = document.createElement("div");
                    modalContent.setAttribute("class", "modal-content");

                    //modal content div
                    let modalHeader = document.createElement("div");
                    modalHeader.setAttribute("class", "modal-header");

                    //header for modal
                    let laptopHeader = document.createElement("h5");
                    laptopHeader.setAttribute("class", "modal-title");
                    laptopHeader.innerHTML = doc.data().Name;

                    //close button for modal
                    let closeButton = document.createElement("button");
                    closeButton.setAttribute("type", "button");
                    closeButton.setAttribute("class", "close");
                    closeButton.setAttribute("data-dismiss", "modal");
                    closeButton.setAttribute("aria-label", "close");

                    let span = document.createElement("span");
                    span.setAttribute("aria-hidden", "true");
                    closeButton.append(span);

                    modalHeader.append(laptopHeader);
                    modalHeader.append(closeButton);

                    //laptop Specs modal content 
                    let specsDiv = document.createElement("div");
                    specsDiv.setAttribute("class", "modal-body");

                    //get and append data from database
                    let brand = document.createElement("p");
                    brand.innerHTML = "Brand: " + doc.data().Brand;
                    specsDiv.append(brand);

                    let CPU = document.createElement("p");
                    CPU.innerHTML = "CPU: " + doc.data().CPU;
                    specsDiv.append(CPU);

                    let GPU = document.createElement("p");
                    GPU.innerHTML = "GPU: " + doc.data().GPU;
                    specsDiv.append(GPU);

                    let memory = document.createElement("p");
                    memory.innerHTML = "RAM: " + doc.data().Memory + "GB";
                    specsDiv.append(memory);

                    let OS = document.createElement("p");
                    OS.innerHTML = "OS: " + doc.data().OS;
                    specsDiv.append(OS);

                    let screenRes = document.createElement("p");
                    screenRes.innerHTML = "Screen Resolution: " + doc.data().ScreenResolution + "p";
                    specsDiv.append(screenRes);

                    let screenSize = document.createElement("p");
                    screenSize.innerHTML = "Screen Size: " + doc.data().ScreenSize+ "\"";
                    specsDiv.append(screenSize);

                    let storage = document.createElement("p");
                    storage.innerHTML = "Storage Size: " + doc.data().Storage;
                    specsDiv.append(storage);

                    let storageType = document.createElement("p");
                    storageType.innerHTML = "Storage Type: " + doc.data().StorageType;
                    specsDiv.append(storageType);
                    
                    //content
                    let modalFooter = document.createElement("div");
                    modalFooter.setAttribute("class", "modal-footer");

                    //exitdiv
                    let exitModal = document.createElement("button");
                    exitModal.setAttribute("type", "button");
                    exitModal.setAttribute("class", "btn btn-secondary")
                    exitModal.setAttribute("data-dismiss", "modal");
                    exitModal.innerHTML = "Close";

                    modalFooter.append(exitModal);

                    modalContent.append(modalHeader);
                    modalContent.append(specsDiv);
                    modalContent.append(modalFooter);

                    modaldialog.append(modalContent);
                    modal.append(modaldialog);

                    let body = document.getElementById("body");
                    body.append(modal);

                    //create div element for card decks every 3 cards
                    let row1 = document.createElement("div");
                    row1.setAttribute("id", "row" + j);
                    if (i % 3 == 0){
                        j++;
                        let newRow = document.createElement("div");
                        newRow.setAttribute("id", "row" + (j));
                        newRow.setAttribute("class", "card-deck");
                        newRow.append(newLaptopCard);
                        let laptopDiv = document.getElementById("laptopCards");
                        laptopDiv.append(newRow);
                    } else {
                        let row = document.getElementById("row" + j);
                        row.append(newLaptopCard);
                    }
                    
                    i++;

                }
            }
        }

    )}
    )}

//hide the search div
function hideSearch() {
    document.getElementById("searchInputDiv").classList.replace("d-fluid", "d-none");
}

//show the search div
function showSearch() {
    document.getElementById("searchInputDiv").classList.replace("d-none", "d-fluid");
}

//hide search results
function hideSearchResults() {
    document.getElementById("searchResultsDiv").classList.replace("d-fluid", "d-none");
}

//show search results
function showSearchResults() {
    document.getElementById("searchResultsDiv").classList.replace("d-none", "d-fluid");
}