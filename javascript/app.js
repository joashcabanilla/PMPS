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
        firestore.collection("Product").where('productname',">=",`${fsearchdata}`).limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProduct(doc);
            })
        })
    }

})

//EVENTLISTENER FOR SEARCHBOX FOCUS------------------------------------------------------------------------------------------------
searchbox.addEventListener("focus",() => {
    category.selectedIndex = 0;
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
    firestore.collection("Product").orderBy('category').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderProduct(doc);
        })
    })
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
        forgoterror.textContent = "";
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
        const inputtagemail = document.querySelector('.email');
        submitemailbtn.addEventListener("click",() => {
            const inputemail = document.querySelector('.email').value;
            const forgoterror = document.querySelector('.forgoterror');
            function checkemail(doc){
                let email = doc.data().email;
                let randomcode = Math.floor(100000 + Math.random() * 900000);
                if(inputemail === email){
                    Email.send({
                        Host : "smtp.gmail.com",
                        Username : "joash0199@gmail.com",
                        Password : "Joash_09560471776",
                        To : 'cjoash49@gmail.com',
                        From : "joash0199@gmail.com",
                        Subject : "test",
                        Body : "test message",
                    }).then(message => alert("mail sent successfully"));
                    renderverify();
                }
                else{
                    if(inputemail === ""){
                        forgoterror.textContent = 'Input your email';
                        inputtagemail.value = "";
                    }
                    else{
                        forgoterror.textContent = 'Email is not registered';
                        inputtagemail.value = "";
                    }
                }
            }
            firestore.collection("Account").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    checkemail(doc);
                })
            })
            function renderverify(){
                while(loginuser.firstChild){
                    loginuser.removeChild(loginuser.firstChild);
                }
                let codetext = document.createElement('p');
                codetext.textContent = "Verify Your Account";
                codetext.setAttribute('class','codetext');
                loginuser.appendChild(codetext);
    
                let codetext1 = document.createElement('p');
                codetext1.textContent = "code was sent to your email";
                codetext1.setAttribute('class','codetext1');
                loginuser.appendChild(codetext1);
    
                let codetext2 = document.createElement('p');
                codetext2.textContent = "";
                codetext2.setAttribute('class','codetext2');
                loginuser.appendChild(codetext2);
    
                let codeerror = document.createElement('p');
                codeerror.textContent = "";
                codeerror.setAttribute('class','codeerror');
                loginuser.appendChild(codeerror);
    
                let divcode = document.createElement('div');
                divcode.setAttribute('class',"divcode");
                let code = document.createElement('input');
                code.setAttribute('class', 'code');
                code.placeholder = "code";
                divcode.appendChild(code);
                loginuser.appendChild(divcode);
    
                let submitcode = document.createElement('button');
                submitcode.setAttribute('class','submitcode');
                submitcode.textContent = "Submit";
                loginuser.appendChild(submitcode);
    
                let resendcode = document.createElement('button');
                resendcode.setAttribute('class','resendcode');
                resendcode.textContent = "Resend";
                loginuser.appendChild(resendcode);

            //EVENTLISTENER FOR ACCOUNT RESEND VERIFICATION CODE ONCLICK----------------------------------------------------------------------------------
            const resendcodebtn = document.querySelector('.resendcode');
            resendcodebtn.addEventListener("click",() => {
                const codeerror = document.querySelector('.codeerror');
                codeerror.textContent = "Code was resend to your email";
                codeerror.style.color = "rgb(3, 162, 48)";
            })

            //EVENTLISTENER FOR ACCOUNT SUBMIT VERIFICATION CODE ONCLICK----------------------------------------------------------------------------------
            const submitcodebtn = document.querySelector('.submitcode');
            submitcodebtn.addEventListener("click",() => {
                while(loginuser.firstChild){
                    loginuser.removeChild(loginuser.firstChild);
                }
                let updateaccount = document.createElement('p');
                updateaccount.textContent = "Update Account";
                updateaccount.setAttribute('class','updateaccount');
                loginuser.appendChild(updateaccount);

                let updateaccount1 = document.createElement('p');
                updateaccount1.textContent = "you can now update your account";
                updateaccount1.setAttribute('class','updateaccount1');
                loginuser.appendChild(updateaccount1);

                let updateaccounterror = document.createElement('p');
                updateaccounterror.textContent = "your password did not match";
                updateaccounterror.setAttribute('class','updateaccounterror');
                loginuser.appendChild(updateaccounterror);

                let divupdateusername = document.createElement('div');
                divupdateusername.setAttribute('class',"divupdateusername");
                let updateusericon = document.createElement('img');
                updateusericon.src = "image/username.png";
                updateusericon.width = "40";
                updateusericon.height = "40";
                divupdateusername.appendChild(updateusericon);
                let updateusername = document.createElement('input');
                updateusername.setAttribute('class', 'updateusername');
                updateusername.placeholder = "Username";
                divupdateusername.appendChild(updateusername);
                loginuser.appendChild(divupdateusername);

                let divupdatepassword = document.createElement('div');
                divupdatepassword.setAttribute('class',"divupdatepassword");
                let passwordicon = document.createElement('img');
                passwordicon.src = "image/password.png";
                passwordicon.width = "40";
                passwordicon.height = "40";
                divupdatepassword.appendChild(passwordicon);
                let updatepassword = document.createElement('input');
                updatepassword.setAttribute('class', 'updatepassword');
                updatepassword.placeholder = "Password";
                divupdatepassword.appendChild(updatepassword);
                loginuser.appendChild(divupdatepassword);

                let divupdateconfirmpass = document.createElement('div');
                divupdateconfirmpass.setAttribute('class',"divupdateconfirmpass");
                let confirmpassicon = document.createElement('img');
                confirmpassicon.src = "image/password.png";
                confirmpassicon.width = "40";
                confirmpassicon.height = "40";
                divupdateconfirmpass.appendChild(confirmpassicon);
                let updateconfirmpass = document.createElement('input');
                updateconfirmpass.setAttribute('class', 'updateconfirmpass');
                updateconfirmpass.placeholder = "Confirm Password";
                divupdateconfirmpass.appendChild(updateconfirmpass);
                loginuser.appendChild(divupdateconfirmpass);
                
                let updateaccountbutton = document.createElement('button');
                updateaccountbutton.setAttribute('class','updateaccountbutton');
                updateaccountbutton.textContent = "Save";
                loginuser.appendChild(updateaccountbutton);

                //EVENTLISTENER FOR SAVE UPDATED ACCOUNT ONCLICK----------------------------------------------------------------------------------
                const updateaccountbtn = document.querySelector('.updateaccountbutton');
                updateaccountbtn.addEventListener("click",() => {
                })
            })
            }
        })
        inputtagemail.addEventListener("keyup",(event) => {
            if(event.keyCode == 13){
                event.preventDefault();
                document.querySelector('.submitemail').click();
            }
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
