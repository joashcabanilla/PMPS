//CLEAR TEXTBOX EACH LINKS--------------------------------------------------------------------------------------
const clear_productlist = () => {
  const product = $(".product-table");
  $(".productsearch").val("");
  $(".category").val("All");
  product.empty();
  for(let i = 0; i < ArrayGetAllProduct.length;i++){
    let code = ArrayGetAllProduct[i].code;
    let productname = ArrayGetAllProduct[i].productname;
    let category = ArrayGetAllProduct[i].category;
    let brandname = ArrayGetAllProduct[i].brandname;
    let formulation = ArrayGetAllProduct[i].formulation;
    let price = ArrayGetAllProduct[i].price;
    let image = ArrayGetAllProduct[i].image;
    renderProductArray(code,productname,category,brandname,formulation,price,image);
  }
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

const clear_product_stock_status = () => {
  $(".PSS-status").val("Total Stocks Per Product");
  $(".PSS-search").val("");
  $(".PSS-removebtn").attr("disabled",true);
  $(".PSS-table").empty();
  let tr = `<tr>
  <th>Code</th>
  <th>Productname</th>
  <th>Category</th>
  <th>Brandname</th>
  <th>Formulation</th>
  <th>Price</th>
  <th>Stocks</th>
</tr>`;
$(".PSS-table").append(tr);
  let expired = 0;
  let low_stocks = 0;
  let out_stocks = 0;

  for(let i = 0; i < ArrayGetAllProduct.length;i++){
    let code = ArrayGetAllProduct[i].code;
    let productname = ArrayGetAllProduct[i].productname;
    let category = ArrayGetAllProduct[i].category;
    let brandname = ArrayGetAllProduct[i].brandname;
    let formulation = ArrayGetAllProduct[i].formulation;
    let price = ArrayGetAllProduct[i].price;
    let stocks = ArrayGetAllProduct[i].stocks;
    let unit = ArrayGetAllProduct[i].unit;
    let expirationdate = ArrayGetAllProduct[i].expirationdate;
    let td_color = "";
    parseInt(stocks) == 0 ? td_color = "#CF352E" : parseInt(stocks) <= 5 && parseInt(stocks) != 0 ? td_color = "#F8DE7E" : td_color = "#bbeaff";
    let tr = `<tr>
                <td style="background-color: ${td_color};">${code}</td>
                <td style="background-color: ${td_color};">${productname}</td>
                <td style="background-color: ${td_color};">${category}</td>
                <td style="background-color: ${td_color};">${brandname}</td>
                <td style="background-color: ${td_color};">${formulation}</td>
                <td style="text-align:center; background-color: ${td_color};">${parseFloat(price).toFixed(2)}</td>
                <td style="text-align:center; background-color: ${td_color};">${stocks} ${unit}</td>
            </tr>`;
    $(".PSS-table").append(tr);
    expirationdate == "expired" ? expired++ : null;
    parseInt(stocks) == 0 ? out_stocks++ : null;
    parseInt(stocks) <= 5 && parseInt(stocks) != 0 ? low_stocks++ : null;
  }

  $(".PSS-expired").text(expired);
  $(".PSS-low_stocks").text(low_stocks);
  $(".PSS-out_stocks").text(out_stocks);
}

const clear_pull_out_product = () => {
  $(".PPH-search").val("");
  let th = `<tr>
            <th>Code</th>
            <th>Productname</th>
            <th>Category</th>
            <th>Brandname</th>
            <th>Formulation</th>
            <th>Price</th>
          </tr>`;
  $(".PPH-table").empty();
  $(".PPH-table").append(th);

  for(let i = 0; i < ArrayGetAllPullOutProduct.length; i++){
    let code = ArrayGetAllPullOutProduct[i].code;
    let productname = ArrayGetAllPullOutProduct[i].productname;
    let category = ArrayGetAllPullOutProduct[i].category;
    let brandname = ArrayGetAllPullOutProduct[i].brandname;
    let formulation = ArrayGetAllPullOutProduct[i].formulation;
    let price = ArrayGetAllPullOutProduct[i].price;

    let td = `<tr>
                <td>${code}</td>
                <td>${productname}</td>
                <td>${category}</td>
                <td>${brandname}</td>
                <td>${formulation}</td>
                <td>${price}</td>
            </tr>`
    $(".PPH-table").append(td);
  }
}

const clear_discountvat = () => {
    firestore.collection("Vat").get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        $(".Vat-pvalue").text(parseFloat(doc.data().vat).toFixed(2));
        $(".senior-pvalue").text(parseFloat(doc.data().senior).toFixed(2));
        $(".pwd-pvalue").text(parseFloat(doc.data().pwd).toFixed(2));
      });
  });
  $(".Vat-inputvalue").css("display","none");
  $(".Vat-savebtn").css("display","none");
  $(".Vat-cancelbtn").css("display","none");
  $(".senior-inputvalue").css("display","none");
  $(".senior-savebtn").css("display","none");
  $(".senior-cancelbtn").css("display","none");
  $(".pwd-inputvalue").css("display","none");
  $(".pwd-savebtn").css("display","none");
  $(".pwd-cancelbtn").css("display","none");
}

