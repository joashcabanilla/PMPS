const saDivCreateAccount = $(".SA-div-CreateAccount");
const saCreatebtn = $(".SA-createbtn");
const saStatus = $(".SA-AccountStatus");
const saSearch = $(".SA-search");
const saTable = $(".SA-table");
const saClosebtn = $(".SA-closebtn");
const saSavebtn = $(".SA-savebtn");
const saFirstname = $(".SA-firstname");
const saLastname = $(".SA-lastname");
const saSex = $(".SA-sex");
const saEmail = $(".SA-email");
const saUsername = $(".SA-username");
const saPassword = $(".SA-password");
const saConfirmpass = $(".SA-confirmpassword");
const saForm = $(".SA-createForm");
let create_or_edit_staff = "";
//GET ALL STAFF ACCOUNT ACTIVE----------------------------------------------------------------------------------
const getAllStaffAccount = () => {
    $(".SA-table").empty();
    let th = ` <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Sex</th>
    <th>Email</th>
    <th>Button</th>
    </tr>`;
    $(".SA-table").append(th);
    for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
    let username = ArrayGetAllStaffAccount[i].username;
    let email = ArrayGetAllStaffAccount[i].email;
    let firstname = ArrayGetAllStaffAccount[i].firstname;
    let lastname = ArrayGetAllStaffAccount[i].lastname;
    let sex = ArrayGetAllStaffAccount[i].sex;
    let status = ArrayGetAllStaffAccount[i].status;

    let td = `<tr class="${username}">
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${sex}</td>
                <td>${email}</td>
                <td style="text-align:center;">
                    <div style="display:flex; justify-content: space-around; align-items: center;">
                    <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;
                    color: green;" class="fas fa-edit fa-lg" id="edit-${username}"></button>
                    
                    <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${username}"></button>
                    </div>
                </td>
            </tr>`;
            status == "active" ? $(".SA-table").append(td) : null;
    }
}

//GET ALL STAFF DEACTIVATED ACCOUNT-----------------------------------------------------------------------------
const getAllStaffAccountDeact = () => {
    $(".SA-table").empty();
    let th = ` <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Sex</th>
    <th>Email</th>
    </tr>`;
    $(".SA-table").append(th);
    for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
    let username = ArrayGetAllStaffAccount[i].username;
    let email = ArrayGetAllStaffAccount[i].email;
    let firstname = ArrayGetAllStaffAccount[i].firstname;
    let lastname = ArrayGetAllStaffAccount[i].lastname;
    let sex = ArrayGetAllStaffAccount[i].sex;
    let status = ArrayGetAllStaffAccount[i].status;

    let td = `<tr class="${username}">
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${sex}</td>
                <td>${email}</td>
            </tr>`;
            status != "active" ? $(".SA-table").append(td) : null;
    }
}
//CREATE ACCOUNT CLICK EVENT-------------------------------------------------------------------------------------
saCreatebtn.click(() => {
    $(".SA-ptitle").text("CREATE NEW STAFF ACCOUNT");
    saDivCreateAccount.css("display","flex");
    disableScroll();
    saSearch.val("");
    saStatus.val("ACTIVE");
    saFirstname.val("");
    saLastname.val("");
    saSex.val("MALE");
    saEmail.val("");
    saUsername.val("");
    saPassword.val("");
    saConfirmpass.val("");
    getAllStaffAccount();
    create_or_edit_staff = "create";
});

//CLOSE BUTTON CLICK EVENT--------------------------------------------------------------------------------------
saClosebtn.click(() => {
    enablescroll();
    saDivCreateAccount.css("display","none");
});

