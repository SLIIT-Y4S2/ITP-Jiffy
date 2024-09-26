import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';

export default function AddCustomerPayment() {

  const [number, setCardNumber] = useState('');
  const [name, setHolderName] = useState();
  const [expiry, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [focus, setFocus] = useState('');
  const [customer_id,setCusID] = useState('');




const [cardNumberERR,setCardNumberERR]=useState({});
const [cvcNumberERR,setCvcNumberERR]=useState({});
const [expireDateERR,setExpireERR]=useState({});

const [user, setUser] = useState(() => {
  // getting stored value
  const saved = localStorage.getItem("user");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
  
});

useEffect(() => {  
  setCusID(user.id);
})

//setCusID(user.id);
//form validation
const formValidation = () =>{
   const cardNumberERR = {};
   const cvcNumberERR = {};
   const expireDateERR ={};
   let isValid = true;

   if(cvc.trim().length < 3){
    cvcNumberERR.cvcShort="Invalid CVC Number!";
    isValid = false;
   }
   if(cvc.trim().length > 3){
    cvcNumberERR.cvcShort="Invalid CVC Number!";
    isValid = false;
   }

   if(isNaN(cvc)){
    cvcNumberERR.cvcShort="Invalid CVC Number!";
    isValid = false;
   }
   

  if(number.toString().length<16){
    cardNumberERR.numberShort="Invalid Card Number!"; 
    isValid = false;
  }

   if(isNaN(number)){
    cardNumberERR.numberShort="Invalid Card Number!"; 
    isValid = false;
   }

   const ex1 = String(expiry).slice(0,2)
   const month = Number(ex1)

   if(month>12) {
    expireDateERR.expireShort="Invalid Expire Date!"
    isValid = false;
   }

   console.log()

   setCvcNumberERR(cvcNumberERR);
   setCardNumberERR(cardNumberERR);
   setExpireERR(expireDateERR);
   return isValid;
}

  const sendDataToAPI = (e) => {
    e.preventDefault();
      const isValid = formValidation();
      if(isValid){
    axios.post('https://localhost:5000/api/v3/payment/',
      {
        number, name, expiry, cvc, customer_id
      }
    )
    window.location = "/account"
      }
  }



  return (
    <section class="section" style={{ marginTop: "2%", marginLeft: "35%", marginBottom: "10%" }}>
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <div style={{ marginBottom: "-40%" }}>
                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={name}
                  number={number}

                />
              </div>
              <h5 className="card-title" style={{ marginTop: "50%", marginBottom: "4%" }}>Payment details</h5>
              <form >

                <div className="col-md-12">
                  <div className="form-floating" style={{ marginBottom: "4%" }}>

                    <input type="tel" className="form-control" val={number} onChange={(e) => setCardNumber(e.target.value)} maxlength="16" onFocus={e => setFocus(e.target.name)} name="number" placeholder="Enter the Card number" />

                    {Object.keys(cardNumberERR).map((key) => {
                      return <div style={{color:"red"}}>{cardNumberERR[key]}</div>
                    })}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating" style={{ marginBottom: "4%" }}>

                    <input type="tel" className="form-control" val={name} onChange={(e) => setHolderName(e.target.value)} maxlength="20" name="name" onFocus={e => setFocus(e.target.name)} placeholder="Enter the Card holder's name" />

                  </div>
                </div>



                <div className="col-md-4">
                  <div className="form-floating" style={{ marginBottom: "10%" }}>
                    <input type="tel" className="form-control" val={expiry} onChange={(e) => setExpiryDate(e.target.value)} name="expiry" onFocus={e => setFocus(e.target.name)} placeholder="Expire date" />
                    </div>
                </div>
                    {Object.keys(expireDateERR).map((key) => {
                      return <div style={{color:"red"}}>{expireDateERR[key]}</div>
                    })}
                 

                <div className="col-md-4">

                </div>
                <div className="col-md-3">
                  <div className="form-floating" style={{ marginBottom: "4%" }}>
                    <input type="tel" className="form-control" val={cvc} onChange={(e) => setCVC(e.target.value)} name="cvc" onFocus={e => setFocus(e.target.name)} placeholder="CVC" />
                    <br/>
                    </div>
                </div>
                    {Object.keys(cvcNumberERR).map((key) => {
                      return <div style={{color:"red"}}>{cvcNumberERR[key]}</div>
                    })}
                

                <div className="text-center">
                  <button type="submit" className="btn btn-primary" onClick={(e) => sendDataToAPI(e)}>Submit</button>


                </div>
              </form>
            </div></div></div></div></section>

  );
}