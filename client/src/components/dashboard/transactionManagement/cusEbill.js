import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios';
import { useParams } from 'react-router-dom'

import { toast } from "react-toastify";


function CusEbill() {

  const [apiData, setApiData] = useState([]);
  const [paymentData, setPayment] = useState([]);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const [recieverName, setRecieverNAme] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');




  const [cus_id, setCusID] = useState('');

  const [user, setUser] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";

  });
  const [userNameERR, setuserNameERR] = useState({});
  const [cardNumberERR, setCardNumberERR] = useState({});
  const [cvcNumberERR, setCvcNumberERR] = useState({});
  const [expireDateERR, setExpireERR] = useState({});
  const [expireDateERR2, setExpireERR2] = useState({});
  const [phoneNumberERR, setphoneERR] = useState({});
  const [addressERR, setaddressERR] = useState({});
  const [recieverNameERR, setrecieverNameERR] = useState({});

  function isEmpty(txt) {
    if (txt.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  const formValidation = () => {
    const cardNumberERR = {};
    const cvcNumberERR = {};
    const expireDateERR = {};
    const expireDateERR2 = {};
    const phoneNumberERR = {};
    const addressERR = {};
    const recieverNameERR = {};

    let isValid = true;


    if (isEmpty(recieverName)) {
      recieverNameERR.recieverNameShort = "Please enter reciever name";
      isValid = false;
    }
    if (isEmpty(address)) {
      addressERR.addressShort = "Please enter Address";
      isValid = false;
    }


    if (phoneNumber.trim().length == 0) {
      phoneNumberERR.phoneShort = "Please Enter the phone number";
      isValid = false;
    }

    if (isNaN(phoneNumber)) {
      phoneNumberERR.phoneShort = "Invalid phone number";
      isValid = false;
    }

    if (phoneNumber.trim().length != 10) {
      phoneNumberERR.phoneShort = "Invalid phone number";
      isValid = false;
    }

    if (cvc.trim().length < 3) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }
    if (cvc.trim().length > 3) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }

    if (isNaN(cvc)) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }

    if (cvc.trim().length == 0) {
      cvcNumberERR.cvcShort = "Please Enter the CVC number!";
      isValid = false;
    }


    if (number.toString().length < 16) {
      cardNumberERR.numberShort = "Invalid Card Number!";
      isValid = false;
    }

    if (isNaN(number)) {
      cardNumberERR.numberShort = "Invalid Card Number!";
      isValid = false;
    }

    if (number.toString().length == 0) {
      cardNumberERR.numberShort = "Please Enter Card Number!";
      isValid = false;
    }

    if (isEmpty(name)) {
      userNameERR.numberShort = "Please Enter User Name!";
      isValid = false;
    }
    const ex1 = String(expiry).slice(0, 2)
    const ex2 = String(expiry).slice(3, 6)
    const ex3 = String(expiry).slice(2, 3)
    const month = Number(ex1)
    const year = Number(ex2)
    const currentYear = String(new Date().getFullYear()).slice(2, 4);
    const currentMonth = parseInt(new Date().getMonth() + 1)
    const chkYR = parseInt(currentYear);

    if (month > 12) {
      expireDateERR.expireShort = "Invalid Expire Date!"
      isValid = false;
    }

    if (ex3 != "/") {
      expireDateERR.expireShort = "Invalid Expire Date!"
      isValid = false;
    }

    if (isEmpty(expiry)) {
      expireDateERR.expireShort = "Please Enter the expire date!"
      isValid = false;
    }
    if (expiry.length != 0) {
      if (month <= 12) {
        if (ex3 == "/") {
          if (year < chkYR) {
            expireDateERR2.expireShort = "Card is Expired! please check your card"
            isValid = false;
          }
          if (year == chkYR) {
            if (month <= currentMonth) {
              expireDateERR2.expireShort = "Card is Expired! please check your card"
              isValid = false;
            }
          }

        }
      }
    }


    console.log()

    setCvcNumberERR(cvcNumberERR);
    setCardNumberERR(cardNumberERR);
    setExpireERR(expireDateERR);
    setExpireERR2(expireDateERR2);
    setphoneERR(phoneNumberERR);
    setaddressERR(addressERR);
    setrecieverNameERR(recieverNameERR);
    return isValid;
  }

  useEffect(() => {
    setCusID(user.id);

  }, [])

  console.log("dsdaaaaa")
  console.log(cus_id);

  const sendDataToAPI = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      var customer_id = cus_id;
      if (paymentData.length === 0) {


        await axios.post('https://localhost:5000/api/v3/payment/',
          {
            customer_id, number, name, expiry, cvc, email
          }
        )
      }
      else {
    
        var Hname = name;
        await axios.put(`https://localhost:5000/api/v3/payment/updatePayment/${cus_id}`,
          {
            number, Hname, expiry, cvc, email
          }
        )
      }
      await axios.post(`https://localhost:5000/api/v4/Delevery/`,
        {
          recieverName, address, phoneNumber, orderID
        }
      )


      var status = "Pending";
      var PaymentStatuss = "Paid"
      var delevary_status = "Not shipped";

      await axios.post(`https://localhost:5000/api/v6/orders/`,
        {
          cus_id, status, delevary_status, PaymentStatuss, recieverName, address, phoneNumber
        }

      ).then((getData) => {
        //setOrderData(getData.data);
        var order_ID = getData.data._id;
        console.log(getData.data);


        apiData.map((data) => {
          var product_id = data.product_ID;
          var quantity = data.quantity;
          var product_Name = data.product_Name;
          axios.post('https://localhost:5000/api/v7/orderedProduct/create',
            {
              order_ID, product_id, quantity, product_Name
            }
          ).then(async () => {

            axios.get(`https://localhost:5000/api/inventoryProducts/${product_id}`)
              .then((getData) => {


                console.log(getData.data.units_in_stock - quantity);
                var tempQuantity = getData.data.units_in_stock - quantity

                console.log(tempQuantity)

                axios.patch(`https://localhost:5000/api/inventoryProducts/updateQTY/${product_id}`,
                  {
                    tempQuantity
                  }
                ).then(() => {
                  axios.delete(`https://localhost:5000/api/v5/Cart/delete/${product_id}/${cus_id}`)
                    .then(() => {
                      axios.post('https://localhost:5000/api/v8/incomeHistory/insert',
                        {
                          order_ID, total
                        })
                        toast.success(`Order placed successfully `,{
                          position: "bottom-left",
                      });
                      setTimeout(() => {
                        window.location = "/products"
                      }, 3000);
                    
                     
                    });
                })

              }
              )

          })
        })



      })


      // alert("Successfully added the order");


    }
  }

  //const id= "63288b61593a63c2c1880af7"
  const customer_id = "632888d1d9c66d7fc9973317";


  const [orderData, setOrderData] = useState();

  console.log("hujghih");




  const fetchCartData = () => {

    const billAPI = `https://localhost:5000/api/v1/eBill/getall/${user.id}`;
    const paymentAPI = `https://localhost:5000/api/v3/payment/getPayment/${user.id}`;

    const getBill = axios.get(billAPI)
    const getPayment = axios.get(paymentAPI);

    axios.all([getBill, getPayment]).then(

      axios.spread((...allData) => {
        const alldataBill = allData[0]
        const alldataPayments = allData[1]
        setPayment(alldataPayments.data)
        setApiData(alldataBill.data)
        setNumber(alldataPayments.data.Card_Number)
        setName(alldataPayments.data.Card_holder_name)
        setExpiryDate(alldataPayments.data.Card_expiry_date)
        setCvc(alldataPayments.data.Card_CVC)

      })
    )
  }


  const fetchBuyNowData = () => {

    const billAPI = `https://localhost:5000/api/v1/eBill/getone/${id}/${qty}`;
    const paymentAPI = `https://localhost:5000/api/v3/payment/getPayment/${user.id}`;

    const getBill = axios.get(billAPI)
    const getPayment = axios.get(paymentAPI);

    axios.all([getBill, getPayment]).then(

      axios.spread((...allData) => {
        const alldataBill = allData[0]
        const alldataPayments = allData[1]
        setPayment(alldataPayments.data)
        setApiData(alldataBill.data)
        setNumber(alldataPayments.data.Card_Number)
        setName(alldataPayments.data.Card_holder_name)
        setExpiryDate(alldataPayments.data.Card_expiry_date)
        setCvc(alldataPayments.data.Card_CVC)

      })
    )
  }
  const [userData, setUserData] = useState([]);


  const fetchUserDetails = () => {
    axios.get(`https://localhost:5000/api/users/${user.id}`)
      .then((getData) => {
        setUserData(getData.data);
        setRecieverNAme(getData.data.name);
        setAddress(getData.data.address);
        setPhoneNumber(getData.data.phone);
        setEmail(getData.data.email)
      })
  }
  const aa = 45;

  const shouldLog = useRef(true);
  const [IDD, setID] = useState();
  const [VAL, setval] = useState();
  console.log('Testtttt');
  console.log(IDD);
  const { id, qty } = useParams();
  //const{count} = useParams("qty");
  //console.log(count);

  //const id=null;


  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;

      if (id == "cart") {
        fetchCartData()
      } else {
        fetchBuyNowData()
      }
      fetchUserDetails();

    }
  }, []);




  console.log(IDD);

  var total
  var orderID
  apiData.map((data) => {
    total = apiData[0].total_Amount
    orderID = apiData[0].Order_ID

  })
  //console.log(orderID);


  /*  const Cardnumber=paymentData.Card_Number
    const Username=paymentData.Card_holder_name
    const expireDate=paymentData.Card_expiry_date
    const Cvc=paymentData.Card_CVC
    */


  return (
    <main id="main" className="main">

      <div className="pagetitle" style={{}}>

        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Tables</li>
            <li className="breadcrumb-item active">General</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">E-Bill</h5>

              {/* <!-- Default Table --> */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">products ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">quantity</th>
                    <th scope="col">price</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((data) => {

                    return (

                      <tr>
                        <th scope="row">{data.product_ID}</th>
                        <td>{data.product_Name}</td>
                        <td>{data.quantity}</td>
                        <td>LKR{data.product_price}</td>
                      </tr>
                    )
                  })}
                 
                  <tr>
                    <th scope="row">Shpping and HandingCost</th>
                    <td></td>
                    <td></td>
                    <td>
                      LKR 450
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Total Amount</th>
                    <td></td>
                    <td></td>
                    <th>
                      LKR{total+450}
                    </th>
                  </tr>

                </tbody>
              </table>

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <h5 className="card-title">Shipping details</h5>
            <div className="card-body">
              <form className="row g-3">

                <div class="col-md-6">
                  <div class="input-item input-item-name ltn__custom-icon">
                    Your Name
                    <input type="text" onChange={(e) => setRecieverNAme(e.target.value)} defaultValue={recieverName} id="floatingName" />
                    <label htmlFor="rawMaterial" className="form-label">
                      {Object.keys(recieverNameERR).map((key) => {
                        return <div style={{ color: "red" }}>{recieverNameERR[key]}</div>
                      })}   </label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="input-item input-item-website ltn__custom-icon">
                    Your Address
                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} defaultValue={address} id="floatingName" />
                    <label htmlFor="rawMaterial" className="form-label">
                      {Object.keys(addressERR).map((key) => {
                        return <div style={{ color: "red" }}>{addressERR[key]}</div>
                      })}   </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div class="input-item input-item-website ltn__custom-icon">
                    Phone
                    <input type="text" className="form-control" onChange={(e) => setPhoneNumber(e.target.value)} defaultValue={phoneNumber} id="floatingCity" />
                    {Object.keys(phoneNumberERR).map((key) => {
                      return <div style={{ color: "red" }}>{phoneNumberERR[key]}</div>
                    })}
                  </div>
                </div>



                <br />
                <div className="col-md-6">
                </div>

                <h5 className="card-title">Payment details</h5>


                <div className="col-md-12">
                  <div className="form-floating">
                    Card Number
                    <input type="text" className="form-control" defaultValue={number} onChange={(e) => setNumber(e.target.value)} name="number" maxlength="16" />
                    <label htmlFor="rawMaterial" className="form-label">
                      {Object.keys(cardNumberERR).map((key) => {
                        return <div style={{ color: "red" }}>{cardNumberERR[key]}</div>
                      })}   </label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    Card holder's name
                    <input type="text" className="form-control" defaultValue={name} onChange={(e) => setName(e.target.value)} name="name" maxlength="17" />
                    <label htmlFor="rawMaterial" className="form-label"> {Object.keys(userNameERR).map((key) => {
                      return <div style={{ color: "red" }}>{userNameERR[key]}</div>
                    })}
                    </label>
                  </div>
                </div>


                <div className="col-md-6">

                  <div className="form-floating">
                    Expire date
                    <input type="text" className="form-control" defaultValue={expiry} onChange={(e) => setExpiryDate(e.target.value)} name="expiredate" maxlength="5" />
                    <label htmlFor="rawMaterial" className="form-label">
                      {Object.keys(expireDateERR).map((key) => {
                        return <div style={{ color: "red" }}>{expireDateERR[key]}</div>
                      })}
                      {Object.keys(expireDateERR2).map((key) => {
                        return <div style={{ color: "red" }}>{expireDateERR2[key]}</div>
                      })} </label>
                  </div>
                </div>


                <div className="col-md-2">
                  <div className="form-floating">
                    CVC
                    <input type="text" className="form-control" defaultValue={cvc} onChange={(e) => setCvc(e.target.value)} name="CVC" maxlength="3" />
                    <label htmlFor="rawMaterial" className="form-label">
                      {Object.keys(cvcNumberERR).map((key) => {
                        return <div style={{ color: "red" }}>{cvcNumberERR[key]}</div>
                      })}   </label>
                  </div>
                </div>
                <br />
                <div className="col-md-4">
                </div>

                <div className="text-center">
                  <button class="btn theme-btn-1 btn-effect-1 text-uppercase" onClick={(e) => sendDataToAPI(e)} type="submit">Place order</button>


                </div>
              </form>

            </div>
          </div>

        </div>
      </div>


    </main>
  );

}
export default CusEbill;