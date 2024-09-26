import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import axios from 'axios';
import CartMenu from '../../CartMenu';



export default function ShoppingCart() {
    const [apiData, setApiData] = useState([]);


    const [customer_id, setCusID] = useState('');

    const [user, setUser] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("user");
        const initialValue = JSON.parse(saved);
        return initialValue || "";

    });

    useEffect(() => {
        setCusID(user.id);
    }, [])


    useEffect(() => {
        Axios.get(`https://localhost:5000/api/v5/Cart/getAll/${customer_id}`)
            .then((getData) => {
                setApiData(getData.data);
            })
    })
    console.log(apiData)





    //Deleting from cart
    const onDelete = (id) => {
        axios.delete(`https://localhost:5000/api/v5/Cart/delete/${id}/${customer_id}`)
            .then(() => {
                console.log(customer_id)

            })

    }

    //total
    var totalCartPrice = 0;

const id="cart";
const count=5;

    return (
        //<!-- SHOPING CART AREA START -->
        <div class="liton__shoping-cart-area mb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="shoping-cart-inner">
                            <div class="shoping-cart-table table-responsive">
                                <table class="table">
                                    <tbody>
                                        {apiData.map((data) => {
                                            totalCartPrice += data.unit_price * data.quantity;
                                            return (

                                                <tr >
                                                    <td class="cart-product-remove"><button type="button" class="btn btn-outline-danger" onClick={() => onDelete(data.product_id)}> Delete </button></td>
                                                    <td class="cart-product-image">

                                                    </td>
                                                    <td class="cart-product-info">
                                                        <h4><a href="product-details.html">{data.product_name}</a></h4>
                                                    </td>
                                                    <td class="cart-product-price">Rs.{data.unit_price}</td>
                                                    <td class="cart-product-quantity">
                                                        <div class="cart-plus-minus">
                                                            {data.quantity}
                                                        </div>
                                                    </td>
                                                    <td class="cart-product-subtotal">Rs.{data.quantity * data.unit_price}</td>
                                                </tr>
                                            )
                                        })}



                                    </tbody>
                                </table>
                            </div>
                            <div class="shoping-cart-total mt-50">
                                <h4>Cart Totals</h4>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Cart Subtotal</td>
                                            <td>Rs.{totalCartPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping and Handing</td>
                                            <td>Rs450.00</td>
                                        </tr>
                                        <tr>
                                            <td>Vat</td>
                                            <td>Rs.00.00</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Order Total</strong></td>
                                            <td><strong>Rs.{totalCartPrice + 450}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="btn-wrapper text-right">
                                   
                                    <Link to={{ pathname: `/ebill/${id}/${count}` }}>

                                        <button class="theme-btn-1 btn btn-effect-1">Proceed to checkout</button>
                              

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );


}