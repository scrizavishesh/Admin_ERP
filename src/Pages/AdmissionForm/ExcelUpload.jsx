import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    .form-control::placeholder, .form-control{
        color: var(--greyState)
    }

    .form-control{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        width: fit-content;
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .EyeViewBtnn, .EyeViewBtnn:active{
        width: fit-content;
        border: 2px solid var(--BtnBorder);
        background-color: var(--OrangeBtnColor)
    }

    
`;


const ExcelUpload = () => {
    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        <form className="row g-3">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Class*</label>
                                <input type="text" className="form-control font14" id="validationDefault02" placeholder="Select Class" required/>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Section*</label>
                                <input type="text" className="form-control font14" id="validationDefault01" placeholder="Select Section" required/>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 text-white'>Generate CSV File</button>
                            <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn EyeViewBtnn font16 ms-2' data-bs-toggle="modal" data-bs-target="#abc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 16 16"><g fill="white"><path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"/></g></svg>
                            </button>
                        </div>
                        <form className="row g-3">
                            <div className="col-md-12 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Upload CSV*</label>
                                <input type="file" className="form-control font14" id="validationDefault02" placeholder="Select Class" required/>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 text-white'>+ Add Student</button>
                        </div>
                    </div>
                </div>







                <div class="modal modal-lg fade" id="abc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title greyTextt fontWeight700 font16" id="exampleModalLabel">CSV Format</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                    <th className='font14 fontWeight600'></th>
                                    <th className='font14 fontWeight600'>Student Name</th>
                                    <th className='font14 fontWeight600'>Email</th>
                                    <th className='font14 fontWeight600'>Password</th>
                                    <th className='font14 fontWeight600'>Phone</th>
                                    <th className='font14 fontWeight600'>Blood Group</th>
                                    <th className='font14 fontWeight600'>Gender</th>
                                    <th className='font14 fontWeight600'>Birthday</th>
                                    <th className='font14 fontWeight600'>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='font12'>1</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>2</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>3</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>4</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>5</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                        </div>
                    </div>
                </div>
            </Container>
        </>
      )
}

export default ExcelUpload