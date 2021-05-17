//ELEMENTS FOR PRODUCT STOCK STATUS-------------------------------------------------------------------------------
const pssStatus = $(".PSS-status");
const pssSearch = $(".PSS-search");
const pssGeneratebtn = $(".PSS-generatebtn");
const pssRemovebtn = $(".PSS-removebtn");
const pssExpired = $(".PSS-expired");
const pssTable = $(".PSS-table");
let pssArrayProduct = [];
let pssArrayStatus = ["Total Stocks Per Product","Low In Stocks","Out Of Stocks","Expired"];
let pssThTotal = `<tr>
                    <th>Code</th>
                    <th>Productname</th>
                    <th>Category</th>
                    <th>Brandname</th>
                    <th>Formulation</th>
                    <th>Price</th>
                    <th>Stocks</th>
                </tr>`;
let pssThExpired = `<tr>
                    <th>Code</th>
                    <th>Productname</th>
                    <th>Category</th>
                    <th>Brandname</th>
                    <th>Formulation</th>
                    <th>Expiration Date</th>
                    <th>Button</th>
                </tr>`;
// //CHANGE EVENTLISTENER FOR PRODUCT STOCK STATUS SELECT ELEMENTS-------------------------------------------------
// pssStatus.change(() => {
// let status = pssStatus.val();
// pssSearch.val("");
// pssTable.empty();

// let arrayStatus = ["Total Stocks Per Product","Low In Stocks","Out Of Stocks","Expired"];
// let thTotal = `<tr>
//                     <th>Code</th>
//                     <th>Productname</th>
//                     <th>Category</th>
//                     <th>Brandname</th>
//                     <th>Formulation</th>
//                     <th>Price</th>
//                     <th>Stocks</th>
//                 </tr>`;
// let thExpired = `<tr>
//                     <th>Code</th>
//                     <th>Productname</th>
//                     <th>Category</th>
//                     <th>Brandname</th>
//                     <th>Formulation</th>
//                     <th>Expiration Date</th>
//                     <th>Button</th>
//                 </tr>`;

// const statusGetProduct = (status,header,removebtn) => {
//     pssTable.append(header);
//     removebtn == "true" ? pssRemovebtn.attr("disabled",true) : pssRemovebtn.removeAttr("disabled");

//     firestore.collection("Product").get().then(snapshot => {
//         snapshot.docs.forEach(doc => {
            // let tdTotal = `<tr>
            //                     <td>${doc.data().code}</td>
            //                     <td>${doc.data().productname}</td>
            //                     <td>${doc.data().category}</td>
            //                     <td>${doc.data().brandname}</td>
            //                     <td>${doc.data().formulation}</td>
            //                     <td style="text-align:center;">${parseFloat(doc.data().price).toFixed(2)}</td>
            //                     <td style="text-align:center;">${doc.data().stocks} ${doc.data().unit}</td>
            //             </tr>`;

//             let tdOutStocks = `<tr>
//                                 <td>${doc.data().code}</td>
//                                 <td>${doc.data().productname}</td>
//                                 <td>${doc.data().category}</td>
//                                 <td>${doc.data().brandname}</td>
//                                 <td>${doc.data().formulation}</td>
//                                 <td style="text-align:center;">${parseFloat(doc.data().price).toFixed(2)}</td>
//                                 <td style="text-align:center;">Out Of Stocks</td>
//                         </tr>`;

//             let tdExpired = `<tr>
//                                 <td>${doc.data().code}</td>
//                                 <td>${doc.data().productname}</td>
//                                 <td>${doc.data().category}</td>
//                                 <td>${doc.data().brandname}</td>
//                                 <td>${doc.data().formulation}</td>
//                                 <td>${doc.data().expirationdate.toUpperCase()}</td>
//                                 <td style="text-align:center;"><button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
//                                 border-radius: 8px;
//                                 box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
//                                 background: #b7dbed;
//                                 outline: none;
//                                 border-color: #b7dbed;" class="fas fa-trash fa-lg" id="${doc.data().code}"></button></td>
//                         </tr>`;

//             switch(status){
//                 case arrayStatus[0]: 
//                     doc.data().stocks != 0 ? pssTable.append(tdTotal) : null;
//                 break;
                        
//                 case arrayStatus[1]:
//                     doc.data().stocks != 0 && doc.data().stocks <= 5 ? pssTable.append(tdTotal) : null;
//                 break;
                        
//                 case arrayStatus[2]:
//                     doc.data().stocks == 0 ? pssTable.append(tdOutStocks) : null;
//                 break;
                        
//                 case arrayStatus[3]:
//                     doc.data().expirationdate == "expired" ? pssTable.append(tdExpired) : null;
//                 break;
//             }
//         });
//     });
// }
// switch(status){
//     case arrayStatus[0]:    
//         statusGetProduct(arrayStatus[0],thTotal,"true");
//     break;

//     case arrayStatus[1]:
//         statusGetProduct(arrayStatus[1],thTotal,"true");
//     break;

//     case arrayStatus[2]:
//         statusGetProduct(arrayStatus[2],thTotal,"true");
//     break;

