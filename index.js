let numProds = null;
let nextLink = "https://app.goldsilver.com/buy";
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
let loadMoreButtonSelector = "#root > div.sc-utZcN.cJaOBC > section > div > div > div.sc-dmqUwf.gVqMhg > div > div > div > div > button.sc-hBEYos.hzhVbU.sc-fweGeb.kUzkwc";
let lowestPricePerUnitSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div.sc-hJJQhR.hwHWUe > div.sc-fxNNfJ.kgjyeD > div:nth-child(1) > div > div.sc-ddQoNp.gbTkRY > p";
let xBoxSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-ehSCib.dpAJOV > button";
let rootModalSelector = `#root `;
let modalSelector = "#root > div.sc-nFpLZ.hezXcJ";
let prodNameSelector = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > h2";
let buyBtn = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div.sc-eJMQSu.bFiYOs > button.sc-hBEYos.cvMDym";
let nextBtn = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div > div > div > div.sc-eJMQSu.eMOJuk > button.sc-hBEYos.HuaGr";
let quantityBtn = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div > div > div > form > div.sc-cKFVac.kvHAyu > div.sc-hgZQmf.eLEcJs > button:nth-child(2)";
let amountInput = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div > div > div > form > p";
let nextBtn2 = "#root > div.sc-nFpLZ.hezXcJ > div > div > div.sc-clsHhM.dcyGMh > div > div > div > div > form > div.sc-eJMQSu.eMOJuk > button.sc-hBEYos.HuaGr";
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
let submitedProdStack = [];
let submitedProdStackStringified = [];
let prodsNotInMyList = [];
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
 originalMap.forEach(item => {initMap.set(item, "0");})
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
    console.log("selected products", selectedProducts )
      let newSelectedProducts = selectedProducts.map((product)=>{
        let prod = product.split(",")
        let newProObj = {} ;
        newProObj.prodName = prod[0]; 
        newProObj.prodQuantity = prod[1];
        return newProObj
    });
    //eliminate the last unncessary line
    newSelectedProducts.pop();
    return newSelectedProducts;
}

let newProducts = processStringedSelectedProducts(s)

