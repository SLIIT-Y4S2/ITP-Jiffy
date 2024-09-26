import React, { useEffect } from "react";
import { useState } from "react";
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

function SupplierPaymentForm(props) {
   
    const [supData,setSupplierData] = useState([]);
    const [purchData,setPurchaseData] = useState([]);
    
    const[historyData,setHistoryData]= useState([]);
    
    
    const [supplierName, setsupplierName] = useState('');
    const [supplierId, setsupplierID] = useState('');
    const [order_ID, setorderID] = useState('');
    const [amount, setamount] = useState('');
    const [transactionDate, settransactionDate] = useState('');
    const [paymentReferenceNo, setpaymentReferenceNo] = useState('');
    const [fileName, setfileName] = useState('');
    const[fileData, setFileData] = useState(null)
    const [rawMaterial, setrawMaterial] = useState('');
    const [quantity, setquantity] = useState('');
    const [unit, setunit] = useState('');
    const [orderStatus, setorderStatus] = useState('');
    const [email, setEmail] = useState('');
    

 
   const {orderID,supplierID,historyID,Tdate,file} = useParams();

   useEffect(() => {
    Axios.get(`https://localhost:5000/api/supplier-payment/getOne/${historyID}`)
    .then((getData)=>{
      setHistoryData(getData.data);
      setamount(getData.data.amount);
      setfileName(getData.data.fileName);
      console.log(getData.data.fileName)
      console.log(getData.data);
      console.log(Tdate);
    })         
   
    }
  , []);



    useEffect(()=>{
        console.log("Aaaaaaaaaaaaaaaaaaaaa");

       

        Axios.get(`https://localhost:5000/api/suppliers/${supplierID}`)
        .then((getData)=>{
            setSupplierData(getData.data);
            setsupplierName(getData.data.companyName);
            setsupplierID(getData.data._id);
            setEmail(getData.data.contactPersonEmail);
         console.log(getData.data);
          
        })
    },[])

    useEffect(()=>{
        Axios.get(`https://localhost:5000/api/v9/supplierOrder/${orderID}`)
        .then((getData)=>{
            setPurchaseData(getData.data);
            setorderID(getData.data._id);
            setrawMaterial(getData.data.rawMaterial);
            setquantity(getData.data.quantity);
            setunit(getData.data.unit);
            setorderStatus("Paid");
        })
    },[])

    const sendDataToAPI =(e)=>{
        e.preventDefault();
              
        window.location = "/SupplierPayment"
 
    }
    const printRecipt = (e) => {
        e.preventDefault();
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const input = document.getElementById('imgID');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save(historyData.paymentReferenceNo+".pdf");
            })
            ;
    }
    
    
    return (

        
        <section className="section">

            <div className="row" id="aa">
                <div className="col-12">
                    <div className="card" style={{ padding: "50px" }}>
                        <div className="card-body">
                            <h1>{props.formName}</h1>
                            <br />
                            <form className="row g-3" >
                                <h2 className="col-md-12">Order Details</h2>

                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Order ID
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData._id} required disabled readOnly />

                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                    Raw Material
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData.rawMaterial}  required disabled readOnly />

                                </div>
        
                                <div className="col-md-4">
                                    <label htmlFor="SupplierName" className="form-label">
                                        Quantity
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData.quantity}   required disabled readOnly />

                                </div>

                            
                                <div className="col-md-4">
                                    <label htmlFor="UnitPrice" className="form-label">
                                       Order Status
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData.orderStatus} required disabled readOnly />
                                    
                                </div>
                               
                                <h2 className="col-md-12">Supplier Details</h2>
                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                         Company Name
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.companyName} required disabled readOnly />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                         Contact Number
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.companyPhoneNo} required disabled readOnly />
                                </div>
                                                    


                                <h2 className="col-md-12">Transaction Details</h2>
                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                         Amount(LKR)
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={historyData.amount} required disabled readOnly />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="ContactPersonName" className="form-label">
                                    Payment Reference Number
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={historyData.paymentReferenceNo} required disabled readOnly />
                                </div>
                               
                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Transaction Date
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={Tdate} required disabled readOnly />

                                </div>
                                <div className="col-md-8">
                                <label htmlFor="TransactionDate" className="form-label">
                                         Bank Recipt
                                    </label>
                                
                                 </div>
                                 <div id="imgID">
                                 <img src={require(`./uploadedRecipt/${file}`) } style={{ width:"50%" }} alt="natho" />
                                 </div>
                                <div className="col-md-4">
                                <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ margin: "20px" }}
                                        onClick={printRecipt}
                                    ><h6>
                                        Download Recipt
                                        </h6>
                                    </button>

                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SupplierPaymentForm;
