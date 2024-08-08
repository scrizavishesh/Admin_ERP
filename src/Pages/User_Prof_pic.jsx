import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateImageGetAllApi } from '../Utils/Apis'


const User_Prof_pic = ({data}) => {
    const staffId = data;

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
  
    const [staffName, setstaffName] = useState('')
    const [staffEmail, setstaffEmail] = useState('')
    const [staffAddress, setstaffAddress] = useState('')
    const [staffPhone, setstaffPhone] = useState('')
    const [staffGender, setstaffGender] = useState('')
    const [roleId, setroleId] = useState('')
    const [staffImage, setstaffImage] = useState()
    
    console.log('Imageeeeeeeee',staffImage)
    const [loader, setLoader] = useState(false)

 // User post Api 
 const ContactDataApi = async () => {

    const formData = new FormData()
    formData.append('staffName', staffName);
    formData.append('staffEmail', staffEmail);
    formData.append('staffAddress', staffAddress);
    formData.append('staffPhone', staffPhone);
    formData.append('staffGender', staffGender);
    formData.append('roleId', roleId);
    formData.append('staffImage', staffImage);
   
   
    setLoader(true)
    try {
        const response = await UpdateImageGetAllApi(staffId,formData);
        console.log('my staff post api response in Profileeeeeee updateeeeee', response)
        if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            setStatus(response?.data?.status)
            setstaffImage("")
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
                <div className="row">
                    <div className="col-lg-10 col-md-6 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Profile Picture</label>
                            <input type="file" class="form-control" id="exampleFormControlInput1"  onChange={(e)=> setstaffImage(e.target.files[0])} placeholder="name@example.com" />
                        </div>
                       
                           <div className="row mt-4 buttons-tops">
                            <div className='my-button11 heading-14'>
                                <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Update Picture</button>
                                <button type="button" class="btn btn-outline-success heading-12 ms-1 ">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Prof_pic
