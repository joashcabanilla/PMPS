const category = document.querySelector('#category');
const product = document.querySelector('#product');
const searchbox = document.querySelector('.searchbox');

function renderCategory(doc){
    let option = document.createElement('option');
    option.textContent = doc.data().category;
    option.value = doc.data().category;
    category.appendChild(option);
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

product_div.setAttribute('data-id', doc.id);
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
product.appendChild(product_div);
}

firestore.collection("Product").orderBy('category').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderProduct(doc);
    })
})

//EVENTLISTENER FOR CATEGORY----------------------------------------------------------------------------------
category.addEventListener("change", () => {
    searchbox.value = "";
    let categoryText = category.options[category.selectedIndex].value;
    const allproduct = document.querySelectorAll('.product-item');
    let productnumber = allproduct.length;
    
    for(let i = 0; i < productnumber; i++ ){

        let prodCategory = allproduct.item(i).dataset.category;
        let product_category = document.querySelector(`[data-category="${prodCategory}"`);
        if(categoryText == 'All'){
            product_category.style.display = "flex";
        }
        else{
            if(prodCategory == categoryText){
                product_category.style.display = "flex";
            }
            else{
                product_category.style.display = "none";
            }
        }
    }
})

//EVENTLISTENER FOR SEARCHBOX KEYUP----------------------------------------------------------------------------------
searchbox.addEventListener("keyup",(event) => {
    let searchdata = event.target.value;
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
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
        console.log(fsearchdata);
        firestore.collection("Product").where('productname',">=",`${fsearchdata}`).limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }

})
//EVENTLISTENER FOR SEARCHBOX FOCUS----------------------------------------------------------------------------------
searchbox.addEventListener("focus",() => {
    let categoryText = category.options[category.selectedIndex].value;
    const allproduct = document.querySelectorAll('.product-item');
    let productnumber = allproduct.length;
    category.selectedIndex = 0;

    for(let i = 0; i < productnumber; i++ ){
        
        let prodCategory = allproduct.item(i).dataset.category;
        let product_category = document.querySelector(`[data-category="${prodCategory}"`);
        product_category.style.display = "flex";
    }
})