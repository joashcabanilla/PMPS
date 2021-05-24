const caDivCreateAccount = $(".CA-div-CreateAccount");
const caCreatebtn = $(".CA-createbtn");
const caStatus = $(".CA-AccountStatus");
const caSearch = $(".CA-search");
const caTable = $(".CA-table");
const caClosebtn = $(".CA-closebtn");
const caSavebtn = $(".CA-savebtn");
const caFirstname = $(".CA-firstname");
const caLastname = $(".CA-lastname");
const caContactNo = $(".CA-ContactNo");
const caEmail = $(".CA-email");
const caPassword = $(".CA-password");
const caConfirmpass = $(".CA-confirmpassword");
const caForm = $(".CA-createForm");

//GET ALL CUSTOMER ACCOUNT ACTIVE----------------------------------------------------------------------------------
const getAllCustomerAccount = () => {
    $(".CA-table").empty();
    let th = ` <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Contact No</th>
    <th>Email</th>
    <th>Button</th>
    </tr>`;
    $(".CA-table").append(th);
    for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){ 
    let email = ArrayGetAllCustomerAccount[i].email;
    let firstname = ArrayGetAllCustomerAccount[i].firstname;
    let lastname = ArrayGetAllCustomerAccount[i].lastname;
    let contactnumber = ArrayGetAllCustomerAccount[i].contactnumber;
    let status = ArrayGetAllCustomerAccount[i].status;

    let td = `<tr class="${email}">
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>0${contactnumber}</td>
                <td>${email}</td>
                <td style="text-align:center;">
                    <div style="display:flex; justify-content: space-around; align-items: center;">
                    <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;
                    color: green;" class="fas fa-edit fa-lg" id="edit-${email}"></button>
                    
                    <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${email}"></button>
                    </div>
                </td>
            </tr>`;
            status == "active" ? $(".CA-table").append(td) : null;
    }
}
//GET ALL CUSTOMER DEACTIVATED ACCOUNT-----------------------------------------------------------------------------
const getAllCustomerAccountDeact = () => {
    $(".CA-table").empty();
    let th = ` <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Contact No</th>
    <th>Email</th>
    </tr>`;
    $(".CA-table").append(th);
    for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){ 
        let email = ArrayGetAllCustomerAccount[i].email;
        let firstname = ArrayGetAllCustomerAccount[i].firstname;
        let lastname = ArrayGetAllCustomerAccount[i].lastname;
        let contactnumber = ArrayGetAllCustomerAccount[i].contactnumber;
        let status = ArrayGetAllCustomerAccount[i].status;

        let td = `<tr class="${email}">
                    <td>${firstname}</td>
                    <td>${lastname}</td>
                    <td>0${contactnumber}</td>
                    <td>${email}</td>
                </tr>`;
                status != "active" ? $(".CA-table").append(td) : null;
    }
}
//CLOSE BUTTON CLICK EVENT--------------------------------------------------------------------------------------
caClosebtn.click(() => {
    enablescroll();
    caDivCreateAccount.css("display","none");
});

//FOCUS SEARCH EVENT---------------------------------------------------------------------------------------------
caSearch.focus(() => {
    getAllCustomerAccount();
    caStatus.val("ACTIVE");
    let arry_search = [];
    for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
        let email = ArrayGetAllCustomerAccount[i].email;
        let firstname = ArrayGetAllCustomerAccount[i].firstname;
        let lastname = ArrayGetAllCustomerAccount[i].lastname;
        arry_search.push(email);
        arry_search.push(firstname);
        arry_search.push(lastname);
    }
    caSearch.autocomplete({
    source: arry_search,
    autoFocus: true,
    classes: {
    "ui-autocomplete": "highlight",
    },
});
});

