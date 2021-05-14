//CLEAR TEXTBOX EACH LINKS--------------------------------------------------------------------------------------
const clear_productlist = () => {
  const product = $(".product-table");
  $(".productsearch").val("");
  $(".category").val("All");
  product.empty();
  // firestore.collection("Product").orderBy('code',"asc").get().then((snapshot) => {
  //         snapshot.docs.forEach(doc => {
  //             renderProduct(doc);
  //         })
  //     });
};
const clear_stock_in_entry = () => {
  $(".SIE-search").val("");
  $(".SIE-date_received").val("");
  $(".SIE-total_stock").text("0");
  $(".SIE-product_table").empty();
  let tr =
    "<tr><th>Code</th><th>Product Name</th><th>Category</th><th>Brand Name</th><th>Stock</th><th>Button</th></tr>";
  $(".SIE-product_table").append(tr);
};
const clear_stock_in_history = () => {
  $(".SIH-stock_received").text("0");
  let thead = `<tr><th>Code</th><th>Productname</th><th>Category</th><th>Brandname</th><th>Formulation</th>
    <th>Stocks</th><th>Date Received</th></tr>`;
  $(".SIH-table").empty();
  $(".SIH-table").append(thead);
  $(".SIH-date_received").val("");
}
const clear_all = (link) => {
  switch (link) {
    case "product_list":
      clear_stock_in_entry();
      clear_stock_in_history();
      break;
    case "stock_in_entry":
      clear_productlist();
      clear_stock_in_history();
      break;
    case "stock_in_history":
      clear_productlist();
      clear_stock_in_entry();
      break;
  }
};
//CLICK EVENT OF LINKS-------------------------------------------------------------------------------------------
const deactivelink = () => {
  $(".div-ProductList").css("display", "none");
  $(".div-StockInEntry").css("display", "none");
  $(".div-StockInHistory").css("display", "none");
  $(".div-ProductStockStatus").css("display", "none");
  $(".div-PullOutProductHistory").css("display", "none");
  $(".div-DiscountVat").css("display", "none");
  $(".div-StaffAccount").css("display", "none");
  $(".div-AdminAccount").css("display", "none");
  $(".div-SalesDashboard").css("display", "none");
  $(".div-ProductSold").css("display", "none");
  $(".div-OnlineOrder").css("display", "none");
};
$(window).on("load", () => {
  deactivelink();
  $(".div-ProductList").css("display", "flex");
});
$(".product_list").click(() => {
  deactivelink();
  $(".div-ProductList").css("display", "flex");
  // let product_expired = 0;
  // firestore.collection("Product").where("expirationdate","==","expired").get().then(snapshot => {
  //     snapshot.docs.forEach(doc => {
  //         product_expired++;
  //     });
  //     (product_expired != 0) ? toastr["warning"](`${product_expired} Products have been Expired`) : null;
  // });

  // let product_outofstocks = 0;
  // firestore.collection("Product").where("stocks","==",0).get().then(snapshot => {
  //     snapshot.docs.forEach(doc => {
  //         product_outofstocks++;
  //     });
  //     (product_outofstocks != 0) ? toastr["warning"](`${product_outofstocks} Products are Out Of Stocks`) : null;
  // });

  // let product_lowstocks = 0;
  // firestore.collection("Product").where("stocks","<=",5).get().then(snapshot => {
  //     snapshot.docs.forEach(doc => {
  //         product_lowstocks++;
  //     });
  //     (product_lowstocks != 0) ? toastr["warning"](`${product_lowstocks} Products are Low In Stocks`) : null;
  // });
  clear_all("product_list");
});
$(".stock_in_entry").click(() => {
  deactivelink();
  $(".div-StockInEntry").css("display", "flex");
  clear_all("stock_in_entry");
});
$(".stock_in_history").click(() => {
  deactivelink();
  $(".div-StockInHistory").css("display", "flex");
  clear_all("stock_in_history");
});
$(".product_stock_status").click(() => {
  deactivelink();
  $(".div-ProductStockStatus").css("display", "flex");
  clear_all("product_stock_status");
});
$(".pull_out_product").click(() => {
  deactivelink();
  $(".div-PullOutProductHistory").css("display", "flex");
  clear_all("pull_out_product");
});
$(".discountvat").click(() => {
  deactivelink();
  $(".div-DiscountVat").css("display", "flex");
  clear_all("discountvat");
});
$(".staff_account").click(() => {
  deactivelink();
  $(".div-StaffAccount").css("display", "flex");
  clear_all("staff_account");
});
$(".admin_account").click(() => {
  deactivelink();
  $(".div-AdminAccount").css("display", "flex");
  clear_all("admin_account");
});
$(".sales_dashboard").click(() => {
  deactivelink();
  $(".div-SalesDashboard").css("display", "flex");
  clear_all("sales_dashboard");
});
$(".product_sold").click(() => {
  deactivelink();
  $(".div-ProductSold").css("display", "flex");
  clear_all("product_sold");
});
$(".online_order").click(() => {
  deactivelink();
  $(".div-OnlineOrder").css("display", "flex");
  clear_all("online_order");
});

const checkmenu = () => {
  let active = $(".div-sidemenu").hasClass("show");
  if (active) {
    $(".div-sidemenu").scrollTop(0);
    const body = document.body;
    body.scrollTo = 0;
    document.documentElement.scrollTop = 0;
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      (window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      });
    body.style.overflow = "hidden";
    $(".controlbox").removeAttr("style");
    $(".SIH-table tr th").removeAttr("style");
  } else {
    const body = document.body;
    body.style.overflow = "auto";
    window.onscroll = function () {};
    $(".controlbox").css({ position: "sticky" });
    $(".SIH-table tr th").css({ position: "sticky" });
  }
};
$(".sidemenu").click(() => {
  $(".Productlist-div-print").css("display", "none");
  $(".product-info").css("display", "none");
  $(".div-addproduct").css("display", "none");
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
const classname = [
  "product_list",
  "stock_in_entry",
  "stock_in_history",
  "product_stock_status",
  "pull_out_product",
  "discountvat",
  "staff_account",
  "admin_account",
  "sales_dashboard",
  "product_sold",
];
const categorytext = [
  "Product List",
  "Stock In Entry",
  "Stock In History",
  "Product Stock Status",
  "Pull Out Product",
  "Discount",
  "Vat",
  "Staff Account",
  "Admin Account",
  "Sales Dashboard",
  "Product Sold",
];
for (let i = 0; i < classname.length; i++) {
  $(`.${classname[i]}`).click(() => {
    let online_order = $(`.${classname[i]}`);
    removeclass_active();
    addclass_active(online_order);
    $(".categorytext").text(`${categorytext[i]}`);
    if (
      classname[i] == classname[0] ||
      classname[i] == classname[1] ||
      classname[i] == classname[2] ||
      classname[i] == classname[3] ||
      classname[i] == classname[4] ||
      classname[i] == classname[5]
    ) {
      $(".category-active").text("PRODUCT INVENTORY");
    } else if (classname[i] == classname[6] || classname[i] == classname[7]) {
      $(".category-active").text("MANAGE ACCOUNT");
    } else if (classname[i] == classname[8] || classname[i] == classname[9]) {
      $(".category-active").text("SALES");
    }
  });
}
$(".logout").click(() => {
  $.post("/api/logout");
  $(location).attr("href", "/");
});
