import React from 'react';

const ProductOrderUpdateForm = (ID) => {

    console.log(ID)
    var pID = ID

    const handleUpdateSubmit = async (id) => {

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

    return <>
        <div className="row mb-3">
            <div className="col-md-8 col-lg-9">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <button data-bs-toggle="modal" data-bs-target="#verticalycentered" className="btn btn-success"><i class="bi bi-check-circle"></i></button>
                    {/* <button type="button" class="btn btn-success"><i class="bi bi-check-circle"></i></button> */}
                </div>
                <div className="modal fade" id="verticalycentered" tabIndex={'-1'} aria-modal="true" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Order Request</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                Are you sure you want to set this order as completed?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button onClick={() => { handleUpdateSubmit(pID) }} type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProductOrderUpdateForm