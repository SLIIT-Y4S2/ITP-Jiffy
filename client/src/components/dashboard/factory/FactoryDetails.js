import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FactoryDeleteForm from './FactoryDeleteForm';
// import FactoryUpdateForm from './FactoryUpdateForm';

function FactoryDetails() {
  const navigate = useNavigate();
  const [fId, setFId] = useState('')
  const [fName, setFName] = useState('')
  const [fLocation, setFLocation] = useState('')
  const [numOfMachines, setNumOfMachines] = useState('')
  const [numOfVehicles, setNumOfVehicles] = useState('')
  const [numOfEmployees, setNumOfEmployees] = useState('')
  const [createdDate, setCreatedDate] = useState('')
  const [error, setError] = useState(null)

  const { id } = useParams()

  const [factory, setFactory] = useState(
    {
      fId: "",
      fName: "",
      fLocation: "",
      numOfMachines: "",
      numOfVehicles: "",
      numOfEmployees: "",
      createdDate: "",
      __v: 0,
      _id: ""
    })

  useEffect(() => {
    const fetchFactory = async () => {
      const response = await fetch(`/api/factory/${id}`)
      const json = await response.json()

      if (response.ok) {

        setFactory(
          {
            fId: `${json["fId"]}`,
            fName: `${json["fName"]}`,
            fLocation: `${json["fLocation"]}`,
            numOfMachines: `${json["numOfMachines"]}`,
            numOfVehicles: `${json["numOfVehicles"]}`,
            numOfEmployees: `${json["numOfEmployees"]}`,
            createdDate: `${json["createdDate"]}`,
            __v: 0,
            _id: `${json["_id"]}`
          })
        setFId(json["fId"])
        setFName(json["fName"])
        setFLocation(json["fLocation"])
        setNumOfMachines(json["numOfMachines"])
        setNumOfVehicles(json["numOfVehicles"])
        setNumOfEmployees(json["numOfEmployees"])
        setCreatedDate(json["createdDate"])
      } else {
        console.log("failed")
      }

    }

    fetchFactory()

  }, [setFactory])


  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://localhost:5000/api/factory/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        fId: fId,
        fName: fName,
        fLocation: fLocation,
        numOfMachines: numOfMachines,
        numOfVehicles: numOfVehicles,
        numOfEmployees: numOfEmployees,
        createdDate: createdDate
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Factory updated successfully.', json)
      window.location.reload();
    }
  }

  return (
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item">Factory</li>
            <li className="breadcrumb-item active"><a href="/view-factory">Details</a></li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section profile">
        <div className="row">
          <div className="col-xl-10">

            <div className="card">
              <div className="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul className="nav nav-tabs nav-tabs-bordered">

                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#factory-overview">Overview</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#factory-update">Update</button>
                  </li>

                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active profile-overview" id="factory-overview">

                    <h5 className="card-title">Factory Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Factory ID:</div>
                      <div className="col-lg-9 col-md-8">{factory["fId"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Factory Name:</div>
                      <div className="col-lg-9 col-md-8">{factory["fName"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Factory Location:</div>
                      <div className="col-lg-9 col-md-8">{factory["fLocation"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Number of Machines:</div>
                      <div className="col-lg-9 col-md-8">{factory["numOfMachines"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Number of Vehicles:</div>
                      <div className="col-lg-9 col-md-8">{factory["numOfVehicles"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Number of Employees:</div>
                      <div className="col-lg-9 col-md-8">{factory["numOfEmployees"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Factory started date:</div>
                      <div className="col-lg-9 col-md-8">{factory["createdDate"]}</div>
                    </div>

                    <FactoryDeleteForm setError={setError} id={id} />

                  </div>

                  <div className="tab-pane fade profile-edit pt-3" id="factory-update">

                    {/*Factory Update Form*/}
                    <form onSubmit={handleUpdateSubmit}>
                      {error &&
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          {error}
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      }

                      <div className="row mb-3">
                        <label for="fId" className="col-md-4 col-lg-3 col-form-label">Factory ID:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fId" type="text" className="form-control" id="fId"
                            onChange={(e) => setFId(e.target.value)} value={fId} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="fName" className="col-md-4 col-lg-3 col-form-label">Factory Name:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fName" type="text" className="form-control" id="fName"
                            onChange={(e) => setFName(e.target.value)} value={fName} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="fLocation" className="col-md-4 col-lg-3 col-form-label">Factory Location:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fLocation" type="text" className="form-control" id="fLocation"
                            onChange={(e) => setFLocation(e.target.value)} value={fLocation} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="numOfMachines" className="col-md-4 col-lg-3 col-form-label">Number of Machines:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="numOfMachines" type="text" className="form-control" id="numOfMachines"
                            onChange={(e) => setNumOfMachines(e.target.value)} value={numOfMachines} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="numOfVehicles" className="col-md-4 col-lg-3 col-form-label">Number of Vehicles:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="numOfVehicles" type="text" className="form-control" id="numOfVehicles"
                            onChange={(e) => setNumOfVehicles(e.target.value)} value={numOfVehicles} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="numOfEmployees" className="col-md-4 col-lg-3 col-form-label">Number of Employees:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="numOfEmployees" type="text" className="form-control" id="numOfEmployees"
                            onChange={(e) => setNumOfEmployees(e.target.value)} value={numOfEmployees} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="createdDate" className="col-md-4 col-lg-3 col-form-label">Factory created Date:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="createdDate" type="text" className="form-control" id="createdDate"
                            onChange={(e) => setCreatedDate(e.target.value)} value={createdDate} />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                    {/* End Profile Edit Form */}

                  </div>

                </div>
                {/* <!-- End Bordered Tabs --> */}

              </div>
            </div>

          </div>

        </div>
      </section>



    </main>
  );
}

export default FactoryDetails;