let mapOfSelectedProductQty = (arryProd)=>{
    let initialMap = new Map();
    arryProd.forEach((prod)=>{
        let prodQty = prod.prodQuantity;
        let prodName = prod.prodName;
        initialMap.set( prodName , prodQty)
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
    console.log()
    let product = neededProductsElems[index];
    let detailPricingButton = null;
    let lowestPriceButton = null;
    let priceTiersButton = null;

    try{
        detailPricingButton = product.children[0].children[0].children[3].children[0];
    } catch(error){
        console.error("detailPricingButton was not available", error )
        console.log("product", product);
        console.log("detailPricingButton", product.children[0].children[0].children[3].children[0]);
        detailPricingButton = product;
    }
    detailPricingButton.click();

    try{
         lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[2].children[0].children[0];
    }catch(error){
        console.error("it is running on a mobile gui, no lowestPriceButton available on non mobile gui ", error);
        console.log("product", product);
        console.log("lowestPriceButton", product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[2].children[0].children[0]);

        // its mobile gui
        lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[0].children[0].children[2];
    }
    lowestPriceButton.click();
    
     try{ 
        priceTiersButton = product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0];
        // console.log("priceTiersButton", priceTiersButton);
     }catch(error){
        console.error("priceTierButton was not available, ", error);
        console.log("product", product);
        console.log("priceTiersButton", product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0]);
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
    // console.log("prodName", prodName, )
    // console.log("prodName == gold britannia", prodName == "1 oz Gold Britannia Coin (Common Date)" );
    
    // if(prodName == "1 oz Gold Britannia Coin (Common Date)" )console.log("initMap.get(prodName):",initMap.get( prodName), )
    if (initMap.get(prodName) != undefined) {
        numProds++;
        neededProductsElems.push(product );
    }else{
        // it is not in may list
        prodsNotInMyList.push(prodName);
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
            initMap.set(prodName[0].trim(), priceXbox.lowestPricePerUnitString);
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
    Object.assign(mainForm.style, { "z-index":"1000",position:"sticky", top: "0", display: "flex", "flex-direction":"row", "flex-wrap": "wrap", "justify-content": "space-around", color: "blue", backgroundColor:"#e5e5e5", height:"400px"});

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
        // let value = "1 oz Gold Britannia Coin (Common Date), 1;1/2 oz Canadian Gold Maple Leaf Coin (Common Date), 1;1/10 oz Canadian Gold Maple Leaf Coin (Common Date), 2;1 oz Canadian Silver Maple Leaf Coin (Common Date), 7;	";
        let submitTextArea = document.getElementById("submitTextArea");
        let value = submitTextArea.value
        console.log("value", value);
        if(value === ""){
            alert("the text submited is empty");
            return;
        }

        submitedProdStack = processStringedSelectedProducts(value);
        console.log("submitedProdStack", submitedProdStack)
        submitedProdStackStringified = submitedProdStack.map((prod)=> `${prod.prodName} ${prod.prodQuantity} \n`);
        console.log("submitedProdStackStringified", submitedProdStackStringified)
        document.getElementById("prodStackTextArea").value = submitedProdStackStringified.toString();
        submitTextArea.value = "";
        console.log("submitedProdStack, ", submitedProdStack);

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

    let prodStackTextArea = document.createElement("textarea");
    Object.assign(prodStackTextArea.style, { width: "70%", height: "100px" });
    prodStackTextArea.setAttribute("id", "prodStackTextArea");
    let prodStackBtn = document.createElement("input");
    prodStackBtn.setAttribute("type", "button");
    prodStackBtn.setAttribute("id", "prodStackBtn");
    prodStackBtn.setAttribute("value", "prodFire");
    prodStackBtn.addEventListener("click", ()=>{
        if(submitedProdStack.length === 0){
            console.log("submitedProdStack is empty , insert a list to the submit prodNames");
            return;
        }

        let prodSelected = submitedProdStack.pop(); 
        submitedProdStackStringified.pop()
        prodStackTextArea.value =  submitedProdStackStringified;
        
        let ProdNameQtyToTab = (prodName, prodQty) =>{
            return `
            let prodName = "${prodName}";
            let prodQty = "${prodQty}";

            console.log( "prodName ", prodName , " prodQty ", prodQty );
            let modalRoot = document.querySelectorAll("${rootModalSelector}").item(0);
            let loadMoreBtn = document.querySelectorAll("${loadMoreButtonSelector}").item(0);
            console.log("loadMoreBtn", loadMoreBtn);
            console.log("modalRoot", modalRoot);
            let loadProducts = () =>{
                //load the products
                numberOfClicksLoadButton++;
                console.log("loadMoreBtn clicked !",loadMoreBtn );
                loadMoreBtn.click();
            }

            let findProductHE = (prodNameString) =>{
                console.log("prodNameString: ",prodNameString);
                let prodName = null;
                let product = null;
                let listOfProducts = null
                try{
                    listOfProducts = document.querySelectorAll("ul").item(6).children; // if not found , than try number 6 for  a mobile gui   

                }catch(error){
                    console.error("you are on mobile ")
                    listOfProducts = document.querySelectorAll("ul").item(2).children;
                }    
                console.log("listOfProducts length ", listOfProducts.length);
                console.log("listofProducts ", listOfProducts);
                for (let index = 0; index < listOfProducts.length; index++) {
                
                try{
                    // get the name of the product name
                    product = listOfProducts.item(index);
                    prodName = product.children[0].children[0].children[1].children[0].children[0].textContent.trim();
                    console.log("prodName loop: ", prodName, "prodNameString: ", prodNameString)
                    if (prodName == prodNameString){console.log("prodName found", prodName);return product;}
                }catch(error){
                    console.error("product or productName was not able to be retrieved from the product list ", error)
                }
 
                // continue the loop
                }
            }

            let clickThroughPriceTiersBtn = (product)=>{
                // click on the details pricing and wait for the modal to show up
                console.log("clickThroughPriceTiersBtn product ", product );
                let detailPricingButton = null;
                let lowestPriceButton = null;
                let priceTiersButton = null;
                try{
                    detailPricingButton = product.children[0].children[0].children[3].children[0];
                } catch(error){
                    console.error("detailPricingButton was not available", error )
                    console.log("product", product);
                    console.log("detailPricingButton", product.children[0].children[0].children[3].children[0]);
                    detailPricingButton = product;
                }
                detailPricingButton.click();

                try{
                    lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[2].children[0].children[0];
                }catch(error){
                    console.error("it is running on a mobile gui, no lowestPriceButton available on non mobile gui ", error);
                    console.log("product", product);
                    console.log("lowestPriceButton", product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[2].children[0].children[0]);

                    // its mobile gui
                    lowestPriceButton = product.children[0].children[0].children[3].children[1].children[0].children[1].children[0].children[0].children[0].children[0].children[2];
                }
                lowestPriceButton.click();
                
                try{ 
                    priceTiersButton = product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0];
                    // console.log("priceTiersButton", priceTiersButton);
                }catch(error){
                    console.error("priceTierButton was not available, ", error);
                    console.log("product", product);
                    console.log("priceTiersButton", product.children[0].children[1].children[0].children[1].children[0].children[0].children[4].children[0]);
                    priceTiersButton = product;
                }
                priceTiersButton.click();

            }

            let numberOfClicksLoadButton = ${numClkLoadBtn};
            let numberOfCLicksLoadMoreProductsMax = ${numberClickOfLoadMoreProductsMax};
            
            let buttonObserver = new MutationObserver((mutations, obs)  =>{
                loadMoreBtn = document.querySelectorAll("${loadMoreButtonSelector}").item(0);
                if(loadMoreBtn){
                    if(numberOfClicksLoadButton >= numberOfCLicksLoadMoreProductsMax){
                        console.log("numberOfClicksLoadButton: ", numberOfClicksLoadButton, " >= ", " numberClickOfLoadMoreProducts: ", numberOfCLicksLoadMoreProductsMax);

                        obs.disconnect(); 
                        console.log("prodName observer", prodName)
                        let foundProductHE = findProductHE(prodName);
                        console.log("foundProductHE", foundProductHE);
                        clickThroughPriceTiersBtn(foundProductHE);
                        let modalPriceObserver = new MutationObserver((mutation, obs)=>{
                            let buyBtn = document.querySelectorAll("${buyBtn}").item(0);
                            let nextBtn = document.querySelectorAll("${nextBtn}").item(0);
                            let quantityBtn = document.querySelectorAll("${quantityBtn}").item(0);
                            let amountInput = document.querySelectorAll("${amountInput}").item(0);
                            let nextBtn2 = document.querySelectorAll("${nextBtn2}").item(0);
                            console.log("amountInput",amountInput, "prodQty", prodQty)
                            try{
                                if(buyBtn)buyBtn.click();
                                if(nextBtn)nextBtn.click();
                                if(quantityBtn)quantityBtn.click();
                                if(amountInput){let input = document.createElement("textarea"); input.value= "type in this number: ".concat(prodQty); amountInput.appendChild(input);  obs.disconnect()};
                                //if(nextBtn2){nextBtn2.click(); obs.disconnect()} // cannot place this line because the input box previously does not allow a change in inputvalue

                            }catch (error){
                                console.error("was not able to click on the modal buttons", error);
                            }    

                        });
                        let modalRoot= document.querySelectorAll("${rootModalSelector}").item(0);
                        modalPriceObserver.observe(modalRoot, {childList:true, subtree:true})
                        
                        return;
                    }
                }
                
            loadProducts();
            });

            buttonObserver.observe(modalRoot, {childList:true, subtree:true});
            modalRoot.click();
            `;
        }

        console.log("prodSelected", prodSelected)
        let newTab = window.open(nextLink,"_blank");
        newTab.onload = () =>{
            setTimeout(()=>{
                let script = newTab.document.createElement('script');
                script.type = "text/javascript";
                script.innerHTML  = ProdNameQtyToTab(prodSelected.prodName.trim(), prodSelected.prodQuantity.trim()); //prodSelected
                newTab.document.body.appendChild(script);
            }, 1000);

        }

    });

    let prdNotInListTextArea = document.createElement("textarea");
    prdNotInListTextArea.setAttribute("id", "prodsNotInMyList");
     Object.assign(prodStackTextArea.style, { width: "70%", height: "100px" });
    let prdNotInListBtn = document.createElement("input");
    prdNotInListBtn.setAttribute("id", "prdNotInListBtn");
    prdNotInListBtn.setAttribute("type", "button");
    prdNotInListBtn.setAttribute("value", "notProdList");
    
    prdNotInListBtn.addEventListener("click", ()=>{
        if(!prodsNotInMyList.length){
            alert("the list is empty please load products");
            return;
        }
        document.getElementById("prodsNotInMyList").value = prodsNotInMyList.map((prod)=>prod.concat("\n")).toString();
    })

    div1.prepend(prdNotInListBtn);
    div1.prepend(prdNotInListTextArea);
    div1.prepend(loadAllProductButton);
    div1.prepend(refreshButton);
    div1.prepend(loadProductButton);
    div2.prepend(getPricesButton);
    div2.prepend(getTextArea);
    div2.prepend(prodStackBtn);
    div2.prepend(prodStackTextArea);
    div2.prepend(submitProdNamesButton);
    div2.prepend(submitText);

    mainForm.prepend(div1);
    mainForm.prepend(div2);
    let root = document.getElementById("root");
    root.prepend(mainForm);