import React from 'react';

import { useState, useEffect } from 'react';

function UpdateProductContent(){
 
  const pathname = window.location.pathname
  const id = pathname.split("/")[2]

  //declaring states for different input fields
  const[product_name, setProductName] = useState('')
  const[unit_price, setUnitprice] = useState('')
  const[reorder_level, setReorderLevel] = useState('')
  const[weight_per_unit, setWeightPerUnit] = useState('')
  const[units_in_stock, setUnitsInStock] = useState('')
  const[description, setDescription] = useState('')

  const[error, setError] = useState(null)


  const[fileData, setFileData] = useState(null) //for the file object
  const[photo, setPhoto] = useState('') //for the photo name

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0])
    setPhoto(e.target.files[0].name)
  }

  const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg']; 

  
  /************************************************************************************************************* */

    //for various error alerts for input field values
    const[productNameAlert, setProductNameAlert] = useState('')
    const[unitPriceAlert, setUnitPriceAlert] = useState('')
    const[reorderLevelAlert, setReorderLevelAlert] = useState('')
    const[weightPerUnitAlert, setWeightPerUnitAlert] = useState('')
    const[unitsInStockAlert, setUnitsInStockAlert] = useState('')
    const[descriptionAlert, setDescriptionAlert] = useState('')
    const [photoAlert, setPhotoAlert] = useState('')

    //alerts when product added/not added to database
    const [productUpdated, setProductUpdatedAlert] = useState('')
    const[productNotUpdated, setProductNotUpdatedAlert] = useState('')


  /************************************************************************************************************* */

    useEffect(() => {
      const fetchProduct = async () => {
        
        const response = await fetch(`/api/inventoryProducts/${id}`)
        const json = await response.json()
        
        if (response.ok) {
          
          setProductName(json["product_name"])
          setUnitprice(json["unit_price"])
          setReorderLevel(json["reorder_level"])
          setWeightPerUnit(json["weight_per_unit"])
          setUnitsInStock(json["units_in_stock"])
          setDescription(json["description"])
          setPhoto(json["photo"])

        } else{
          console.log("not ok")
        }
         
      }
  
      fetchProduct()
      
    }, [setProductName, setUnitprice, setReorderLevel, setWeightPerUnit, setUnitsInStock, setDescription, setPhoto])

    

    
