const addbtn = $(".addbtn");
const div_addproduct = $(".div-addproduct");
const closebtn =  $(".AP-closebtn-info");
const uploadbtn = $(".uploadbtn");

//METHOD FOR DISABLE SCROLL----------------------------------------------------------------------------------------
const disableScroll = () => {
    const body = document.body;
        body.scrollTo = 0;
        document.documentElement.scrollTop = 0;
        let scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
    let html = jQuery('html');
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}
//CLICK EVENT FOR ADD PRODUCT--------------------------------------------------------------------------------------
addbtn.click(() => {
    setTimeout(() => {
        $(".AP-productname").focus();
    }, 500);

    div_addproduct.css("display","flex");
    disableScroll(); 
    
    let productcode = $(".AP-productcode-data");
    let productname = $(".AP-productname");
    let category = $(".AP-category");
    let category_arry = [];
    let brandname = $(".AP-brandname");
    let brandname_arry = [];
    let formulation = $(".AP-formulation");
    let expirationdate = $(".AP-expirationdate");
    let product_image_file = $(".AP-uploadimage");
    let product_image = $(".AP-productdata-image"); 
    let unit_arry = [];
    let formulation_arry = [];

    productname.val("");
    category.val("");
    brandname.val("");
    formulation.val("");
    expirationdate.val("");
    product_image_file.val("");
    product_image.attr("src","/image/upload.png");
    $(".AP-price").val("");
    $(".AP-stocks").val("");
    $(".AP-unit").val("");

    firestore.collection("Product").orderBy("code","desc").limit(1).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let pad = "000000";
            let code = parseInt(doc.data().code.substring(1));
            code++;
            let ctxt = "" + code;
            productcode.text(`Product Code: M${pad.substr(0, pad.length - ctxt.length) + ctxt}`);
        })
    });

    firestore.collection("Category").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            category_arry.push(doc.data().category);
            category.autocomplete({
                source: category_arry,
                autoFocus: true,
                classes: {
                    "ui-autocomplete": "highlight"}
            });
        });
    });

    firestore.collection("Brandname").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            brandname_arry.push(doc.data().brandname);
            brandname.autocomplete({
                source: brandname_arry,
                autoFocus: true,
                classes: {
                    "ui-autocomplete": "highlight"}
            });
        });
    });

    firestore.collection("Product").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            unit_arry.push(doc.data().unit);
            $(".AP-unit").autocomplete({
                source: unit_arry,
                autoFocus: true,
                classes: {
                    "ui-autocomplete": "highlight"}
            });
        });
    });

    firestore.collection("Product").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            formulation_arry.push(doc.data().formulation);
            $(".AP-formulation").autocomplete({
                source: formulation_arry,
                autoFocus: true,
                classes: {
                    "ui-autocomplete": "highlight"}
            });
        });
    });

    expirationdate.keydown(function(e){
        e.keyCode == 9 ? setTimeout(() => {$(".AP-price").focus();}, 500) : e.preventDefault();
    });

    expirationdate.datepicker({
        dateFormat: "mm/yy",
        changeMonth: true,
        changeYear: true,
        onClose: function(dateText, inst) { 
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });
});
//CLICK EVENT FOR CLOSE ADD PRODUCT------------------------------------------------------------------------------------------------------------
closebtn.click(() => {
    div_addproduct.css("display","none");
    enablescroll();
});
//CLICK EVENT FOR UPLOAD PRODUCT IMAGE-----------------------------------------------------------------------------
uploadbtn.click(() => {
    try{
        $(".AP-uploadimage").trigger("click");
        $(".AP-uploadimage").change((e) => {
            let image = URL.createObjectURL(e.target.files[0]);
            $("#AP-editimage").attr("src",image);
        });
    }
    catch(err){}
});
//ADD PRODUCT FORM-------------------------------------------------------------------------------------------------
$(".AP-form").submit((e) => {
    e.preventDefault();
});

