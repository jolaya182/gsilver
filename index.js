let numProds = null;
let originalMap = [
    "100 oz Gold Bar",
    "1 Kilo Gold Bar - Various Mints",
    "25 oz Gold Coin",
    "20 oz Gold Coin",
    "10 oz Gold Bar - Our Choice",
    "10 oz Gold Coin",
    "1 oz American Gold Buffalo Coin (Common Date)",
    "1 oz American Gold Eagle Coin (Common Date)",
    "1 oz Austrian Philharmonic Gold Coin (Common Date)",
    "1 oz South African Gold Krugerrand Coin (Common Date)",
    "1 oz Canadian Gold Maple Leaf Coin (Common Date)",
    "1 oz Gold Bar - Various Mints",
    "1 oz Australian Kangaroo Gold Coin (Common Date)",
    "1 oz Gold Britannia Coin (Common Date)",
    "1/2 oz Canadian Gold Maple Leaf Coin (Common Date)",
    "1/2 oz American Gold Eagle Coin (Common Date)",
    "1/4 oz American Gold Eagle Coin (Common Date)",
    "1/4 oz Gold Maple Coin",
    "1/10 oz American Gold Eagle Coin (Common Date)",
    "1/10 oz Canadian Gold Maple Leaf Coin (Common Date)",
    "500 oz Sealed Mint Case American Silver Eagle",
    "250 oz Silver Round",
    "100 oz Silver Bar - Various Mints",
    "1 Kilo Silver Bar - Various Mints (32.15 troy oz)",
    "25 oz Silver coin",
    "20 oz Silver coin",
    "10 oz Silver Bar - Various Mints",
    "10 oz Silver coin",
    "1 oz American Silver Eagle Coin (Common Date)",
    "1 oz Silver Britannia Coin (Common Date)",
    "1 oz Austrian Silver Philharmonic Coin (Common Date)",
    "1 oz Silver Round - Various Mints",
    "1 oz South African Silver Krugerrand Coin (Common Date)",
    "1 oz Canadian Silver Maple Leaf Coin (Common Date)",
    "1 oz Australian Silver Kangaroo Coin (Common Date)",
    "1 oz Silver Bar - Various Mints",
];
let inputTextSelector = "#root > div.sc-geEHAE.kTTBHH > section > div > div.sc-ddQoNp.gbTkRY > div.sc-fgOGuH.biTlGQ > div > div.ais-SearchBox.sc-HUrrW.oRWom > form > input";
let lowestUnitPriceString = "div.sc-dRKXJR, div.dkNZJN";
let loadMoreButtonSelector = "#root > div.sc-geEHAE.kTTBHH > section > div > div > div.sc-fweGeb.kUzkwc > div > div > div > div > button.sc-hBEYos.hzhVbU.sc-bQltev.cDdDVA";
let lowestPricePerUnitSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div.sc-hJJQhR.hwHWUe > div.sc-fxNNfJ.kgjyeD > div:nth-child(1) > div > div.sc-dRKXJR.dkNZJN > p";
let xBoxSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-ehSCib.dpAJOV > button";
let rootModalSelector = `#root `;
let modalSelector = "#root > div.sc-nFpLZ.hezXcJ";
let prodNameSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > h2";
let s = "1 oz Gold Britannia Coin (Common Date), 1;1/2 oz Canadian Gold Maple Leaf Coin (Common Date), 1;1/10 oz Canadian Gold Maple Leaf Coin (Common Date), 2;1 oz Canadian Silver Maple Leaf Coin (Common Date), 7;	";
let counter = 0;
let numberClickOfLoadMoreProducts = 0;
let numberClickOfLoadMoreProductsMax = 3;
let loadProductHasbeenClicked = false;
let loadAllProductHasBeenClicked = false;
let numClkLoadBtn = 0;
let stringPrice = "";
let listOfProducts = [];
let neededProductsElems = [];
let prodToSubmitArryObj = [];
let initMap = new Map();

let resetAllVariables = () =>{
 counter = 0;
 numberClickOfLoadMoreProducts = 0;
 numberClickOfLoadMoreProductsMax = 3;
 loadProductHasbeenClicked = false;
 loadAllProductHasBeenClicked = false;
 numClkLoadBtn = 0;
 stringPrice = "";
 listOfProducts = [];
 neededProductsElems = [];
 prodToSubmitArryObj = [];
 initMap = new Map();
 console.log("variables reseted");
}

