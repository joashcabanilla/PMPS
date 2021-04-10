const checkmenu = () => {
    let active = $(".div-sidemenu").hasClass("show");
    if(active){
    $(".div-sidemenu").scrollTop(0);
    const body = document.body;
    body.scrollTo = 0;
    document.documentElement.scrollTop = 0;
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
    body.style.overflow = "hidden";
    }
    else{
    const body = document.body;
    body.style.overflow = "auto";
    window.onscroll = function() {};
    }
};
$(".sidemenu").click(() => {
    $(".div-sidemenu").toggleClass("show");
    checkmenu();
});
$(".div-function").click(() => {
    $(".div-sidemenu").removeClass("show");
    checkmenu();
});
//sidemenu bar link animation-----------------------------------------------------------------------------------
const addclass_active = (activelink) => {
    activelink.addClass("activelink");
};
const removeclass_active = () => {
    $(".product_list").removeClass("activelink");
    $(".stock_in_entry").removeClass("activelink");
    $(".stock_in_history").removeClass("activelink");
    $(".product_stock_status").removeClass("activelink");
    $(".pull_out_product").removeClass("activelink");
    $(".discount").removeClass("activelink");
    $(".vat").removeClass("activelink");
    $(".staff_account").removeClass("activelink");
    $(".admin_account").removeClass("activelink");
    $(".sales_dashboard").removeClass("activelink");
    $(".product_sold").removeClass("activelink");
    $(".online_order").removeClass("activelink");
};
$(".link-product").click(() => {
    $("nav ul .show-product").toggleClass("show1");
    $("nav ul .first").toggleClass("rotate");
    $(".category-active").text("PRODUCT INVENTORY");
});
$(".link-account").click(() => {
    $("nav ul .show-account").toggleClass("show2");
    $("nav ul .second").toggleClass("rotate");
    $(".category-active").text("MANAGE ACCOUNT");
});
$(".link-sales").click(() => {
    $("nav ul .show-sales").toggleClass("show3");
    $("nav ul .third").toggleClass("rotate");
    $(".category-active").text("SALES");
});
$(".online_order").click(() => {
    $(".category-active").text("ONLINE ORDER");
    let online_order = $(".online_order");
    removeclass_active();
    addclass_active(online_order);
});
const classname = ["product_list","stock_in_entry","stock_in_history","product_stock_status","pull_out_product","discount","vat","staff_account","admin_account","sales_dashboard","product_sold"];
for(let i = 0; i < classname.length; i++){
    $(`.${classname[i]}`).click(() => {
        let online_order = $(`.${classname[i]}`);
        removeclass_active();
        addclass_active(online_order);
        
    if(classname[i] == classname[0] || classname[i] == classname[1] || classname[i] == classname[2] || classname[i] == classname[3] || classname[i] == classname[4] || classname[i] == classname[5] || classname[i] == classname[6]){
        $(".category-active").text("PRODUCT INVENTORY");
    }
    else if(classname[i] == classname[7] || classname[i] == classname[8]){
        $(".category-active").text("MANAGE ACCOUNT");
    }
    else if(classname[i] == classname[9] || classname[i] == classname[10]){
        $(".category-active").text("SALES");
    }
    });
}
$(".logout").click(() => {
    $.post("/api/logout");
    $(location).attr('href', '/');
});