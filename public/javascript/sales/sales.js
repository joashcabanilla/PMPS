//SALES DASHBOARD------------------------------------------------------------------------------------------------
let sdTransactionNumber = $(".SD-totaltransactionNo");
let sdTotalSales = $(".SD-totalSales");
let sdDate = $(".SD-date");
let sdDaily = $(".SD-daily");
let sdWeekly = $(".SD-weekly");
let sdMonthly = $(".SD-monthly");
let sdAnnually = $(".SD-annually");
let sdGeneratebtn = $(".SD-generatebtn");
let sdTable = $(".SD-table");
let sdTh = `<tr>
                <th>Transaction ID</th>
                <th>Total Amount</th>
                <th>Cash</th>
                <th>Change</th>
                <th>Staff Name</th>
            </tr>`;

//PRODUCT SOLD------------------------------------------------------------------------------------------------
let psTransactionNumber = $(".PS-totaltransactionNo");
let psTotalSales = $(".PS-totalSales");
let psDate = $(".PS-date");
let psDaily = $(".PS-daily");
let psWeekly = $(".PS-weekly");
let psMonthly = $(".PS-monthly");
let psAnnually = $(".PS-annually");
let psGeneratebtn = $(".PS-generatebtn");
let psTable = $(".PS-table");
let psTh = `<tr>
                <th>Product Name</th>
                <th>Formulation</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
            </tr>`;

let sales_array_data = [];
let sales_reportCategory = "";

//CHANGE EVENT FOR DATE-----------------------------------------------------------------------------------------
sdDate.change(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "date";
    sdTransactionNumber.text("0");
    sdTotalSales.text("0.00");
    sdTable.empty();
    sdTable.append(sdTh);
    let date = sdDate.val();
    date = `${date.substr(5, 2)}/${date.substr(8,2)}/${date.substr(0, 4)}`;
    let transactionNumber = 0;
    let totalSales = 0;
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == date.trim()){
                let ID = doc.data().transactionID;
                let totalAmount = parseFloat(doc.data().totalAmount);
                let staffname = doc.data().staffname;
                let change = doc.data().change;
                let cash = doc.data().cash;
                let td = `<tr>
                            <td>${ID}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${parseFloat(cash).toFixed(2)}</td>
                            <td>${parseFloat(change).toFixed(2)}</td>
                            <td>${staffname}</td>
                        </tr>`;
                sdTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                sdTransactionNumber.text(transactionNumber);
                sdTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([ID,totalAmount,cash,change,staffname]);
            }
        });
    });
});

psDate.change(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "date";
    psTransactionNumber.text("0");
    psTotalSales.text("0.00");
    psTable.empty();
    psTable.append(psTh);
    let date = psDate.val();
    date = `${date.substr(5, 2)}/${date.substr(8,2)}/${date.substr(0, 4)}`;
    let transactionNumber = 0;
    let totalSales = 0;
    firestore.collection("SoldProduct").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == date){
                let date = doc.data().date;
                let formulation = doc.data().formulation;
                let productname = doc.data().productname;
                let quantity = doc.data().quantity;
                let totalAmount = doc.data().totalAmount;
                let td =`<tr>
                            <td>${productname}</td>
                            <td>${formulation}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${date}</td>
                        </tr>`;
                psTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                psTransactionNumber.text(transactionNumber);
                psTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([productname,formulation,quantity,parseFloat(totalAmount).toFixed(2),date]);
            }
        });
    });
});

