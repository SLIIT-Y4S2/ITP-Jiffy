import React from "react";
import {useNavigate} from "react-router-dom";

import{useState, useEffect} from "react";

import Modal from'react-bootstrap/Modal';
import Button from'react-bootstrap/Button';


function ProductOverviewContent(){

  
  const pathname = window.location.pathname
  const id = pathname.split("/")[2]

  console.log(id)

  let navigate = useNavigate();

  /************************************************************************** */

  //alerts when product deleted/not deleted from database
  const [productDeleted, setProductDeletedAlert] = useState('')
  const[productNotDeleted, setProductNotDeletedAlert] = useState('')


  //for the modal
  const [showModal, setShowModal] =useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

 const handleShow = () => setShowModal(true);


  /************************************************************************** */

  //navigates to the update  product page when add button is clicked
  function handleUpdate(){
    let path = "/inventory-product-update-page/" + id;
    navigate(path);
  }

    const handleDelete = async () => {

      const response = await fetch('/api/inventoryProducts/' + id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if(response.ok){
        handleClose()
    
        setProductDeletedAlert(
          <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle me-1"></i>
                Successfully deleted
                <a href="https://localhost:3000/inventory-prod-page"><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></a>
              </div>
        )
       // alert("Successfully deleted")
        //window.location.replace("https://localhost:3000/inventory-products-page")
      }

      if(!response.ok){
        setProductNotDeletedAlert(
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="bi bi-exclamation-octagon me-1"></i>
               Failed to delete the product
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
        )
       // alert("Failed to delete the product")
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
  



  /***************************************************************************************************** */


    return(

        <main id="main" className="main">

       {/* Modal Popup */}
      <Modal show={showModal} onHide={handleClose} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-danger" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="btn btn-outline-success" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>



        <div className="pagetitle">
            <h1>Product Overview</h1>
        </div> 

        <div className="float-end" style={{position: 'relative', bottom: '40px'}}>
        <button type="button" class="btn btn-info rounded-pill" onClick={handleUpdate}>UPDATE</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-danger rounded-pill"  onClick={handleShow}>DELETE</button>
        </div> <br />

        {productDeleted}
        {productNotDeleted}

        <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={(product["photo"] == '') ? 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' : require("./uploadedImages/"+product["photo"])} className="img-fluid rounded-start productsImages" alt="img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product["product_name"]}</h5>
                  <p className="card-text">{product["description"]}</p>
                </div>
              </div>
            </div>
          </div> <br />

          <ol className="list-group list-group w-50">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Product No</div> <br />
                    P__{product["_id"]}
                  </div>
                </li> <br />

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">In Stock</div>  <br />
                    {(product["units_in_stock"] == 0) ? "NO" : "YES"}
                  </div>
                </li> <br />

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Units in Stock</div>  <br />
                    {product["units_in_stock"]}
                  </div>
                </li> <br />

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Unit Price (Rs.)</div>  <br />
                    {product["unit_price"]}
                  </div>
                </li> <br />


                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Weight per unit (KG)</div>  <br />
                    {product["weight_per_unit"]}
                  </div>
                </li> <br />

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Reorder Level</div>  <br />
                    {product["reorder_level"]}
                  </div>
                </li>  <br />
            </ol>


        </main>
    )
}

export default ProductOverviewContent;