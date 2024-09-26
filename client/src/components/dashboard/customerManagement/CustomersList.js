import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import apiFetch from '../../../services/Api';

function Customers() {

  //* Modal Popup
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [errorPosition, setErrorPosition] = useState(null)

  const [filteredCustomers, setFilteredCustomers] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const isMounted = useRef(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = { name, email, address, phone, password }

    const response = await apiFetch('/api/users', {
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
      handleShow()

    }
  }

  const handleDeleteSubmit = async (e) => {

    const response = await apiFetch('http://localhost:5000/api/users/' + e, {
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

  const [customers, setCustomers] = useState(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await apiFetch(`/api/users`)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setCustomers(json)
      }
    }

    fetchCustomers()
  }, [])

  useEffect(() => {

    if (searchTerm !== "") {
      const handleSearch = (data) => {

        let term;

        if (searchTerm !== null) {
          term = searchTerm.replace(/[^a-zA-Z0-9_ \d]/, '');
          console.log(term);
        }


        const regExp = new RegExp(term, "i");
        console.log(regExp);
        //*If search category is emp name
        if (searchCategory === "name") {
          if (data) {
            const filteredCustomers = data.filter(data => data.name.match(regExp));
            setFilteredCustomers(filteredCustomers);
          }
        }//*If search category is emp role
        else if (searchCategory === "email") {
          if (data) {
            const filteredCustomers = data.filter(data => data.email.match(regExp));
            setFilteredCustomers(filteredCustomers);
          }
        }
      }
      handleSearch(customers);

    }
  }, [searchCategory, searchTerm]);

  const getSearchTerm = (data) => {
    setSearchTerm(data)
  }

  //* Get search category from Search Bar Component
  const getSearchCategory = (data) => {
    setSearchCategory(data);
  }


  return (

    <main id="main" className="main">

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { window.location.reload() }}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="pagetitle">
        <h1>Customer List</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={{ pathname: `/dashboard/` }}>Home</Link></li>
            <li className="breadcrumb-item active">All Customers</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div class="col-lg-12">

            <div class="card">
              <div class="card-body">
                <h5 class="card-title"></h5>

                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Add new Customer
                      </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <section className="section">
                          <div className="row">
                            <div className="col-lg-4">
                            </div>
                            <div className="col-lg-5">

                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title">Add New Customer</h5>


                                  {error && errorPosition === '1' ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                      {error}
                                      <button type="button" className="btn" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    : ""}

                                  {/* <!-- Vertical Form --> */}
                                  <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-12">
                                      <label for="inputName" className="form-label">Name</label>
                                      <input type="text" className="form-control" id="inputName"
                                        onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="col-12">
                                      <label for="inputEmail" className="form-label">Email</label>
                                      <input type="email" className="form-control" id="inputEmail"
                                        onChange={(e) => setEmail(e.target.value)} value={email} />
                                      {error && errorPosition === '3' ?
                                        <div style={{ color: 'red' }}><b>{error}</b></div> : ""}
                                    </div>
                                    <div className="col-12">
                                      <label for="inputPhone" className="form-label">Phone</label>
                                      <input type="text" className="form-control" id="inputPhone"
                                        onChange={(e) => setPhone(e.target.value)} value={phone} />
                                      {error && errorPosition === '4' ?
                                        <div style={{ color: 'red' }}><b>{error}</b></div> : ""}
                                    </div>
                                    <div className="col-12">
                                      <label for="inputAddress" className="form-label">Address</label>
                                      <input type="text" className="form-control" id="inputAddress"
                                        onChange={(e) => setAddress(e.target.value)} value={address} />
                                    </div>
                                    <div className="col-12">
                                      <label for="inputPassword" className="form-label">Password</label>
                                      <input type="password" className="form-control" id="inputPassword"
                                        onChange={(e) => setPassword(e.target.value)} value={password} />
                                      {error && errorPosition === '5' ?
                                        <div style={{ color: 'red' }}><b>{error}</b></div> : ""}
                                    </div>
                                    <div className="text-center">
                                      <button type="submit" className="btn btn-primary">Add Customer</button>
                                    </div>
                                  </form>
                                  {/* <!-- Vertical Form --> */}

                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4">
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Customer List</h5>

                <SearchBar
                  searchTerm={getSearchTerm}
                  searchCategory={getSearchCategory}
                />

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchTerm === "" ? customers && customers.map((customer) => (
                      <tr key={customer._id}>
                        <th scope="row">{customer._id}</th>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td><Link to={{ pathname: `/customer/${customer._id}` }}>View Profile</Link></td>
                      </tr>
                    )) : filteredCustomers && filteredCustomers.map((customer) => (
                      <tr key={customer._id}>
                        <th scope="row">{customer._id}</th>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td><Link to={{ pathname: `/customer/${customer._id}` }}>View Profile</Link></td>
                        <td><div class="icon">
                          <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target={`#verticalycentered${customer._id}`}></i></div>
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
      </section>

    </main>
  );
}

export default Customers;