//FUNCTION OF ADDPRODUCT-------------------------------------------------------------------------------------------
const addproduct = (image) => {
    let code = $(".AP-productcode-data").text().substring(14);
    let productname = $(".AP-productname").val();
    let category = $(".AP-category").val();
    let brandname = $(".AP-brandname").val();
    let formulation = $(".AP-formulation").val();
    let prescription = $(".AP-prescription").val();
    let expirationdate = $(".AP-expirationdate").val();
    let price =  parseFloat($(".AP-price").val());
    let stocks = parseInt($(".AP-stocks").val());
    let unit = $(".AP-unit").val();

    const capSearch = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    let words = productname.split(' ').map(capSearch);
    productname = words.join(' ');

    let w_category = category.split(' ').map(capSearch);
    category = w_category.join(' ');

    let w_brandname = brandname.split(' ').map(capSearch);
    brandname = w_brandname.join(' ');

    let w_formulation = formulation.split(' ').map(capSearch);
    formulation = w_formulation.join(' ');

    let existProduct = firestore.collection("Product").where("code","!=",`${code}`).where("productname","==",`${productname}`).where("category","==",`${category}`).where("brandname","==",`${brandname}`).where("formulation","==",`${formulation}`).where("price","==",price).where("expirationdate","==",`${expirationdate}`).where("prescription","==",`${prescription}`).where("status","==","active");

    existProduct.get().then((doc) => {
        if(!doc.empty){
            swal("ERROR", "Product is already exist", "error");
        }
        else{
            firestore.collection("Product").doc(code).set({
                brandname: brandname,
                category: category,
                code: code,
                expirationdate: expirationdate,
                formulation: formulation,
                image: image,
                prescription: prescription,
                price: price,
                productname: productname,
                status: "active",
                stocks: stocks,
                unit: unit
            });
            firestore.collection("Category").doc(category).set({
                category: category
            });
            
            firestore.collection("Brandname").doc(brandname).set({
                brandname: brandname
            });

            swal({
                title: "PRODUCT ADDED",
                text: `${productname} successfully saved`,
                icon: "success"
            }).then(() => {
                setTimeout(() => {
                    $(".AP-productname").focus();
                }, 500);
            });

            $(".AP-productdata-image").attr("src","/image/upload.png");
            $(".AP-uploadimage").val("");
            $(".AP-productname").val("");
            $(".AP-category").val("");
            $(".AP-brandname").val("");
            $(".AP-formulation").val("");
            $(".AP-prescription").val("Not Required");
            $(".AP-expirationdate").val("");
            $(".AP-price").val("");
            $(".AP-stocks").val("");
            $(".AP-unit").val("");

            firestore.collection("Product").orderBy("code","desc").limit(1).get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    let pad = "000000";
                    let code = parseInt(doc.data().code.substring(1));
                    code++;
                    let ctxt = "" + code;
                    $(".AP-productcode-data").text(`Product Code: M${pad.substr(0, pad.length - ctxt.length) + ctxt}`);
                })
            });
            
            $(".product-table").empty();
            firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    renderProduct(doc);
                })
            });

            let category_arry = [];
            firestore.collection("Category").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    category_arry.push(doc.data().category);
                    $(".AP-category").autocomplete({
                        source: category_arry,
                        autoFocus: true,
                        classes: {
                            "ui-autocomplete": "highlight"}
                    });
                });
            });
        
            let brandname_arry = [];
            firestore.collection("Brandname").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    brandname_arry.push(doc.data().brandname);
                    $(".AP-brandname").autocomplete({
                        source: brandname_arry,
                        autoFocus: true,
                        classes: {
                            "ui-autocomplete": "highlight"}
                    });
                });
            });
            
            let unit_arry = [];
            firestore.collection("Product").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    unit_arry.push(doc.data().unit);
                    $(".AP-unit").autocomplete({
                        source: unit_arry,
                        autoFocus: true,
                        classes: {
                            "ui-autocomplete": "highlight"}
                    });
                });
            });
            
            let formulation_arry = [];
            firestore.collection("Product").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    formulation_arry.push(doc.data().formulation);
                    $(".AP-formulation").autocomplete({
                        source: formulation_arry,
                        autoFocus: true,
                        classes: {
                            "ui-autocomplete": "highlight"}
                    });
                });
            });
        }
    })
}
//CLICK EVENT FOR ADD PRODUCT BUTTON-------------------------------------------------------------------------------
$(".AP-savebtn").click(() => {
    try{
        let file = $(".AP-uploadimage").get(0).files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            addproduct(reader.result);
        }
    }
    catch(err){
        swal("","Image of Product is required", "warning");
    }
});
//FOCUS OUT PRICE-------------------------------------------------------------------------------------------------
$(".AP-price").focusout(() => {
    let price = $(".AP-price").val();
    $(".AP-price").val(parseFloat(price).toFixed(2));
});

