const product = $(".product-table");
const category = $(".category");
const searchbox = $(".productsearch");

const renderProductArray = (Acode,Aproductname,Acategory,Abrandname,Aformulation,Aprice,Aimage) => {
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
    product.append(product_div);
}

const renderProductLoop = () => {
    for(let i = 0; i < ArrayGetAllProduct.length;i++){
        let code = ArrayGetAllProduct[i].code;
        let productname = ArrayGetAllProduct[i].productname;
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let formulation = ArrayGetAllProduct[i].formulation;
        let price = ArrayGetAllProduct[i].price;
        let image = ArrayGetAllProduct[i].image;
        renderProductArray(code,productname,category,brandname,formulation,price,image);
    }
}

//EVENTLISTENER FOR CATEGORY----------------------------------------------------------------------------------
category.change(() => {
    searchbox.val("");
    product.empty();
    let categoryText = $(".category").val();
    if(categoryText == "All"){
        renderProductLoop();
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
            category == categoryText ? renderProductArray(code,productname,category,brandname,formulation,price,image) : null;
        }
    }
})

//EVENTLISTENER FOR SEARCHBOX KEYUP--------------------------------------------------------------------------------------------------
searchbox.keyup((event) => {
    let searchdata = event.target.value;
    product.empty();
    if(searchdata.length == 0)
    {
        product.empty();
        renderProductLoop();
    }
    else{
        try{
            const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
            let words = searchdata.split(' ').map(capSearch);
            let fsearchdata = words.join(' ');

            const renderSearchProduct = (code,productname,category,brandname,formulation,price,image) => {
                product.empty();
                renderProductArray(code,productname,category,brandname,formulation,price,image);
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
                existProduct != -1 ? renderSearchProduct(code,productname,category,brandname,formulation,price,image) : null;
            }
        }
        catch{}
    }
})

//EVENTLISTENER FOR SEARCHBOX FOCUS------------------------------------------------------------------------------------------------
searchbox.focus(() => {
    category.val("All");
    product.empty();
    renderProductLoop();
})