//METHOD FOR GENERATE REPORT---------------------------------------------------------------------------------------
const sdReport = (title,array_data) => {
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

    let doc = new jspdf.jsPDF('p', 'mm', [216, 279]);
        const textcenter = (text) => {
            let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            return (doc.internal.pageSize.width - textWidth) / 2;
        };
        doc.autoTable({
            body: array_data,
            columns: [
                { header: "Transaction ID", dataKey: "Transaction ID" },
                { header: "Total Amount", dataKey: "Total Amount" },
                { header: "Cash", dataKey: "Cash" },
                { header: "Change", dataKey: "Change" },
                { header: "Staff Name", dataKey: "Staff Name" },
            ],
            margin: {top: 67},
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
            doc.text(title,textcenter(title),53);
            doc.setFontSize(15);
            doc.text(`Total Number Of Transaction: ${sdTransactionNumber.text()}    Total Sales: ${sdTotalSales.text()}`,textcenter(`Total Number Of Transaction: ${sdTransactionNumber.text()}     Total Sales: ${sdTotalSales.text()}`),63);            
        }
        doc.autoPrint();
        doc.output('dataurlnewwindow',`${title}.pdf`);
        doc.save(`${title}.pdf`);
        doc = new jspdf.jsPDF('p', 'mm', [216, 279]);

}

const psReport = (title,array_data) => {
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

    let doc = new jspdf.jsPDF('p', 'mm', [216, 279]);
        const textcenter = (text) => {
            let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            return (doc.internal.pageSize.width - textWidth) / 2;
        };
        doc.autoTable({
            body: array_data,
            columns: [
                { header: "Product Name", dataKey: "Product Name" },
                { header: "Formulation", dataKey: "Formulation" },
                { header: "Quantity", dataKey: "Quantity" },
                { header: "Total Amount", dataKey: "Total Amount" },
                { header: "Date", dataKey: "Date" },
            ],
            margin: {top: 67},
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
            doc.text(title,textcenter(title),53);
            doc.setFontSize(15);
            doc.text(`Total Number Of Product Sold: ${psTransactionNumber.text()}    Total Sales: ${psTotalSales.text()}`,textcenter(`Total Number Of Product Sold: ${psTransactionNumber.text()}       Total Sales: ${psTotalSales.text()}`),63);            
        }
        doc.autoPrint();
        doc.output('dataurlnewwindow',`${title}.pdf`);
        doc.save(`${title}.pdf`);
        doc = new jspdf.jsPDF('p', 'mm', [216, 279]);
}
//GENERATE BUTTON CLICK EVENT---------------------------------------------------------------------------------------
sdGeneratebtn.click(() => {
    if(sdTransactionNumber.text() == "0"){
        swal("","No Data Found","error");
    }
    else{
        let date = sdDate.val();
        date = `${date.substr(5, 2)}/${date.substr(8,2)}/${date.substr(0, 4)}`;
        sales_reportCategory == "date" ? sdReport(`SALES REPORT ${date}`,sales_array_data) 
        : sales_reportCategory == "daily" ? sdReport("DAILY SALES REPORT",sales_array_data) 
        : sales_reportCategory == "weekly" ? sdReport("WEEKLY SALES REPORT",sales_array_data)
        : sales_reportCategory == "monthly" ? sdReport("MONTHLY SALES REPORT",sales_array_data)
        : sales_reportCategory == "annually" ? sdReport("ANNUALLY SALES REPORT",sales_array_data) : null;
    }
});

psGeneratebtn.click(() => {
    if(psTransactionNumber.text() == "0"){
        swal("","No Data Found","error");
    }
    else{
        let date = psDate.val();
        date = `${date.substr(5, 2)}/${date.substr(8,2)}/${date.substr(0, 4)}`;
        sales_reportCategory == "date" ? psReport(`PRODUCT SOLD REPORT ${date}`,sales_array_data) 
        : sales_reportCategory == "daily" ? psReport("DAILY PRODUCT SOLD REPORT",sales_array_data) 
        : sales_reportCategory == "weekly" ? psReport("WEEKLY PRODUCT SOLD REPORT",sales_array_data)
        : sales_reportCategory == "monthly" ? psReport("MONTHLY PRODUCT SOLD REPORT",sales_array_data)
        : sales_reportCategory == "annually" ? psReport("ANNUALLY PRODUCT SOLD REPORT",sales_array_data) : null;
    }
});

//DAILY SALES CLICK EVENT-----------------------------------------------------------------------------------------
sdDaily.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "daily";
    sdTransactionNumber.text("0");
    sdTotalSales.text("0.00");
    sdTable.empty();
    sdTable.append(sdTh);
    sdDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    let date = addzero_report(now.getDate());
    let year = now.getFullYear();
    let new_date = `${month}/${date}/${year}`;
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == new_date){
                let ID = doc.data().transactionID;
                let totalAmount = parseFloat(doc.data().totalAmount);
                let staffname = doc.data().staffname;
                let change = doc.data().change;
                let cash = doc.data().cash;
                let td = `<tr>
                            <td>${ID}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${parseFloat(cash).toFixed(2)}</td>
                            <td>${parseFloat(change).toFixed(2)}</td>
                            <td>${staffname}</td>
                        </tr>`;
                sdTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                sdTransactionNumber.text(transactionNumber);
                sdTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([ID,totalAmount,cash,change,staffname]);
            }
        });
    });
});

