import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios';
import { useParams } from 'react-router-dom'

function SupplierPayment() {

    const [apiData, setApiData] = useState([]);
    const [paidData, setPaidData] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:5000/api/v9/supplierOrder/unpaid/`)
        .then((getData)=>{
          setApiData(getData.data);
        })         
       
        }
      , );
    

      useEffect(() => {
        axios.get(`https://localhost:5000/api/supplier-payment/`)
        .then((getData)=>{
          setPaidData(getData.data);
        })         
       
        }
      , );
    

      

    return(
      <div>
      <h1 >Supplier Transaction</h1>
        <section class="section" style={{marginTop:"3%"}} >
        <div class="row">
          <div class="col-lg-10">
  
            <div class="card" style={{padding:"2%"}}>
              <div class="card-body">
                
  
              <ul class="nav nav-tabs nav-tabs-bordered" id="borderedTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-home" type="button" role="tab" aria-controls="home" aria-selected="true"><h2>To be pay</h2></button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h2>Payment history</h2></button>
                </li>
                </ul>
              <div class="tab-content pt-2" id="borderedTabContent">
                <div class="tab-pane fade show active" id="bordered-home" role="tabpanel" aria-labelledby="home-tab" style={{paddingTop:"5%"}}>
                
                <table class="table">
                  <thead>
                    <tr>
              
                      <th scope="col">Raw material</th>
                      <th scope="col">quantity</th>
                      <th scope="col">Status </th>
                    </tr>
                  </thead>
                  <tbody>
                   {apiData.map((data) => {

                    return (

                      <tr>
                        <td>{data.rawMaterial}</td>
                        <td>{data.quantity}</td>

                        <td>{data.orderStatus}</td>
                  <Link to ={{pathname:`/SupplierPaymentForm/${data._id}/${data.supplierId}`}}>   
              <button type="button" class="btn btn-outline-primary">Add Payment</button>
                 </Link>
                      </tr>
                    )
                  })}
                      
                  </tbody>
                </table>
                
                
                
                </div>
                <div class="tab-pane fade" id="bordered-profile" role="tabpanel" aria-labelledby="profile-tab" style={{paddingTop:"5%"}}>
                <Link to ={{pathname:`/SupplierPayementReportPage`}}> 
                <button type="button" class="btn btn-primary" >Generate Report</button>
                </Link>
                <br/>  <br/>
                <table class="table">
                  <thead>
                    <tr>
              
                      <th scope="col">Supplier Name</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">Amount </th>
                      <th scope="col">Date </th>
                    </tr>
                  </thead>
                  <tbody>
                   {paidData.map((data) => {

                    return (

                      <tr>
                        <td>{data.supplierName}</td>
                        <td>{data.orderID}</td>

                        <td>LKR.{data.amount}</td>
                        <td>{data.transactionDate}</td>
                        <td>
                  <Link to ={{pathname:`/viewSupplierPayment/${data.orderID}/${data.supplierID}/${data._id}/${data.transactionDate}/${data.fileName}`}}>   
                  <button type="button" class="btn btn-light">View More</button>
                 </Link></td>
                      </tr>
                    )
                  })}
                      
                  </tbody>
                </table>
                
                </div>
               
              </div>
  
                
        
              </div>
            </div>
  
           
          </div>
        </div>
      </section>
    
</div>
    );
}

export default SupplierPayment;