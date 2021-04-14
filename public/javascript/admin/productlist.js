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
        firestore.collection("Product").orderBy('category').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }
    else{
        const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
        let words = searchdata.split(' ').map(capSearch);
        let fsearchdata = words.join(' ');
        firestore.collection("Product").where('productname',">=",`${fsearchdata}`).limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
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
let product_id = e.target.id;
let product_data = {};
let productref = firestore.collection("Product").doc(`${product_id}`);
productref.get().then((doc) => {
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
    });
});