//KEYUP SEARCH EVENT FOR CUSTOMER ACCOUNT---------------------------------------------------------------------------
caSearch.keyup((e) => {
    let searchdata = e.target.value;
    const CustomerAccount = (firstname,lastname,email,contactnumber,status) => {
        $(".CA-table").empty();
        let th = ` <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>contactnumber</th>
        <th>Email</th>
        <th>Button</th>
        </tr>`;
        $(".CA-table").append(th);
        let td = `<tr class="${email}">
                    <td>${firstname}</td>
                    <td>${lastname}</td>
                    <td>0${contactnumber}</td>
                    <td>${email}</td>
                    <td style="text-align:center;">
                        <div style="display:flex; justify-content: space-around; align-items: center;">
                        <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                        border-radius: 8px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                        background: #b7dbed;
                        outline: none;
                        border-color: #b7dbed;
                        color: green;" class="fas fa-edit fa-lg" id="edit-${email}"></button>
                        
                        <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                        border-radius: 8px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                        background: #b7dbed;
                        outline: none;
                        border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${email}"></button>
                        </div>
                    </td>
                </tr>`;
                status == "active" ? $(".CA-table").append(td) : null;
    }
    if(searchdata.length == 0 ){
        getAllCustomerAccount();
    }
    else{
        try{
            const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
            let words = searchdata.split(' ').map(capSearch);
            let fsearchdata = words.join(' ');
            for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
                let email = ArrayGetAllCustomerAccount[i].email;
                let firstname = ArrayGetAllCustomerAccount[i].firstname;
                let lastname = ArrayGetAllCustomerAccount[i].lastname;
                let status = ArrayGetAllCustomerAccount[i].status;
                let contactnumber = ArrayGetAllCustomerAccount[i].contactnumber; 
                let existEmail = email.search(fsearchdata);
                let existFirstname = firstname.search(fsearchdata);
                let existLastname = lastname.search(fsearchdata);
                existEmail != -1 || existFirstname != -1 || existLastname != -1 ? CustomerAccount(firstname,lastname,email,contactnumber,status) : null;
            }
        }
        catch{}
    }
});

//CHANGE EVENT ACTIVE AND DEACTIVATED---------------------------------------------------------------------------
caStatus.change(() => {
    let status = caStatus.val();
    status == "ACTIVE" ? getAllCustomerAccount() : getAllCustomerAccountDeact();
});

//EDIT CUSTOMER ACCOUNT-------------------------------------------------------------------------------------------
caTable.click((e) => {
    let id = e.target.id;
    let email = id.substring(5);
    let button = id.substring(0,4);
    
    const editButton = () => {
        caDivCreateAccount.css("display","flex");
        disableScroll();
        caSearch.val("");
        caStatus.val("ACTIVE");
        getAllCustomerAccount();
        for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
            let Aemail = ArrayGetAllCustomerAccount[i].email;
            let firstname = ArrayGetAllCustomerAccount[i].firstname;
            let lastname = ArrayGetAllCustomerAccount[i].lastname;
            let contactnumber = ArrayGetAllCustomerAccount[i].contactnumber; 
            if(email == Aemail){
                caFirstname.val(firstname);
                caLastname.val(lastname);
                caContactNo.val( "0" + contactnumber);
                caEmail.val(email);
                caPassword.val("");
                caConfirmpass.val("");
            }
        }
    }
    
    const deactButton = () => {
        let deactemail = id.substring(6);
        firestore.collection("CustomerAccount").doc(deactemail.trim()).update({
            status: "deactivated",
        });
        for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
            let Aemail = ArrayGetAllCustomerAccount[i].email;
            Aemail == deactemail ? ArrayGetAllCustomerAccount[i].status = "deactivated" : null;
        }
        getAllCustomerAccount();
    }
    id == "" ? null : button == "edit" ? editButton() : swal({
        title: "",
        text: `Are you sure you want to deactivate this Customer account?`,
        icon: "warning",
        buttons: ["No","Yes"],
        dangerMode: true,
    })
    .then((willDelete) => {
        if(willDelete){
            deactButton();
            swal("","Customer Account Successfully Deactivated","success");
        }
        });
    });

//SAVE BUTTON CLICK EVENT---------------------------------------------------------------------------------------
caForm.submit((event) => {
    event.preventDefault();
    let firstname = caFirstname.val();
    let lastname = caLastname.val();
    let contactnumber = caContactNo.val();
    let email = caEmail.val();
    let password = caPassword.val();
    let confirmpass = caConfirmpass.val();

    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let strFirstname = firstname.split(' ').map(capSearch);
    firstname = strFirstname.join(' ');

    let strLastname = lastname.split(' ').map(capSearch);
    lastname = strLastname.join(' ');

    const SaveAccount = () => {
            firestore.collection("CustomerAccount").doc(email.trim()).set({
                email : email,
                firstname: firstname,
                forgotpassword: 0,
                lastname: lastname,
                password: password,
                contactnumber: parseInt(contactnumber),
                status: "active",
            });
            for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
                let Aemail = ArrayGetAllCustomerAccount[i].email;
                if(Aemail.trim() == email.trim()){
                    ArrayGetAllCustomerAccount[i].email = email;
                    ArrayGetAllCustomerAccount[i].lastname = lastname;
                    ArrayGetAllCustomerAccount[i].firstname = firstname;
                    ArrayGetAllCustomerAccount[i].contactnumber = parseInt(contactnumber);
                    ArrayGetAllCustomerAccount[i].password = password;
                }
            }
            swal("","Customer Account Successfully Saved","success");
            getAllCustomerAccount();
            enablescroll();
            caDivCreateAccount.css("display","none");
    }
    
    password == confirmpass ? SaveAccount() : swal("","Password and Confirm Password did not Match","error");
});