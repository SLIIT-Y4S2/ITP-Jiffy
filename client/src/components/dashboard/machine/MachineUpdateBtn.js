// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const handleUpdateSubmit = async (e) => {
//     e.preventDefault()

//     const response = await fetch('https://localhost:5000/api/machine/' + id, {
//       method: 'PATCH',
//       body: JSON.stringify({
//         mId: mId,
//         maxRunningHrs: maxRunningHrs,
//         product: product,
//         mFactory: mFactory,
//         installedDate: installedDate,
//         totalProductions: totalProductions,
//         totalRunningHrs: totalRunningHrs,
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       console.log(json.error)
//     }

//     if (response.ok) {
//       console.log('Machine updated successfully.', json)
//       window.location.reload();
//     }

//     return <>
//         <div className="row mb-3">
//             <div className="col-md-8 col-lg-9">
//                 <button data-bs-toggle="modal" data-bs-target="#verticalycentered" className="btn btn-danger">Update</button>
//                 <div className="modal fade" id="verticalycentered" tabIndex={'-1'}  aria-modal="true" role="dialog">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Update Machine</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                             </div>
//                             <div className="modal-body">
//                                 Are you sure you want to update this machine?
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                                 <button onClick={handleUpdateSubmit} type="button" className="btn btn-primary">Confirm</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>

//   }

// export default handleUpdateSubmit