const seniorPvalue = $(".senior-pvalue");
const seniorInputValue = $(".senior-inputvalue");
const seniorEdit = $(".senior-editbtn");
const seniorSave = $(".senior-savebtn");
const seniorCancel = $(".senior-cancelbtn");
const pwdPvalue = $(".pwd-pvalue");
const pwdInputValue = $(".pwd-inputvalue");
const pwdEdit = $(".pwd-editbtn");
const pwdSave = $(".pwd-savebtn");
const pwdCancel = $(".pwd-cancelbtn");
//GET DATA FROM FIRESTORE-----------------------------------------------------------------------------------------
firestore.collection("Vat").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        seniorPvalue.text(parseFloat(doc.data().senior).toFixed(2));
        pwdPvalue.text(parseFloat(doc.data().pwd).toFixed(2));
    });
});
//SENIOR EDIT BUTTON CLICK EVENT-----------------------------------------------------------------------------------
seniorEdit.click(() => {
    seniorPvalue.css("display","none");
    seniorEdit.css("display","none");
    seniorInputValue.removeAttr("style");
    seniorSave.removeAttr("style");
    seniorCancel.removeAttr("style");
    seniorInputValue.val("");
});
//PWD EDIT BUTTON CLICK EVENT-----------------------------------------------------------------------------------
pwdEdit.click(() => {
    pwdPvalue.css("display","none");
    pwdEdit.css("display","none");
    pwdInputValue.removeAttr("style");
    pwdSave.removeAttr("style");
    pwdCancel.removeAttr("style");
    pwdInputValue.val("");
});

//SENIOR SAVE BUTTON CLICK EVENT--------------------------------------------------------------------------------
seniorSave.click(() => {
    let senior = parseFloat(seniorInputValue.val()).toFixed(2);

    const updatesenior = (senior) => {
        firestore.collection("Vat").doc("vat").update({
            senior : parseFloat(senior)
        });
        seniorInputValue.css("display","none");
        seniorSave.css("display","none");
        seniorCancel.css("display","none");
        seniorPvalue.removeAttr("style");
        seniorEdit.removeAttr("style");
        seniorPvalue.text(senior);
        swal("","Senior Discount Successfully Updated","success");
    }

    senior < 0 || isNaN(senior) ? swal("","Error Invalid Senior Discount Value","error") : updatesenior(senior);
});

//PWD SAVE BUTTON CLICK EVENT--------------------------------------------------------------------------------
pwdSave.click(() => {
    let pwd = parseFloat(pwdInputValue.val()).toFixed(2);

    const updatepwd = (pwd) => {
        firestore.collection("Vat").doc("vat").update({
            pwd : parseFloat(pwd)
        });
        pwdInputValue.css("display","none");
        pwdSave.css("display","none");
        pwdCancel.css("display","none");
        pwdPvalue.removeAttr("style");
        pwdEdit.removeAttr("style");
        pwdPvalue.text(pwd);
        swal("","Pwd Discount Successfully Updated","success");
    }

    pwd < 0 || isNaN(pwd) ? swal("","Error Invalid Pwd Discount Value","error") : updatepwd(pwd);
});

//SENIOR CANCEL BUTTON CLICK EVENT-----------------------------------------------------------------------------
seniorCancel.click(() => {
    seniorInputValue.css("display","none");
    seniorSave.css("display","none");
    seniorCancel.css("display","none");
    seniorPvalue.removeAttr("style");
    seniorEdit.removeAttr("style");
});

//PWD CANCEL BUTTON CLICK EVENT-----------------------------------------------------------------------------
pwdCancel.click(() => {
    pwdInputValue.css("display","none");
    pwdSave.css("display","none");
    pwdCancel.css("display","none");
    pwdPvalue.removeAttr("style");
    pwdEdit.removeAttr("style");
});