const all_product = () => {
    let number_row = 0;
    firestore.collection("Product").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
           let tr =  $("<tr>")
           .append($("<td>").text(doc.data().code))
           .append($("<td>").text(doc.data().productname))
           .append($("<td>").text(doc.data().category))
           .append($("<td>").text(doc.data().brandname))
           .append($("<td>").text(doc.data().formulation))
           .append($("<td>").text(parseFloat(doc.data().price).toFixed(2)));
           $(".PL-table > tbody:last-child").append(tr);
        });
    });
}

const print_product = (category) => {
    let number_row = 0;
    firestore.collection("Product").where("category","==",`${category}`).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
           let tr =  $("<tr>")
           .append($("<td>").text(doc.data().code))
           .append($("<td>").text(doc.data().productname))
           .append($("<td>").text(doc.data().category))
           .append($("<td>").text(doc.data().brandname))
           .append($("<td>").text(doc.data().formulation))
           .append($("<td>").text(parseFloat(doc.data().price).toFixed(2)));
           number_row++;
           (number_row <= 25) ? $(".PL-table > tbody:last-child").append(tr) : null;
        });
    });
}

const table_th = () => {
    let th = $("<tr>").attr("class","table-head")
    .append($("<th>").text("Code"))
    .append($("<th>").text("ProductName"))
    .append($("<th>").text("Category"))
    .append($("<th>").text("BrandName"))
    .append($("<th>").text("Formulation"))
    .append($("<th>").text("Price"));
    $(".PL-table").append(th);
}

//CLICK EVENT FOR PRINTING PRODUCTLIST----------------------------------------------------------------------------
$(".printbtn").click(() => {
    disableScroll();
    $(".Productlist-div-print").css("display","flex");
    $(".Productlist-print").css("display","flex");
    const addzero = (num) => {
            return num < 10 ? `0${num}`:num;
        }
        let now = new Date();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let year = now.getFullYear();
        let hours = addzero(now.getHours());
        let mins = addzero(now.getMinutes());
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        let date_time = `${month}/${date}/${year} ${hours}:${mins} ${period}`;
        $(".Productlist-date_time").text(date_time);
        table_th();
        all_product();
});
//CATEGORY FOR PRINT PRODUCTLIST----------------------------------------------------------------------------------
function productlist_print_renderCategory(doc){
    let option = document.createElement('option');
    option.textContent = doc.data().category;
    option.value = doc.data().category;
    $(".Productlist-print-category").append(option);
}

firestore.collection("Category").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        productlist_print_renderCategory(doc);
    })
})
//CLICK EVENT FOR CANCEL PRINT PRODUCTLIST-------------------------------------------------------------------------
$(".Productlist-cancelbtn").click(() => {
    enablescroll();
    $(".Productlist-div-print").css("display","none");
    $(".Productlist-print").css("display","none");
    $(".Productlist-print-category").val("All");
    $(".PL-table").empty();
});
//CLICK EVENT FOR PRINT PRODUCTLIST--------------------------------------------------------------------------------
$(".Productlist-printbtn").click(() => {
    $(".Productlist-print").css("display","flex");
        $(".Productlist-print").printThis({
        debug: false,
        importCSS: true,
        importStyle: true,
        loadCSS: null,
        printDelay: 300,
        header: null,               
        footer: null, 
        beforePrintEvent:null,     
        beforePrint:null,
        afterPrint: null     
    });
});

//CHANGE EVENT FOR PRINT PRODUCTLIST CATEGORY----------------------------------------------------------------------
$(".Productlist-print-category").change(() => {
    $(".PL-table").empty();
    let category = $(".Productlist-print-category").val();
    table_th();
    (category == "All") ? all_product():print_product(category);
});