const clear_staff_account = () => {
$(".SA-search").val("");
$(".SA-AccountStatus").val("ACTIVE");
$(".SA-table").empty();
let th = ` <tr>
<th>First Name</th>
<th>Last Name</th>
<th>Sex</th>
<th>Email</th>
<th>Button</th>
</tr>`;
$(".SA-table").append(th);
for(let i = 0; i < ArrayGetAllStaffAccount.length; i++){
  let username = ArrayGetAllStaffAccount[i].username;
  let email = ArrayGetAllStaffAccount[i].email;
  let firstname = ArrayGetAllStaffAccount[i].firstname;
  let lastname = ArrayGetAllStaffAccount[i].lastname;
  let sex = ArrayGetAllStaffAccount[i].sex;
  let status = ArrayGetAllStaffAccount[i].status;

  let td = `<tr class="${username}">
              <td>${firstname}</td>
              <td>${lastname}</td>
              <td>${sex}</td>
              <td>${email}</td>
              <td style="text-align:center;">
                  <div style="display:flex; justify-content: space-around; align-items: center;">
                  <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                  border-radius: 8px;
                  box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                  background: #b7dbed;
                  outline: none;
                  border-color: #b7dbed;
                  color: green;" class="fas fa-edit fa-lg" id="edit-${username}"></button>
                  
                  <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                  border-radius: 8px;
                  box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                  background: #b7dbed;
                  outline: none;
                  border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${username}"></button>
                  </div>
              </td>
          </tr>`;
          status == "active" ? $(".SA-table").append(td) : null;
}
}

const clear_admin_account = () => {
firestore.collection("Account").doc("sva1ootNyElZeI6XTHcS").get().then(doc => {
    $(".AA-username").val(doc.data().username);
  });
}

const clear_customer_account = () => {
  $(".CA-search").val("");
  $(".CA-AccountStatus").val("ACTIVE");
  $(".CA-table").empty();
  let th = ` <tr>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Contact No</th>
  <th>Email</th>
  <th>Button</th>
  </tr>`;
  $(".CA-table").append(th);
  for(let i = 0; i < ArrayGetAllCustomerAccount.length; i++){
    let email = ArrayGetAllCustomerAccount[i].email;
    let firstname = ArrayGetAllCustomerAccount[i].firstname;
    let lastname = ArrayGetAllCustomerAccount[i].lastname;
    let contactnumber = ArrayGetAllCustomerAccount[i].contactnumber;
    let status = ArrayGetAllCustomerAccount[i].status;
    let password = ArrayGetAllCustomerAccount[i].password;
    let td = `<tr class="${email}">
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>0${contactnumber}</td>
                <td>${email}</td>
                <td style="text-align:center;">
                    <div style="display:flex; justify-content: space-around; align-items: center;">
                    <button style="width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;
                    color: green;" class="fas fa-edit fa-lg" id="edit-${email}"></button>
                    
                    <button style="color: maroon; width: 2.5rem; height: 2.5rem;padding: 5px;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 25%);
                    background: #b7dbed;
                    outline: none;
                    border-color: #b7dbed;" class="fas fa-trash fa-lg" id="deact-${email}"></button>
                    </div>
                </td>
            </tr>`;
    status == "active" ? $(".CA-table").append(td) : null;
}
}

const clear_sales = () => {
  //Sales Dashboard
  $(".SD-totaltransactionNo").text("0");
  $(".SD-totalSales").text("0.00");
  $(".SD-date").val("");
  $(".SD-table").empty();
  let sdTh = `<tr>
              <th>Transaction ID</th>
              <th>Total Amount</th>
              <th>Cash</th>
              <th>Change</th>
              <th>Staff Name</th>
            </tr>`;
  $(".SD-table").append(sdTh);

  //Product Sold
  $(".PS-totaltransactionNo").text("0");
  $(".PS-totalSales").text("0.00");
  $(".PS-date").val("");
  $(".PS-table").empty();
  let psTh = `<tr>
                <th>Product Name</th>
                <th>Formulation</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>`;
  $(".PS-table").append(psTh);
}

