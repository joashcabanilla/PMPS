const StaffrenderProductArray = (Acode,Aproductname,Acategory,Abrandname,Aformulation,Aprice,Aimage) => {
    let product_div = document.createElement('div');
    let prod_img = document.createElement('img'); 
    let prodname = document.createElement('p');
    let brandname = document.createElement('p');
    let formulation = document.createElement('p');
    let price = document.createElement('p');
    
    prodname.textContent = Aproductname;
    brandname.textContent = Abrandname;
    formulation.textContent = Aformulation;
    price.textContent = "P " + parseFloat(Aprice).toFixed(2);
    prod_img.src = Aimage;
    prod_img.width = "150";
    prod_img.height = "150";
    
    product_div.setAttribute('id', Acode);
    product_div.setAttribute('data-category', Acategory);
    product_div.setAttribute('data-productname', Aproductname);
    prod_img.setAttribute('class',"product-img");
    product_div.setAttribute('class', "product-item");
    prodname.setAttribute('class',"product-name");
    formulation.setAttribute('class',"product-formulation");
    price.setAttribute('class',"product-price");
    brandname.setAttribute('class',"product-brandname");
    
    product_div.appendChild(prod_img);
    product_div.appendChild(prodname);
    product_div.appendChild(brandname);
    product_div.appendChild(formulation);
    product_div.appendChild(price);
    $(".staff-product-table").append(product_div);
}

const StaffrenderProductLoop = () => {
    for(let i = 0; i < ArrayGetAllProduct.length;i++){
        let code = ArrayGetAllProduct[i].code;
        let productname = ArrayGetAllProduct[i].productname;
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let formulation = ArrayGetAllProduct[i].formulation;
        let price = ArrayGetAllProduct[i].price;
        let image = ArrayGetAllProduct[i].image;
        StaffrenderProductArray(code,productname,category,brandname,formulation,price,image);
    }
}
let transactionID = 0;
firestore.collection("Sales").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        transactionID = doc.data().transactionID;
        transactionID++;
        $(".staff-TransactionID").text(`Transaction ID: ${transactionID}`);
        $(".staff-PR-TransactionID").text(`Transaction ID: ${transactionID}`);
    });
});

//SEARCH FOCUS
$(".staff-productsearch").focus(() => {
    $(".staff-category").val("All");
    $(".staff-product-table").empty;
    StaffrenderProductLoop();
    let product_array = [];
    for(let i = 0; i < ArrayGetAllProduct.length; i++){
        let productname = ArrayGetAllProduct[i].productname;
        let code = ArrayGetAllProduct[i].code;
        let existProductname = product_array.includes(productname);
        let existCode = product_array.includes(code);
    
        !existProductname ? product_array.push(productname) : null;
        !existCode ? product_array.push(code) : null;
    }
    $(".staff-productsearch").autocomplete({
        source: product_array,
        autoFocus: true,
        classes: {
        "ui-autocomplete": "highlight",
        },
    });
});

//SEARCH KEYUP
$(".staff-productsearch").keyup((event) => {
    $(".staff-category").val("All");
    $(".staff-product-table").empty;
    let searchdata = event.target.value;
    if(searchdata.length == 0)
    {
        $(".staff-product-table").empty();
        StaffrenderProductLoop();
    }
    else{
        try{
            const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
            let words = searchdata.split(' ').map(capSearch);
            let fsearchdata = words.join(' ');

            const renderSearchProduct = (code,productname,category,brandname,formulation,price,image) => {
                $(".staff-product-table").empty();
                StaffrenderProductArray(code,productname,category,brandname,formulation,price,image);
            }

            for(let i = 0; i < ArrayGetAllProduct.length;i++){
                let code = ArrayGetAllProduct[i].code;
                let productname = ArrayGetAllProduct[i].productname;
                let category = ArrayGetAllProduct[i].category;
                let brandname = ArrayGetAllProduct[i].brandname;
                let formulation = ArrayGetAllProduct[i].formulation;
                let price = ArrayGetAllProduct[i].price;
                let image = ArrayGetAllProduct[i].image;
                let existProduct = productname.search(fsearchdata);
                let existCode = code.search(fsearchdata);
                existProduct != -1 || existCode != -1 ? renderSearchProduct(code,productname,category,brandname,formulation,price,image) : null;
            }
        }
        catch{}
    }
});