psDaily.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "daily";
    psTransactionNumber.text("0");
    psTotalSales.text("0.00");
    psTable.empty();
    psTable.append(psTh);
    psDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    let date = addzero_report(now.getDate());
    let year = now.getFullYear();
    let new_date = `${month}/${date}/${year}`;
    firestore.collection("SoldProduct").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == new_date){
                let date = doc.data().date;
                let formulation = doc.data().formulation;
                let productname = doc.data().productname;
                let quantity = doc.data().quantity;
                let totalAmount = doc.data().totalAmount;
                let td =`<tr>
                            <td>${productname}</td>
                            <td>${formulation}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${date}</td>
                        </tr>`;
                psTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                psTransactionNumber.text(transactionNumber);
                psTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([productname,formulation,quantity,parseFloat(totalAmount).toFixed(2),date]);
            }
        });
    });
});

//WEEKLY SALES CLICK EVENT-----------------------------------------------------------------------------------------
sdWeekly.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "weekly";
    sdTransactionNumber.text("0");
    sdTotalSales.text("0.00");
    sdTable.empty();
    sdTable.append(sdTh);
    sdDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let curr = new Date;
    let first = addzero_report(curr.getDate() - curr.getDay());
    let last = first + 6;
    let week_date = [];
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    let year = now.getFullYear();
    for(let i = first; i <= last; i++){
        week_date.push(`${month}/${i}/${year}`);
    }
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == week_date[0] || doc.data().date == week_date[1] || doc.data().date == week_date[2]|| doc.data().date == week_date[3] || doc.data().date == week_date[4] || doc.data().date == week_date[5] || doc.data().date == week_date[6]){
                let ID = doc.data().transactionID;
                let totalAmount = parseFloat(doc.data().totalAmount);
                let staffname = doc.data().staffname;
                let change = doc.data().change;
                let cash = doc.data().cash;
                let td = `<tr>
                            <td>${ID}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${parseFloat(cash).toFixed(2)}</td>
                            <td>${parseFloat(change).toFixed(2)}</td>
                            <td>${staffname}</td>
                        </tr>`;
                sdTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                sdTransactionNumber.text(transactionNumber);
                sdTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([ID,totalAmount,cash,change,staffname]);
            }
        });
    });
});

psWeekly.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "weekly";
    psTransactionNumber.text("0");
    psTotalSales.text("0.00");
    psTable.empty();
    psTable.append(psTh);
    psDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let curr = new Date;
    let first = addzero_report(curr.getDate() - curr.getDay());
    let last = first + 6;
    let week_date = [];
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    let year = now.getFullYear();
    for(let i = first; i <= last; i++){
        week_date.push(`${month}/${i}/${year}`);
    }
    firestore.collection("SoldProduct").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(doc.data().date == week_date[0] || doc.data().date == week_date[1] || doc.data().date == week_date[2]|| doc.data().date == week_date[3] || doc.data().date == week_date[4] || doc.data().date == week_date[5] || doc.data().date == week_date[6]){
                let date = doc.data().date;
                let formulation = doc.data().formulation;
                let productname = doc.data().productname;
                let quantity = doc.data().quantity;
                let totalAmount = doc.data().totalAmount;
                let td =`<tr>
                            <td>${productname}</td>
                            <td>${formulation}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${date}</td>
                        </tr>`;
                psTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                psTransactionNumber.text(transactionNumber);
                psTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([productname,formulation,quantity,parseFloat(totalAmount).toFixed(2),date]);
            }
        });
    });
});
//MONTHLY SALES CLICK EVENT-----------------------------------------------------------------------------------------
sdMonthly.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "monthly";
    sdTransactionNumber.text("0");
    sdTotalSales.text("0.00");
    sdTable.empty();
    sdTable.append(sdTh);
    sdDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let month_date = doc.data().date;
            if(month_date.substring(0,2) == month){
                let ID = doc.data().transactionID;
                let totalAmount = parseFloat(doc.data().totalAmount);
                let staffname = doc.data().staffname;
                let change = doc.data().change;
                let cash = doc.data().cash;
                let td = `<tr>
                            <td>${ID}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${parseFloat(cash).toFixed(2)}</td>
                            <td>${parseFloat(change).toFixed(2)}</td>
                            <td>${staffname}</td>
                        </tr>`;
                sdTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                sdTransactionNumber.text(transactionNumber);
                sdTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([ID,totalAmount,cash,change,staffname]);
            }
        });
    });
});

