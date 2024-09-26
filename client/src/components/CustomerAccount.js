import { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { toast } from "react-toastify";

function CustomerAccount() {
    const navigate = useNavigate()
    const { logout } = useLogout()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sFeedback, setSiteFeedback] = useState('')
    const [error, setError] = useState(null)
    const [errorPosition, setErrorPosition] = useState(null)

    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        axios.get(`/api/orders/${user.id}`)
            .then((getData) => {
                setCustomerOrders(getData.data);
            })
    }, [])

    const [user, setUser] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    console.log("User log " + user)
    const [customer, setCustomer] = useState(
        {
            email: "",
            lastLogin: "",
            name: "",
            password: "",
            phone: "",
            address: "",
            __v: 0,
            _id: ""
        })

    useEffect(() => {
        const fetchCustomer = async () => {
            const response = await fetch(`/api/users/${user.id}`)
            const json = await response.json()
            if (response.ok) {
                setCustomer(
                    {
                        email: `${json["email"]}`,
                        lastLogin: `${json["lastLogin"]}`,
                        name: `${json["name"]}`,
                        phone: `${json["phone"]}`,
                        address: `${json["address"]}`,
                        password: `${json["password"]}`,
                        __v: 0,
                        _id: `${json["_id"]}`
                    })
                setName(json["name"])
                setEmail(json["email"])
                setAddress(json["address"])
                setPhone(json["phone"])
            } else {
                console.log("not ok")
            }

        }

        fetchCustomer()

    }, [setCustomer])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('https://localhost:5000/api/users/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                address: address,
                phone: phone,
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            console.log(json.error)
        }

        if (response.ok) {
            console.log('User updated', json)
            window.location.reload();
        }
    }

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault()
        console.log("Feedback "+sFeedback)
        const siteFeedback = { name, sFeedback, email}
    
        const csrfResponse = await fetch('/csrf/generate', {
          method: 'GET',
          credentials: 'include'
        })
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrfToken;
        console.log("csrfToken", csrfToken);

        const response = await fetch('/api/site-feedbacks', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(siteFeedback),
          headers: {
            'x-csrf-token': csrfToken, // Include the CSRF token in the header
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
          setErrorPosition(json.errorPosition)
          console.log(error)
        }
    
        if (response.ok) {
          alert('New feedback added');
          console.log('new feedback added', json)
          window.location.reload();
        }
      }

    const handleUpdatePasswordSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('https://localhost:5000/api/users/reset-password/' + user.id, {
            method: 'PATCH',
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            console.log(json.error)
        }

        if (response.ok) {
            console.log('Password updated', json)
            window.location.reload();
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const [number, setNumber] = useState('');
    const [Hname, setHName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:5000/api/v3/payment/getPayment/${user.id}`)
            .then((getData) => {
                setApiData(getData.data);
                setNumber(getData.data.Card_Number)
                setHName(getData.data.Card_holder_name)
                setExpiry(getData.data.Card_expiry_date)
                setCvc(getData.data.Card_CVC)

            })
    }, [])

    const [isData, setData] = useState(false);

    function checkdata() {
        if (apiData == []) {
            const chk = true;
            return chk;
        } else {
            const chk = false;
            return chk;
        }

    }

    const onDelete = (e) => {
        e.preventDefault();


        axios.delete(`https://localhost:5000/api/v3/payment/removePayment/${user.id}`)
            .then(() => {
            })
            toast.success(`Payment details removed successfully`,{
                position: "bottom-left",
            });
            setTimeout(() => {
              window.location = "/account"
            }, 2000);

    }

    const [userNameERR, setuserNameERR] = useState({});
    const [cardNumberERR, setCardNumberERR] = useState({});
    const [cvcNumberERR, setCvcNumberERR] = useState({});
    const [expireDateERR, setExpireERR] = useState({});
    const [expireDateERR2, setExpireERR2] = useState({});

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
        const userNameERR = {};
        let isValid = true;

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

        if (isEmpty(Hname)) {
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
        return isValid;
    }

    const sendDataToAPI = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid) {
            axios.put(`https://localhost:5000/api/v3/payment/updatePayment/${user.id}`,
                {
                    number, Hname, expiry, cvc
                }
            )
            toast.success(`Order placed successfully `,{
                position: "bottom-left",
            });
            setTimeout(() => {
              window.location = "/account"
            }, 2000);
        }
    }

    return (
        <div class="liton__wishlist-area pb-70">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ltn__product-tab-area">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="ltn__tab-menu-list mb-50">
                                            <div class="nav">
                                                <a class="active show" data-toggle="tab" href="#liton_tab_1_1">Dashboard </a>
                                                <a data-toggle="tab" href="#liton_tab_1_2">Orders </a>
                                                <a data-toggle="tab" href="#liton_tab_1_3">Payment Method </a>
                                                <a data-toggle="tab" href="#liton_tab_1_4">Account Details </a>
                                                <a data-toggle="tab" href="#liton_tab_1_5">Feedback </a>
                                                <a onClick={handleLogout}>Logout</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="tab-content">
                                            <div class="tab-pane fade active show" id="liton_tab_1_1">
                                                <div class="ltn__myaccount-tab-content-inner">
                                                    <p>Hello <strong>{name}</strong></p>
                                                    <p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your account details</span>.</p>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="liton_tab_1_2">
                                                <div class="ltn__myaccount-tab-content-inner">
                                                    <div class="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Order ID</th>
                                                                    <th>Date</th>
                                                                    <th>Status</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {customerOrders.map((order) => (
                                                                    <tr key={order._id}>
                                                                        <td>{order._id}</td>
                                                                        <td>{order.Date}</td>
                                                                        <td>{order.Status}</td>
                                                                        <td><Link to={{ pathname: `/my-order/${order._id}` }}><i class="far fa-arrow-to-bottom mr-1"></i> View Order</Link></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="liton_tab_1_3">
                                                <div class="ltn__myaccount-tab-content-inner">
                                                    <div class="row">
                                                        {checkdata() ? <div class="col-md-6 col-10 learts-mb-30"  >
                                                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <h4 class="alert-heading">Payments details Requset</h4>
                                                                <p style={{ marginBottom: "20%" }}>Please enter the payment details.It will be used on the checkout page by default</p>
                                                                <hr />
                                                                <p class="mb-0">Press below "Add card details" button to add payment details</p>
                                                                <br />
                                                                <Link reloadDocument to='/AddCustomerPayment'>
                                                                    <button type="button" class="btn btn-danger rounded-pill">Add card details</button>
                                                                </Link>
                                                            </div> </div> : <div>

                                                            <form className="row g-3">
                                                                <div className="col-md-12">
                                                                    <div className="form-floating">
                                                                        <h5>card Number</h5>
                                                                        <input type="text" className="form-control" defaultValue={number} maxlength="16" onChange={(e) => setNumber(e.target.value)} name="number" required />
                                                                        <label htmlFor="rawMaterial" className="form-label">
                                                                            {Object.keys(cardNumberERR).map((key) => {
                                                                                return <div style={{ color: "red" }}>{cardNumberERR[key]}</div>
                                                                            })}</label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-floating">
                                                                        <h5>Card holder's name</h5>
                                                                        <input type="text" className="form-control" defaultValue={Hname} maxlength="17" onChange={(e) => setHName(e.target.value)} name="Hname" required />
                                                                        <label htmlFor="rawMaterial" className="form-label">
                                                                            {Object.keys(userNameERR).map((key) => {
                                                                                return <div style={{ color: "red" }}>{userNameERR[key]}</div>
                                                                            })}
                                                                        </label>
                                                                    </div>
                                                                </div>


                                                                <div className="col-md-6">
                                                                    <h5>Expire date (MM/YY)</h5>
                                                                    <div className="form-floating">
                                                                        <input type="text" className="form-control" defaultValue={expiry} onChange={(e) => setExpiry(e.target.value)} name="expiredate" required />
                                                                        <label htmlFor="rawMaterial" className="form-label">{Object.keys(expireDateERR).map((key) => {
                                                                            return <div style={{ color: "red" }}>{expireDateERR[key]}</div>
                                                                        })}
                                                                            {Object.keys(expireDateERR2).map((key) => {
                                                                                return <div style={{ color: "red" }}>{expireDateERR2[key]}</div>
                                                                            })}

                                                                        </label>
                                                                    </div>
                                                                </div>


                                                                <div className="col-md-3">
                                                                    <div className="form-floating">
                                                                        <h5>CVC </h5>
                                                                        <input type="text" className="form-control" defaultValue={cvc} onChange={(e) => setCvc(e.target.value)} maxlength="3" name="CVC" required />
                                                                        <label htmlFor="rawMaterial" className="form-label">{Object.keys(cvcNumberERR).map((key) => {
                                                                            return <div style={{ color: "red" }}>{cvcNumberERR[key]}</div>
                                                                        })}</label>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                </div>
                                                                <div className="col-md-2">
                                                                </div>

                                                                <div className="text-center">
                                                                    <button class="btn theme-btn-1 btn-effect-1 text-uppercase" onClick={(e) => sendDataToAPI(e)} type="submit">Update</button>
                                                                </div>
                                                                <div className="col-md-2">
                                                                </div>
                                                                <div className="text-center">
                                                                    <button class="btn theme-btn-1 btn-effect-1 text-uppercase" onClick={(e) => onDelete(e)} type="submit">Remove</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="liton_tab_1_4">
                                                <div class="ltn__myaccount-tab-content-inner">
                                                    <p>The following addresses will be used on the checkout page by default.</p>
                                                    <div class="ltn__form-box">
                                                        <form onSubmit={handleUpdateSubmit}>
                                                        {error && <p style={{ color: 'red' }}>*{error}</p>}
                                                            <div class="row mb-50">
                                                                <div class="col-md-6">
                                                                    <label>Name:</label>
                                                                    <input type="text" name="ltn__name"
                                                                        onChange={(e) => setName(e.target.value)} value={name} />
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label>Email:</label>
                                                                    <input type="email" name="ltn__email"
                                                                        onChange={(e) => setEmail(e.target.value)} value={email} />
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label>Phone:</label>
                                                                    <input type="text" name="ltn__phone"
                                                                        onChange={(e) => setPhone(e.target.value)} value={phone} />
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <label>Address:</label>
                                                                    <input type="text" name="ltn__email"
                                                                        onChange={(e) => setAddress(e.target.value)} value={address} />
                                                                </div>
                                                            </div>
                                                            <div class="btn-wrapper">
                                                                <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Save Changes</button>
                                                            </div>
                                                        </form>
                                                        <br /><br /><br /><br />
                                                        <form onSubmit={handleUpdatePasswordSubmit}>
                                                        {error && <p style={{ color: 'red' }}>*{error}</p>}
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <label>Current password (leave blank to leave unchanged):</label>
                                                                    <input type="password" name="ltn__name" 
                                                                    onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword}/>
                                                                    <label>New password (leave blank to leave unchanged):</label>
                                                                    <input type="password" name="ltn__lastname" 
                                                                    onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
                                                                    <label>Confirm new password:</label>
                                                                    <input type="password" name="ltn__lastname"
                                                                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                                                                </div>
                                                            </div>
                                                            <div class="btn-wrapper">
                                                                <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Update Password</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="liton_tab_1_5">
                                                <div class="ltn__myaccount-tab-content-inner">
                                                    <div class="ltn__form-box">
                                                        <form onSubmit={handleFeedbackSubmit}>
                                                            <div class="row mb-50">
                                                                <div class="col-md-12">
                                                                    <label>Feedback:</label>
                                                                    <textarea rows="4" cols="50" name="ltn__email" 
                                                                    onChange={(e) => setSiteFeedback(e.target.value)} value={sFeedback}></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="btn-wrapper">
                                                                <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Send</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CustomerAccount;