setTimeout(resetAllVariables, 240000);
//html set
let resetCounterNumProdsNumClkLoadBtn = () =>{
        counter = 0;
        numProds = null;
        numClkLoadBtn = 0;
    }
//input from the client, receives a string and returns an array of objects { prod : quantity}
let processStringedSelectedProducts = (s)=>{
    let selectedProducts = s.split(';');
      selectedProducts.map((product)=>{
        let prod = product.split(",")
        
        return {prodName:prod[0], prodQuantity:prod[1]}
    });
    //eliminate the last unncessary line
    selectedProducts.pop();
    return selectedProducts;
}

let newProducts = processStringedSelectedProducts(s)

let mapOfSelectedProductQty = (arryProd)=>{
    let initialMap = new Map();
    arryProd.forEach((prod)=>{
        let prodNameQty = prod.split(",");
        initialMap.set( prodNameQty[0], prodNameQty[1])
    })
    return initialMap;
}

let mapOfNewprices = mapOfSelectedProductQty(newProducts);
// console.log("mapOfNewprices", mapOfNewprices);
    

originalMap.forEach(item => {initMap.set(item, "0");})

let createArryOfUpdatedPrices = (originalMap, mapOfNewprices) =>originalMap.map((prodName)=>{
    let price = mapOfNewprices.get(prodName);
    if(price === undefined) return "0";
    return price;
});

//start here
let arryOfUpdatedPricesOrdered = createArryOfUpdatedPrices(originalMap, mapOfNewprices);
// console.log("arryOfUpdatedPricesOrdered", arryOfUpdatedPricesOrdered)
let stringifyPrices = (arryOfUpdatedPricesOrdered)=>arryOfUpdatedPricesOrdered.map((price)=>price.concat("\n")).join('');

let stringOfPrices = stringifyPrices(arryOfUpdatedPricesOrdered);

//input from the site
let getHE = (select) =>{ 
    let elem = document.querySelectorAll(select);
    if ( elem.length )  return elem.item(0);
    //html element was not found therefore we send undefined
    return elem.length;
};


let getHtmlString = (selector) => {
    let elem = getHE(selector);
    return elem.textContent;
    }

let getPriceXbox = ( priceSelector, xBoxSelector)=>{
    let xboxElement = getHE(xBoxSelector);   
    let lowestPricePerUnitString = getHtmlString(priceSelector); 
    return {xboxElement, lowestPricePerUnitString};
}

let loadProducts = () =>{
    //load the products
    let loadMoreProductsButton = getHE(loadMoreButtonSelector);
    numClkLoadBtn++;
    console.log("loadmorebutton clicked !" );
    loadMoreProductsButton.click();
}

let clickThroughPriceTiersBtn = (index)=>{
    // click on the details pricing and wait for the modal to show up
    console.log("clickThroughPriceTiersBtn counter index ", index )
    let product = neededProductsElems[index];
    let detailPricingButton = null;
    let lowestPriceButton = null;
    let priceTiersButton = null;

    try{
        detailPricingButton = product.children[0].children[0].children[3].children[0];
    } catch(error){
        console.error("detailPricingButton was not available", error )
        detailPricingButton = product;
    }
    detailPricingButton.click();

    try{
         lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[2].children[0].children[0];
    }catch(error){
        console.error("it is running on a mobile gui, no lowestPriceButton available on non mobile gui ", error);
        // its mobile gui
        lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[0].children[0].children[2];
    }
    lowestPriceButton.click();
    
     try{ 
        priceTiersButton = product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0];
        // console.log("priceTiersButton", priceTiersButton);
     }catch(error){
        console.error("priceTierButton was not available, ", error)
        priceTiersButton = product;
     }
    priceTiersButton.click();

}

let clickPriceTiersBtn = (index)=>{
    // click on the details pricing and wait for the modal to show up
    console.log("clickPriceTiersBtn counter index ", index )
    let product = neededProductsElems[index];
    
    let priceTiersButton = null;

     try{ 
        priceTiersButton = product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0];
        console.log("priceTiersButton", priceTiersButton);
     }catch(error){
        console.error("priceTierButton was not available, ", error)
        priceTiersButton = product;
     }
    priceTiersButton.click();

}

