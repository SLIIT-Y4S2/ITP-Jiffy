import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import SupplierForm from "../../../components/dashboard/supplierManagement/SupplierForm";
import apiFetch from "../../../services/Api";



function SupplierDetails() {
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

    const { id } = useParams();

    //*Dispaly current suppliers details when component loads
    useEffect(() => {
        const fetchSupplier = async () => {
            const response = await apiFetch(`/api/suppliers/${id}`);
            const json = await response.json();

            if (response.ok) {
                return json
            } else {
                setError(error)
                throw (error);
            }
        };

        fetchSupplier()
            .then(supplier => {
                setCompanyName(supplier.companyName);
                setCompanyPhoneNo(supplier.companyPhoneNo);
                setBrNo(supplier.brNo);
                setRawMaterial(supplier.rawMaterial);
                setCompanyAddress(supplier.companyAddress);
                setContactPersonName(supplier.contactPersonName);
                setContactPersonPhoneNo(supplier.contactPersonPhoneNo);
                setcontactPersonEmail(supplier.contactPersonEmail);
                setBankName(supplier.bankName);
                setBankBranch(supplier.bankBranch);
                setBankAccountNo(supplier.bankAccountNo);
                setStatus(supplier.status)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item">Supplier Management</li>
                    <li class="breadcrumb-item">Update Supplier</li>
                </ol>
                <SupplierForm
                    formName="Update Supplier"
                    buttonName="Update Supplier"
                    companyName={companyName}
                    companyPhoneNo={companyPhoneNo}
                    brNo={brNo}
                    rawMaterial={rawMaterial}
                    companyAddress={companyAddress}
                    contactPersonName={contactPersonName}
                    contactPersonPhoneNo={contactPersonPhoneNo}
                    contactPersonEmail={contactPersonEmail}
                    bankName={bankName}
                    bankBranch={bankBranch}
                    bankAccountNo={bankAccountNo}
                    status={status} 
                />
            </main>
        </>
    )
}

export default SupplierDetails;