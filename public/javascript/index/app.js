const category = document.querySelector('#category');
const product = document.querySelector('#product');
const searchbox = document.querySelector('.searchbox');
const account = document.querySelector('.accountbtn');
const loginclose = document.querySelector('.loginclose');
const loginuser = document.querySelector('.loginuser');

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
category.addEventListener("change", () => {
    searchbox.value = "";
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
    let categoryText = category.options[category.selectedIndex].value;
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
searchbox.addEventListener("keyup",(event) => {
    let searchdata = event.target.value;
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
    if(searchdata.length == 0)
    {
        $("#product").empty();
        renderProductLoop();
    }
    else{
        try{
            const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
            let words = searchdata.split(' ').map(capSearch);
            let fsearchdata = words.join(' ');

            const renderSearchProduct = (code,productname,category,brandname,formulation,price,image) => {
                $("#product").empty();
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
        catch{
        }
    }
})

//EVENTLISTENER FOR SEARCHBOX FOCUS------------------------------------------------------------------------------------------------
searchbox.addEventListener("focus",() => {
    category.selectedIndex = 0;
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
    renderProductLoop();
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
    usericon.src = "/image/username.png";
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
    passwordicon.src = "/image/password.png";
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

//EVENTLISTENER FOR ACCOUNT LOGIN ClICK---------------------------------------------------------------------------------------------
    $(".buttonlogin").click(() => {
        let logusername = $(".username").val();
        let logpassword = $(".password").val();
        if(logusername == "" || logpassword == ""){
            $(".error").text("fill up all the fields");
        }
        else{
            let accountref = firestore.collection("Account").doc(`${logusername}`);
            accountref.get().then(doc => {
                if(doc.data().status != "active"){
                    $(".error").text("Your Account Is Deactivated");
                }
                else{
                    if(doc.data().password == CryptoJS.SHA3(logpassword).toString())
                    {
                        $(".error").text("");
                        $(location).attr('href', '/staff');
                        const data = {
                            login: "staff"
                        };
                        $.post('/api/stafflogin',data);
                    }
                    else{
                        $(".error").text("Incorrect Password");
                    }
                }
            }).catch(err => {
                let adminref = firestore.collection("Account").doc("sva1ootNyElZeI6XTHcS");
                adminref.get().then(doc => {
                    if(doc.data().username == logusername){
                        if(doc.data().password == CryptoJS.SHA3(logpassword).toString()){
                            $(".error").text("");                        
                            $(location).attr('href', '/admin');
                            const data = {
                                login: "admin"
                            };
                            $.post('/api/adminlogin',data);
                        }
                        else{
                            $(".error").text("Incorrect Password");
                        }
                    }
                    else{
                        $(".error").text("Incorrect Username");
                    }
                })
            });   
        }
    });

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
        emailicon.src = "/image/email.png";
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
        let admin = {};
        let objemail = {};
        submitemailbtn.addEventListener("click",() => {
            const inputemail = document.querySelector('.email').value;
            const forgoterror = document.querySelector('.forgoterror');
            function adminemail(doc)
            {
                admin.email = doc.data().email;
                admin.clientID = doc.data().clientID;
                admin.clientSecret = doc.data().clientSecret;
                admin.refreshToken = doc.data().refreshToken;
            }
            let adminref = firestore.collection('Account').doc('sva1ootNyElZeI6XTHcS');
            adminref.get().then((doc) => {
                adminemail(doc);
            });
            function checkemail(doc){
                let docid = doc.id;
                let email = doc.data().email;
                let type = doc.data().type;
                let randomcode = Math.floor(100000 + Math.random() * 900000);
                let subject = "PMPS Forgot Account Code";
                let message = `Forgot Account Code: ${randomcode}`;
                let adminmail = admin.email;
                let clientID = admin.clientID;
                let clientSecret = admin.clientSecret;
                let refreshToken = admin.refreshToken;
                if(inputemail === email && doc.data().status == "active"){
                    objemail.type = type;
                    objemail.docid = docid;
                    objemail.email = email;
                    const data = {
                        adminmail,
                        email,
                        subject,
                        message,
                        clientID,
                        clientSecret,
                        refreshToken
                    };
                    firestore.collection('Account').doc(docid).update({
                        forgotcode: randomcode
                    });
                    $.post('/api/sendemail', data);
                    renderverify();
                }
                else{
                    if(inputemail === ""){
                        forgoterror.textContent = 'Input your email';
                        inputtagemail.value = "";
                    }
                    else{
                        if(doc.data().status != "active"){
                            forgoterror.textContent = 'Your Account in this Email is Deactivated';
                            inputtagemail.value = "";
                        }
                        else{
                            forgoterror.textContent = 'Email is not registered';
                            inputtagemail.value = "";
                        }
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
                codetext2.textContent = inputemail;
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
                let newrandomcode = Math.floor(100000 + Math.random() * 900000);
                let docid = objemail.docid;
                let email = objemail.email;
                let subject = "PMPS Forgot Account Code";
                let message = `Forgot Account Code: ${newrandomcode}`;
                let adminmail = admin.email;
                let clientID = admin.clientID;
                let clientSecret = admin.clientSecret;
                let refreshToken = admin.refreshToken;
                const data = {
                    adminmail,
                    email,
                    subject,
                    message,
                    clientID,
                    clientSecret,
                    refreshToken
                };
                firestore.collection('Account').doc(docid).update({
                    forgotcode: newrandomcode
                });
                $.post('/api/sendemail', data);
                const codeerror = document.querySelector('.codeerror');
                codeerror.textContent = "Code was resend to your email";
                codeerror.style.color = "rgb(3, 162, 48)";
                document.querySelector('.code').value = "";
            })

            //EVENTLISTENER FOR ACCOUNT SUBMIT VERIFICATION CODE ONCLICK----------------------------------------------------------------------------------
            const submitcodebtn = document.querySelector('.submitcode');
            submitcodebtn.addEventListener("click",() => {
                let codeerrortext = document.querySelector('.codeerror');
                let docid = objemail.docid;
                let inputcode = document.querySelector('.code').value;
                function getcode(doc){
                    let firestorecode = doc.data().forgotcode;
                    if(inputcode == firestorecode){
                        renderupdate();
                    }
                    else{
                        codeerrortext.textContent = "Invalid Code";
                        codeerrortext.style.color = "rgb(221, 76, 76)";
                        document.querySelector('.code').value = "";
                    }
                }
                let coderef = firestore.collection("Account").doc(docid);
                coderef.get().then((doc) => {
                    getcode(doc);
                });
                function renderupdate(){
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
                    updateaccounterror.textContent = "";
                    updateaccounterror.setAttribute('class','updateaccounterror');
                    loginuser.appendChild(updateaccounterror);

                    let updateaccounterror1 = document.createElement('p');
                    updateaccounterror1.textContent = "";
                    updateaccounterror1.setAttribute('class','updateaccounterror1');
                    loginuser.appendChild(updateaccounterror1);
    
                    let divupdateusername = document.createElement('div');
                    divupdateusername.setAttribute('class',"divupdateusername");
                    let updateusericon = document.createElement('img');
                    updateusericon.src = "/image/username.png";
                    updateusericon.width = "40";
                    updateusericon.height = "40";
                    divupdateusername.appendChild(updateusericon);
                    let updateusername = document.createElement('input');
                    updateusername.setAttribute('class', 'updateusername');
                    updateusername.placeholder = "Username";
                    updateusername.required;
                    divupdateusername.appendChild(updateusername);
                    loginuser.appendChild(divupdateusername);
    
                    let divupdatepassword = document.createElement('div');
                    divupdatepassword.setAttribute('class',"divupdatepassword");
                    let passwordicon = document.createElement('img');
                    passwordicon.src = "/image/password.png";
                    passwordicon.width = "40";
                    passwordicon.height = "40";
                    divupdatepassword.appendChild(passwordicon);
                    let updatepassword = document.createElement('input');
                    updatepassword.setAttribute('class', 'updatepassword');
                    updatepassword.placeholder = "Password";
                    updatepassword.required;
                    updatepassword.type = "password";
                    divupdatepassword.appendChild(updatepassword);
                    loginuser.appendChild(divupdatepassword);
    
                    let divupdateconfirmpass = document.createElement('div');
                    divupdateconfirmpass.setAttribute('class',"divupdateconfirmpass");
                    let confirmpassicon = document.createElement('img');
                    confirmpassicon.src = "/image/password.png";
                    confirmpassicon.width = "40";
                    confirmpassicon.height = "40";
                    divupdateconfirmpass.appendChild(confirmpassicon);
                    let updateconfirmpass = document.createElement('input');
                    updateconfirmpass.setAttribute('class', 'updateconfirmpass');
                    updateconfirmpass.placeholder = "Confirm Password";
                    updateconfirmpass.required;
                    updateconfirmpass.type = "password";
                    divupdateconfirmpass.appendChild(updateconfirmpass);
                    loginuser.appendChild(divupdateconfirmpass);
                    
                    let updateaccountbutton = document.createElement('button');
                    updateaccountbutton.setAttribute('class','updateaccountbutton');
                    updateaccountbutton.textContent = "Save";
                    loginuser.appendChild(updateaccountbutton);
    
                    //EVENTLISTENER FOR SAVE UPDATED ACCOUNT ONCLICK----------------------------------------------------------------------------------
                    const updateaccountbtn = document.querySelector('.updateaccountbutton');
                    updateaccountbtn.addEventListener("click", () => {
                        let inputusername = document.querySelector('.updateusername').value;
                        let inputpassword = document.querySelector('.updatepassword').value;
                        let inputconfirm = document.querySelector('.updateconfirmpass').value;
                        let docid = objemail.docid;
                        let type = objemail.type;
                        let email = objemail.email;
                        if(inputusername == "" || inputpassword == "" || inputconfirm == ""){
                            updateaccounterror.textContent = "fill up all the fields";
                            updateaccounterror1.textContent = "";
                        }
                        else{
                            let userref = firestore.collection("Account").where('username','==',`${inputusername}`);
                            userref.get().then(doc => {
                                if(!doc.empty){
                                    updateaccounterror.textContent = "Username Already Used";
                                    updateaccounterror1.textContent = "";
                                    document.querySelector('.updateusername').value = "";
                                    document.querySelector('.updatepassword').value = "";
                                    document.querySelector('.updateconfirmpass').value = "";
                                }
                                else{
                                    updateaccounterror.textContent = "";
                                    if(inputusername.length < 4 || inputpassword.length < 4)
                                    {                   
                                        updateaccounterror.textContent = "Username and Password must contain";
                                        updateaccounterror1.textContent = "atleast 6 characters";
                                        document.querySelector('.updateusername').value = "";
                                        document.querySelector('.updatepassword').value = "";
                                        document.querySelector('.updateconfirmpass').value = "";
                                    }
                                    else{
                                        if(inputpassword === inputconfirm){
                                            if(type == "admin"){
                                                firestore.collection("Account").doc(docid).update({
                                                    forgotcode: 0,
                                                    password: CryptoJS.SHA3(inputpassword).toString(),
                                                    username: inputusername
                                                });
                                            }
                                            else{
                                                firestore.collection("Account").doc(docid).get().then(doc => {
                                                    firestore.collection("Account").doc(inputusername).set({
                                                        email: email,
                                                        firstname: doc.data().firstname,
                                                        forgotcode: 0,
                                                        lastname: doc.data().lastname,
                                                        password: CryptoJS.SHA3(inputpassword).toString(),
                                                        sex: doc.data().sex,
                                                        status: doc.data().status,
                                                        type: type,
                                                        username: inputusername,
                                                    });
                                                    firestore.collection("Account").doc(docid).delete();
                                                });
                                            }
                                            
                                            const body = document.body;
                                            const divlogin = document.querySelector(".divlogin");
                                            divlogin.style.display = "none";
                                            body.style.overflow = "auto";
                                            window.onscroll = function() {};
                                            swal("Account Successfully Updated", "", "success");
                                        }
                                        else{
                                            updateaccounterror.textContent = "Password did not match";
                                            updateaccounterror1.textContent = "";
                                            document.querySelector('.updatepassword').value = "";
                                            document.querySelector('.updateconfirmpass').value = "";
                                        }
                                    }
                                }
                            });
                        }
                    })
                }
                
            })
                const codekeyup = document.querySelector('.code');
                codekeyup.addEventListener("keyup",(event) => {
                    if(event.keyCode == 13){
                        event.preventDefault();
                        document.querySelector('.submitcode').click();
                    }
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
