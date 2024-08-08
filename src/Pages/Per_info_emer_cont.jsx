import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { EmergencyGetAllApi } from '../Utils/Apis'


const Per_info_emer_cont = ({data}) => {

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
  
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [contact, setContact] = useState()
    const [address, setAddress] = useState('')
  
    console.log('true false',status)
    const [loader, setLoader] = useState(false)



     // User post Api 
   const ContactDataApi = async () => {

    const formData = new FormData()
    formData.append('fullName', name);
    formData.append('phoneNumber', contact);
    formData.append('email', email);
    formData.append('address', address);

   
   
    setLoader(true)
    try {
        const response = await EmergencyGetAllApi(staffId,formData);
        console.log('my staff post api response in EMERGENCyyyyyyy', response)
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
            <div className="container-fluid">
                <div className="row px-1 pt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Full Name  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : name } onChange={(e) => setName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Full Name" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Email  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : email } onChange={(e) => setEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Email" />
                        </div>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contact Number</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : contact } onChange={(e) => setContact(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Contact Number" />
                        </div>

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Address</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : address } onChange={(e) => setAddress(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Address" />
                        </div>
                    </div>


                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Update Contact</button>
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Per_info_emer_cont
