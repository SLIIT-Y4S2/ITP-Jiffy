import React, { useEffect } from "react";
import { useState } from "react";
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { toast } from "react-toastify";


function SupplierPaymentForm(props) {

    const [supData, setSupplierData] = useState([]);
    const [purchData, setPurchaseData] = useState([]);




    const [supplierName, setsupplierName] = useState('');
    const [supplierId, setsupplierID] = useState('');
    const [order_ID, setorderID] = useState('');
    const [amount, setamount] = useState('');
    const [transactionDate, settransactionDate] = useState('');
    const [paymentReferenceNo, setpaymentReferenceNo] = useState('');
    const [fileName, setfileName] = useState('');
    const [fileExtension, setfileExtension] = useState('');
    const [fileData, setFileData] = useState(null)
    const [rawMaterial, setrawMaterial] = useState('');
    const [quantity, setquantity] = useState('');
    const [unit, setunit] = useState('');
    const [orderStatus, setorderStatus] = useState('');
    const [email, setEmail] = useState('');





    const { orderID, supplierID } = useParams();


    useEffect(() => {
        console.log("Aaaaaaaaaaaaaaaaaaaaa");


        Axios.get(`https://localhost:5000/api/suppliers/${supplierID}`)
            .then((getData) => {
                setSupplierData(getData.data);
                setsupplierName(getData.data.companyName);
                setsupplierID(getData.data._id);
                setEmail(getData.data.contactPersonEmail);
                //setEmail("shehangunasekara2019@gmail.com");

            })
    }, [])

    useEffect(() => {
        Axios.get(`https://localhost:5000/api/v9/supplierOrder/${orderID}`)
            .then((getData) => {
                setPurchaseData(getData.data);
                setorderID(getData.data._id);
                setrawMaterial(getData.data.rawMaterial);
                setquantity(getData.data.quantity);
                setunit(getData.data.unit);
                setorderStatus("Paid");
            })
    }, [])

    const sendDataToAPI = async(e) => {
        e.preventDefault();
        const isValid = formValidation();
      if(isValid){
        const data = new FormData()

        data.append('imageRecipt', fileData)

        fetch("https://localhost:5000/singleRecipt", {
            method: "POST",
            body: data,
        }).then((result) => {
            console.log("File sent successful")
            console.log(fileData)
            setfileName('')
            setFileData(null)

        }).catch((error) => {
            console.log(error.message)
        })

        await Axios.put(`https://localhost:5000/api/v9/supplierOrder/suporderupdate/${orderID}`,
            {
                supplierId, rawMaterial, quantity, unit, orderStatus, email
            }
        )

       await Axios.post('https://localhost:5000/api/supplier-payment/',
            {
                supplierName, supplierId, order_ID, amount, transactionDate, paymentReferenceNo, fileName
            }
        )

        toast.success(`Payment added successfully `,{
            position: "bottom-left",
        });
        setTimeout(() => {
          window.location = "/SupplierPayment"
        }, 3000);
     
        }
        

    }
    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
        setfileName(e.target.files[0].name)
        setfileExtension(fileName.split('.'))
    }

    //form validation



    const [amountERR, setamountERR] = useState({});
    const [referenceNumberERR, setreferenceERR] = useState({});
    const [fileERR, setfileERR] = useState({});

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    const formValidation = () => {
        const amountERR = {};
        const referenceNumberERR = {};
        const fileERR = {};
        let isValid = true;




        if (isNaN(amount)) {
            amountERR.cvcShort = "Invalid Amount!";
            isValid = false;
        }


        if (isNaN(paymentReferenceNo)) {
            referenceNumberERR.cvcShort = "Invalid Reference Number!";
            isValid = false;
        }
        if (!allowedExtensions.exec(fileName)) {
            fileERR.expireShort = "Invalid File Type!"
            isValid = false;
        }

        console.log()

        setamountERR(amountERR);
        setreferenceERR(referenceNumberERR);
        setfileERR(fileERR);
        return isValid;
    }




    return (
        <section className="section">
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ padding: "50px" }}>
                        <div className="card-body">
                            <h1>{props.formName}</h1>
                            <br />
                            <form className="row g-3" >
                                <h2 className="col-md-12">Purchase Details</h2>

                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Raw Material
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData.rawMaterial} required disabled readOnly />

                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Quantity
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={purchData.quantity} required disabled readOnly />

                                </div>
                                <h2 className="col-md-12">Supplier's Details</h2>
                                <div className="col-md-4">
                                    <label htmlFor="SupplierName" className="form-label">
                                        Company Name
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.companyName} required disabled readOnly />

                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="rawMaterial" className="form-label">
                                        Phone number
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.companyPhoneNo} required disabled readOnly />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="UnitPrice" className="form-label">
                                        Location
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.companyAddress} required disabled readOnly />

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="QTY" className="form-label">
                                        Contact Person Name
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.contactPersonName} required disabled readOnly />

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="Amount" className="form-label">
                                        Email
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.contactPersonEmail} required disabled readOnly />
                                </div>




                                <h2 className="col-md-12">Supplier's Bank Details</h2>

                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankName" className="form-label">
                                        Bank Name
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.bankName} required disabled readOnly />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="RecieverBankBranch" className="form-label">
                                        Branch Name
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.bankBranch} required disabled readOnly />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                        Bank Account Number
                                    </label>
                                    <input type="text" className="form-control" id="rawMaterial" value={supData.bankAccountNo} required disabled readOnly />
                                </div>


                                {/* Sender's  Details*/}
                                <h2 className="col-md-12">Transaction Details</h2>
                                <div className="col-md-4">
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                        Amount(LKR)
                                    </label>
                                    <input type="text" className="form-control" onChange={(e) => setamount(e.target.value)} id="rawMaterial" required />
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                        {Object.keys(amountERR).map((key) => {
                                            return <div style={{ color: "red" }}>{amountERR[key]}</div>
                                        })}
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="ContactPersonName" className="form-label">
                                        Payment Reference Number
                                    </label>
                                    <input type="text" className="form-control" onChange={(e) => setpaymentReferenceNo(e.target.value)} id="rawMaterial" required />
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                        {Object.keys(referenceNumberERR).map((key) => {
                                            return <div style={{ color: "red" }}>{referenceNumberERR[key]}</div>
                                        })}
                                    </label>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Transaction Date
                                    </label>
                                    <input type="date" className="form-control" onChange={(e) => settransactionDate(e.target.value)} id="rawMaterial" required />

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="TransactionDate" className="form-label">
                                        Upload Bank Recipt
                                    </label>
                                    <input className="form-control" type="file" id="imageFile" onChange={fileChangeHandler} name="image"  />
                                    <label htmlFor="ReceiverBankAccountNo" className="form-label">
                                        {Object.keys(fileERR).map((key) => {
                                            return <div style={{ color: "red" }}>{fileERR[key]}</div>
                                        })}
                                    </label>
                                </div>

                                <div className="col-md-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ margin: "20px" }}
                                        onClick={sendDataToAPI}
                                    >
                                        Submit details
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
