import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserStueGetAllApi } from '../Utils/Apis'


const Contact_statu = ({data}) => {

  const staffId = data.data;

  console.log('child to child data in state nowwwwww', staffId)
 
  const [forDelete, setForDelete] = useState(false)
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)
  const [status, setStatus] = useState()

  const [deductionOp, setDeductionOp] = useState()
  const [title, setTtile] = useState()
  const [Amount, setAmount] = useState()
  
  console.log('true false',status)
  const [loader, setLoader] = useState(false)


   // User post Api 
   const ContactDataApi = async () => {
    const formData = new FormData()
    formData.append('deductionOption', deductionOp);
    formData.append('title', title);
    formData.append('amount', Amount);
   
   
    setLoader(true)
    try {
        const response = await UserStueGetAllApi(staffId,formData);
        console.log('my staff post api response in Satueeee', response)
        if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            setStatus(response?.data?.status)
            // setFunction(response?.data?.otherstaff?.staffStatus)

            setLoader(false)
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        console.log(error)
    }
}
  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="table-container  table-responsive">

          <table className="table table-sm ">
            <thead className=''>
              <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                <th className='tableGreyBackgroundColor ps-4 pb-2' style={{ width: '25%' }}>Title</th>
                <th className='tableGreyBackgroundColor p-2' style={{ width: '50%' }}>Amount </th>
                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Deduction Option</th>
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
          <div className="row px-1">

            <div className="col-lg-4 col-md-4 col-sm-12 ">
            <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Deduction Option *</label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : deductionOp}  onChange={(e) => setDeductionOp(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Title" />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 ">
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Title * </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : title}  onChange={(e) => setTtile(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Title" />
              </div>

            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 ">
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Amount </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : Amount}  onChange={(e) => setAmount(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="0.00" />
              </div>
            </div>
          </div>

        </div>
        <div className="row mt-4 buttons-topss text-center">
          <div className='my-button11 heading-14'>
            <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" onClick={ContactDataApi}>Submit</button>
            <button type="button" class="btn btn-outline-success heading-14">Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact_statu
