import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import apiFetch from "../../../services/Api";

function SupplierForm(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [companyPhoneNo, setCompanyPhoneNo] = useState("");
    const [brNo, setBrNo] = useState("");
    const [rawMaterial, setRawMaterial] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonPhoneNo, setContactPersonPhoneNo] = useState("");
    const [contactPersonEmail, setcontactPersonEmail] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [bankAccountNo, setBankAccountNo] = useState("");
    const [status, setStatus] = useState(true);
    const [error, setError] = useState(null);

    //* Validations
    const [comPhone, setComPhone] = useState(false);
    const [cpPhone, setCPPhone] = useState(false);
    const [bankAcc, setBankAcc] = useState(false);

    //* Modal Popup
    const [show, setShow] = useState(false);
    const [popupHead, setPopupHead] = useState();
    const [popupMsg, setPopupMsg] = useState("");

    //* Modal handle close
    const handleClose = () => {
        setShow(false)
        console.log("handle close")
    };
    const handleShow = () => setShow(true);


    //* Input alerts
    let cpPhoneNoAlert = false;
    let comPhoneNoAlert = false;
    let bankAccNoAlert = false;



    useEffect(() => {
        setCompanyName(props.companyName);
        setCompanyPhoneNo(props.companyPhoneNo);
        setBrNo(props.brNo);
        setRawMaterial(props.rawMaterial);
        setCompanyAddress(props.companyAddress);
        setContactPersonName(props.contactPersonName);
        setContactPersonPhoneNo(props.contactPersonPhoneNo);
        setcontactPersonEmail(props.contactPersonEmail);
        setBankName(props.bankName);
        setBankBranch(props.bankBranch);
        setBankAccountNo(props.bankAccountNo);
        setStatus(props.status);
    }, [
        props.companyName,
        props.companyPhoneNo,
        props.brNo,
        props.companyAddress,
        props.contactPersonName,
        props.contactPersonPhoneNo,
        props.contactPersonEmail,
        props.rawMaterial,
        props.bankName,
        props.bankBranch,
        props.bankAccountNo,
        props.status
    ]);

    const supplier = {
        companyName,
        companyPhoneNo,
        brNo,
        rawMaterial,
        companyAddress,
        contactPersonName,
        contactPersonPhoneNo,
        contactPersonEmail,
        bankName,
        bankBranch,
        bankAccountNo,
        status
    };

    //*Frontend Validation
    //*Validate company phone number
    function checkCompanyPhoneNo() {
        if (isNaN(Number(companyPhoneNo))) {
            return true;
        }
        else if (companyPhoneNo.length !== 10) {
            return true;
        }
        else {
            return false;

        }

    };

    //*Validate contact person phone number
    function checkCPPhoneNo() {
        if (isNaN(Number(contactPersonPhoneNo))) {
            return true;
        }
        else if (contactPersonPhoneNo.length !== 10) {
            return true;
        }
        else {
            return false;
        }
    };

    //*Validate bank account number
    function checkBankAccNo() {
        if (isNaN(Number(bankAccountNo))) {
            return true;
        }
        else {
            return false;
        }
    }

    //* Validation before submit
    const isValid = () => {
        cpPhoneNoAlert = checkCPPhoneNo();
        comPhoneNoAlert = checkCompanyPhoneNo();
        bankAccNoAlert = checkBankAccNo();

        setComPhone(comPhoneNoAlert);
        setCPPhone(cpPhoneNoAlert)
        setBankAcc(bankAccNoAlert);

        if (cpPhoneNoAlert || comPhoneNoAlert || bankAccNoAlert) {
            return false;
        }
        else {
            return true;
        }
    }


    //* Add a supplier
    const handleAdd = async (e) => {
        e.preventDefault();

        if (isValid()) {
            const response = await apiFetch("/api/suppliers", {
                method: "POST",
                body: JSON.stringify(supplier),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                setPopupHead("Insertion Failed.");
                setPopupMsg(`Error: ${error} \nDo you want to try again?`);

                handleShow();
            }

            if (response.ok) {
                handleReset();
                setError(null);

                setPopupHead("Successfuly added the supplier");
                setPopupMsg("Do you want to add more suppliers?");

                handleShow();
            }
        }
        else {
            return isValid();
        }
    };

    //* Update the supplier
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (isValid()) {
            const response = await apiFetch(`/api/suppliers/${id}`, {
                method: "PUT",
                body: JSON.stringify(supplier),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);

                setPopupHead("Update Failed.");
                setPopupMsg(`Error: ${error} <p>Do you want to try again ?</p>`);

                handleShow();
            }

            if (response.ok) {
                setCompanyName(json.companyName);
                setCompanyPhoneNo(json.companyPhoneNo);
                setBrNo(json.brNo);
                setRawMaterial(json.rawMaterial);
                setCompanyAddress(json.contactPersonName);
                setContactPersonName(json.contactPersonName);
                setContactPersonPhoneNo(json.contactPersonPhoneNo);
                setcontactPersonEmail(json.contactPersonEmail);
                setBankName(json.bankName);
                setBankBranch(json.bankBranch);
                setBankAccountNo(json.bankAccountNo);
                setStatus(json.status)
                setError(null);

                setPopupHead("Successfuly updated the supplier");
                setPopupMsg("Do you want to do more changes ?");

                handleShow();

            }
            else {
                return isValid();
            }
        }
    };


    //* Reset the form
    const handleReset = () => {
        setCompanyName("");
        setCompanyPhoneNo("");
        setBrNo("");
        setRawMaterial("");
        setCompanyAddress("");
        setContactPersonName("");
        setContactPersonPhoneNo("");
        setcontactPersonEmail("");
        setBankName("");
        setBankBranch("");
        setBankAccountNo("");
    };


    //* Change  toggle switch state
    const handleSwitch = () => {
        if (!status) {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    }

    //! Demo button
    const fillForm = () => {
        setCompanyName("Siripala Fiber Mills");
        setCompanyPhoneNo("0113141655");
        setBrNo("8XPT4D4");
        setRawMaterial("Coir");
        setCompanyAddress("Matale");
        setContactPersonName("Slade Willson");
        setContactPersonPhoneNo("0705625566");
        setcontactPersonEmail("willson.s@gmail.com");
        setBankName("Samapath Bank");
        setBankBranch("Matale");
        setBankAccountNo("20033631613");
    }

    return (
        <section className="section">
            {/* Remove After Demonstration */}
            <button
                type="button"
                className="btn btn-warning"
                style={{ margin: "20px" }}
                onClick={fillForm}
            >
                Fill Form
            </button>

            {/* Modal Popup */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{popupHead}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{popupMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={() => {
                        navigate("/suppliers");
                    }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ padding: "50px" }}>
                        <div className="card-body">
                            <h1>{props.formName}</h1>
                            <br />
                            <form
                                className="row g-3"
                                onSubmit={
                                    props.buttonName === "Add Supplier" ? handleAdd : handleUpdate
                                }
                            >

                                {/*//*Toggle Switch/ */}
                                {props.buttonName === "Update Supplier" ?
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={status} onClick={handleSwitch} />
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
                                    </div> : null}

                                {/* Raw Material */}
                                <h2 className="col-md-12">Raw Material</h2>
                                <div className="col-md-8">
                                    <label htmlFor="rawMaterial" className="form-label">
                                        Raw Material
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        onChange={(e) => {
                                            setRawMaterial(e.target.value);
                                        }}
                                        value={rawMaterial}
                                        required
                                    />
                                </div>

                                {/* Company Details Section starts here */}
                                <h2 className="col-md-12">Company Details</h2>
                                <div className="col-md-8">
                                    <label htmlFor="companyName" className="form-label">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        onChange={(e) => {
                                            setCompanyName(e.target.value);
                                        }}
                                        value={companyName}
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="ComapnyTpNo" className="form-label">
                                        Telephone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyTpNo"
                                        onChange={(e) => {
                                            setCompanyPhoneNo(e.target.value);
                                        }}
                                        value={companyPhoneNo}
                                        required
                                    />
                                    {comPhone ? (
                                        <div class="alert alert-danger" role="alert">
                                            Invalid Contact Number. Enter a valid number
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="brNo" className="form-label">
                                        Business Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="businessRegNo"
                                        onChange={(e) => {
                                            setBrNo(e.target.value);
                                        }}
                                        value={brNo}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="CompanyAddress" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="comAddress"
                                        onChange={(e) => {
                                            setCompanyAddress(e.target.value);
                                        }}
                                        value={companyAddress}
                                        required
                                    />
                                </div>
                                {/* Contact Person Details Section starts here */}
                                <h2 className="col-md-12">Contact Person Details</h2>
                                <div className="col-md-8">
                                    <label htmlFor="ContactPersonName" className="form-label">
                                        Contact Person Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactPersonName"
                                        onChange={(e) => {
                                            setContactPersonName(e.target.value);
                                        }}
                                        value={contactPersonName}
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="ContactPersonTpNo" className="form-label">
                                        Telephone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactPersonTelNo"
                                        onChange={(e) => {
                                            setContactPersonPhoneNo(e.target.value);
                                        }}
                                        value={contactPersonPhoneNo}
                                        required
                                    />
                                    {cpPhone ? (
                                        <div class="alert alert-danger" role="alert">
                                            Invalid Contact Number. Enter a valid number
                                        </div>
                                    ) : null}
                                </div>

                                <div className="col-6">
                                    <label htmlFor="ContactPersonEmail" className="form-label">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contactPersonEmail"
                                        onChange={(e) => {
                                            setcontactPersonEmail(e.target.value);
                                        }}
                                        value={contactPersonEmail}
                                        required
                                    />
                                </div>
                                {/* Bank Details */}
                                <h2 className="col-md-12">Bank Details</h2>
                                <div className="col-md-8">
                                    <label htmlFor="BankName" className="form-label">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankName"
                                        onChange={(e) => {
                                            setBankName(e.target.value);
                                        }}
                                        value={bankName}
                                        required
                                    />
                                </div>
                                <div className="col-md-8">
                                    <label htmlFor="BankBranch" className="form-label">
                                        Bank Branch
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankBranch"
                                        onChange={(e) => {
                                            setBankBranch(e.target.value);
                                        }}
                                        value={bankBranch}
                                        required
                                    />
                                </div>
                                <div className="col-md-8">
                                    <label htmlFor="BankAccountNo" className="form-label">
                                        Bank Account Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankAccountNo"
                                        onChange={(e) => {
                                            setBankAccountNo(e.target.value);
                                        }}
                                        value={bankAccountNo}
                                        required
                                    />
                                    {bankAcc ? (
                                        <div class="alert alert-danger" role="alert">
                                            Invalid bank account number format. Please Enter a valid value
                                        </div>
                                    ) : null}
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ margin: "20px" }}
                                    >
                                        {props.buttonName}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        style={{ margin: "20px" }}
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SupplierForm;
