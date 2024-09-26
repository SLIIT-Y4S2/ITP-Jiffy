const express = require("express");

const { 
  newSupplier, 
  allSuppliers,
  supplierById,
  supplierByName,
  supplierByRawMaterial,
  updateASupplier ,
  getSupplierCount,
  deleteSupplier,
  getStatusCount,
  getSupplierData,
  getRecentlyAdded,
  getSupplierByStatus
} = require('../controllers/supplierController');
const requireEmployee = require("../middleware/requireEmployee");

const router = express.Router();

//*Add a new supplier
router.post("/",requireEmployee,  newSupplier);

//*Get All Suppliers
router.get("/",requireEmployee,  allSuppliers);

//*Get a specific supplier by ID
router.get("/:id", supplierById);

//*Get suppliers by name
router.get("/name/:comName", supplierByName);

//*Get suppliers by rawMaterial
router.get("/rawMaterial/:rawMaterial", supplierByRawMaterial);

//*Update a supplier details
router.put("/:id", updateASupplier);

//*Delete a supplier
router.delete("/:id", deleteSupplier);

//*Get supplier count
router.get("/getCount/count", getSupplierCount)

//*Get Supplier names
router.get("/names/name", getSupplierData);

//*Get Supplier names
router.get("/chart/data", getStatusCount);

//*Get Recently added
router.get("/get/recently-added", getRecentlyAdded);

//*Supplier by status
router.get("/status/:status", getSupplierByStatus);

module.exports = router;
