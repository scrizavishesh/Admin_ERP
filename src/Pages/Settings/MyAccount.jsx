import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { AdminAccountApi, getAdminDataAPI } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }

    .headingBgColor{
        background-color: var(--headingBackgroundColor);
        
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }

    .verifiedBtn{
        background-color: var(--verifiedButton);
    }
    
`;

const MyAccount = () => {

    const navigate = useNavigate('');

    // loader State
    const [loaderState, setloaderState] = useState(false);

    // Data States 
    const [adminName, setAdminName] = useState('')
    const [adminGender, setAdminGender] = useState('')
    const [adminAddress, setAdminAddress] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [adminPhone, setAdminPhone] = useState('')
    const [adminDesignation, setAdminDesignation] = useState('')
    const [adminBirthDate, setAdminBirthDate] = useState('')
    const [adminPhoto, setAdminPhoto] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    // Error States 
    const [adminNameError, setAdminNameError] = useState('')
    const [adminGenderError, setAdminGenderError] = useState('')
    const [adminAddressError, setAdminAddressError] = useState('')
    const [adminEmailError, setAdminEmailError] = useState('')
    const [adminPhoneError, setAdminPhoneError] = useState('')
    const [adminDesignationError, setAdminDesignationError] = useState('')
    const [adminBirthDateError, setAdminBirthDateError] = useState('')
    const [adminPhotoError, setAdminPhotoError] = useState('')

    useEffect(() => {
        getAdminData();
    }, [])

    const getAdminData = async () => {
        try {
            setloaderState(true);
            var response = await getAdminDataAPI();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAdminName(response?.data?.admin?.adminName)
                    setAdminGender(response?.data?.admin?.adminGender)
                    setAdminAddress(response?.data?.admin?.adminAddress)
                    setAdminEmail(response?.data?.admin?.adminEmail)
                    setAdminPhone(response?.data?.admin?.adminPhone)
                    setAdminDesignation(response?.data?.admin?.adminDesignation)
                    setAdminBirthDate(response?.data?.admin?.adminDOB)
                    setAdminPhoto(response?.data?.admin?.adminPhoto)

                    console.log(response?.data?.admin?.adminName, 'data')
                    console.log(response?.data?.admin?.adminGender, 'data')
                    console.log(response?.data?.admin?.adminAddress, 'data')
                    console.log(response?.data?.admin?.adminEmail, 'data')
                    console.log(response?.data?.admin?.adminPhone, 'data')
                    console.log(response?.data?.admin?.adminDesignation, 'data')
                    console.log(response?.data?.admin?.adminDOB, 'data')
                    console.log(response?.data?.admin?.adminPhoto, 'data')
                    // validationCheck();
                    toast.success(response?.data?.message)
                    setloaderState(false);
                }
                else {
                    toast.success(response?.data?.message)
                }
            }
        }
        catch (error) {
            setloaderState(false);
            console.log('Error during Get Admin Data', error)
        }
    }

    const UpdateAdminBySchoolId = async () => {
        const adminNameValidate = validateAdminName(adminName);
        const adminEmailValidate = validateAdminEmail(adminEmail);
        const adminPhoneValidate = validateAdminPhone(adminPhone);
        const adminGenderValidate = validateAdminGender(adminGender);
        const adminAddressValidate = validateAdminAddress(adminAddress);
        const adminDesignationValidate = validateAdminDesignation(adminDesignation);
        const adminBirthDateValidate = validateAdminBirthDate(adminBirthDate);
        const adminPhotoValidate = validateAdminPhoto(adminPhoto);

        if (adminNameValidate || adminEmailValidate || adminPhoneValidate || adminGenderValidate || adminAddressValidate || adminDesignationValidate || adminBirthDateValidate || adminPhotoValidate) {
            setAdminNameError(adminNameValidate);
            setAdminEmailError(adminEmailValidate);
            setAdminPhoneError(adminPhoneValidate);
            setAdminGenderError(adminGenderValidate);
            setAdminAddressError(adminAddressValidate);
            setAdminDesignationError(adminDesignationValidate);
            setAdminBirthDateError(adminBirthDateValidate);
            setAdminPhotoError(adminPhotoValidate);
            return;
        }
        setAdminNameError('');
        setAdminEmailError('');
        setAdminPhoneError('');
        setAdminGenderError('');
        setAdminAddressError('');
        setAdminDesignationError('');
        setAdminBirthDateError('');
        setAdminPhotoError('');

        try {
            const formData = new FormData();
            formData.append("adminName", adminName);
            formData.append("adminGender", adminGender);
            formData.append("adminAddress", adminAddress);
            formData.append("adminEmail", adminEmail);
            formData.append("adminPhone", adminPhone);
            formData.append("adminDesignation", adminDesignation);
            formData.append("adminBirthDate", adminBirthDate);
            formData.append("adminPhoto", adminPhoto);

            var response = await AdminAccountApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    navigate('/allStudent')
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error, 'error')
        }
    }

    const handleAdminNameChange = (value) => {
        setAdminName(value);
        setAdminNameError(validateAdminName(value))
    }

    const validateAdminName = (value) => {
        if (value.trim() === '') {
            return '* Admin Name is required';
        }
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAdminAddressChange = (value) => {
        setAdminAddress(value);
        setAdminAddressError(validateAdminAddress(value))
    }

    const validateAdminAddress = (value) => {
        if (value.trim() === '') {
            return '* Admin Address is required';
        }
        const addressRegex = /^[A-Za-z0-9\s-]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAdminGenderChange = (value) => {
        setAdminGender(value);
        setAdminGenderError(validateAdminGender(value))
    }

    const validateAdminGender = (value) => {
        if (value === '') {
            return '* Admin Gender is required';
        }
        return '';
    };

    const handleAdminEmailChange = (value) => {
        setAdminEmail(value);
        setAdminEmailError(validateAdminEmail(value))
    }

    const validateAdminEmail = (value) => {
        if (value.trim() === '') {
            return '* Admin Email is required';
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAdminPhoneChange = (value) => {
        setAdminPhone(value);
        setAdminPhoneError(validateAdminPhone(value))
    }

    const validateAdminPhone = (value) => {
        if (value.trim() === '') {
            return '* Admin Contact is required';
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAdminDesignationChange = (value) => {
        setAdminDesignation(value);
        setAdminDesignationError(validateAdminDesignation(value))
    }

    const validateAdminDesignation = (value) => {
        if (value.trim() === '') {
            return '* Admin Designation is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAdminBirthDateChange = (value) => {
        setAdminBirthDate(value);
        setAdminBirthDateError(validateAdminBirthDate(value))
    }

    const validateAdminBirthDate = (value) => {
        if (value === '') {
            return '* Admin Date Of Birth is required';
        }
        return '';
    };

    const handleAdminPhotoChange = (value) => {
        setAdminPhoto(value[0]);
        setAdminPhotoError(validateAdminPhoto(value))
    }

    const validateAdminPhoto = (file) => {
        if (!file) {
            return '* Admin Photo is required';
        }
        const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validExtensions.includes(file.type)) {
            return '* Invalid file type. Please upload JPG, JPEG, or PNG.';
        }
        return '';
    };

    // validate the data the is retrived by get By Id
    // const validationCheck = () => {
    //     const adminNameValidate = validateAdminName(adminName);
    //     const adminEmailValidate = validateAdminEmail(adminEmail);
    //     const adminPhoneValidate = validateAdminPhone(adminPhone);
    //     const adminGenderValidate = validateAdminGender(adminGender);
    //     const adminAddressValidate = validateAdminAddress(adminAddress);
    //     const adminDesignationValidate = validateAdminDesignation(adminDesignation);
    //     const adminBirthDateValidate = validateAdminBirthDate(adminBirthDate);
    //     const adminPhotoValidate = validateAdminPhoto(adminPhoto);

    //     if (adminNameValidate || adminEmailValidate || adminPhoneValidate || adminGenderValidate || adminAddressValidate || adminDesignationValidate || adminBirthDateValidate || adminPhotoValidate) {
    //         setAdminNameError(adminNameValidate);
    //         setAdminEmailError(adminEmailValidate);
    //         setAdminPhoneError(adminPhoneValidate);
    //         setAdminGenderError(adminGenderValidate);
    //         setAdminAddressError(adminAddressValidate);
    //         setAdminDesignationError(adminDesignationValidate);
    //         setAdminBirthDateError(adminBirthDateValidate);
    //         setAdminPhotoError(adminPhotoValidate);
    //         return;
    //     }
    //     setAdminNameError('');
    //     setAdminEmailError('');
    //     setAdminPhoneError('');
    //     setAdminGenderError('');
    //     setAdminAddressError('');
    //     setAdminDesignationError('');
    //     setAdminBirthDateError('');
    //     setAdminPhotoError('');
    // }


    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid">
                <div className="row p-2 pt-4">
                    <div className="row pb-3">
                        <div className="col-lg-6 col-md-6 col-sm-12 flex-frow-1">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Settings</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">My Account</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>My Account</p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                            {/* <div className="row">
                                <div className="col-md-3 col-sm-6 text-end p-0">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                        <span className='font16 textVerticalCenter'>
                                            <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to CSV</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6 text-center p-0">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                        <span className='font16 textVerticalCenter'>
                                            <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to PDF</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-sm-6 p-0">
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn searchButtons text-white" type="submit"><span className='font16'>Search</span></button>
                                    </form>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white">
                            <div className="row p-4">
                                <div className="col-md-4 col-sm-12">
                                    <div className="row h-100">
                                        <div className="headingBgColor cardradius2 ps-4 pe-4">
                                            <p className='p-3 text-center'><img src="./images/userProfile.svg" alt="" /></p>
                                            <h2 className='text-center mb-2 activeTexttt fontWeight600'>{adminName}</h2>
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <h2 className=''>Admin</h2>
                                                <button className='ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2'>Verified</button>
                                            </div>
                                            <hr className='mb-3' />
                                            <h2 className='p-0 mb-3 activeTexttt fontWeight600'>Details info</h2>
                                            <hr className='mb-2' />
                                            <form action="" className='pe-0'>
                                                <div className="row p-0">
                                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label greyText">Email :</label>
                                                    <div className="col-sm-9 flex-wrap"> <input type="text" readOnly className="form-control-plaintext text-end" id="staticEmail" value={adminEmail} /> </div>
                                                </div>
                                                <div className="row p-0">
                                                    <label htmlFor="staticPhone" className="col-sm-3 col-form-label greyText">Phone :</label>
                                                    <div className="col-sm-9 flex-wrap"> <input type="text" readOnly className="form-control-plaintext text-end" id="staticPhone" value={adminPhone} /> </div>
                                                </div>
                                                <div className="row p-0">
                                                    <label htmlFor="staticAddress" className="col-sm-3 col-form-label greyText">Address :</label>
                                                    <div className="col-sm-9"><input type="text" readOnly className="form-control-plaintext text-end text-break" id="staticAddress" value={adminAddress} /> </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    <form className="row mb-1 g-3">
                                        <div className="col-12">
                                            <label htmlFor="validationDefault01" className="form-label font14">Name</label>
                                            <input type="text" className={`form-control font14 ${adminNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={adminName} onChange={(e) => handleAdminNameChange(e.target.value)} />
                                            <span className='text-danger'>{adminNameError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault02" className="form-label font14">Email</label>
                                            <input type="text" className={`form-control font14 ${adminEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={adminEmail} onChange={(e) => handleAdminEmailChange(e.target.value)} />
                                            <span className='text-danger'>{adminEmailError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault01" className="form-label font14">Designation</label>
                                            <input type="text" className={`form-control font14 ${adminDesignationError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={adminDesignation} onChange={(e) => handleAdminDesignationChange(e.target.value)} />
                                            <span className='text-danger'>{adminDesignationError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault02" className="form-label font14">Birthday</label>
                                            <input type="date" className={`form-control font14 ${adminBirthDateError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={adminBirthDate} onChange={(e) => handleAdminBirthDateChange(e.target.value)} />
                                            <span className='text-danger'>{adminBirthDateError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault01" className="form-label font14">Gender</label>
                                            <select className={`form-select font14 ${adminGenderError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={adminGender} onChange={(e) => handleAdminGenderChange(e.target.value)}>
                                                <option selected disabled value='' >--- Choose ---</option>
                                                <option value='Male'>Male</option>
                                                <option selected value='Female'>Female</option>
                                            </select>
                                            <span className='text-danger'>{adminGenderError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault01" className="form-label font14">Phone Number</label>
                                            <input type="text" className={`form-control font14 ${adminPhoneError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={adminPhone} onChange={(e) => handleAdminPhoneChange(e.target.value)} />
                                            <span className='text-danger'>{adminPhoneError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault02" className="form-label font14">Address</label>
                                            <textarea type="text" className={`form-control font14 ${adminAddressError ? 'border-1 border-danger' : ''}`} id="validationDefault02" row={2} value={adminAddress} onChange={(e) => handleAdminAddressChange(e.target.value)}></textarea>
                                            <span className='text-danger'>{adminAddressError}</span>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="validationDefault01" className="form-label font14">Photo</label>
                                            {/* <input type="file" className={`form-control font14 ${adminPhotoError ? 'border-1 border-danger' : ''}`} id="validationDefault02" onChange={(e) => handleAdminPhotoChange(e.target.files)} /> */}
                                            <div className="d-flex bg-white">
                                                {adminPhotoError && changeImageType ? (
                                                    <input type='text' className={`form-control font14 p-2 ${adminPhotoError ? 'border-left-1 border-left-danger' : 'formcontrolImageborder'}`} id="validationDefault02"  readOnly />
                                                ) : (
                                                    <input type='file' className={`form-control font14 p-2  ${adminPhotoError ? 'border-1 border-danger' : 'formcontrolImageborder'}`} id="validationDefault02" onChange={(e) => handleAdminPhotoChange(e.target.files)} />
                                                )}
                                                <div className='formcontrolButtonborder p-1 ps-4 pe-4 text-center'>
                                                    <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                                        {changeImageType ? 'Edit' : 'View'}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className='text-danger'>{adminPhotoError}</span>
                                        </div>
                                        <div className="col-12">
                                            <p>
                                                <button className='btn addButtons text-white font14' type='button' onClick={UpdateAdminBySchoolId}>Save Changes</button>
                                                <button className='btn cancelButtons font14 ms-3' type='button'>Cancel</button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default MyAccount