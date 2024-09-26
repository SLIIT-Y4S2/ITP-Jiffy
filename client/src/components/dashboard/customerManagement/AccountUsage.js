import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
    Chart as ChartJS, ArcElement, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend, Filler
} from "chart.js"
import { Line } from "react-chartjs-2"
import axios from "axios";

import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

function AccountUsage() {
    const [chartData, setChartData] = useState(null)
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

    const printChart = () => {
        const input = document.getElementById('saveChart');
        html2canvas(input, { scale: 2, logging: true, letterRendering: 1, useCORS: true })
            .then((canvas) => {
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/svg');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save("usage-report.pdf");
            });
    }

    const printTable = () => {
        const input = document.getElementById('saveTable');
        html2canvas(input)
            .then((canvas) => {
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/svg');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                pdf.save("oldAccounts.pdf");
            });
    }

    useEffect(() => {
        const fetchChartData = async () => {
            const { data } = await axios.get(`/api/users/usage`)
            console.log(data.map((item) => item.month))

            setChartData({
                labels: data.map((item) => item.month),
                datasets: [
                    {
                        label: "Active users",
                        data: data.map(item => item.users),
                        fill: true,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.3)"
                    }
                ]
            })

        }

        fetchChartData()
    }, [])

    const [customers, setCustomers] = useState(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(`/api/users/old-users`)
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setCustomers(json)
            }
        }

        fetchCustomers()
    }, [])


    if (chartData) {
        return (
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Account Usage</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={{ pathname: `/dashboard/` }}>Home</Link></li>
                            <li className="breadcrumb-item active">Account Usage Report</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-9">
                            <div class="card">     
                                <div class="card-body" id="saveChart">
                                        <h5 class="card-title">Account Usage Chart - Jiffy (PVT) LTD ({parseInt(new Date().getFullYear())}-{parseInt(new Date().getFullYear()-1)})</h5>
                                        <div className="chart">
                                            <Line
                                                data={chartData}
                                                options={{
                                                    responsive: true,
                                                    plugins: {
                                                        legend: { position: "top" },
                                                        title: { display: true, text: "Active users" }
                                                    },
                                                }}
                                            />
                                        </div>
                                        <button class="btn btn-primary" onClick={printChart}>Download as pdf</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1"></div>
                    </div>
                </section >
            </main>
        )
    }
}

export default AccountUsage