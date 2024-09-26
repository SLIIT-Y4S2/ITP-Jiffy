import React from 'react';

var path = ''
if((window.location.href).indexOf("account")>-1){
    path = 'Account'
}else if((window.location.href).indexOf("my-order")>-1){
    path = 'Order Details'
}else if((window.location.href).indexOf("signup")>-1){
    path = 'Sign up'
}else if((window.location.href).indexOf("login")>-1){
    path = 'Sign in'
}else if((window.location.href).indexOf("AddCustomerPayment")>-1){
    path = 'Payment method'
}else if((window.location.href).indexOf("products")>-1){
    path = 'Products'
}else if((window.location.href).indexOf("product-overview")>-1){
    path = 'Product Overview'
}



function Breadcrumb() {
    return(
        <div className="ltn__breadcrumb-area ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image plr--9---">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
                        <div className="section-title-area ltn__section-title-2">
                            <br/><br/><br/><br/>
                            <h1 className="section-title white-color">{path}</h1>
                        </div>
                        <div className="ltn__breadcrumb-list">
                            <ul>
                                <li><a href="https://localhost:3000/">Home</a></li>
                                <li>{path}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Breadcrumb;