//     case arrayStatus[3]:
//         statusGetProduct(arrayStatus[3],thExpired,"false");
//     break;
// }
// });

// //FOCUS EVENTLISTENER SEARCH------------------------------------------------------------------------------------
// const pssTotalStocks = () => {
//     pssTable.empty();
//     pssStatus.val("Total Stocks Per Product");
//     let th = `<tr>
//                 <th>Code</th>
//                 <th>Productname</th>
//                 <th>Category</th>
//                 <th>Brandname</th>
//                 <th>Formulation</th>
//                 <th>Price</th>
//                 <th>Stocks</th>
//             </tr>`;
//     pssTable.append(th);

//     firestore.collection("Product").get().then(snapshot => {
//         snapshot.docs.forEach(doc => {
//             let td = `<tr>
//                             <td>${doc.data().code}</td>
//                             <td>${doc.data().productname}</td>
//                             <td>${doc.data().category}</td>
//                             <td>${doc.data().brandname}</td>
//                             <td>${doc.data().formulation}</td>
//                             <td style="text-align:center;">${parseFloat(doc.data().price).toFixed(2)}</td>
//                             <td style="text-align:center;">${doc.data().stocks} ${doc.data().unit}</td>
//                     </tr>`;
//             pssTable.append(td);
//         });
//     });
// }
// pssSearch.focus(() => {
//     pssTotalStocks();
// });

// //KEYUP EVENTLISTENER SEARCH------------------------------------------------------------------------------------
// const pssSearchMethod = (searchdata) => {
// if(searchdata.length == 0){
//     pssTotalStocks();
// }
// else{
//     try {
//         const capSearch = (str) =>
//           str[0].toUpperCase() + str.slice(1).toLowerCase();
//         let words = searchdata.split(" ").map(capSearch);
//         searchdata = words.join(" ");
//       } catch {}
// }
// }
// pssSearch.keyup((e) => {
//     let searchdata = e.target.value;
//     pssSearchMethod(searchdata);
// });

//TABLE DATA FORMAT FUNCTION FOR TOTAL STOCKS------------------------------------------------------------------
// const pssTdTotal = (doc) => {
//     return `<tr>
//     <td>${doc.data().code}</td>
//     <td>${doc.data().productname}</td>
//     <td>${doc.data().category}</td>
//     <td>${doc.data().brandname}</td>
//     <td>${doc.data().formulation}</td>
//     <td style="text-align:center;">${parseFloat(doc.data().price).toFixed(2)}</td>
//     <td style="text-align:center;">${doc.data().stocks} ${doc.data().unit}</td>
// </tr>`;
// }

// //FIRESTORE GET ALL PRODUCT FUNCTION----------------------------------------------------------------------------
const pssGetProduct = (event) => {
    for(let i = 0; i < ArrayGetAllProduct.length;i++){

        let code = ArrayGetAllProduct[i].code;
        let productname = ArrayGetAllProduct[i].productname;
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let formulation = ArrayGetAllProduct[i].formulation;
        let price = ArrayGetAllProduct[i].price;
        let stocks = ArrayGetAllProduct[i].stocks;
        let unit = ArrayGetAllProduct[i].unit;

        switch(event){
            case "SearchFocus":
                pssAutoCompleteSearch(code,productname);
                let td = pssTdTotalStocks(code,productname,category,brandname,formulation,price,stocks,unit);
                parseInt(stocks) != 0 ? pssTable.append(td) : null;
            break;
        }
    }
}

//AUTOCOMPLETE SEARCH FUNCTION---------------------------------------------------------------------------------
const pssAutoCompleteSearch = (code,productname) => {
    pssArrayProduct.push(code);
    pssArrayProduct.push(productname);
    pssSearch.autocomplete({
    source: pssArrayProduct,
    autoFocus: true,
    classes: {
    "ui-autocomplete": "highlight",
    },
});
}

//RESET PRODUCT STOCKS STATUS----------------------------------------------------------------------------------
const pssResetfunc = (status,header,removebtn,clearSearch) => {
    pssStatus.val(status);
    pssTable.empty();
    pssTable.append(header);
    removebtn ? pssRemovebtn.attr("disabled",true) : pssRemovebtn.removeAttr("disabled");
    clearSearch ? pssSearch.val("") : null;
}

//TABLE DATA FUNCTION FOR TOTAL STOCKS-------------------------------------------------------------------------
const pssTdTotalStocks = (code,productname,category,brandname,formulation,price,stocks,unit) => {
   return `<tr>
        <td>${code}</td>
        <td>${productname}</td>
        <td>${category}</td>
        <td>${brandname}</td>
        <td>${formulation}</td>
        <td style="text-align:center;">${parseFloat(price).toFixed(2)}</td>
        <td style="text-align:center;">${stocks} ${unit}</td>
        </tr>`;
}


//SEARCH FOCUS EVENTLISTENER------------------------------------------------------------------------------------
pssSearch.focus(() => {
    pssResetfunc(pssArrayStatus[0],pssThTotal,true,false);
    pssGetProduct("SearchFocus");
});