//EVENTLISTENER FOR PRODUCT VIEW ALL INFO------------------------------------------------------------------------------------------------
product.click( (e) => {
$(".productdata-edit").css("display","none");
$(".productdata-info").css("display","flex");
let product_id = e.target.id;

    const productdata = (code,productname,brandname,category,expirationdate,formulation,image,price,status,stocks,unit,prescription) => {
        $(".productcode-data").text(`Product Code: ${code}`);
        $(".productdata-image").attr("src",image);
        $(".productdata-name").text(productname);
        $(".productdata-category").text(category);
        $(".productdata-brandname").text(brandname);
        $(".productdata-expirationdate").text(expirationdate);
        $(".productdata-formulation").text(formulation);
        $(".productdata-price").text(parseFloat(price).toFixed(2));
        $(".productdata-stocks").text(`${stocks} ${unit}`);
        $(".productdata-prescription").text(`${prescription}`);
        }
        
    for(let i = 0; i < ArrayGetAllProduct.length;i++){
        let code = ArrayGetAllProduct[i].code;
        let productname = ArrayGetAllProduct[i].productname;
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let formulation = ArrayGetAllProduct[i].formulation;
        let price = ArrayGetAllProduct[i].price;
        let image = ArrayGetAllProduct[i].image;
        let expirationdate = ArrayGetAllProduct[i].expirationdate;
        let status = ArrayGetAllProduct[i].status;
        let stocks = ArrayGetAllProduct[i].stocks;
        let unit = ArrayGetAllProduct[i].unit;
        let prescription = ArrayGetAllProduct[i].prescription;
        code == product_id ? productdata(code,productname,brandname,category,expirationdate,formulation,image,price,status,stocks,unit,prescription) : null;
    }
    const body = document.body;
    body.scrollTo = 0;
    document.documentElement.scrollTop = 0;
    let scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    let html = jQuery('html');
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
    $(".product-info").css({"display":"flex"});
});
//EVENTLISTENER FOR SIDEMENU------------------------------------------------------------------------------------------------
const enablescroll = () => {
    try{
        let html = jQuery('html');
        let scrollPosition = html.data('scroll-position');
        html.css('overflow', html.data('previous-overflow'));
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }
    catch(err){
    }
}
$(".sidemenu").click(() => {
    enablescroll();
});
//EVENTLISTENER FOR EDIT BUTTON PRODUCT VIEW------------------------------------------------------------------------------------------------
$(".editbtn-info").click(() => {
    let productcode = $(".productcode-data").text();
    $(".productdata-info").css("display","none");
    $(".productdata-edit").css("display","flex");
    $(".datacss").css({"width":"100%"});
    $(".productdataedit-category").empty();
    $(".productdataedit-brandname").empty();
    let renderCategoryArray = [];
    let renderBrandnameArray = [];

    for(let i = 0; i < ArrayGetAllProduct.length; i++){
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let existCategory = renderCategoryArray.includes(category);
        let existBrandname = renderBrandnameArray.includes(brandname);

        !existCategory ? renderCategoryArray.push(category) : null;
        !existBrandname ? renderBrandnameArray.push(brandname) : null;
    }
    for(let a = 0; a < renderCategoryArray.length;a++){
        let option = document.createElement('option');
        option.textContent = renderCategoryArray[a];
        option.value = renderCategoryArray[a];
        $(".productdataedit-category").append(option);
    }
    for(let b = 0; b < renderBrandnameArray.length;b++){
        let option = document.createElement('option');
        option.textContent = renderBrandnameArray[b];
        option.value = renderBrandnameArray[b];
        $(".productdataedit-brandname").append(option);
    }

    let code = productcode.substring(14);
    const productdata = (productname,category,brandname,formulation,price,prescription) => {
        $(".productdataedit-name").val(productname);
        $(".productdataedit-category").val(category);
        $(".productdataedit-brandname").val(brandname);
        $(".productdataedit-formulation").val(formulation);
        $(".productdataedit-price").val(parseFloat(price).toFixed(2));
        $(".productdataedit-prescription").val(prescription);
    }    
    for(let i = 0; i < ArrayGetAllProduct.length;i++){
        let Acode = ArrayGetAllProduct[i].code;
        let productname = ArrayGetAllProduct[i].productname;
        let category = ArrayGetAllProduct[i].category;
        let brandname = ArrayGetAllProduct[i].brandname;
        let formulation = ArrayGetAllProduct[i].formulation;
        let price = ArrayGetAllProduct[i].price;
        let prescription = ArrayGetAllProduct[i].prescription;
        Acode == code ? productdata(productname,category,brandname,formulation,price,prescription) : null;
    }
});
//EVENTLISTENER FOR CLOSE BUTTON PRODUCT VIEW------------------------------------------------------------------------------------------------
$(".closebtn-info").click(() => {
    enablescroll();
    $(".product-info").css("display","none");
    $(".productdata-info").css("display","flex");
    $(".productdata-edit").css("display","none");
    $(".uploadimage").val("");
});