//EDIT STAFF ACCOUNT--------------------------------------------------------------------------------------------
const editAccount = () => {
    let firstname = saFirstname.val();
    let lastname = saLastname.val();
    let sex = saSex.val();
    let email = saEmail.val();
    let username = saUsername.val();
    let password = saPassword.val();
    let confirmpass = saConfirmpass.val();

    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let strFirstname = firstname.split(' ').map(capSearch);
    firstname = strFirstname.join(' ');

    let strLastname = lastname.split(' ').map(capSearch);
    lastname = strLastname.join(' ');

    const SaveAccount = () => {
            firestore.collection("Account").doc(username).set({
                email : email,
                firstname: firstname,
                forgotcode: 0,
                lastname: lastname,
                password: CryptoJS.SHA3(password).toString(),
                sex: sex,
                status: "active",
                type: "staff",
                username: username
            });
            for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
                let Ausername = ArrayGetAllStaffAccount[i].username;
                if(Ausername == username){
                    ArrayGetAllStaffAccount[i].username = username;
                    ArrayGetAllStaffAccount[i].email = email;
                    ArrayGetAllStaffAccount[i].lastname = lastname;
                    ArrayGetAllStaffAccount[i].firstname = firstname;
                    ArrayGetAllStaffAccount[i].sex = sex;
                    ArrayGetAllStaffAccount[i].password = CryptoJS.SHA3(password).toString();
                }
            }
            swal("","Staff Account Successfully Saved","success");
            getAllStaffAccount();
            enablescroll();
            saDivCreateAccount.css("display","none");
    }
    
    password == confirmpass ? SaveAccount() : swal("","Password and Confirm Password did not Match","error");
}

//SAVE CREATED STAFF ACCOUNT-----------------------------------------------------------------------------------
const saveStaffAccount = () => {
    let firstname = saFirstname.val();
    let lastname = saLastname.val();
    let sex = saSex.val();
    let email = saEmail.val();
    let username = saUsername.val();
    let password = saPassword.val();
    let confirmpass = saConfirmpass.val();
    let name = `${firstname} ${lastname}`;
    let registerName = 0;
    let usernameExist = 0;
    let emailExist = 0;
    
    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let words = name.split(' ').map(capSearch);
    name = words.join(' ');

    let strFirstname = firstname.split(' ').map(capSearch);
    firstname = strFirstname.join(' ');

    let strLastname = lastname.split(' ').map(capSearch);
    lastname = strLastname.join(' ');

    const SaveAccount = () => {
        for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
            let Ausername = ArrayGetAllStaffAccount[i].username;
            let Aemail = ArrayGetAllStaffAccount[i].email;
            let Afirstname = ArrayGetAllStaffAccount[i].firstname;
            let Alastname = ArrayGetAllStaffAccount[i].lastname;

            let Aname = `${Afirstname} ${Alastname}`;
            name == Aname ? swal("","Your Name Is Already Registered","error") : null;
            username == Ausername ? swal("","Username Already Used","error") : null;
            email == Aemail ? swal("","Email Already Used","error") : null;
            name == Aname ? registerName++ : null;
            username == Ausername ? usernameExist++ : null;
            email == Aemail ? emailExist++ : null;
        }
        if(registerName == 0 && usernameExist == 0 && emailExist == 0){
            firestore.collection("Account").doc(username).set({
                email : email,
                firstname: firstname,
                forgotcode: 0,
                lastname: lastname,
                password: CryptoJS.SHA3(password).toString(),
                sex: sex,
                status: "active",
                type: "staff",
                username: username
            });
            swal("","Staff Account Successfully Saved","success");
            let obj = {};
            obj.email = email;
            obj.firstname = firstname;
            obj.lastname = lastname;
            obj.password = password;
            obj.sex = sex;
            obj.status = "active";
            obj.username = username;
            ArrayGetAllStaffAccount.push(obj);
            getAllStaffAccount();
            enablescroll();
            saDivCreateAccount.css("display","none");
        }
    }
    
    password == confirmpass ? SaveAccount() : swal("","Password and Confirm Password did not Match","error");
}

//SAVE BUTTON CLICK EVENT---------------------------------------------------------------------------------------
saForm.submit((event) => {
    event.preventDefault();
    create_or_edit_staff == "create" ? saveStaffAccount() : editAccount(); 
});

//FOCUS SEARCH EVENT---------------------------------------------------------------------------------------------
saSearch.focus(() => {
    getAllStaffAccount();
    saStatus.val("ACTIVE");
    let arry_search = [];
    for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
        let email = ArrayGetAllStaffAccount[i].email;
        let firstname = ArrayGetAllStaffAccount[i].firstname;
        let lastname = ArrayGetAllStaffAccount[i].lastname;
        arry_search.push(email);
        arry_search.push(firstname);
        arry_search.push(lastname);
    }
    saSearch.autocomplete({
    source: arry_search,
    autoFocus: true,
    classes: {
    "ui-autocomplete": "highlight",
    },
});
});

