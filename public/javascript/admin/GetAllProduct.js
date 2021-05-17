let ArrayGetAllProduct = [];
firestore.collection("Product").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        let objGetAllProduct = {};
        objGetAllProduct.code = doc.data().code;
        objGetAllProduct.productname = doc.data().productname;
        objGetAllProduct.category = doc.data().category;
        objGetAllProduct.brandname = doc.data().brandname;
        objGetAllProduct.formulation = doc.data().formulation;
        objGetAllProduct.price = parseFloat(doc.data().price).toFixed(2);
        objGetAllProduct.stocks = doc.data().stocks;
        objGetAllProduct.unit = doc.data().unit;
        objGetAllProduct.expirationdate = doc.data().expirationdate;
        ArrayGetAllProduct.push(objGetAllProduct);
    });
});