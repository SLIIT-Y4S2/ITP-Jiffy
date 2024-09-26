import React, { useEffect, useRef, useState } from "react";

import Header from "../../../components/dashboard/Header";

import SupplierTable from "../../../components/dashboard/supplierManagement/SupplierTable";
import Sidebar from "../../../components/dashboard/Sidebar";
import SearchBar from "../../../components/dashboard/supplierManagement/SearchBar";
import { Link } from "react-router-dom";
import apiFetch from "../../../services/Api";

function Suppliers() {

    const isMounted = useRef(false);

    const [suppliers, setSuppliers] = useState(null);
    const [filteredSuppliers, setFilteredSuppliers] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchCategory, setSearchCategory] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAllSuppliers = async () => {
            const response = await apiFetch("/api/suppliers");
            const json = await response.json();

            if (response.ok) {
                setSuppliers(json);
                setFilteredSuppliers(suppliers);
            } else {
                setError(json.error);
                console.log(error);
            }
        };

        fetchAllSuppliers();

    }, [])

    useEffect(() => {

        if (isMounted.current) {
            const handleSearch = (data) => {

                let term;

                if (searchTerm !== null) {
                    term = searchTerm.replace(/[^a-zA-Z0-9_ \d]/, '');
                }


                //const term = searchTerm;


                const regExp = new RegExp(term, "i");
                //*If search category is company name
                if (searchCategory === "comName") {
                    if (data) {
                        const filteredSuppliers = data.filter(data => data.companyName.match(regExp));
                        setFilteredSuppliers(filteredSuppliers);
                    }
                }//*If search category is raw material
                else if (searchCategory === "rawMaterial") {
                    if (data) {
                        const filteredSuppliers = data.filter(data => data.rawMaterial.match(regExp));
                        setFilteredSuppliers(filteredSuppliers);
                    }
                }
            }
            handleSearch(suppliers);

        }
        else {
            isMounted.current = true;
        }
    }, [searchCategory, searchTerm]);

    //* Get search term from Search Bar Component
    const getSearchTerm = (data) => {
        setSearchTerm(data)
    }

    //* Get search category from Search Bar Component
    const getSearchCategory = (data) => {
        setSearchCategory(data);
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">Supplier Management</li>
                    <li className="breadcrumb-item">Suppliers</li>
                </ol>

                <Link to={{ pathname: '/add-supplier' }}><button className="btn btn-primary" style={{ float: "right" }}><i className="bi bi-person-plus-fill"></i><span style={{ margin: "0 10px", color: "#FFF" }}>Add Supplier</span></button></Link>
                <SearchBar
                    searchTerm={getSearchTerm}
                    searchCategory={getSearchCategory}
                />
             
                <SupplierTable
                    suppliers={searchTerm === "" ? suppliers : filteredSuppliers}
                    searchCategory={searchCategory}
                />
            </main>
        </>
    )
}

export default Suppliers;