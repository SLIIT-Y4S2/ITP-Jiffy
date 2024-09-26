import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MachineDeleteForm from './MachineDeleteForm';
//import MachineUpdateBtn from './MachineUpdateBtn';

function MachineDetails() {
  const navigate = useNavigate();
  const [mId, setMId] = useState('')
  const [maxRunningHrs, setMaxRunningHrs] = useState('')
  const [product, setProduct] = useState('')
  const [mFactory, setMFactory] = useState('')
  const [installedDate, setInstalledDate] = useState('')
  const [totalProductions, setTotalProductions] = useState('')
  const [totalRunningHrs, setTotalRunningHrs] = useState('')
  const [error, setError] = useState(null)

  const { id } = useParams()

  //var machine = null
  const [machine, setMachine] = useState(
    {
      mId: "",
      maxRunningHrs: "",
      product: "",
      mFactory: "",
      installedDate: "",
      totalProductions: "",
      totalRunningHrs: "",
      __v: 0,
      _id: ""
    })

  useEffect(() => {
    const fetchMachine = async () => {
      const response = await fetch(`/api/machine/${id}`)
      const json = await response.json()

      if (response.ok) {

        setMachine(
          {
            mId: `${json["mId"]}`,
            maxRunningHrs: `${json["maxRunningHrs"]}`,
            product: `${json["product"]}`,
            mFactory: `${json["mFactory"]}`,
            installedDate: `${json["installedDate"]}`,
            totalProductions: `${json["totalProductions"]}`,
            totalRunningHrs: `${json["totalRunningHrs"]}`,
            __v: 0,
            _id: `${json["_id"]}`
          })
        setMId(json["mId"])
        setMaxRunningHrs(json["maxRunningHrs"])
        setProduct(json["product"])
        setMFactory(json["mFactory"])
        setInstalledDate(json["installedDate"])
        setTotalProductions(json["totalProductions"])
        setTotalRunningHrs(json["totalRunningHrs"])
      } else {
        console.log("failed")
      }

    }

    fetchMachine()

  }, [setMachine])


  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://localhost:5000/api/machine/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        mId: mId,
        maxRunningHrs: maxRunningHrs,
        product: product,
        mFactory: mFactory,
        installedDate: installedDate,
        totalProductions: totalProductions,
        totalRunningHrs: totalRunningHrs,
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
      console.log('Machine updated successfully.', json)
      window.location.reload();
    }
  }


  return (
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Machines</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item">Machine</li>
            <li className="breadcrumb-item active">Details</li>
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
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#machine-overview">Details</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#machine-update">Update</button>
                  </li>



                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active profile-overview" id="machine-overview">

                    <h5 className="card-title">Machine Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Machine ID:</div>
                      <div className="col-lg-9 col-md-8">{machine["mId"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Maximum Running Hours per week:</div>
                      <div className="col-lg-9 col-md-8">{machine["maxRunningHrs"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Product created:</div>
                      <div className="col-lg-9 col-md-8">{machine["product"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Factory ID this machine belongs:</div>
                      <div className="col-lg-9 col-md-8">{machine["mFactory"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Machine installed Date:</div>
                      <div className="col-lg-9 col-md-8">{machine["installedDate"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Total Productions:</div>
                      <div className="col-lg-9 col-md-8">{machine["totalProductions"]}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Total Running Hours:</div>
                      <div className="col-lg-9 col-md-8">{machine["totalRunningHrs"]}</div>
                    </div>

                    <MachineDeleteForm setError={setError} id={id} />

                  </div>

                  <div className="tab-pane fade profile-edit pt-3" id="machine-update">

                    {/*Machine Update Form*/}
                    <form onSubmit={handleUpdateSubmit}>
                      {error &&
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          {error}
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      }

                      <div className="row mb-3">
                        <label for="fId" className="col-md-4 col-lg-3 col-form-label">Machine ID:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fId" type="text" className="form-control" id="fId"
                            onChange={(e) => setMId(e.target.value)} value={mId} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="maxRunningHrs" className="col-md-4 col-lg-3 col-form-label">Maximum Running Hours per week:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="maxRunningHrs" type="text" className="form-control" id="maxRunningHrs"
                            onChange={(e) => setMaxRunningHrs(e.target.value)} value={maxRunningHrs} />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="input-group mb-3">

                          <label class="col-md-4 col-lg-3 col-form-label" >Product Created using the Machine:</label>

                          <select className="form-select" onChange={e => setProduct(e.target.value)}>
                            <option value="Pots" selected>Pots</option>
                            <option value="Growbags">Growbags</option>
                            <option value="Growblocks">Growblocks</option>
                            <option value="Pallets">Pallets</option>
                            <option value="Performa">Performa</option>
                            <option value="Substrates">Substrates</option>

                          </select>

                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="installedDate" className="col-md-4 col-lg-3 col-form-label">Machine installed Date:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="installedDate" type="text" className="form-control" id="installedDate"
                            onChange={(e) => setInstalledDate(e.target.value)} value={installedDate} />
                        </div>
                      </div>

                      {/*<div className="row">
                        <div className="col-lg-3 col-md-4 label">Total Productions:</div>
                        <div className="col-lg-9 col-md-8">{machine["totalProductions"]}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Total Running Hours:</div>
                        <div className="col-lg-9 col-md-8">{machine["totalRunningHrs"]}</div>
                      </div>*/}


                      <div className="row mb-3">
                        <label for="totalProductions" className="col-md-4 col-lg-3 col-form-label">Total Productions:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="totalProductions" type="text" className="form-control" id="totalProductions" readOnly={true}
                            onChange={(e) => setTotalProductions(e.target.value)} value={totalProductions} disabled/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="totalRunningHrs" className="col-md-4 col-lg-3 col-form-label">Total Running Hours:</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="totalRunningHrs" type="text" className="form-control" id="totalRunningHrs" readOnly={true}
                            onChange={(e) => setTotalRunningHrs(e.target.value)} value={totalRunningHrs} disabled/>
                        </div>
                      </div>

                      <div className="text-center">
                        {/* <MachineUpdateBtn/> */}
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

export default MachineDetails;