const clear_all = (link) => {
  switch (link) {
    case "product_list":
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;

    case "stock_in_entry":
      clear_productlist();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;

    case "stock_in_history":
      clear_productlist();
      clear_stock_in_entry();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;
    
    case "product_stock_status":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_pull_out_product();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;

    case "pull_out_product":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;

    case "discountvat":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_discountvat();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;

    case "staff_account":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_discountvat();
      clear_admin_account();
      clear_customer_account();
      break;
    
    case "admin_account":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_discountvat();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      break;
    
    case "customer_account":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_discountvat();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
    break;

    case "sales":
      clear_productlist();
      clear_stock_in_entry();
      clear_stock_in_history();
      clear_product_stock_status();
      clear_pull_out_product();
      clear_discountvat();
      clear_staff_account();
      clear_admin_account();
      clear_customer_account();
      clear_sales();
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
  $(".div-CustomerAccount").css("display", "none");
  $(".div-POS").css("display", "none");
};

$(window).on("load", () => {
  deactivelink();
  $(".div-ProductList").css("display", "flex");
  clear_product_stock_status();
});

$(".product_list").click(() => {
  deactivelink();
  $(".div-ProductList").css("display", "flex");
  let product_expired = 0;
  let product_outofstocks = 0;
  let product_lowstocks = 0;

  for(let i = 0; i < ArrayGetAllProduct.length;i++){
    let expirationdate = ArrayGetAllProduct[i].expirationdate;
    let stocks = ArrayGetAllProduct[i].stocks;
    expirationdate == "expired" ? product_expired++ : null;
    parseInt(stocks) == 0 ? product_outofstocks++ : null;
    parseInt(stocks) <= 5 && parseInt(stocks) != 0 ? product_lowstocks++ : null;
  }
  product_expired != 0 ? toastr["warning"](`${product_expired} Products have been Expired`) : null;
  product_outofstocks != 0 ? toastr["warning"](`${product_outofstocks} Products are Out Of Stocks`) : null;
  product_lowstocks != 0 ? toastr["warning"](`${product_lowstocks} Products are Low In Stocks`) : null;
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

$(".customer_account").click(() => {
  deactivelink();
  $(".div-CustomerAccount").css("display", "flex");
  clear_all("customer_account");
});

$(".sales_dashboard").click(() => {
  deactivelink();
  $(".div-SalesDashboard").css("display", "flex");
  clear_all("sales");
});

$(".product_sold").click(() => {
  deactivelink();
  $(".div-ProductSold").css("display", "flex");
  clear_all("sales");
});

$(".online_order").click(() => {
  deactivelink();
  $(".div-OnlineOrder").css("display", "flex");
  clear_all("online_order");
});
$(".POS").click(() => {
  deactivelink();
  $(".div-POS").css("display", "flex");
  $(".category-active").text("POINT OF SALE (POS)");

  let transactionID = 0;
  firestore.collection("Sales").get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          transactionID = doc.data().transactionID;
          transactionID++;
          $(".staff-TransactionID").text(`Transaction ID: ${transactionID}`);
          $(".staff-PR-TransactionID").text(`Transaction ID: ${transactionID}`);
      });
  });

  $(".staff-product-table").empty();
  $(".staff-productsearch").val("");
  $(".staff-category").val("All");
  renderProductLoop();
  $(".staff-receipt-table").empty();
  $(".staff-subtotal").text("");
  $(".staff-cash").val("");
  $(".staff-change").text("");
  $(".staff-div-receipt").css("display","flex");
  $(".staff-div-print-receipt").css("display","none");

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
            $(".staff-product-table").append(product_div);
        }
        
        function LoadrenderCategory(data_category){
            let option = document.createElement('option');
            option.textContent = data_category;
            option.value = data_category;
            $(".staff-category").append(option);
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
    $(".PSS-table tr th").removeAttr("style");
    $(".PPH-table tr th").removeAttr("style");
    $(".SA-table tr th").removeAttr("style");
  } else {
    const body = document.body;
    body.style.overflow = "auto";
    window.onscroll = function () {};
    $(".controlbox").css({ position: "sticky" });
    $(".SIH-table tr th").css({ position: "sticky" });
    $(".PSS-table tr th").css({ position: "sticky" });
    $(".PPH-table tr th").css({ position: "sticky" });
    $(".SA-table tr th").css({ position: "sticky" });
  }
};
$(".sidemenu").click(() => {
  $(".Productlist-div-print").css("display", "none");
  $(".product-info").css("display", "none");
  $(".div-addproduct").css("display", "none");
  $(".SA-div-CreateAccount").css("display", "none");
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
  $(".customer_account").removeClass("activelink");
  $(".sales_dashboard").removeClass("activelink");
  $(".product_sold").removeClass("activelink");
  $(".online_order").removeClass("activelink");
  $(".POS").removeClass("activelink");
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
$(".POS").click(() => {
  removeclass_active();
  let POS = $(".POS");
  addclass_active(POS);
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
  "customer_account",
  "sales_dashboard",
  "product_sold",
];
const categorytext = [
  "Product List",
  "Stock In Entry",
  "Stock In History",
  "Product Stock Status",
  "Pull Out Product History",
  "Vat Percentage",
  "Staff Account",
  "Admin Account",
  "Customer Account",
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
    } else if (classname[i] == classname[6] || classname[i] == classname[7] || classname[i] == classname[8]) {
      $(".category-active").text("MANAGE ACCOUNT");
    } else if (classname[i] == classname[9] || classname[i] == classname[10]) {
      $(".category-active").text("SALES");
    }
  });
}
$(".logout").click(() => {
  $.post("/api/logout");
  $(location).attr("href", "/");
});
