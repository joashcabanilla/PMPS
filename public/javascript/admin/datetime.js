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

});