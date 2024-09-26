import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Customers() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [errorPosition, setErrorPosition] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = { name, email, address, phone, password }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setErrorPosition(json.errorPosition)
    }

    if (response.ok) {
      setName('')
      setEmail('')
      setAddress('')
      setPhone('')
      setPassword('')
      setError(null)
      console.log('new user added', json)
      window.location.reload();
    }
  }
  

  const handleDeleteSubmit = async (e) => {

    const response = await fetch('https://localhost:5000/api/site-feedbacks/' + e, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Feedback deleted', json)
      window.location.reload()
    }
  }

  const [privateSiteFeedbacks, setPrivateSiteFeedbacks] = useState(null)

  useEffect(() => {
    const fetchPrivateSiteFeedbacks = async () => {
      const response = await fetch(`/api/site-feedbacks/private`)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setPrivateSiteFeedbacks(json)
      }
    }

    fetchPrivateSiteFeedbacks()
  }, [])

  const [publicSiteFeedbacks, setPublicSiteFeedbacks] = useState(null)

  useEffect(() => {
    const fetchPublicSiteFeedbacks = async () => {
      const response = await fetch(`/api/site-feedbacks/public`)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setPublicSiteFeedbacks(json)
      }
    }

    fetchPublicSiteFeedbacks()
  }, [])

  const handlePublicUpdateSubmit = async (e) => {
    const response = await fetch('https://localhost:5000/api/site-feedbacks/public/', {
      method: 'PATCH',
      body: JSON.stringify({
        id: e
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
      console.log('Feedback updated', json)
      window.location.reload();
    }
  }

  const handlePrivateUpdateSubmit = async (e) => {
    const response = await fetch('https://localhost:5000/api/site-feedbacks/private/', {
      method: 'PATCH',
      body: JSON.stringify({
        id: e
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
      console.log('Feedback updated', json)
      window.location.reload();
    }
  }

  return (
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Customer List</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={{ pathname: `/dashboard/` }}>Home</Link></li>
            <li className="breadcrumb-item active">All Customers</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Public Feedbacks</h5>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Feedback</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicSiteFeedbacks && publicSiteFeedbacks.map((siteFeedback) => (
                      <tr key={siteFeedback._id}>
                        <th scope="row">{siteFeedback._id}</th>
                        <td>{siteFeedback.name}</td>
                        <td>{siteFeedback.feedback}</td>
                        {siteFeedback.isApproved && (
                          <td onClick={event => handlePrivateUpdateSubmit(siteFeedback._id)}>Make Private</td>
                        )}              
                        <td><div class="icon">
                          <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target={`#verticalycentered${siteFeedback._id}`}></i></div>
                          <div class="modal fade" id={`verticalycentered${siteFeedback._id}`} tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">You are about to delete this feedback</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  This process can not be undone.
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-primary" onClick={event => handleDeleteSubmit(siteFeedback._id)} data-bs-dismiss="modal">Delete</button>
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
      </section>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Private Feedbacks</h5>

                {/* <!-- Default Table --> */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Feedback</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {privateSiteFeedbacks && privateSiteFeedbacks.map((siteFeedback) => (
                      <tr key={siteFeedback._id}>
                        <th scope="row">{siteFeedback._id}</th>
                        <td>{siteFeedback.name}</td>
                        <td>{siteFeedback.feedback}</td>                      
                        {!siteFeedback.isApproved && (
                          <td onClick={event => handlePublicUpdateSubmit(siteFeedback._id)}>Make Public</td>
                        )}
                        <td><div class="icon">
                          <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target={`#verticalycentered${siteFeedback._id}`}></i></div>
                          <div class="modal fade" id={`verticalycentered${siteFeedback._id}`} tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">You are about to delete this feedback</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  This process can not be undone.
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-primary" onClick={event => handleDeleteSubmit(siteFeedback._id)} data-bs-dismiss="modal">Delete</button>
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
      </section>

    </main>
  );
}

export default Customers;