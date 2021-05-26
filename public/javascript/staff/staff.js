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
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
    $(".staffname").text(getCookie("staffname"));
    initclock();

    for(let i = 0;i < ArrayGetAllProduct;i++){
        let category = ArrayGetAllProduct[i].category;
        $(".category").append(`<option value="${category}">${category}</option>`);
    }
});

//LOGOUT CLICK EVENT------------------------------------------------------------------------------------------------
$(".logout").click(() => {
    $.post('/api/logout');
    $(location).attr('href', '/');
});