psMonthly.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "monthly";
    psTransactionNumber.text("0");
    psTotalSales.text("0.00");
    psTable.empty();
    psTable.append(psTh);
    psDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    const addzero_report = (num) => {
        return num < 10 ? `0${num}`:num;
    };
    let now = new Date();
    let month = addzero_report(now.getMonth() + 1);
    firestore.collection("SoldProduct").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let month_date = doc.data().date;
            if(month_date.substring(0,2) == month){
                let date = doc.data().date;
                let formulation = doc.data().formulation;
                let productname = doc.data().productname;
                let quantity = doc.data().quantity;
                let totalAmount = doc.data().totalAmount;
                let td =`<tr>
                            <td>${productname}</td>
                            <td>${formulation}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${date}</td>
                        </tr>`;
                psTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                psTransactionNumber.text(transactionNumber);
                psTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([productname,formulation,quantity,parseFloat(totalAmount).toFixed(2),date]);
            }
        });
    });
});

//ANNUALLY SALES CLICK EVENT----------------------------------------------------------------------------------------
sdAnnually.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "annually";
    sdTransactionNumber.text("0");
    sdTotalSales.text("0.00");
    sdTable.empty();
    sdTable.append(sdTh);
    sdDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    let now = new Date();
    let year = now.getFullYear();
    firestore.collection("Sales").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let month_year = doc.data().date;
            if(month_year.substring(6) == year){
                let ID = doc.data().transactionID;
                let totalAmount = parseFloat(doc.data().totalAmount);
                let staffname = doc.data().staffname;
                let change = doc.data().change;
                let cash = doc.data().cash;
                let td = `<tr>
                            <td>${ID}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${parseFloat(cash).toFixed(2)}</td>
                            <td>${parseFloat(change).toFixed(2)}</td>
                            <td>${staffname}</td>
                        </tr>`;
                sdTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                sdTransactionNumber.text(transactionNumber);
                sdTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([ID,totalAmount,cash,change,staffname]);
            }
        });
    });
});

psAnnually.click(() => {
    sales_array_data.length = 0;
    sales_reportCategory = "annually";
    psTransactionNumber.text("0");
    psTotalSales.text("0.00");
    psTable.empty();
    psTable.append(psTh);
    psDate.val("");
    let transactionNumber = 0;
    let totalSales = 0;
    let now = new Date();
    let year = now.getFullYear();
    firestore.collection("SoldProduct").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let year_date = doc.data().date;
            if(year_date.substring(6) == year){
                let date = doc.data().date;
                let formulation = doc.data().formulation;
                let productname = doc.data().productname;
                let quantity = doc.data().quantity;
                let totalAmount = doc.data().totalAmount;
                let td =`<tr>
                            <td>${productname}</td>
                            <td>${formulation}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(totalAmount).toFixed(2)}</td>
                            <td>${date}</td>
                        </tr>`;
                psTable.append(td);
                totalSales = totalSales + totalAmount;
                transactionNumber++;
                psTransactionNumber.text(transactionNumber);
                psTotalSales.text(parseFloat(totalSales).toFixed(2));
                sales_array_data.push([productname,formulation,quantity,parseFloat(totalAmount).toFixed(2),date]);
            }
        });
    });
});