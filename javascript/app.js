const category = document.querySelector('#category');
const product = document.querySelector('#product');
const searchbox = document.querySelector('.searchbox');
const account = document.querySelector('.accountbtn');
const loginclose = document.querySelector('.loginclose');
const loginuser = document.querySelector('.loginuser');

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

product_div.setAttribute('data-id', doc.data().code);
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
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
    let categoryText = category.options[category.selectedIndex].value;
    if(categoryText == "All"){
        firestore.collection("Product").orderBy('category').get().then((snapshot) => {
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

//EVENTLISTENER FOR SEARCHBOX FOCUS------------------------------------------------------------------------------------------------
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

//EVENTLISTENER FOR ACCOUNT ONCLICK----------------------------------------------------------------------------------------------
account.addEventListener("click", () => {
    const body = document.body;
    const divlogin = document.querySelector(".divlogin");
    divlogin.style.display = "flex";
    body.scrollTo = 0;
    document.documentElement.scrollTop = 0;
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
    body.style.overflow = "hidden";

    while(loginuser.firstChild){
        loginuser.removeChild(loginuser.firstChild);
    }

    let logintext = document.createElement('p');
    logintext.textContent = "Login";
    logintext.setAttribute('class','logintext');
    loginuser.appendChild(logintext);

    let error = document.createElement('p');
    error.textContent = "";
    error.setAttribute('class','error');
    loginuser.appendChild(error);

    let divusername = document.createElement('div');
    divusername.setAttribute('class',"divusername");
    let usericon = document.createElement('img');
    usericon.src = "image/username.png";
    usericon.width = "40";
    usericon.height = "40";
    divusername.appendChild(usericon);
    let username = document.createElement('input');
    username.setAttribute('class', 'username');
    username.placeholder = "Username";
    divusername.appendChild(username);
    loginuser.appendChild(divusername);

    let divpassword = document.createElement('div');
    divpassword.setAttribute('class',"divpassword");
    let passwordicon = document.createElement('img');
    passwordicon.src = "image/password.png";
    passwordicon.width = "40";
    passwordicon.height = "40";
    divpassword.appendChild(passwordicon);
    let password = document.createElement('input');
    password.setAttribute('class','password');
    password.placeholder = "Password";
    password.type = "password";
    divpassword.appendChild(password);
    loginuser.appendChild(divpassword);

    let forgotpassword = document.createElement('p');
    forgotpassword.setAttribute('class','forgotpassword');
    forgotpassword.textContent = "Forgot Account?";
    loginuser.appendChild(forgotpassword);

    let buttonlogin = document.createElement('button');
    buttonlogin.setAttribute('class','buttonlogin');
    buttonlogin.textContent = "Login";
    loginuser.appendChild(buttonlogin);

//EVENTLISTENER FOR ACCOUNT FORGOT PASSWORD ONCLICK----------------------------------------------------------------------------------
    const forgotbtn = document.querySelector('.forgotpassword');
    forgotbtn.addEventListener("click", () =>{
        while(loginuser.firstChild){
            loginuser.removeChild(loginuser.firstChild);
        }
        let forgottext = document.createElement('p');
        forgottext.textContent = "Forgot Account?";
        forgottext.setAttribute('class','forgottext');
        loginuser.appendChild(forgottext);

        let forgoterror = document.createElement('p');
        forgoterror.textContent = "Incorrect Password";
        forgoterror.setAttribute('class','forgoterror');
        loginuser.appendChild(forgoterror);

        let divemail = document.createElement('div');
        divemail.setAttribute('class',"divemail");
        let emailicon = document.createElement('img');
        emailicon.src = "image/email.png";
        emailicon.width = "40";
        emailicon.height = "40";
        divemail.appendChild(emailicon);
        let email = document.createElement('input');
        email.setAttribute('class', 'email');
        email.placeholder = "Email";
        divemail.appendChild(email);
        loginuser.appendChild(divemail);

    let submitemail = document.createElement('button');
    submitemail.setAttribute('class','submitemail');
    submitemail.textContent = "Submit";
    loginuser.appendChild(submitemail);

        //EVENTLISTENER FOR ACCOUNT SUBMIT EMAIL ONCLICK----------------------------------------------------------------------------------
        const submitemailbtn = document.querySelector('.submitemail');
        submitemailbtn.addEventListener("click",() => {
            
        })
    })
})


//EVENTLISTENER FOR ACCOUNT CLOSE ONCLICK----------------------------------------------------------------------------------
loginclose.addEventListener("click", () => {
    const body = document.body;
    const divlogin = document.querySelector(".divlogin");
    divlogin.style.display = "none";
    body.style.overflow = "auto";
    window.onscroll = function() {};
})
