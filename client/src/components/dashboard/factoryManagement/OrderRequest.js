import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrderRequest() {

  const [id, setId] = useState('')

  //* Modal Popup
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const [orderRequest, setOrderRequest] = useState('')

  useEffect(() => {
    const fetchOrderRequest = async () => {
      const response = await fetch(`/api/inventoryProductOrder`)
      const json = await response.json()
      console.log(json)
      console.log(json[0])
      if (response.ok) {
        setOrderRequest(json)
      }
    }

    fetchOrderRequest()
  }, [])

  const handleUpdateSubmit = async () => {
    // e.preventDefault()

    const response = await fetch('https://localhost:5000/api/inventoryProductOrder/' + id, {

      method: 'PATCH',
      body: JSON.stringify({
        status: "Completed"
      }),

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Product Order Updated Successfully.', json)
      window.location.reload();
    }
  }

  return (



    <main id="main" className="main">

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to set this order as Completed?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Yes
          </Button>
          <Button variant="danger" onClick={(handleClose)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="pagetitle">
        <h1>Order Request Management</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Order</li>
            <li className="breadcrumb-item active">Order List</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>

                {/* <!-- Default Table --> */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Status</th>
                      <th scope="col">Change order status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orderRequest && orderRequest.map((orderReq) => (
                      <tr key={orderReq._id}>
                        <th scope="row">{orderReq.currentDate}</th>
                        <td>{orderReq.product.split(',')[0]}</td>
                        <td>{orderReq.productQuantity}</td>
                        <td>{orderReq.status}</td>
                        <td>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            
                            <button type="button" class="btn btn-success" onClick={() => { setId(orderReq._id); handleShow() }}><i class="bi bi-check-circle"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                {/* <!-- End Default Table Example --> */}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

  );
}

export default OrderRequest;