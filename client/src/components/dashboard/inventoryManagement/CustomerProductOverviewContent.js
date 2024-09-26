import React from 'react';
import { Link } from 'react-router-dom'
import  Axios  from 'axios';
import {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function CustomerProductOverviewContent(){
    const navigate = useNavigate();



  const [quantityERR,setQuantityERR]=useState({});

    const formValidation = () =>{
       const quantityERR = {};
       let isValid = true;
    
       if(count>product['units_in_stock']-1){
       
        quantityERR.cvcShort="Out of stock!";
        isValid = false;
       }

       setQuantityERR(quantityERR);
       return isValid;
    }

  const pathname = window.location.pathname
  const id = pathname.split("/")[2]

  const [count,setCount] = useState(1);

  function increase(){
  
    const isValid = formValidation();
    if(isValid){
      setCount(count+1);
    }
  }

  function decrease(){
     if(count>0){
      formValidation();
   
      setCount(count-1);
   
    }
  }


 //fetching details of a single product
 const [product, setProductDetails] = useState(
    {
      product_name: "",
      unit_price: "",
      reorder_level: "",
      weight_per_unit: "",
      units_in_stock: "",
      description: "",
      photo: "",
      __v: 0,
      _id: ""
    })

    useEffect(() => {
      const fetchProduct = async () => {
        
        const response = await fetch(`/api/inventoryProducts/${id}`)
        const json = await response.json()
        
        if (response.ok) {
          
          setProductDetails(
            {
              product_name: `${json["product_name"]}`,
              unit_price: `${json["unit_price"]}`,
              reorder_level: `${json["reorder_level"]}`,
              weight_per_unit: `${json["weight_per_unit"]}`,
              units_in_stock: `${json["units_in_stock"]}`,
              description: `${json["description"]}`,
              photo: `${json["photo"]}`,
              __v: 0,
              _id: `${json["_id"]}`
            })
        } else{
          console.log("not ok")
        }
         
      }
  
      fetchProduct()
      
    }, [setProductDetails])

    var  u_price = product["unit_price"]*count;

 
    const Item_number=id;
    const quantity =count;
   
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
   
    const [AppData,setTempData] = useState([]);
   
   
     const sendDataToCART = ()=>{

        navigate('/cart');
   
       console.log(customer_id)
       console.log(Item_number)
       console.log(quantity)
     
       Axios.get(`https://localhost:5000/api/v5/Cart/get/${id}/${customer_id}`)
       .then((getData)=>{
           setTempData(getData.data);
           console.log(getData.data);
           console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
   
           if(getData.data.length===0) {
       
               Axios.post('https://localhost:5000/api/v5/Cart/insert',
               {
                   customer_id, Item_number,quantity
                   
               }
               )
               toast.success(`${product["product_name"]} successfully added to cart`,{
                   position: "bottom-left",
               });
         
           }
           else{
               
               Axios.put(`https://localhost:5000/api/v5/Cart/update/${id}/${customer_id}`,
               {
                   customer_id, Item_number,quantity
               }
               )
                  toast.info(`Increased ${product["product_name"]} quantity`,{
                       position: "bottom-left",
                   });
               
           }
       })
     }
    
    return(
        <React.Fragment>

<div class="body-wrapper">



<div class="ltn__utilize-overlay"></div>



{/* <!-- SHOP DETAILS AREA START -->  */}
<div class="ltn__shop-details-area pb-85">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="ltn__shop-details-inner mb-60">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="ltn__shop-details-img-gallery">
                               
                            <img src={(product["photo"] == '') ? 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' : require("./uploadedImages/"+product["photo"])}  alt="img" />
                                
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="modal-product-info shop-details-info pl-0">
                              
                            <h3>{product["product_name"]}</h3>
                                <div class="product-price">
                                    <span>Rs. {u_price} /=</span>
                                    <br />
                                    <button onClick={decrease}>- </button>                            
                                    {count}
                                    <button onClick={(e) => increase(e)}> +</button>
                                    <br />
                                    {Object.keys(quantityERR).map((key) => {
                                     return <div style={{color:"red"}}>{quantityERR[key]}</div>
                                     })}
                                </div>
                                <div class="modal-product-meta ltn__product-details-menu-1">
                                    <hr />
                                </div>
                                <div class="ltn__product-details-menu-2">
                                    <ul>
                                        <li><Link to ={{pathname:`/ebill/${id}/${count}`}}>
                                       
                                            <a href="#" class="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-toggle="modal" data-target="#add_to_cart_modal">
                                              
                                                <span>BUY NOW</span>
                                              
                                            </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#"  title="Add to Cart" data-toggle="modal" data-target="#add_to_cart_modal">
   
                                         
                                                <button class="theme-btn-1 btn btn-effect-1"  onClick={ sendDataToCART} >ADD TO CART
                                                <i class="fas fa-shopping-cart"></i>
                                                </button>
                                            
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="ltn__product-details-menu-3">
                                    <ul>
                                        <li>
                                            <a href="#" class="" title="Wishlist" data-toggle="modal" data-target="#liton_wishlist_modal">
                                                <i class="far fa-heart"></i>
                                                <span>Add to Wishlist</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="" title="Compare" data-toggle="modal" data-target="#quick_view_modal">
                                                <i class="fas fa-exchange-alt"></i>
                                                <span>Compare</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                                <div class="ltn__social-media">
                                    <ul>
                                        <li>Share:</li>
                                        <li><a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                                        <li><a href="#" title="Instagram"><i class="fab fa-instagram"></i></a></li>
                                        
                                    </ul>
                                </div>
                                <hr />
                                <div class="ltn__safe-checkout">
                                    <h5>Guaranteed Safe Checkout</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Shop Tab Start --> */}
                <div class="ltn__shop-details-tab-inner ltn__shop-details-tab-inner-2">
                    <div class="ltn__shop-details-tab-menu">
                        <div class="nav">
                            <a class="active show" data-toggle="tab" href="#liton_tab_details_1_1">Description</a>
                        </div>
                    </div>
                    <div class="tab-content">
                       <p>{product["description"]}</p>
                    </div>
                </div>
                {/* <!-- Shop Tab End --> */}
            </div>
        </div>
    </div>
</div>
{/* <!-- SHOP DETAILS AREA END --> */}



</div>


        </React.Fragment>
    )
}

export default CustomerProductOverviewContent;