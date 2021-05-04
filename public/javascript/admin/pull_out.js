$(".pullbtn").click(() => {
let now = new Date();
let month = now.getMonth() + 1;
let year = now.getFullYear();
let pad = "00";
let ctxt = "" + month;
month = pad.substr(0, pad.length - ctxt.length) + ctxt;
let month_year = `${month}/${year}`;

firestore.collection("Product").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        if(doc.data().expirationdate == month_year){
            firestore.collection("Product").doc(doc.id).update({
                expirationdate: "expired"
            });
        }
    });
});

let expiredProduct = 0;
firestore.collection("Product").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        if(doc.data().expirationdate == "expired"){
            expiredProduct++;
        }

        (expiredProduct == 0) ? swal("","No expired Products","info") : swal({
            title: "",
            text: `${expiredProduct} Products have been expired, Do you want to Pull Out all expired products?`,
            icon: "warning",
            buttons: ["No","Yes"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete){
                firestore.collection("Product").get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if(doc.data().expirationdate == "expired"){
                            firestore.collection("Product").doc(doc.id).delete();
                            firestore.collection("Brandname").doc(doc.data().brandname).delete();
                            firestore.collection("Category").doc(doc.data().category).delete();
                        }
                    });
                });
                swal("PULL OUT EXPIRED PRODUCTS","All Expired Products successfully Pull Out","success");

                firestore.collection("Product").orderBy('code',"asc").onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if(change.type == "removed"){
                            firestore.collection("PullOutProduct").doc(change.doc.id).set({
                                brandname: change.doc.data().brandname,
                                category: change.doc.data().category,
                                code: change.doc.data().code,
                                expirationdate: change.doc.data().expirationdate,
                                formulation: change.doc.data().formulation,
                                image: change.doc.data().image,
                                prescription: change.doc.data().prescription,
                                price: change.doc.data().price,
                                productname: change.doc.data().productname,
                                status: change.doc.data().status,
                                stocks: change.doc.data().stocks,
                                unit: change.doc.data().unit
                            });
                            $(`#${change.doc.id}`).remove();
                        }
                    });
                });
        }
        });
    });
});
});