//EVENT FOCUS FOR UPDATE PRODUCT------------------------------------------------------------------------
const decimalprice = () => {
    let price =  $(".productdataedit-price").val();
    if(price == "")
    {
        price = 0;
    }
    $(".productdataedit-price").val(parseFloat(price).toFixed(2));
}
$(".productdataedit-name").focus(() => {
    decimalprice();
});
$(".productdataedit-category").focus(() => {
    decimalprice();
});
$(".productdataedit-brandname").focus(() => {
    decimalprice();
});
$(".productdataedit-formulation").focus(() => {
    decimalprice();
});
$(".productdataedit-price").focus(() => {
    decimalprice();
});
$(".productdataedit-prescription").focus(() => {
    decimalprice();
});
//CLICK EVENT FOR CHANGE IMAGE OF PRODUCT--------------------------------------------------------------
$(".changebtn").click(() => {
    try{
        $(".uploadimage").trigger("click");
        $(".uploadimage").change((e) => {
            let image = URL.createObjectURL(e.target.files[0]);
            $("#editimage").attr("src",image);
        });
    }
    catch(err){}
});
//CLICK EVENT FOR SAVE PRODUCT DATA----------------------------------------------------------------------
$(".productedit-save").click(() => {
    try{
        let file = $(".uploadimage").get(0).files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            updateproduct(reader.result);
        }
    }
    catch(err){
        let image =  $(".productdata-image").attr("src");
        updateproduct(image);
    }
});
//METHOD FOR UPDATING PRODUCT--------------------------------------------------------------------
const updateproduct = (imagebase64) => {
    let productname = $(".productdataedit-name").val();
    let category = $(".productdataedit-category").val();
    let brandname = $(".productdataedit-brandname").val();
    let formulation = $(".productdataedit-formulation").val();
    let price = parseFloat($(".productdataedit-price").val()).toFixed(2);
    let prescription = $(".productdataedit-prescription").val();
    let expiration = $(".productdata-expirationdate").text();
    let code = $(".productcode-data").text().substring(14);

    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let words = productname.split(' ').map(capSearch);
    productname = words.join(' ');

    let w_formulation = formulation.split(' ').map(capSearch);
    formulation = w_formulation.join(' ');

    const updateproduct = () => {
        firestore.collection("Product").doc(code).update({
            image: imagebase64,
            productname: productname,
            category: category,
            brandname: brandname,
            formulation: formulation,
            price: price,
            prescription: prescription
        });
        swal("PRODUCT UPDATED", `${productname} information successfully updated`, "success");
        $(".product-info").css("display","none");
        $(".productdata-info").css("display","flex");
        enablescroll();
        product.empty();
        for(let i = 0; i < ArrayGetAllProduct.length;i++){
            let Acode =  ArrayGetAllProduct[i].code;
            if(Acode == code){
                ArrayGetAllProduct[i].image = imagebase64;
                ArrayGetAllProduct[i].productname = productname;
                ArrayGetAllProduct[i].category = category;
                ArrayGetAllProduct[i].brandname = brandname;
                ArrayGetAllProduct[i].formulation = formulation;
                ArrayGetAllProduct[i].price = price;
                ArrayGetAllProduct[i].prescription = prescription;
            }  
        }
        renderProductLoop();
    }
    const ProductExist = () => {
        let ctrExist = 0;
        for(let i = 0; i < ArrayGetAllProduct.length;i++){
            let Acode =  ArrayGetAllProduct[i].code;
            let Aproductname =  ArrayGetAllProduct[i].productname;
            let Acategory =  ArrayGetAllProduct[i].category;
            let Abrandname =  ArrayGetAllProduct[i].brandname;
            let Aformulation =  ArrayGetAllProduct[i].formulation;
            let Aprescription =  ArrayGetAllProduct[i].prescription;
            let Aprice =  parseFloat(ArrayGetAllProduct[i].price).toFixed(2);
            let Aexpirationdate =  ArrayGetAllProduct[i].expirationdate;
            let Astatus = ArrayGetAllProduct[i].status;

            let ExistProduct = (Acode != code) && (Aproductname == productname) && (Acategory == category) && (Abrandname == brandname) && (Aformulation == formulation) && (Aprescription == prescription) && (Aprice == price) && (Aexpirationdate == expiration) && (Astatus == 'active');

            ExistProduct ? ctrExist++ : null;
    }
        ctrExist != 0 ? swal("ERROR", "Product is already exist", "error") : updateproduct();
    }
    (productname == "" || formulation == "" || price == "") ? swal("ERROR", "Fill up all the fields", "error") : ProductExist();
}