import React from 'react';

import { useState, useEffect } from 'react';

import Modal from'react-bootstrap/Modal';
import Button from'react-bootstrap/Button';

function RawMaterialOverviewContent(){

  
  const pathname = window.location.pathname
  const id = pathname.split("/")[2]

  console.log(id)

  const[rmDeletedAlert, setRMDeletedAlert] = useState('')




  //for the modal
  const [showModal, setShowModal] =useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

 const handleShow = () => setShowModal(true);





  const handleDelete = async () => {
    
      const response = await fetch('/api/inventoryRawMaterials/' + id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if(response.ok){
        handleClose()

        setRMDeletedAlert(
          <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle me-1"></i>
                Successfully deleted
                <a href="https://localhost:3000/inventory-raw-materials-page"><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></a>
              </div>
        )

      }

      if(!response.ok){
        alert("Failed to delete the raw material")
      }
 
  }

  //declaring states for different input fields
  const [raw_material_id, setRawMaterialID] = useState('')
  const[raw_material_name, setRawMaterialName] = useState('')
  const[unit_price, setUnitprice] = useState('')
  const[unit, setUnit] = useState('')
  const[qty_in_stock, setQtyInStock] = useState('')
  const[reorder_level, setReorderLevel] = useState('')
  const[supplier_name, setSupplierName] = useState('')

  const[error, setError] = useState(null)


   /************************************************************************************************************* */

    //for various error alerts for input field values
    const[rmNameAlert, setrmNameAlert] = useState('')
    const[unitPriceAlert, setUnitPriceAlert] = useState('')
    const[qtyInStockAlert, setQtyInStockAlert] = useState('')
    const[reorderLevelAlert, setReorderLevelAlert] = useState('')
    const[supplierNameAlert, setSupplierNameAlert] = useState('')

    //alerts when raw material added/not added to database
    const [rawMaterialUpdated, setRMUpdatedAlert] = useState('')
    const[rawMaterialNotUpdated, setRMNotUdpatedAlert] = useState('')


  /************************************************************************************************************* */

    useEffect(() => {
      const fetchRawMaterial = async () => {
        
        const response = await fetch(`/api/inventoryRawMaterials/${id}`)
        const json = await response.json()
        
        if (response.ok) {
          
          setRawMaterialID(json["_id"])
          setRawMaterialName(json["raw_material_name"])
          setUnitprice(json["unit_price"])
          setUnit(json["unit"])
          setQtyInStock(json["qty_in_stock"])
          setReorderLevel(json["reorder_level"])
          setSupplierName(json["supplier_name"])

        } else{
          console.log("not ok")
        }
         
      }
  
      fetchRawMaterial()
      
    }, [setRawMaterialID, setRawMaterialName, setUnitprice, setQtyInStock, setReorderLevel, setSupplierName, setUnit])

    /**************************************************************************************** */


    const[x, setX] = useState(true)

    //update function
    const handleUpdate = () => {
      setX(false)
    }


    /************************************************************************************ */



    /**********for updating**************************************************** */

    const handleSave = async (e) => {
      
      e.preventDefault()

      const status = "valid"

      if(raw_material_name == Number(raw_material_name)){
        setrmNameAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
          <font color="red"><strong>Please enter a text for the raw material name</strong></font>
        </p>
        )
 
        status = "invalid"
      }

      else{
        setrmNameAlert('')
      }



      if(unit_price < 0 || unit_price == 0){
        setUnitPriceAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
          <font color="red"><strong>Please enter a positive value for the unit price</strong></font>
        </p>
        )

        status = "invalid "
      }

      else{
        setUnitPriceAlert('')
      }


      if(reorder_level < 0){
        setReorderLevelAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
          <font color="red"><strong>Reorder level cannot be negative. Please enter a positive value</strong></font>
        </p>
        )

        status = "invalid"
      }

      else{
        setReorderLevelAlert('')
      }


      if(supplier_name == Number(supplier_name)){
        setSupplierNameAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
          <font color="red"><strong>Please enter a text for the supplier name</strong></font>
        </p>
        )

        status = "invalid"
      }

      else{
        setSupplierNameAlert('')
      }
        
      if(qty_in_stock < 0){
        setQtyInStockAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
          <font color="red"><strong>Quantity in stock cannot be negative. Please enter a positive value</strong></font>
        </p>
        )

        status = "invalid"
      }

      else{
        setQtyInStockAlert('')
      }

      if(status === "valid"){
        const rawMaterial = {raw_material_name, unit_price, unit, qty_in_stock, reorder_level, supplier_name}

        const response = await fetch('/api/inventoryRawMaterials/' + id, {
          method: 'PATCH',
          body: JSON.stringify(rawMaterial),
          headers: {
            'Content-Type': 'application/json'
          }
      })
  
      const json = await response.json()
  
      if(response.ok){     
      setRMUpdatedAlert(
        <>
          <div class="alert alert-success alert-dismissible fade show" role="alert" >
          <i class="bi bi-check-circle me-1"></i>
            Successfully updated
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

        </>
      )
       
      }
  
      if(!response.ok){
        setError(json.error)

        setRMNotUdpatedAlert(
          <>
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{width: "700px"}}>
              <i className="bi bi-exclamation-octagon me-1"></i>
              Failed to update the raw material &nbsp; {error}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          </>
        )
      }
      }
     
  }