/**********for updating**************************************************** */

    const handleSave = async (e) => {
      e.preventDefault()

     let status = "valid"

      if(product_name == Number(product_name)){
        setProductNameAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Please enter a text for the product name</strong></font>
          </p>
          )

         status = "invalid"

       }

       else{
        setProductNameAlert('')
      }
  
      if(description == Number(description)){
        setDescriptionAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Please enter a text for the description</strong></font>
          </p>
          )
         status = "invalid"

       }

       else{
        setDescriptionAlert('')
      }
  
       if(unit_price < 0 || unit_price == 0){
        setUnitPriceAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Please enter a positive value</strong></font>
          </p>
          )

        status = "invalid "

       }

       else{
        setUnitPriceAlert('')
      }
  
  
       if(reorder_level < 0 || reorder_level != Math.trunc(reorder_level)){
        setReorderLevelAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Invalid value for reorder level. Please enter a positive whole number</strong></font>
          </p>
          )

         status = "invalid"

       }

       else{
        setReorderLevelAlert('')
      }
  
  
       if(weight_per_unit < 0 || weight_per_unit == 0){
        setWeightPerUnitAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Invalid value for weight per unit. Please enter a positive number</strong></font>
          </p>
          )

         status = "invalid"
       }

       else{
        setWeightPerUnitAlert('')
      }
        
       if(units_in_stock < 0 || (units_in_stock != Math.trunc(units_in_stock))){
        setUnitsInStockAlert(
          <p role="alert" style={{fontSize: "13px", position: "relative", left: "210px", bottom: "10px"}}>
            <font color="red"><strong>Invalid value for units in stock. Please enter a positive whole number</strong></font>
          </p>
          )
         status = "invalid"
       } 

       else{
        setUnitsInStockAlert('')
      }

      if(fileData != null && !validImageTypes.includes(fileData.type)){
        setPhotoAlert(
          <p role="alert" style={{ fontSize: "13px", position: "relative", left: "210px", bottom: "10px" }}>
            <font color="red"><strong>Please upload only png/jpg/jpeg file types</strong></font>
          </p>
        )
  
        status = "invalid"
      }
  
      else {
        setPhotoAlert('')
      }

     if(status === "valid"){

      /**************************Start of Image Handling************************************************************* */

      const data = new FormData()

      data.append('image', fileData)

      fetch("https://localhost:5000/single/", {
        method: "POST",
        body: data,
      }).then((result) => {
          console.log("File sent successful")
          console.log(fileData)
          setPhoto('')
          setFileData(null)
     
      }).catch((error) => {
        console.log(error.message)
      })

      /***************************End of Image Handling***************************************************************** */


       const product = {product_name, unit_price, reorder_level, weight_per_unit, units_in_stock, description, photo}

        const response = await fetch('/api/inventoryProducts/' + id, {
          method: 'PATCH',
          body: JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        const json = await response.json()
  
        if(response.ok){
          setError(null)

          setProductUpdatedAlert(
            <>
              <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="bi bi-check-circle me-1"></i>
                Successfully updated
             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </>
          )
 
        }
        
        if(!response.ok){
          setError(json.error)

          setProductNotUpdatedAlert(
            <>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-octagon me-1"></i>
                Failed to update the product! &nbsp; {json.error}
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
            <div className="pagetitle">
                <h1>Update Product</h1>
            </div> <br />

            {productUpdated}
            {productNotUpdated}

            <form encType="multipart/form-data" onSubmit={handleSave}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Product Name</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="productName" value={product_name} onChange={(e) => setProductName(e.target.value)} required/>
                  </div>
                </div>  {productNameAlert}

                <div className="row mb-3">
                  <label  className="col-sm-2 col-form-label">Unit Price (Rs.)</label>
                  <div className="col-sm-3">
                    <input type="number"  className="form-control" value={unit_price} onChange={(e) => setUnitprice(e.target.value)} required />
                  </div>
                </div>  {unitPriceAlert}

              <div className="row mb-3">
                  <label  className="col-sm-2 col-form-label">Reorder Level</label>
                  <div className="col-sm-3">
                    <input type="number"  step="any" className="form-control" value={reorder_level} onChange={(e) => setReorderLevel(e.target.value)} required/>
                  </div>
                </div>  {reorderLevelAlert}

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Weight per Unit (KG)</label>
                  <div className="col-sm-3">
                    <input type="number" step=".01"  className="form-control" value={weight_per_unit}  onChange={(e) => setWeightPerUnit(e.target.value)} required/>
                  </div>
                </div>  {weightPerUnitAlert}

                <div className="row mb-3">
                  <label  className="col-sm-2 col-form-label">Units in Stock</label>
                  <div className="col-sm-3">
                    <input type="number"  className="form-control" value={units_in_stock} onChange={(e) => setUnitsInStock(e.target.value)} required/>
                  </div>
                </div>  {unitsInStockAlert}

                <div className="row mb-3">
                  <label  className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-3">
                    <textarea type="text" className="form-control productDescription" value={description} onChange={(e) => setDescription(e.target.value)} 
                     style={{height: '80px',
                     width: '275px',
                     resize: 'none',
                     overflow: 'hidden'}} required/>
                  </div>
                </div>  {descriptionAlert}


                <div className="row mb-3">
                  <label  className="col-sm-2 col-form-label">Upload Image</label>
                  <div className="col-sm-3">
                    <input className="form-control" type="file" id="imageFile" name="image" accept="image/*"
                    onChange={fileChangeHandler}/>
                  </div>
                </div> {photoAlert}


                <br />
                
                <div className="text-center">
        
                <button type="submit" className="btn btn-primary float-end">SAVE</button> &nbsp;&nbsp;&nbsp;
                </div>
              </form>
                
        </main>
    )
}

export default UpdateProductContent;