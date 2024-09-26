import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'


function Leave() {
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState(null)
    const[err,setErr]= useState(false)

  const { id } = useParams()
  //var customer = null
  const [leave, setLeave] = useState(
    {
      description: "",
      lastLogin: "",
      startDate:"",
      endDate:"",
      type:"",
      password: "",
      __v: 0,
      _id: ""
    })
  useEffect(() => {
    const fetchLeave = async () => {
      // fetch(`/api/users/${id}`)
      // .then(res => res.json)
      // .then(data => setCustomer(data))
      const response = await fetch(`/api/leaves/${id}`)
      const json = await response.json()
      //console.log(json["name"])
      if (response.ok) {
        //console.log("json "+json["name"])
        setLeave(
          {
            description: `${json["description"]}`,
            lastLogin: `${json["lastLogin"]}`,
            startDate: `${json["startDate"]}`,
            endDate: `${json["endDate"]}`,
            type: `${json["type"]}`,
            password: `${json["password"]}`,
            __v: 0,
            _id: `${json["_id"]}`
          })
          setDescription(json["description"])
          setStartDate(json["startDate"].slice(0,10))
          setEndDate(json["endDate"].slice(0,10))
          setType(json["type"])
          
      } else {
        console.log("not ok")
      }

    }

    fetchLeave()

  }, [setLeave])

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://localhost:5000/api/leaves/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        description: description,
        startDate:startDate,
        endDate:endDate,
        type: type,
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
    if(description.length==0||startDate.length==0||endDate.length==0 || type.length==0){
      setErr(true)
    }

    if (response.ok) {
      console.log('Leave updated', json)
      console.log(startDate-endDate)
      alert('Sucssesfully Updated')
      window.location.reload();
    }
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://localhost:5000/api/leaves/' + id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Leave deleted', json)
      alert('Sucssesfully deleted')
      navigate("/leaves");
    }
  }


  return (
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Leave</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Leaves</li>
            <li className="breadcrumb-item active">Leave Details</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section profile">
        <div className="row">
          <div className="col-xl-8">

            <div className="card">
              <div className="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul className="nav nav-tabs nav-tabs-bordered">

                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Leave</button>
                  </li>

                  <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                    </li>


                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    <h5 className="card-title">Leave Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Description</div>
                      <div className="col-lg-9 col-md-8">{leave["description"]}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Start date</div>
                      <div className="col-lg-9 col-md-8">{leave["startDate"].slice(0,10)}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">End date</div>
                      <div className="col-lg-9 col-md-8">{leave["endDate"].slice(0,10)}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Type</div>
                      <div className="col-lg-9 col-md-8">{leave["type"]}</div>
                    </div>
                  </div>
                

                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                    {/* <!-- Profile Edit Form --> */}
                    <form onSubmit={handleUpdateSubmit}>
                      
                      {error &&
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          {error}
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      }

                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Description</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="fullName"
                          onChange={(e) => setDescription(e.target.value)} value={description} />
                          {err&&description.length<=0?
                      <label><b>*Cant keep empty*</b></label>:""}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Start date</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="date" className="form-control" id="fullName"
                          onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                          {err&&startDate.length<=0?
                      <div style={{color: "red"}}><b>*Cant keep empty*</b></div>:""}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Start date</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="date" className="form-control" id="fullName"
                          onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                          {err&&endDate.length<=0?
                      <div style={{color: "red"}}><b>*Cant keep empty*</b></div>:""}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Type</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="fullName"
                          onChange={(e) => setType(e.target.value)} value={type} />
                          {err&&type.length<=0?
                      <div style={{color: "red"}}><b>*Cant keep empty*</b></div>:""}
                        </div>
                        </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                    {/* <!-- End Profile Edit Form --> */}

                  </div>

                  <div className="tab-pane fade pt-3" id="profile-settings">

                    {/* <!-- Settings Form --> */}
                    <form onSubmit={handleDeleteSubmit}>

                        <div className="row mb-3">
                          <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Delete Leave</label>
                          <div className="col-md-8 col-lg-9">
                          <button type="submit" className="btn btn-primary">Delete Now</button>
                          </div>
                        </div>
                      </form>
                    {/* <!-- End settings Form --> */}

                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">

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

export default Leave;