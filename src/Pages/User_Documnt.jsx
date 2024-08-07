import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const User_Documnt = () => {
    return (
        <>
            <div className="container-fluid px-0 mt-3">
                <p className='mb-2' style={{ marginTop: '-10px' }}>Documents</p>
                <div className="table-container  table-responsive">

                    <table className="table table-sm ">
                        <thead className=''>
                            <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                                <th className='tableGreyBackgroundColor ps-4 pb-2' style={{ width: '25%' }}>Title</th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount </th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Allowance Option</th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount Option</th>
                            </tr>
                        </thead>
                        <tbody className='heading-14 align-middle greyTextColor greyText'>
                            {/* <tr className='heading-14 ' >
                    <td className=' greyText pe-0 ' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                  </tr> */}
                        </tbody>
                        <Toaster />
                    </table>
                </div>

                <div>
                    <p>Add New Document</p>
                    <div className="row ">
                        <div className="col-lg-6 col-md-6 col-sm-12 ">

                            <div className="mb-3   for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Document Name </label>
                                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Document Name" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div className="mb-3  pt- for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Document Type </label>
                                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Eg. Payslip" />
                            </div>
                        </div>
                        <div className="row pe-0">
                            <div class="mb-3 pe-0">
                                <label for="exampleFormControlInput1" class="form-label">Document File</label>
                                <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <p className='heading-12' style={{marginTop:'-5px'}}>Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx</p>
                        </div>
                    </div>

                </div>
                <div className="row mt-4 buttons-topss text-center">
                    <div className='my-button11 heading-14'>
                        <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" >Add Document</button>
                        <button type="button" class="btn btn-outline-success heading-14">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Documnt
