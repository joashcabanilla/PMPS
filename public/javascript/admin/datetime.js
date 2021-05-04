const addzero = (num) => {
    return num < 10 ? `0${num}`:num;
}
const updateclock = () => {
let now = new Date();
let month = now.getMonth() + 1;
let date = now.getDate();
let year = now.getFullYear();
let hours = addzero(now.getHours());
let mins = addzero(now.getMinutes());
let sec = addzero(now.getSeconds());
let period = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
let ids = ["month","day","year","hour","minutes","seconds","period"];
let values = [month + " /",date + " /"," " + year,hours + ":",mins + ":",sec,"  " + period];
for(let i = 0; i < ids.length; i++){
    document.querySelector(`.${ids[i]}`).firstChild.nodeValue = values[i];
}
};

const initclock = () => {
    window.setInterval("updateclock()",1);
};

$(window).on('load',() => {
$(".product_list").addClass("activelink");
$(".controlbox").css({"position" : "sticky"});
$(".categorytext").text("Product List");
initclock();

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

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "5000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

    let product_lowstocks = 0;
    firestore.collection("Product").where("stocks","<=",5).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            product_lowstocks++;
        });
        (product_lowstocks != 0) ? toastr["warning"](`${product_lowstocks} Products are Low In Stocks`) : null;
    });

    let product_expired = 0;
    firestore.collection("Product").where("expirationdate","==","expired").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            product_expired++;
        });
        (product_expired != 0) ? toastr["warning"](`${product_expired} Products have been Expired`) : null;
    });

    let product_outofstocks = 0;
    firestore.collection("Product").where("stocks","==",0).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            product_outofstocks++;
        });
        (product_outofstocks != 0) ? toastr["warning"](`${product_outofstocks} Products are Out Of Stocks`) : null;
    });
});