//KEYUP SEARCH EVENT FOR STAFF ACCOUNT---------------------------------------------------------------------------
saSearch.keyup((e) => {
    let searchdata = e.target.value;
    const StaffAccount = (firstname,lastname,email,sex,status,username) => {
        $(".SA-table").empty();
        let th = ` <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Sex</th>
        <th>Email</th>
        <th>Button</th>
        </tr>`;
        $(".SA-table").append(th);
        let td = `<tr class="${username}">
                    <td>${firstname}</td>
                    <td>${lastname}</td>
                    <td>${sex}</td>
                    <td>${email}</td>
                    <td style="text-align:center;">
                        <div style="display:flex; justify-content: space-around; align-items: center;">
                        <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                        border-radius: 8px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                        background: #b7dbed;
                        outline: none;
                        border-color: #b7dbed;
                        color: green;" class="fas fa-edit fa-lg" id="edit-${username}"></button>
                        
                        <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                        border-radius: 8px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                        background: #b7dbed;
                        outline: none;
                        border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${username}"></button>
                        </div>
                    </td>
                </tr>`;
                status == "active" ? $(".SA-table").append(td) : null;
    }
    if(searchdata.length == 0 ){
        getAllStaffAccount();
    }
    else{
        try{
            const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
            let words = searchdata.split(' ').map(capSearch);
            let fsearchdata = words.join(' ');
            for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
                let email = ArrayGetAllStaffAccount[i].email;
                let firstname = ArrayGetAllStaffAccount[i].firstname;
                let lastname = ArrayGetAllStaffAccount[i].lastname;
                let status = ArrayGetAllStaffAccount[i].status;
                let username = ArrayGetAllStaffAccount[i].username;
                let sex = ArrayGetAllStaffAccount[i].sex; 
                let existEmail = email.search(fsearchdata);
                let existFirstname = firstname.search(fsearchdata);
                let existLastname = lastname.search(fsearchdata);
                existEmail != -1 || existFirstname != -1 || existLastname != -1 ? StaffAccount(firstname,lastname,email,sex,status,username) : null;
            }
        }
        catch{}
    }
});

//CHANGE EVENT ACTIVE AND DEACTIVATED---------------------------------------------------------------------------
saStatus.change(() => {
    let status = saStatus.val();
    status == "ACTIVE" ? getAllStaffAccount() : getAllStaffAccountDeact();
});

//EDIT STAFF ACCOUNT-------------------------------------------------------------------------------------------
saTable.click((e) => {
let id = e.target.id;
let username = id.substring(5);
let button = id.substring(0,4);

const editButton = () => {
    create_or_edit_staff = "edit";
    $(".SA-ptitle").text("EDIT STAFF ACCOUNT");
    saDivCreateAccount.css("display","flex");
    disableScroll();
    saSearch.val("");
    saStatus.val("ACTIVE");
    getAllStaffAccount();
    for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
        let email = ArrayGetAllStaffAccount[i].email;
        let firstname = ArrayGetAllStaffAccount[i].firstname;
        let lastname = ArrayGetAllStaffAccount[i].lastname;
        let status = ArrayGetAllStaffAccount[i].status;
        let Ausername = ArrayGetAllStaffAccount[i].username;
        let sex = ArrayGetAllStaffAccount[i].sex; 
        if(Ausername == username){
            saFirstname.val(firstname);
            saLastname.val(lastname);
            saSex.val(sex);
            saEmail.val(email);
            saUsername.val(username);
            saPassword.val("");
            saConfirmpass.val("");
        }
    }

}

const deactButton = () => {
    let deactusername = id.substring(6);
    firestore.collection("Account").doc(deactusername).update({
        status: "deactivated",
    });
    for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
        let Ausername = ArrayGetAllStaffAccount[i].username;
        Ausername == deactusername ? ArrayGetAllStaffAccount[i].status = "deactivated" : null;
    }
    getAllStaffAccount();
}
id == "" ? null : button == "edit" ? editButton() : swal({
    title: "",
    text: `Are you sure you want to deactivate this staff account?`,
    icon: "warning",
    buttons: ["No","Yes"],
    dangerMode: true,
})
.then((willDelete) => {
    if(willDelete){
        deactButton();
        swal("","Staff Account Successfully Deactivated","success");
    }
    });
});