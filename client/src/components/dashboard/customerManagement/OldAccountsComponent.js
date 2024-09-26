import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"



function AccountUsage() {
    const [error, setError] = useState(null)

    const handleDeleteSubmit = async (e) => {

        const response = await fetch('https://localhost:5000/api/users/' + e, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            console.log(json.error)
        }

        if (response.ok) {
            console.log('User deleted', json)
            window.location.reload()
        }
    }

    const printTable = () => {
        const input = document.getElementById('print');
        html2canvas(input, { scale: 2, logging: true, letterRendering: 1, useCORS: true })
            .then((canvas) => {
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/svg');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                // pdf.output('dataurlnewwindow');
                pdf.save("oldAccounts.pdf");
            });
    }

    const [customers, setCustomers] = useState(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(`/api/users/old-users`)
            const json = await response.json()
            console.log(json)
            //console.log(json[0])
            if (response.ok) {
                setCustomers(json)
            }
        }

        fetchCustomers()
    }, [])

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();



    return (

        <main id="main" className="main">
            
                <div id="print" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="col-12">
                        <div className="row" style={{ margin: "60px 0 30px" }}>
                            <div className="col-12">
                                <img src="https://i.ibb.co/c6HQzff/jiffy-logo.png" style={{ width: "20%", height: "auto", margin: "20px 0 20px 0" }} alt="jiffy-logo" />
                                <span style={{ margin: "0 0 0 50%", fontWeight: "800" }}>Generated Date : {`${day} - ${month} - ${year}`} </span>
                                <h1 style={{ margin: "20px 0 0 0", textAlign: "center", fontWeight: "600" }}>Inactive Account Report (Last login two years ago)</h1>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-12">

                                <table className="table col-md-6" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <thead className="table-secondary" style={{ textAlign: "center" }}>
                                        <tr>
                                            <th style={{ width: "20%" }} scope="col">ID</th>
                                            <th style={{ width: "20%" }} scope="col">Name</th>
                                            <th style={{ width: "20%" }} scope="col">Email</th>
                                            <th style={{ width: "20%" }} scope="col">Phone</th>
                                            <th style={{ width: "20%" }} scope="col"></th>
                                            <th style={{ width: "20%" }} scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light">
                                        {customers && customers.map((customer) => (
                                            <tr key={customer._id}>
                                                <th scope="row" style={{ textAlign: "center" }}>{customer._id}</th>
                                                <td style={{ textAlign: "center" }}>{customer.name}</td>
                                                <td style={{ textAlign: "center" }}>{customer.email}</td>
                                                <td style={{ textAlign: "center" }}>{customer.phone}</td>
                                                <td style={{ textAlign: "center" }}><Link to={{ pathname: `/customer/${customer._id}` }} data-html2canvas-ignore="true">View Profile</Link></td>

                                                <td style={{ textAlign: "center" }}><div class="icon">
                                                    <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target={`#verticalycentered${customer._id}`} data-html2canvas-ignore="true"></i></div>
                                                    <div class="modal fade" id={`verticalycentered${customer._id}`} tabindex="-1">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title">You are about to delete this account</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    This process can not be undone.
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary" onClick={event => handleDeleteSubmit(customer._id)} data-bs-dismiss="modal">Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <button type="button" class="btn btn-primary" onClick={printTable} >Download PDF</button>
            
        </main>
    )
}

export default AccountUsage