//EVENTLISTENER FOR CATEGORY
$(".staff-category").change(() => {
    $(".staff-productsearch").val("");
    $(".staff-product-table").empty();
    let categoryText = $(".staff-category").val();
    if(categoryText == "All"){
        StaffrenderProductLoop();
    }
    else
    {
        for(let i = 0; i < ArrayGetAllProduct.length;i++){
            let code = ArrayGetAllProduct[i].code;
            let productname = ArrayGetAllProduct[i].productname;
            let category = ArrayGetAllProduct[i].category;
            let brandname = ArrayGetAllProduct[i].brandname;
            let formulation = ArrayGetAllProduct[i].formulation;
            let price = ArrayGetAllProduct[i].price;
            let image = ArrayGetAllProduct[i].image;
            category == categoryText ? StaffrenderProductArray(code,productname,category,brandname,formulation,price,image) : null;
        }
    }
});

let buyed_product = [];
let subtotal = 0;
let discount = 0;
let print_cash = 0;
let print_change = 0;
//PRODUCT CLICK EVENT
$(".staff-product-table").click(e => {
let id = e.target.id;
let productname = "";
let formulation = "";
let price = 0;
let available_stocks = 0;
for(let i = 0; i < ArrayGetAllProduct.length;i++){
    let code = ArrayGetAllProduct[i].code;
    let Aproductname = ArrayGetAllProduct[i].productname;
    let stocks = ArrayGetAllProduct[i].stocks;
    let Aprice = ArrayGetAllProduct[i].price;
    let Aformulation = ArrayGetAllProduct[i].formulation;
    id == code ? productname = Aproductname : null;
    id == code ? available_stocks = stocks : null;
    id == code ? price = Aprice : null;
    id == code ? formulation = Aformulation : null;
}
id != "" ? available_stocks == 0 ? swal("","Product Out Of Stocks","error") : swal(`${productname} Available Stocks: ${available_stocks}`,{
    content: {
      element: "input",
      attributes: {
        placeholder: "Enter Quantity",
        type: "number",
      },
    },
  }).then((value) => {
    let quantity = value;
    let total = quantity * price;
    const addproduct = () => {
        let table = $(".staff-receipt-table");
        if(buyed_product.length == 0){
            let td = `<tr class="${id}">
                        <td class="${id}-productname">${productname}</td>
                        <td class="${id}-quantity">@${quantity}</td>
                        <td class="${id}-total">${parseFloat(total).toFixed(2)}</td>
                        <td><button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                        border-radius: 8px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                        background: #b7dbed;
                        outline: none;
                        border-color: #b7dbed;" class="fas fa-trash fa-lg" id="${id}"></button></td>
                    </tr>`;
            table.append(td);
            let new_stock = available_stocks - quantity;
            firestore.collection("Product").doc(id).update({
                stocks: parseInt(new_stock),
            });
            for(let i = 0; i < ArrayGetAllProduct.length;i++){
                let code = ArrayGetAllProduct[i].code;
                id == code ? ArrayGetAllProduct[i].stocks = new_stock : null;
            }
            $(".staff-product-table").empty();
            $(".staff-productsearch").val("");
            $(".staff-category").val("All");
            StaffrenderProductLoop();
            let obj = {};
            obj.code = id;
            obj.productname = productname;
            obj.quantity = quantity;
            obj.total = total;
            obj.formulation = formulation;
            obj.price = price;
            buyed_product.push(obj);
            subtotal = subtotal + total;
            $(".staff-subtotal").text(`${parseFloat(subtotal).toFixed(2)}`);
        }
        else{
            let codeExist = 0;
            for(let i = 0; i < buyed_product.length;i++){
                let code = buyed_product[i].code;
                if(code == id){
                    codeExist++;
                }
            }
            if(codeExist != 0){
                subtotal = subtotal + total;
                $(".staff-subtotal").text(`${parseFloat(subtotal).toFixed(2)}`);
                let new_stock = available_stocks - quantity;
                firestore.collection("Product").doc(id).update({
                    stocks: parseInt(new_stock),
                });
                for(let i = 0; i < ArrayGetAllProduct.length;i++){
                    let code = ArrayGetAllProduct[i].code;
                    id == code ? ArrayGetAllProduct[i].stocks = new_stock : null;
                }
                $(".staff-product-table").empty();
                $(".staff-productsearch").val("");
                $(".staff-category").val("All");
                StaffrenderProductLoop();
                
                let old_quantity = $(`.${id}-quantity`).text();
                let new_quantity = parseInt(quantity) + parseInt(old_quantity.substring(1));
                let new_total = new_quantity * price;
                $(`.${id}-quantity`).text(`@${new_quantity}`);
                $(`.${id}-total`).text(`${parseFloat(new_total).toFixed(2)}`);

                for(let i = 0; i < buyed_product.length;i++){
                    let code = buyed_product[i].code;
                    code == id ? buyed_product[i].quantity = new_quantity : null;
                    code == id ? buyed_product[i].total = new_total : null;
                }
                
            }
            else{
                let td = `<tr class="${id}">
                <td class="${id}-productname">${productname}</td>
                <td class="${id}-quantity">@${quantity}</td>
                <td class="${id}-total">${parseFloat(total).toFixed(2)}</td>
                <td><button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                border-radius: 8px;
                box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                background: #b7dbed;
                outline: none;
                border-color: #b7dbed;" class="fas fa-trash fa-lg" id="${id}"></button></td>
            </tr>`;
                table.append(td);
                let new_stock = available_stocks - quantity;
                firestore.collection("Product").doc(id).update({
                    stocks: parseInt(new_stock),
                });
                for(let i = 0; i < ArrayGetAllProduct.length;i++){
                    let code = ArrayGetAllProduct[i].code;
                    id == code ? ArrayGetAllProduct[i].stocks = new_stock : null;
                }
                $(".staff-product-table").empty();
                $(".staff-productsearch").val("");
                $(".staff-category").val("All");
                StaffrenderProductLoop();
                let obj = {};
                obj.code = id;
                obj.productname = productname;
                obj.quantity = quantity;
                obj.total = total;
                obj.formulation = formulation;
                obj.price = price;
                buyed_product.push(obj);
                subtotal = subtotal + total;
                $(".staff-subtotal").text(`${parseFloat(subtotal).toFixed(2)}`);
            }
        }
    }
    quantity == 0 || quantity == null ? swal("","QUANTITY IS ZERO","error") : quantity > available_stocks ? swal("","INVALID QUANTITY","error") : addproduct(); 
  }) : null;
});

