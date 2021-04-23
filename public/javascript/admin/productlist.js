const product = $(".product-table");
const category = $(".category");
const searchbox = $(".productsearch");

function renderCategory(doc){
    let option = document.createElement('option');
    option.textContent = doc.data().category;
    option.value = doc.data().category;
    category.append(option);
}

firestore.collection("Category").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCategory(doc);
    })
})

function renderProduct(doc){
let product_div = document.createElement('div');
let prod_img = document.createElement('img'); 
let prodname = document.createElement('p');
let brandname = document.createElement('p');
let formulation = document.createElement('p');
let price = document.createElement('p');

prodname.textContent = doc.data().productname;
brandname.textContent = doc.data().brandname;
formulation.textContent = doc.data().formulation;
price.textContent = "P " + parseFloat(doc.data().price).toFixed(2);
prod_img.src = doc.data().image;
prod_img.width = "150";
prod_img.height = "150";

product_div.setAttribute('id', doc.data().code);
product_div.setAttribute('data-category', doc.data().category);
product_div.setAttribute('data-productname', doc.data().productname);
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
firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderProduct(doc);
    })
})
//EVENTLISTENER FOR CATEGORY----------------------------------------------------------------------------------
category.change(() => {
    searchbox.val("");
    product.empty();
    let categoryText = $(".category").val();
    if(categoryText == "All"){
        firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }
    else
    {
        firestore.collection("Product").where('category','==',`${categoryText}`).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }
})

//EVENTLISTENER FOR SEARCHBOX KEYUP--------------------------------------------------------------------------------------------------
searchbox.keyup((event) => {
    let searchdata = event.target.value;
    product.empty();
    if(searchdata.length == 0)
    {
        product.empty();
        firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }
    else{
        const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
        let words = searchdata.split(' ').map(capSearch);
        let fsearchdata = words.join(' ');
        firestore.collection("Product").where('productname',">=",`${fsearchdata}`).orderBy("productname","asc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                product.empty();
                renderProduct(doc);
            })
        })
    }
})

//EVENTLISTENER FOR SEARCHBOX FOCUS------------------------------------------------------------------------------------------------
searchbox.focus(() => {
    category.val("All");
    product.empty();
    firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderProduct(doc);
        })
    })
})

//EVENTLISTENER FOR PRODUCT VIEW ALL INFO------------------------------------------------------------------------------------------------
product.click( (e) => {
$(".productdata-edit").css("display","none");
let product_id = e.target.id;
let product_data = {};
try{
    let productref = firestore.collection("Product").doc(`${product_id}`);
    productref.get().then((doc) => {
        productdata(doc);
        });
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
        const productdata = (doc) => {
        product_data.code = doc.data().code;
        product_data.productname = doc.data().productname;
        product_data.brandname = doc.data().brandname;
        product_data.category = doc.data().category;
        product_data.expirationdate = doc.data().expirationdate;
        product_data.formulation = doc.data().formulation;
        product_data.image = doc.data().image;
        product_data.price = doc.data().price;
        product_data.status = doc.data().status;
        product_data.stocks = doc.data().stocks;
        product_data.unit = doc.data().unit;
        product_data.prescription = doc.data().prescription;
        $(".productcode-data").text(`Product Code: ${product_data.code}`);
        $(".productdata-image").attr("src",product_data.image);
        $(".productdata-name").text(product_data.productname);
        $(".productdata-category").text(product_data.category);
        $(".productdata-brandname").text(product_data.brandname);
        $(".productdata-expirationdate").text(product_data.expirationdate);
        $(".productdata-formulation").text(product_data.formulation);
        $(".productdata-price").text(product_data.price.toFixed(2));
        $(".productdata-stocks").text(`${product_data.stocks} ${product_data.unit}`);
        $(".productdata-prescription").text(`${product_data.prescription}`);
        }
}
catch(err){}
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
    firestore.collection("Category").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let option = document.createElement('option');
            option.textContent = doc.data().category;
            option.value = doc.data().category;
            $(".productdataedit-category").append(option);
        })
    })
    firestore.collection("Brandname").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let option = document.createElement('option');
            option.textContent = doc.data().brandname;
            option.value = doc.data().brandname;
            $(".productdataedit-brandname").append(option);
        })
    })
    let code = productcode.substring(14);
    let obj = {};
    let productref = firestore.collection("Product").doc(`${code}`);
    productref.get().then((doc) => {
        productdata(doc);
        });
    const productdata = (doc) => {
        obj.code = doc.data().code;
        obj.productname = doc.data().productname;
        obj.brandname = doc.data().brandname;
        obj.category = doc.data().category;
        obj.expirationdate = doc.data().expirationdate;
        obj.formulation = doc.data().formulation;
        obj.image = doc.data().image;
        obj.price = parseFloat(doc.data().price).toFixed(2);
        obj.status = doc.data().status;
        obj.stocks = doc.data().stocks;
        obj.unit = doc.data().unit;
        obj.prescription = doc.data().prescription;
        $(".productdataedit-name").val(obj.productname);
        $(".productdataedit-category").val(obj.category);
        $(".productdataedit-brandname").val(obj.brandname);
        $(".productdataedit-formulation").val(obj.formulation);
        $(".productdataedit-price").val(obj.price);
        $(".productdataedit-prescription").val(obj.prescription);
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
    let price = parseFloat($(".productdataedit-price").val());
    let prescription = $(".productdataedit-prescription").val();
    let expiration = $(".productdata-expirationdate").text();
    let code = $(".productcode-data").text().substring(14);

    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let words = productname.split(' ').map(capSearch);
    productname = words.join(' ');

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
        firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        });
    }
    const ProductExist = () => {
       let productref =  firestore.collection("Product").where("code","!=",`${code}`).where("productname","==",`${productname}`).where("category","==",`${category}`).where("brandname","==",`${brandname}`).where("formulation","==",`${formulation}`).where("price","==",price).where("expirationdate","==",`${expiration}`);
       
       productref.get().then(doc => {
        if(!doc.empty){
            swal("ERROR", "Product is already exist", "error");
        }
        else{
            updateproduct();
        }
       });
    }
    (productname == "" || formulation == "" || price == "") ? swal("ERROR", "Fill up all the fields", "error") : ProductExist();
}