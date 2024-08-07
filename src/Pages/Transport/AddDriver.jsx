import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { addNewDriverApi } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
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
`;

const AddDriver = () => {

    const navigate = useNavigate('');
    // Loader State
    const [loaderState, setloaderState] = useState(false);
    // Variable State
    const [driverName, setDriverName] = useState('')
    const [driverEmail, setDriverEmail] = useState('')
    const [driverAddress, setDriverAddress] = useState('')
    const [driverPhone, setDriverPhone] = useState('')
    const [gender, setGender] = useState('')
    const [driverImage, setDriverImage] = useState('')
    // Error States
    const [driverNameError, setDriverNameError] = useState('')
    const [driverEmailError, setDriverEmailError] = useState('')
    const [driverAddressError, setDriverAddressError] = useState('')
    const [driverPhoneError, setDriverPhoneError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [driverImageError, setDriverImageError] = useState('')

    const AddNewDriver = async () => {
        const driverNameValidate = validateDriverName(driverName);
        const driverEmailValidate = validateDriverEmail(driverEmail);
        const driverAddressValidate = validateDriverAddress(driverAddress);
        const driverPhoneValidate = validateDriverPhone(driverPhone);
        const driverGenderValidate = validateDriverGender(gender);
        const driverImageValidate = validateDriverImage(driverImage);
    
        if (driverNameValidate || driverEmailValidate || driverAddressValidate || driverPhoneValidate || driverGenderValidate || driverImageValidate) {
            setDriverNameError(driverNameValidate);
            setDriverEmailError(driverEmailValidate);
            setDriverAddressError(driverAddressValidate);
            setDriverPhoneError(driverPhoneValidate);
            setGenderError(driverGenderValidate);
            setDriverImageError(driverImageValidate);
            return;
        }
    
        setDriverNameError('');
        setDriverEmailError('');
        setDriverAddressError('');
        setDriverPhoneError('');
        setGenderError('');
        setDriverImageError('');

        try {
            const formData = new FormData();
            formData.append("driverName", driverName);
            formData.append("driverEmail", driverEmail);
            formData.append("gender", gender);
            formData.append("driverAddress", driverAddress);
            formData.append("phoneNo", driverPhone);
            formData.append("driverImage", driverImage);

            var response = await addNewDriverApi(formData);

            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/driver');
                    }, 1500);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            toast.error('Error facing while adding new driver : ', error)
        }
    }

    const handleNameChange = (value) => {
        setDriverName(value);
        setDriverNameError(validateDriverName(value))
    }

    const validateDriverName = (value) => {
        if (value.trim() === '') {
            return '* Name is required';
        }
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleEmailChange = (value) => {
        setDriverEmail(value);
        setDriverEmailError(validateDriverEmail(value))
    }

    const validateDriverEmail = (value) => {
        if (value.trim() === '') {
            return '* Email is required';
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleAddressChange = (value) => {
        setDriverAddress(value);
        setDriverAddressError(validateDriverAddress(value))
    }

    const validateDriverAddress = (value) => {
        if (value.trim() === '') {
            return '* Address is required';
        }
        const addressRegex = /^[A-Za-z0-9\s]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };
    
    const handlePhoneChange = (value) => {
        setDriverPhone(value);
        setDriverPhoneError(validateDriverPhone(value))
    }

    const validateDriverPhone = (value) => {
        if (value.trim() === '') {
            return '* Phone is required';
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };
    
    const handleGenderChange = (value) => {
        setGender(value);
        setGenderError(validateDriverGender(value))
    }

    const validateDriverGender = (value) => {
        if (value === '' || value === 'choose') {
            return '* Gender is required';
        }
    };
    
    const handleImageChange = (value) => {
        setDriverImage(value[0]);
        setDriverImageError('')
    }

    const validateDriverImage = (value) => {
        if (value === '') {
            return '* Photo is required';
        }
    };
    
    const handleCancleButton = () => {
        navigate('/driver')
    }


    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Driver</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Add Driver Form</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form className="row g-3">
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Name*</label>
                                        <input type="text" className={`form-control font14 ${driverNameError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Name" onChange={(e) => handleNameChange(e.target.value)} />
                                        <span className='text-danger'>{driverNameError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Email*</label>
                                        <input type="text" className={`form-control font14 ${driverEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Email" onChange={(e) => handleEmailChange(e.target.value)} />
                                        <span className='text-danger'>{driverEmailError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Address*</label>
                                        <input type="text" className={`form-control font14  ${driverAddressError ? 'border-1 border-danger' : ''} `} id="validationDefault01" placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
                                        <span className='text-danger'>{driverAddressError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Phone*</label>
                                        <input type="text" className={`form-control font14 ${driverPhoneError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Phone Number" onChange={(e) => handlePhoneChange(e.target.value)} />
                                        <span className='text-danger'>{driverPhoneError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Gender*</label>
                                        <select className={`form-select font14 ${genderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleGenderChange(e.target.value)}>
                                            <option selected disabled value='choose'>--- Choose ---</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                        <span className='text-danger'>{genderError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Photo*</label>
                                        <input type="file" className={`form-control font14  ${driverImageError ? 'border-1 border-danger' : ''} `} onChange={(e) => { handleImageChange(e.target.files), console.log(e.target.files) }} />
                                        <span className='text-danger'>{driverImageError}</span>
                                    </div>
                                </form>
                                <div className="row p-5">
                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                        <button className='btn AddBtnn font16 text-white' onClick={AddNewDriver}>Add Driver</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6 text-start">
                                        <button className='btn CancelBtnn font16' onClick={handleCancleButton}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddDriver