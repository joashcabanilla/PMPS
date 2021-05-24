const vatPvalue = $(".Vat-pvalue");
const vatInputValue = $(".Vat-inputvalue");
const vatEdit = $(".Vat-editbtn");
const vatSave = $(".Vat-savebtn");
const vatCancel = $(".Vat-cancelbtn");

//GET DATA FROM FIRESTORE-----------------------------------------------------------------------------------------
firestore.collection("Vat").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        vatPvalue.text(parseFloat(doc.data().vat).toFixed(2));
    });
});

vatEdit.click(() => {
    vatPvalue.css("display","none");
    vatEdit.css("display","none");
    vatInputValue.removeAttr("style");
    vatSave.removeAttr("style");
    vatCancel.removeAttr("style");
    vatInputValue.val("");
});

vatSave.click(() => {
    let vat = parseFloat(vatInputValue.val()).toFixed(2);

    const updateVat = (vat) => {
        firestore.collection("Vat").doc("vat").update({
            vat : parseFloat(vat)
        });
        vatInputValue.css("display","none");
        vatSave.css("display","none");
        vatCancel.css("display","none");
        vatPvalue.removeAttr("style");
        vatEdit.removeAttr("style");
        vatPvalue.text(vat);
        swal("","Vat Value Successfully Updated","success");
    }

    vat < 0 || isNaN(vat) ? swal("","Error Invalid Vat Value","error") : updateVat(vat);
});

vatCancel.click(() => {
    vatInputValue.css("display","none");
    vatSave.css("display","none");
    vatCancel.css("display","none");
    vatPvalue.removeAttr("style");
    vatEdit.removeAttr("style");
});