const pphSearch = $(".PPH-search");
const pphGeneratebtn = $(".PPH-generatebtn");
const pphTable = $(".PPH-table");
let pphTh = `<tr>
                <th>Code</th>
                <th>Productname</th>
                <th>Category</th>
                <th>Brandname</th>
                <th>Formulation</th>
                <th>Price</th>
            </tr>`;

//GET ALL PULL OUT PRODUCT----------------------------------------------------------------------------------------
const pphGetAll = () => {
    pphTable.append(pphTh);
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

const pphSearchProduct = (searchdata) => {
    pphTable.append(pphTh);
    try {
        const capSearch = (str) =>
        str[0].toUpperCase() + str.slice(1).toLowerCase();
        let words = searchdata.split(" ").map(capSearch);
        searchdata = words.join(" ");

        
    for(let i = 0; i < ArrayGetAllPullOutProduct.length; i++){
        let code = ArrayGetAllPullOutProduct[i].code;
        let productname = ArrayGetAllPullOutProduct[i].productname;
        let category = ArrayGetAllPullOutProduct[i].category;
        let brandname = ArrayGetAllPullOutProduct[i].brandname;
        let formulation = ArrayGetAllPullOutProduct[i].formulation;
        let price = ArrayGetAllPullOutProduct[i].price;
        let existProduct = productname.search(searchdata);
        let existCode = code.search(searchdata);
        let td = `<tr>
                    <td>${code}</td>
                    <td>${productname}</td>
                    <td>${category}</td>
                    <td>${brandname}</td>
                    <td>${formulation}</td>
                    <td>${parseFloat(price).toFixed(2)}</td>
                </tr>`;
        existProduct != -1 || existCode != -1 ? pphTable.append(td) : null;
    }

    } catch {}

}
//PULL OUT PRODUCT SEARCH KEYUP EVENT-----------------------------------------------------------------------------
pphSearch.keyup((e) => {
    let searchdata = e.target.value;
    pphTable.empty();
    searchdata.length == 0 ? pphGetAll() : pphSearchProduct(searchdata);
});

pphSearch.focus(() => {
    let product_array = [];
    for(let i = 0; i < ArrayGetAllPullOutProduct.length; i++){
        let productname = ArrayGetAllPullOutProduct[i].productname;
        let code = ArrayGetAllPullOutProduct[i].code;
        let existProductname = product_array.includes(productname);
        let existCode = product_array.includes(code);

        !existProductname ? product_array.push(productname) : null;
        !existCode ? product_array.push(code) : null;
    }
    pphSearch.autocomplete({
        source: product_array,
        autoFocus: true,
        classes: {
        "ui-autocomplete": "highlight",
        },
    });
});

//GENERATE REPORT PULL PRODUCT------------------------------------------------------------------------------------
pphGeneratebtn.click(() => {
    pphSearch.val("");
    pphTable.empty();
    pphGetAll();

    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let year = now.getFullYear();
    let hours = addzero_report(now.getHours());
    let mins = addzero_report(now.getMinutes());
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let report_date = `${month}/${date}/${year} ${hours}:${mins} ${period}`;
    let array_data = [];

    const GenerateReport = (array_data) => {
        let doc = new jspdf.jsPDF('p', 'mm', [216, 279]);
        const textcenter = (text) => {
            let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            return (doc.internal.pageSize.width - textWidth) / 2;
        };
        doc.autoTable({
            body: array_data,
            columns: [
                { header: "Code", dataKey: "Code" },
                { header: "ProductName", dataKey: "ProductName" },
                { header: "Category", dataKey: "Category" },
                { header: "BrandName", dataKey: "BrandName" },
                { header: "Formulation", dataKey: "Formulation" },
                { header: "Price", dataKey: "Price"},
            ],
            margin: {top: 57},
            bodyStyles: {lineColor: [0,0,0],halign: "left",valign: "middle",font: "helvetica",textColor: [0,0,0],fontSize: 10,fontStyle: "normal",fillColor: [255,255,255],lineColor: [0,0,0],lineWidth: 0.2},
            headStyles: {halign: "center",valign: "middle",font: "helvetica",textColor: [0,0,0],fontSize: 12,fontStyle: "bold",fillColor: [255,255,255],lineColor: [0,0,0],lineWidth: 0.2},
            theme: 'plain',
        });
        let pagenumber = doc.internal.getNumberOfPages();
        for(let i = 0; i < pagenumber; i++){
            doc.setPage(i);
            doc.setFont("Helvetica","bold");
            doc.setFontSize(18);
            doc.addImage(image,"JPEG",25,8,30,30);
            doc.text("PHARMACY MANAGEMENT",textcenter("PHARMACY MANAGEMENT"), 13);
            doc.text("PROCESS SYSTEM",textcenter("PROCESS SYSTEM"),23);
            doc.text(report_date,textcenter(report_date),33);
            doc.setFontSize(18);
            doc.text("PULL OUT PRODUCT REPORT",textcenter("PULL OUT PRODUCT REPORT"),53);
        }
        doc.autoPrint();
        doc.output('dataurlnewwindow',"PullOutProduct.pdf");
        doc.save("PullOutProduct.pdf");
        doc = new jspdf.jsPDF('p', 'mm', [216, 279]);
    }

    for(let i = 0; i < ArrayGetAllPullOutProduct.length; i++){
        let code = ArrayGetAllPullOutProduct[i].code;
        let productname = ArrayGetAllPullOutProduct[i].productname;
        let category = ArrayGetAllPullOutProduct[i].category;
        let brandname = ArrayGetAllPullOutProduct[i].brandname;
        let formulation = ArrayGetAllPullOutProduct[i].formulation;
        let price = ArrayGetAllPullOutProduct[i].price;
        array_data.push([code,productname,category,brandname,formulation,parseFloat(price).toFixed(2)]);
    }
    GenerateReport(array_data);
});