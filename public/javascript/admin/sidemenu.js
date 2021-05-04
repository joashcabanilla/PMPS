//CLICK EVENT OF LINKS-------------------------------------------------------------------------------------------
const deactivelink = () => {
    $(".div-ProductList").css("display","none");
    $(".div-StockInEntry").css("display","none");
    $(".div-StockInHistory").css("display","none");
    $(".div-ProductStockStatus").css("display","none");
    $(".div-PullOutProductHistory").css("display","none");
    $(".div-DiscountVat").css("display","none");
    $(".div-StaffAccount").css("display","none");
    $(".div-AdminAccount").css("display","none");
    $(".div-SalesDashboard").css("display","none");
    $(".div-ProductSold").css("display","none");
    $(".div-OnlineOrder").css("display","none");
    }
    $(window).on('load',() => {
        deactivelink();
        $(".div-ProductList").css("display","flex");
    });
    $(".product_list").click(() => {
        deactivelink();
        $(".div-ProductList").css("display","flex");
    });
    $(".stock_in_entry").click(() => {
        deactivelink();
        $(".div-StockInEntry").css("display","flex");
    });
    $(".stock_in_history").click(() => {
        deactivelink();
        $(".div-StockInHistory").css("display","flex");
    });
    $(".product_stock_status").click(() => {
        deactivelink();
        $(".div-ProductStockStatus").css("display","flex");
    });
    $(".pull_out_product").click(() => {
        deactivelink();
        $(".div-PullOutProductHistory").css("display","flex");
    });
    $(".discountvat").click(() => {
        deactivelink();
        $(".div-DiscountVat").css("display","flex");
    });
    $(".staff_account").click(() => {
        deactivelink();
        $(".div-StaffAccount").css("display","flex");
    });
    $(".admin_account").click(() => {
        deactivelink();
        $(".div-AdminAccount").css("display","flex");
    });
    $(".sales_dashboard").click(() => {
        deactivelink();
        $(".div-SalesDashboard").css("display","flex");
    });
    $(".product_sold").click(() => {
        deactivelink();
        $(".div-ProductSold").css("display","flex");
    });
    $(".online_order").click(() => {
        deactivelink();
        $(".div-OnlineOrder").css("display","flex");
    });

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
    $(".controlbox").removeAttr("style");
    }
    else{
    const body = document.body;
    body.style.overflow = "auto";
    window.onscroll = function() {};
    $(".controlbox").css({"position" : "sticky"});
    }
};
$(".sidemenu").click(() => {
    $(".Productlist-div-print").css("display","none");
    $(".product-info").css("display","none");
    $(".div-addproduct").css("display","none");
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
    $(".discountvat").removeClass("activelink");
    $(".staff_account").removeClass("activelink");
    $(".admin_account").removeClass("activelink");
    $(".sales_dashboard").removeClass("activelink");
    $(".product_sold").removeClass("activelink");
    $(".online_order").removeClass("activelink");
};
$(".link-product").click(() => {
    $("nav ul .show-product").toggleClass("show1");
    $("nav ul .first").toggleClass("rotate");
});
$(".link-account").click(() => {
    $("nav ul .show-account").toggleClass("show2");
    $("nav ul .second").toggleClass("rotate");
});
$(".link-sales").click(() => {
    $("nav ul .show-sales").toggleClass("show3");
    $("nav ul .third").toggleClass("rotate");
});
$(".online_order").click(() => {
    $(".category-active").text("ONLINE ORDER");
    let online_order = $(".online_order");
    removeclass_active();
    addclass_active(online_order);
});
const classname = ["product_list","stock_in_entry","stock_in_history","product_stock_status","pull_out_product","discountvat","staff_account","admin_account","sales_dashboard","product_sold"];
const categorytext = ["Product List","Stock In Entry","Stock In History","Product Stock Status","Pull Out Product","Discount","Vat","Staff Account","Admin Account","Sales Dashboard","Product Sold"];
for(let i = 0; i < classname.length; i++){
    $(`.${classname[i]}`).click(() => {
        let online_order = $(`.${classname[i]}`);
        removeclass_active();
        addclass_active(online_order);
        $(".categorytext").text(`${categorytext[i]}`);
    if(classname[i] == classname[0] || classname[i] == classname[1] || classname[i] == classname[2] || classname[i] == classname[3] || classname[i] == classname[4] || classname[i] == classname[5]){
        $(".category-active").text("PRODUCT INVENTORY");
    }
    else if(classname[i] == classname[6] || classname[i] == classname[7]){
        $(".category-active").text("MANAGE ACCOUNT");
    }
    else if(classname[i] == classname[8] || classname[i] == classname[9]){
        $(".category-active").text("SALES");
    }
    });
}
$(".logout").click(() => {
    $.post("/api/logout");
    $(location).attr('href', '/');
});
