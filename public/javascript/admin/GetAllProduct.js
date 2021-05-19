let ArrayGetAllProduct = [];

try{
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
            objGetAllProduct.image = doc.data().image;
            objGetAllProduct.prescription = doc.data().prescription;
            objGetAllProduct.status = doc.data().status;
            ArrayGetAllProduct.push(objGetAllProduct);
        });
    
        let now = new Date();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        let pad = "00";
        let ctxt = "" + month;
        month = pad.substr(0, pad.length - ctxt.length) + ctxt;
        let month_year = `${month}/${year}`;
        
        let product_expired = 0;
        let product_outofstocks = 0;
        let product_lowstocks = 0;
        let array_category = [];
    
        const LoadrenderProductArray = (Acode,Aproductname,Acategory,Abrandname,Aformulation,Aprice,Aimage) => {
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
            $(".product-table").append(product_div);
            $("#product").append(product_div);
        }
        
        function LoadrenderCategory(data_category){
            let option = document.createElement('option');
            option.textContent = data_category;
            option.value = data_category;
            $(".category").append(option);
        }
        
        for(let i = 0; i < ArrayGetAllProduct.length; i++){
            let code = ArrayGetAllProduct[i].code;
            let productname = ArrayGetAllProduct[i].productname;
            let brandname = ArrayGetAllProduct[i].brandname;
            let formulation = ArrayGetAllProduct[i].formulation;
            let price = ArrayGetAllProduct[i].price;
            let image = ArrayGetAllProduct[i].image;
            let category = ArrayGetAllProduct[i].category;
    
            let existCategory = array_category.includes(category);
            !existCategory ? array_category.push(category) : null;
            LoadrenderProductArray(code,productname,category,brandname,formulation,price,image);
        }
        for(let a = 0; a < array_category.length; a++){
            LoadrenderCategory(array_category[a]);
        }
        
        try{
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "10000",
                "hideDuration": "10000",
                "timeOut": "10000",
                "extendedTimeOut": "10000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            
            const UpdateArrayExpirationDate = (index,code) => {
                firestore.collection("Product").doc(code).update({expirationdate: "expired"});
                ArrayGetAllProduct[index].expirationdate = "expired";
            }
            for(let i = 0; i < ArrayGetAllProduct.length; i++){
                let expirationdate = ArrayGetAllProduct[i].expirationdate;
                let stocks = ArrayGetAllProduct[i].stocks;
                let code = ArrayGetAllProduct[i].code;
            
                //UPDATE EXPIRATION DATE
                expirationdate == month_year ? UpdateArrayExpirationDate(i,code) : null;
            
                //NOTIFICATION FOR EXPIRED,OUT OF STOCKS AND LOW IN STOCKS
                expirationdate == "expired" ? product_expired++ : null;
                parseInt(stocks) == 0 ? product_outofstocks++ : null;
                parseInt(stocks) <= 5 && parseInt(stocks) != 0 ? product_lowstocks++ : null;
            }
            
            product_expired != 0 ? toastr["warning"](`${product_expired} Products have been Expired`) : null;
            product_outofstocks != 0 ? toastr["warning"](`${product_outofstocks} Products are Out Of Stocks`) : null;
            product_lowstocks != 0 ? toastr["warning"](`${product_lowstocks} Products are Low In Stocks`) : null;    
        }
        catch{}
    });
}
catch{
    console.log("CAN'T CONNECT TO FIREBASE FIRESTORE");
}