let filterNeededProducts = () =>{
    let prodName = null;
    let product = null;
    try{
            listOfProducts = document.querySelectorAll("ul").item(6).children; // if not found , than try number 6 for  a mobile gui   

    }catch(error){
        console.error("you are on mobile ")
        listOfProducts = document.querySelectorAll("ul").item(2).children;
    }

    
    console.log("listOfProducts length ", listOfProducts.length);
    console.log("listofProducts ", listOfProducts);
    for (let index = 0; index < listOfProducts.length; index++) {
    // if (index !== 2) continue;
    try{
        // get the name of the product name
        product = listOfProducts.item(index);
        prodName = product.children[0].children[0].children[1].children[0].children[0].textContent.trim();
    }catch(error){
        console.error("product or productName was not able to be retrieved from the product list ", error)
    }

    // find the prodname we are interested in the hash table
    if (initMap.get(prodName) != undefined) {
        numProds++;
        neededProductsElems.push(product );
        }// eof of the if product accepted filter 

    // continue the loop
    }
}


let execMainProgram = ()=>{
    //set up
    filterNeededProducts();
    clickThroughPriceTiersBtn(counter);
    //return a list of prodnames and price in a text format
}

//load data from each product
let copyToClipBoard = async (text) => {
    try{
        await navigator.clipboard.writeText(text);
        console.log("copied to the text board");
    }catch(error){
        console.error("clipboard copy did not work", error);
    }
}