//RECEIPT TABLE DELETE PRODUCT
$(".staff-receipt-table").click(e => {
    let id = e.target.id;
    let existCode = 0;
    let productname = "";
    for(let i = 0; i < buyed_product.length; i++){
        let code = buyed_product[i].code;
        let Aproductname = buyed_product[i].productname;
        code == id ? existCode++ : null;
        code == id ? productname = Aproductname : null;
    }

    if(existCode != 0){
        swal(`ENTER ADMIN PASSWORD`,{
            content: {
              element: "input",
              attributes: {
                placeholder: "PASSWORD",
                type: "password",
              },
            },
          }).then((value) => {
            let password = CryptoJS.SHA3(value).toString();
            firestore.collection("Account").doc("sva1ootNyElZeI6XTHcS").get().then(doc => {
                if(password == doc.data().password){
                    let total = parseFloat($(`.${id}-total`).text());
                    subtotal = subtotal - total;
                    $(".staff-subtotal").text(`${parseFloat(subtotal).toFixed(2)}`);
                    let quantitytext = $(`.${id}-quantity`).text();
                    let quantity = parseInt(quantitytext.substring(1));
                    let available_stocks = 0;
                    for(let i = 0; i < ArrayGetAllProduct.length;i++){
                        let code = ArrayGetAllProduct[i].code;
                        let stocks = ArrayGetAllProduct[i].stocks;
                        id == code ? available_stocks = stocks : null;
                    }
                    let stocks = parseInt(available_stocks) + parseInt(quantity);
                    firestore.collection("Product").doc(id).update({
                        stocks: stocks
                    });
                    for(let i = 0; i < ArrayGetAllProduct.length;i++){
                        let code = ArrayGetAllProduct[i].code;
                        id == code ? ArrayGetAllProduct[i].stocks = stocks : null;
                    }
                    $(".staff-product-table").empty();
                    $(".staff-productsearch").val("");
                    $(".staff-category").val("All");
                    StaffrenderProductLoop();
                    $(`.${id}`).remove();
                    swal("",`${productname} Successlly Removed`,"success");
                }
                else{
                    swal("","INCORRECT ADMIN PASSWORD","error");
                }
            });
          });
    }
});

