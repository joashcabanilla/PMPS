$(".pullbtn").click(() => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let pad = "00";
    let ctxt = "" + month;
    month = pad.substr(0, pad.length - ctxt.length) + ctxt;
    let month_year = `${month}/${year}`;

    let expiredProduct = 0;

    const allExpiredProducts = (index,code) => {
        firestore.collection("Product").doc(code).update({expirationdate: "expired"});
        ArrayGetAllProduct[index].expirationdate = "expired";
    }

    for(let i = 0; i < ArrayGetAllProduct.length; i++){
        let expirationdate = ArrayGetAllProduct[i].expirationdate;
        let code = ArrayGetAllProduct[i].code;
        
        //UPDATE EXPIRATION DATE
        expirationdate == month_year ? allExpiredProducts(i,code) : null;

        //GET ALL EXPIRED PRODUCTS
        expirationdate == "expired" ? expiredProduct++ : null;
    }

    expiredProduct == 0 ? swal("","No expired Products","info") : swal({
        title: "",
        text: `${expiredProduct} Products have been expired, Do you want to Pull Out all expired products?`,
        icon: "warning",
        buttons: ["No","Yes"],
        dangerMode: true,
    })
    .then((willDelete) => {
        if(willDelete){
            for(let i = 0; i < ArrayGetAllProduct.length; i++){
                let code = ArrayGetAllProduct[i].code;
                let productname = ArrayGetAllProduct[i].productname;
                let category = ArrayGetAllProduct[i].category;
                let brandname = ArrayGetAllProduct[i].brandname;
                let formulation = ArrayGetAllProduct[i].formulation;
                let price = ArrayGetAllProduct[i].price;
                let stocks = ArrayGetAllProduct[i].stocks;
                let unit = ArrayGetAllProduct[i].unit;
                let expirationdate = ArrayGetAllProduct[i].expirationdate;
                let image = ArrayGetAllProduct[i].image;
                let prescription = ArrayGetAllProduct[i].prescription;
                let status = ArrayGetAllProduct[i].status;

                if(expirationdate == "expired"){
                    firestore.collection("PullOutProduct").doc(code).set({
                        brandname: brandname,
                        category: category,
                        code: code,
                        expirationdate: expirationdate,
                        formulation: formulation,
                        image: image,
                        prescription: prescription,
                        price: price,
                        productname: productname,
                        status: status,
                        stocks: stocks,
                        unit: unit
                    });
                    $(`#${code}`).remove();
                    firestore.collection("Product").doc(code).delete(); 
                    ArrayGetAllProduct.splice(i,1);
                }
            }
            swal("PULL OUT EXPIRED PRODUCTS","All Expired Products successfully Pull Out","success");
    }
    });
});