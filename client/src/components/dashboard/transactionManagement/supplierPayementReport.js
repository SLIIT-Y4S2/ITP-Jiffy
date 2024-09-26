import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
import axios from 'axios';

function SupplierPaymentReport() {

    const [PaidData, setPaidData] = useState([]);

    useEffect(() => {
            axios.get(`https://localhost:5000/api/supplier-payment/`)
            .then((getData)=>{
              setPaidData(getData.data);
            })         
           
            }
          , []);

  const exportMachinePDF = () => {
    const input = document.getElementById("print")
    html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("MachineReport.pdf");
    })
  }


  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <>
      <div id="print" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div  className="col-12">
          <div className="row" style={{ margin: "60px 0 30px" }}>
            <div className="col-12">
              <img src="https://i.ibb.co/c6HQzff/jiffy-logo.png" style={{ width: "20%", height: "auto", margin: "20px 0 20px 0" }} alt="jiffy-logo" />

              <span style={{ margin: "0 0 0 50%", fontWeight: "800" }}>Generated Date : {`${day} - ${month} - ${year}`} </span>

              <h1 style={{ margin: "20px 0 0 0", textAlign: "center", fontWeight: "600" }}>Supplier Payment history Report</h1>
            </div>
          </div>
          <div className="row" >
            <div className="col-12">

              <table className="table col-md-6" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <thead className="table-secondary" style={{ textAlign: "center" }}>
                  <tr>
                    <th style={{ width: "20%" }} scope="col">Supplier Name</th>
                    <th style={{ width: "20%" }} scope="col">Order ID</th>
                    <th style={{ width: "20%" }} scope="col">Total Amount</th>
                    <th style={{ width: "20%" }} scope="col">Transaction Date</th>
                    <th style={{ width: "20%" }} scope="col">Reference Number</th>

                  </tr>
                </thead>
                <tbody className="table-light">
                  {PaidData && PaidData.map((data) => (
                    <tr key={PaidData._id}>
                     
                      <td style={{ textAlign: "center" }}>{data.supplierName}</td>
                      <td style={{ textAlign: "center" }}>{data.orderID}</td>
                      <td style={{ textAlign: "center" }}>Rs.{data.amount}</td>
                      <td style={{ textAlign: "center" }}>{data.transactionDate}</td>
                      <td style={{ textAlign: "center" }}>{data.paymentReferenceNo}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
          
        </div>
      </div>
      <button type="button" class="btn btn-primary" onClick={() => exportMachinePDF()} >Download PDF</button>
    </>

  )

}


export default SupplierPaymentReport;


