import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { BankGetAllApi } from '../Utils/Apis'


const Per_info_bank = ({data}) => {

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
  
    const [AccountTil, setAccountTil] = useState()
    const [IFSC, setIFSC] = useState()
    const [accountNo, setAccountNo] = useState()
    const [swiftCode, setSwiftCode] = useState('')
    const [bankName, setBankName] = useState()
    const [bankBranch, setBankBranch] = useState()
    
    console.log('true false',status)
    const [loader, setLoader] = useState(false)


    // User post Api 
   const ContactDataApi = async () => {

    const formData = new FormData()
    formData.append('accountTitle', AccountTil);
    formData.append('accountNumber', accountNo);
    formData.append('bankName', bankName);
    formData.append('ifscCode', IFSC);
    formData.append('swiftCode', swiftCode);
    formData.append('bankBranch', bankBranch);
   
   
    setLoader(true)
    try {
        const response = await BankGetAllApi(staffId,formData);
        console.log('my staff post api response in BANKKKKKKK', response)
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
                <p className='heading-16 mt-3'>Bank Details</p>
                <div className="row px-1 pt-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Title  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : AccountTil }  onChange={(e) => setAccountTil(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">IFSC Code  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : IFSC } onChange={(e) => setIFSC(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Number </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : accountNo } onChange={(e) => setAccountNo(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Swift Code</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : swiftCode } onChange={(e) => setSwiftCode(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Name </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : bankName } onChange={(e) => setBankName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Branch </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : bankBranch } onChange={(e) => setBankBranch(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                    </div>

                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            <button type="button" class="btn btn-outline-success my-green heading-12"   onClick={ContactDataApi}>Submit</button>
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Per_info_bank
