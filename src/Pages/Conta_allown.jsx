import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Conta_allown = () => {

  const [loader, setLoader] = useState(false)

  return (
    <>
      <div className="container-fluid px-0 mt-3">
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
        <div className="row px-3">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color"> Allowance Option</label>
              <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                <option value="" >Non Taxable</option>
                {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
              </select>
            </div>
            <div className="mb-3  pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Title * </label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Title" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
          <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Amount Option</label>
              <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                <option value="" >Fixed</option>
                {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Amount</label>
              <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                <option value="" >0.00</option>
                {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
              </select>
            </div>
          </div>
        
        </div>
       
        </div>
        <div className="row mt-4 buttons-topss text-center">
          <div className='my-button11 heading-14'>
            <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" >Save</button>
            <button type="button" class="btn btn-outline-success heading-14">Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Conta_allown