//CASH RECEIVED KEYUP
$(".staff-cash").keyup((e) => {
    let cash = e.target.value;
    let change = 0;
    let subtotal = parseFloat($(".staff-subtotal").text());
    
    if(subtotal == 0){
    swal("","SUBTOTAL VALUE NOT FOUND","error");
    $(".staff-cash").val("0.00");
    $(".staff-change").text("0.00");
    }
    else{
        change = cash - subtotal;
        if(change < 0){
            $(".staff-change").text("0.00");
        }
        else{
            $(".staff-change").text(parseFloat(change).toFixed(2));
        }
    }
    });

//PROCEED CLICK EVENT
$(".staff-proceedbtn").click(() => {
    const addzero_report = (num) => {
            return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    let date = addzero_report(now.getDate());
    let year = now.getFullYear();
    let new_date = `${month}/${date}/${year}`;

    let subtotal = parseFloat($(".staff-subtotal").text());
    let cash = parseFloat($(".staff-cash").val());
    let change = parseFloat($(".staff-change").text());

    if(subtotal == 0){
            swal("","SUBTOTAL VALUE NOT FOUND","error");
            $(".staff-cash").val("0.00");
            $(".staff-change").text("0.00");
    }
    else{
        if(subtotal > cash){
                    swal("","NOT ENOUGH CASH","error");
                    $(".staff-cash").val("0.00");
                    $(".staff-change").text("0.00");
        }
        else{
            let staffname = "ADMIN";
            firestore.collection("Sales").doc(`${transactionID}`).set({
                cash: cash,
                change: change,
                date: new_date,
                staffname: staffname,
                totalAmount: subtotal,
                transactionID: transactionID
            });
            for(let i = 0; i < buyed_product.length; i++){
                let formulation = buyed_product[i].formulation;
                let productname = buyed_product[i].productname;
                let quantity = buyed_product[i].quantity;
                let totalAmount = buyed_product[i].total;

                firestore.collection("SoldProduct").add({
                    formulation: formulation,
                    productname: productname,
                    quantity: parseInt(quantity),
                    totalAmount: totalAmount,
                    date: new_date
                });
                
                let td = `<tr>
                        <td>${productname}</td>
                        <td>@${quantity}</td>
                        <td>${parseFloat(totalAmount).toFixed(2)}</td>
                        </tr>`;
                $(".staff-PR-table").append(td);
            }
            print_cash = cash;
            print_change = change;
            $(".staff-totalAmount").text(`${parseFloat(subtotal).toFixed(2)}`);
            $(".staff-product-table").empty();
            $(".staff-productsearch").val("");
            $(".staff-category").val("All");
            StaffrenderProductLoop();
            $(".staff-receipt-table").empty();
            $(".staff-subtotal").text("");
            $(".staff-cash").val("");
            $(".staff-change").text("");
            $(".staff-div-receipt").css("display","none");
            $(".staff-div-print-receipt").css("display","flex");
        }
    }
});

//PRINT RECEIPT
$(".staff-printbtn").click(() => {
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let year = now.getFullYear();
    let hours = addzero_report(now.getHours());
    let mins = addzero_report(now.getMinutes());
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let report_date = `${month}/${date}/${year}`;
    let report_time = `${hours}:${mins} ${period}`;
    let staffname = "ADMIN";
    let array_data = [];
    let total_no_discount = 0;
    for(let i = 0; i < buyed_product.length; i++){
        let quantity = buyed_product[i].quantity;
        let productname = buyed_product[i].productname;
        let price = buyed_product[i].price;
        let total = buyed_product[i].total;
        total_no_discount = total_no_discount + parseFloat(total);
        array_data.push([productname,quantity,`@${parseFloat(price).toFixed(2)}`,parseFloat(total).toFixed(2)]);
    } 
    let doc = new jspdf.jsPDF('p','mm',[100,500]);
        const textcenter = (text) => {
            let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            return (doc.internal.pageSize.width - textWidth) / 2;
        };
    doc.setFont("Helvetica","bold");
    doc.setFontSize(20);
    doc.text("PHARMACY MANAGEMENT",textcenter("PHARMACY MANAGEMENT"), 12);
    doc.text("PROCESS SYSTEM",textcenter("PROCESS SYSTEM"),20);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transactionID}`,0,35);
    doc.text(`${report_date}`,80,35);
    doc.text(`Staff Name: ${staffname}`,0,40);
    doc.text(`${report_time}`,80,40);
    doc.autoTable({
            body: array_data,
            columns: [
                { header: "", dataKey: "" },
                { header: "", dataKey: "" },
                { header: "", dataKey: "" },
                { header: "", dataKey: "" },
            ],
            margin: {top: 55,left: -2,bottom: 10},
            bodyStyles: {lineColor: [0,0,0],halign: "left",valign: "middle",font: "helvetica",textColor: [0,0,0],fontSize: 12,fontStyle: "normal",fillColor: [255,255,255],lineColor: [0,0,0],lineWidth: 0},
            headStyles: {halign: "left",valign: "middle",font: "helvetica",textColor: [0,0,0],fontSize: 12,fontStyle: "bold",fillColor: [255,255,255],lineColor: [0,0,0],lineWidth: 0},
            theme: 'plain',
            tableWidth: 100,
            foot:[
                ["TOTAL AMOUNT:",`${parseFloat(total_no_discount).toFixed(2)}`],
                ["DISCOUNT:",`${parseFloat(discount).toFixed(2)}`],
                ["SUBTOTAL:",`${parseFloat(subtotal).toFixed(2)}`],
                ["CASH:",`${parseFloat(print_cash).toFixed(2)}`],
                ["CHANGE:",`${parseFloat(print_change).toFixed(2)}`]
            ]
        });
    doc.autoPrint();
    doc.output('dataurlnewwindow',`RECEIPT.pdf`);
    buyed_product.length = 0;
    subtotal = 0;
    discount = 0;
    print_cash = 0;
    print_change = 0;
    $(".staff-div-receipt").css("display","flex");
    $(".staff-div-print-receipt").css("display","none");

    transactionID = 0;
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            transactionID = doc.data().transactionID;
            transactionID++;
            $(".staff-TransactionID").text(`Transaction ID: ${transactionID}`);
            $(".staff-PR-TransactionID").text(`Transaction ID: ${transactionID}`);
        });
    });
});

//DISCOUNT BUTTON
$(".staff-discountbtn").click(() => {
    swal("SELECT DISCOUNT",{
        buttons:{
            SENIOR:{
                text: "SENIOR",
                value: "senior",
            },
            PWD:{
                text: "PWD",
                value: "pwd",
            },
        },
        }).then((value) => {
            let discount_percentage = 0;
            if(value != null){
                if(discount == 0){
                    firestore.collection("Vat").get().then(snapshot => {
                        snapshot.docs.forEach(doc =>{
                            if(value == "senior"){
                                discount_percentage = doc.data().senior;
                            }
                            else{
                                discount_percentage = doc.data().pwd;
                            }
                        });
                        discount = subtotal * discount_percentage;
                        subtotal = subtotal - discount;
                        $(".staff-subtotal").text(`${parseFloat(subtotal).toFixed(2)}`);
                        swal("",`${value} Discount successfully applied`,"success");
                    });
                }
                else{
                    swal("","DISCOUNT IS ALREADY APPLIED","success");
                }
            }
        });
    });