/************************************************************** */



    return(
        <main id="main" className="main">

           {/* Modal Popup */}
      <Modal show={showModal} onHide={handleClose} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Raw Material</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this raw material?</Modal.Body>
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
                <h1>Raw Material Overview</h1>
            </div>
            <br />

            <div className="float-end   productOverviewBtns">
                <button type="button" class="btn btn-info rounded-pill" onClick={handleUpdate}>UPDATE</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-danger rounded-pill" onClick={handleShow}>DELETE</button>
            </div> <br /><br />

                 
            {rawMaterialUpdated}
            {rawMaterialNotUpdated}

            {rmDeletedAlert}

            <form method="post" onSubmit={handleSave}>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Raw Material No</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="rawMaterialNo" value={'R__'+raw_material_id}  disabled/>
                  </div>
                </div> <br />

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="rawMaterialName" value={raw_material_name} onChange={(e) => setRawMaterialName(e.target.value)} readOnly={x} required  />
                  </div>
                </div> {rmNameAlert}<br />
              

              <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">In Stock</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="stockStatus" required value={(qty_in_stock == 0 ? "NO" : "YES")} disabled  />
                  </div>
                </div> <br />

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Quantity in Stock</label>
                  <div className="col-sm-3">
                    <input type="number" className="form-control" id="qtyInStock" value={qty_in_stock} required onChange={(e) => setQtyInStock(e.target.value)} readOnly={x} />
                  </div>
                </div> {qtyInStockAlert} <br />

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Unit</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="rawMaterialUnit" value={unit} required onChange={(e) => setUnit( e.target.value)} readOnly={x} disabled/>
                  </div>
                </div> <br />

                

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Unit Price (Rs.)</label>
                  <div className="col-sm-3">
                    <input type="number" className="form-control" id="rawMaterialUnitPrice" value={unit_price} required onChange={(e) => setUnitprice(e.target.value)} readOnly={x}/>
                  </div>
                </div> {unitPriceAlert} <br />

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Reorder Level</label>
                  <div className="col-sm-3">
                    <input type="number" className="form-control" id="rawMaterialReorderLevel" value={reorder_level} required onChange={(e) => setReorderLevel(e.target.value)} readOnly={x}/>
                  </div>
                </div> {reorderLevelAlert} <br />

                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Supplier</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="rawMaterialReorderLevel" value={supplier_name} required onChange={(e) => setSupplierName(e.target.value)} readOnly={x}/>
                  </div>
                </div> {supplierNameAlert} <br />


                
                <div className="text-center">
                
                <button type="submit" className="btn btn-primary float-end" disabled={x}>SAVE</button> &nbsp;&nbsp;&nbsp;
     
                </div>
              </form>



        </main>
    )
}

export default RawMaterialOverviewContent;