let prodListMutatObs = (selector, callBfunc) =>{
    let observer = new MutationObserver((mutations, obs)=>{
    let modal = getHE(modalSelector);
    console.log("modal", modal);
    if( modal ){            
        let priceXbox = getPriceXbox(lowestPricePerUnitSelector, xBoxSelector);
        if(priceXbox.lowestPricePerUnitString){ 
            //compensate the offset to of the initial clickThroughPriceTiersBtn
            // console.log("priceXbox", priceXbox);
            prodName = getHE(prodNameSelector).textContent.split(",");
            // console.log("prodName", prodName[0])
            //update the initmap, close modal and disconnect
            initMap.set(prodName[0], priceXbox.lowestPricePerUnitString);
            priceXbox.xboxElement.click(); 
            console.log("counter: ",counter, " numProds: ", numProds);
            counter++;
            console.log("counter is now", counter);
            if(counter < numProds) callBfunc(counter);
            if(counter >= numProds){
                console.log("counter ", counter, " >= ", " numProds ", numProds )
                obs.disconnect();
                resetCounterNumProdsNumClkLoadBtn();

                let listOfFinalPrices = createArryOfUpdatedPrices(originalMap, initMap);
                // console.log("listOfFinalPrices", listOfFinalPrices);
                stringPrice = stringifyPrices(listOfFinalPrices);
                // console.log("final stringPrice", stringPrice);
                if(loadProductHasbeenClicked == false) loadProductHasbeenClicked = true;
                return;
            }
        }
    }               
});
    
observer.observe(selector, {childList:true, subtree: true});
}
    
    // console.log(stringPrice);
    let mainForm = document.createElement("form");
    Object.assign(mainForm.style, { "z-index":"1000",position:"sticky", top: "0", display: "flex", "flex-direction":"row", "flex-wrap": "wrap", "justify-content": "space-around", color: "blue", backgroundColor:"#e5e5e5", height:"100px"});

    let div1 = document.createElement("div");
    Object.assign(div1.style, {display: "flex", "flex-direction":"row","font-size":"24px", margin: "10px", padding: "20px, "});
    let div2 = document.createElement("div");
    Object.assign(div2.style, {display: "flex", "flex-direction":"row","font-size":"24px", margin: "10px", padding: "20px, "});
    
    
    let getTextArea = document.createElement("textarea");
    getTextArea.setAttribute("id", "mainTextArea") 

    let submitText = document.createElement("textarea");
    submitText.setAttribute("id", "submitTextArea");

    let getPricesButton = document.createElement("input");
    getPricesButton.setAttribute("type", 'button');
    getPricesButton.setAttribute("id", 'getPrices');
    getPricesButton.setAttribute("value", "Get Prices")
    getPricesButton.addEventListener('click', ()=>{
        if(stringPrice === ""){
            alert("there is no products/price searched click load or load all "); 
            return
        }

        let idForm = document.getElementById("mainTextArea")
        idForm.value = stringPrice;
        copyToClipBoard(stringPrice);
        idForm.select();
        
    });

    let loadProductButton = document.createElement("input");
    loadProductButton.setAttribute("type", "button");
    loadProductButton.setAttribute("value", "load Products");
    loadProductButton.setAttribute("id", "loadProducts");
    loadProductButton.addEventListener("click", (e) =>{
        console.log("setting the products");
        if (loadProductHasbeenClicked){
            console.log("loadProductHasbeenClicked has already been clicked ", loadProductHasbeenClicked);
            return;
        }
        //preload
        let modalRoot = getHE(rootModalSelector);
        // variable  needed modalRoot and clickPriceTiersBtn
        prodListMutatObs( modalRoot, clickThroughPriceTiersBtn);
        let buttonObserver = new MutationObserver((mutations, obs)  =>{
            console.log("numClkLoadBtn: ", numClkLoadBtn, " >= ", " numberClickOfLoadMoreProducts: ", numberClickOfLoadMoreProducts);
            if(numClkLoadBtn >= numberClickOfLoadMoreProducts){
                obs.disconnect(); 
                execMainProgram();
                return;
            }
            loadProducts();
        })
        
        buttonObserver.observe(modalRoot, {childList:true, subtree:true});

    });    

    let loadAllProductButton = document.createElement("input");
    loadAllProductButton.setAttribute("type", "button");
    loadAllProductButton.setAttribute("value", "load All Product");
    loadAllProductButton.setAttribute("id", "loadAllProducts");
    loadAllProductButton.addEventListener("click", (e) =>{
        console.log("setting all the products");
        //resetCounterNumProdsNumClkLoadBtn();
        if (loadAllProductHasBeenClicked){
            console.log("loadAllProductHasBeenClicked has already been clicked", loadAllProductHasBeenClicked );
            return
        };

        numberClickOfLoadMoreProducts = numberClickOfLoadMoreProductsMax
        loadProductButton = document.getElementById("loadProducts");
        loadAllProductHasBeenClicked = true;
        loadProductButton.click();
    });    


    let submitProdNamesButton = document.createElement('input')
    submitProdNamesButton.setAttribute('type', 'button');
    submitProdNamesButton.setAttribute("value", "Submit ProdNames");
    submitProdNamesButton.setAttribute("id", "SubmitProdNames");
    submitProdNamesButton.addEventListener("click",   ()=>{

        let idForm = document.getElementById("submitTextArea");
        let value = idForm.value
        // let value = "1 oz Gold Britannia Coin (Common Date), 1;1/2 oz Canadian Gold Maple Leaf Coin (Common Date), 1;1/10 oz Canadian Gold Maple Leaf Coin (Common Date), 2;1 oz Canadian Silver Maple Leaf Coin (Common Date), 7;	";
        if(value === ""){
            alert("the text submited is empty");
            return;
        }
        let prodToSubmitArryObj = processStringedSelectedProducts(value);
        console.log("prodToSubmitArryObj, ", prodToSubmitArryObj);


    });

    let refreshButton = document.createElement("input");
    refreshButton.setAttribute("type", "button");
    refreshButton.setAttribute("value", "refreshButton");
    refreshButton.setAttribute("id", "refreshButton");
    refreshButton.addEventListener("click",()=>{
        numProds = neededProductsElems.length;
        if (numProds <= 0){
            alert("no products searched click load or load all products"); 
            return;
        }
        let modalRoot = getHE(rootModalSelector);
        clickPriceTiersBtn(counter);
        // variable  needed modalRoot and clickPriceTiersBtn
        prodListMutatObs( modalRoot, clickPriceTiersBtn);

    });



    div1.prepend(loadAllProductButton);
    div1.prepend(refreshButton);
    div1.prepend(loadProductButton);
    div2.prepend(getPricesButton);
    div2.prepend(getTextArea);
    div2.prepend(submitProdNamesButton);
    div2.prepend(submitText);
    mainForm.prepend(div1);
    mainForm.prepend(div2);
    let root = document.getElementById("root");
    root.prepend(mainForm);

