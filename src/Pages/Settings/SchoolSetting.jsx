import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getSchoolDataByIdAPI, updateSchoolDataByIdAPI } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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
    
`;


const SchoolSetting = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data State
    const [schoolName, setSchoolName] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [schoolAddress, setSchoolAddress] = useState('');
    const [schoolInfo, setSchoolInfo] = useState('');
    const [schoolEmailRecpTitle, setSchoolEmailRecpTitle] = useState('');
    const [schoolSocial1, setSchoolSocial1] = useState('');
    const [schoolSocial2, setSchoolSocial2] = useState('');
    const [schoolSocial3, setSchoolSocial3] = useState('');
    const [schoolWarning, setSchoolWarning] = useState('');
    const [schoolPhoto, setSchoolPhoto] = useState('');
    // Error State
    const [schoolNameError, setSchoolNameError] = useState('');
    const [schoolPhoneError, setSchoolPhoneError] = useState('');
    const [schoolAddressError, setSchoolAddressError] = useState('');
    const [schoolInfoError, setSchoolInfoError] = useState('');
    const [schoolEmailRecpTitleError, setSchoolEmailRecpTitleError] = useState('');
    const [schoolSocial1Error, setSchoolSocial1Error] = useState('');
    const [schoolSocial2Error, setSchoolSocial2Error] = useState('');
    const [schoolSocial3Error, setSchoolSocial3Error] = useState('');
    const [schoolWarningError, setSchoolWarningError] = useState('');
    const [schoolPhotoError, setSchoolPhotoError] = useState('');
    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    useEffect(() => {
        getSchoolDataById();
    }, [token, schoolName])

    const getSchoolDataById = async () => {
        try {
            setloaderState(true);
            var response = await getSchoolDataByIdAPI();
            if (response?.status == 200) {
                if (response?.data?.status === 'success') {
                    setSchoolName(response?.data?.school?.schoolName)
                    setSchoolPhone(response?.data?.school?.schoolPhone)
                    setSchoolAddress(response?.data?.school?.schoolAddress)
                    setSchoolInfo(response?.data?.school?.description)
                    setSchoolEmailRecpTitle(response?.data?.school?.schoolEmail)
                    setSchoolWarning(response?.data?.school?.warningText)
                    setSchoolSocial1(response?.data?.school?.socialLink1)
                    setSchoolSocial2(response?.data?.school?.socialLink2)
                    setSchoolSocial3(response?.data?.school?.socialLink3)
                    setSchoolPhoto(response?.data?.school?.schoolPhoto)
                    setloaderState(false);
                    setTimeout(() => {
                        validationCheck();
                    }, 1500)
                    toast.success(response?.data?.msg)
                }
                else {
                    toast.error(response?.data?.msg)
                }
            }
        }
        catch { }
    }

    const UpdateSchoolSettingFun = async () => {
        const schoolNameValidate = validateAdminName(schoolName);
        const schoolPhoneValidate = validateAdminName(schoolPhone);
        const schoolAddressValidate = validateAdminName(schoolAddress);
        const schoolInfoValidate = validateAdminName(schoolInfo);
        const schoolEmailRecpTitleValidate = validateAdminName(schoolEmailRecpTitle);
        const schoolSocial1Validate = validateAdminName(schoolSocial1);
        const schoolSocial2Validate = validateAdminName(schoolSocial2);
        const schoolSocial3Validate = validateAdminName(schoolSocial3);
        const schoolWarningValidate = validateAdminName(schoolWarning);
        const schoolPhotoValidate = validateAdminName(schoolPhoto);

        if (schoolNameValidate || schoolPhoneValidate || schoolAddressValidate || schoolInfoValidate || schoolEmailRecpTitleValidate || schoolSocial1Validate || schoolSocial2Validate || schoolSocial3Validate || schoolWarningValidate || schoolPhotoValidate) {
            setSchoolNameError(schoolNameValidate);
            setSchoolPhoneError(schoolPhoneValidate);
            setSchoolAddressError(schoolAddressValidate);
            setSchoolInfoError(schoolInfoValidate);
            setSchoolEmailRecpTitleError(schoolEmailRecpTitleValidate);
            setSchoolSocial1Error(schoolSocial1Validate);
            setSchoolSocial2Error(schoolSocial2Validate);
            setSchoolSocial3Error(schoolSocial3Validate);
            setSchoolWarningError(schoolWarningValidate);
            setSchoolPhotoError(schoolPhotoValidate);
            return;
        }

        setSchoolNameError('')
        setSchoolPhoneError('')
        setSchoolAddressError('')
        setSchoolInfoError('')
        setSchoolEmailRecpTitleError('')
        setSchoolSocial1Error('')
        setSchoolSocial2Error('')
        setSchoolSocial3Error('')
        setSchoolWarningError('')
        setSchoolPhotoError('')

        try {
            const formData = new FormData();
            formData.append('schoolAddress', schoolAddress)
            formData.append('schoolPhone', schoolPhone)
            formData.append('email', schoolEmailRecpTitle)
            formData.append('socialLink1', schoolSocial1)
            formData.append('socialLink2', schoolSocial2)
            formData.append('socialLink3', schoolSocial3)
            formData.append('warningText', schoolWarning)
            formData.append('schoolInfo', schoolInfo)
            formData.append('schoolName', schoolName)
            var response = await updateSchoolDataByIdAPI(formData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    toast.success(response?.data?.msg)
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            } else {
                toast.error(response?.error);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    }

    const handleSchoolNameChange = (value) => {
        setSchoolName(value);
        setSchoolNameError(validateSchoolName(value))
    }

    const validateSchoolName = (value) => {
        if (value.trim() === '') {
            return '* School Name is required';
        }
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleWarningTextChange = (value) => {
        setSchoolWarning(value);
        setSchoolWarningError(validateWarningText(value))
    }

    const validateWarningText = (value) => {
        if (value.trim() === '') {
            return '* Warning message is required';
        }
        const addressRegex = /^[A-Za-z0-9\s-]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleSchoolAddressChange = (value) => {
        setSchoolAddress(value);
        setSchoolAddressError(validateSchoolAddress(value))
    }

    const validateSchoolAddress = (value) => {
        if (value.trim() === '') {
            return '* School Address is required';
        }
        const addressRegex = /^[A-Za-z0-9\s-]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleSchoolInfoChange = (value) => {
        setSchoolInfo(value);
        setSchoolInfoError(validateSchoolInfo(value))
    }

    const validateSchoolInfo = (value) => {
        if (value.trim() === '') {
            return '* School Info is required';
        }
        const addressRegex = /^[A-Za-z0-9\s-]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleSchoolEmailChange = (value) => {
        setSchoolEmailRecpTitle(value);
        setSchoolEmailRecpTitleError(validateSchoolEmail(value))
    }

    const validateSchoolEmail = (value) => {
        if (value.trim() === '') {
            return '* School Email is required';
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleSocialLink1Change = (value) => {
        setSchoolSocial1(value);
        setSchoolSocial1Error(validateSocialLink1(value))
    }

    const validateSocialLink1 = (value) => {
        if (value.trim() === '') {
            return '* Social Media Link is required';
        }
        const socialLinkPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/;
        if (!socialLinkPattern.test(value)) {
            return 'Invalid social media link';
        }
    }

    const handleSocialLink2Change = (value) => {
        setSchoolSocial2(value);
        setSchoolSocial2Error(validateSocialLink2(value))
    }

    const validateSocialLink2 = (value) => {
        if (value.trim() === '') {
            return '* Social Media Link is required';
        }
        const socialLinkPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/;
        if (!socialLinkPattern.test(value)) {
            return 'Invalid social media link';
        }
    }

    const handleSocialLink3Change = (value) => {
        setSchoolSocial3(value);
        setSchoolSocial3Error(validateSocialLink3(value))
    }

    const validateSocialLink3 = (value) => {
        if (value.trim() === '') {
            return '* Social Media Link is required';
        }
        const socialLinkPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/;
        if (!socialLinkPattern.test(value)) {
            return 'Invalid social media link';
        }
    }

    const handleSchoolPhoneChange = (value) => {
        setSchoolPhone(value);
        setSchoolPhoneError(validateSchoolPhone(value))
    }

    const validateSchoolPhone = (value) => {
        if (value.trim() === '') {
            return '* School Contact is required';
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleSchoolPhotoChange = (value) => {
        setSchoolPhoto(value[0]);
        setSchoolPhotoError(validateSchoolPhoto(value))
    }

    const validateSchoolPhoto = (value) => {
        if (value === '') {
            return '* School Image is required';
        }
        return '';
    };


    // validate the data the is retrived by get By Id
    const validationCheck = () => {
        const schoolNameValidate = validateSchoolName(schoolName);
        const schoolPhoneValidate = validateSchoolPhone(schoolPhone);
        const schoolAddressValidate = validateSchoolAddress(schoolAddress);
        const schoolInfoValidate = validateSchoolInfo(schoolInfo);
        const schoolEmailRecpTitleValidate = validateSchoolEmail(schoolEmailRecpTitle);
        const schoolSocial1Validate = validateSocialLink1(schoolSocial1);
        const schoolSocial2Validate = validateSocialLink2(schoolSocial2);
        const schoolSocial3Validate = validateSocialLink3(schoolSocial3);
        const schoolWarningValidate = validateWarningText(schoolWarning);
        const schoolPhotoValidate = validateSchoolPhoto(schoolPhoto);

        if (schoolNameValidate || schoolPhoneValidate || schoolAddressValidate || schoolInfoValidate || schoolEmailRecpTitleValidate || schoolSocial1Validate || schoolSocial2Validate || schoolSocial3Validate || schoolWarningValidate || schoolPhotoValidate) {
            setSchoolNameError(schoolNameValidate);
            setSchoolPhoneError(schoolPhoneValidate);
            setSchoolAddressError(schoolAddressValidate);
            setSchoolInfoError(schoolInfoValidate);
            setSchoolEmailRecpTitleError(schoolEmailRecpTitleValidate);
            setSchoolSocial1Error(schoolSocial1Validate);
            setSchoolSocial2Error(schoolSocial2Validate);
            setSchoolSocial3Error(schoolSocial3Validate);
            setSchoolWarningError(schoolWarningValidate);
            setSchoolPhotoError(schoolPhotoValidate);
            return;
        }

        setSchoolNameError('')
        setSchoolPhoneError('')
        setSchoolAddressError('')
        setSchoolInfoError('')
        setSchoolEmailRecpTitleError('')
        setSchoolSocial1Error('')
        setSchoolSocial2Error('')
        setSchoolSocial3Error('')
        setSchoolWarningError('')
        setSchoolPhotoError('')
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
                    <div className="row p-2 pt-4">
                        <div className="row pb-3">
                            <div className="col-lg-6 col-md-6 col-sm-12 flex-frow-1">
                                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-1">
                                        <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                        <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Settings</a></li>
                                        <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">School Settings</li>
                                    </ol>
                                </nav>
                                <p className='font16 ps-0 fontWeight500'>School Settings</p>
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
                            <div className="overflow-scroll cardradius bg-white p-3">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Name</label>
                                        <input type="text" className={`form-control font14 ${schoolNameError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolName} onChange={(e) => handleSchoolNameChange(e.target.value)} />
                                        <span className='text-danger'>{schoolNameError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Phone</label>
                                        <input type="tel" className={`form-control font14 ${schoolPhoneError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolPhone} onChange={(e) => handleSchoolPhoneChange(e.target.value)} />
                                        <span className='text-danger'>{schoolPhoneError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Address</label>
                                        <textarea type="text" className={`form-control font14 ${schoolAddressError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" rows={3} value={schoolAddress} onChange={(e) => handleSchoolAddressChange(e.target.value)}></textarea>
                                        <span className='text-danger'>{schoolAddressError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Information</label>
                                        <textarea type="text" className={`form-control font14 ${schoolInfoError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" rows={3} value={schoolInfo} onChange={(e) => handleSchoolInfoChange(e.target.value)}></textarea>
                                        <span className='text-danger'>{schoolInfoError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Email Receipt Title</label>
                                        <input type="email" className={`form-control font14 ${schoolEmailRecpTitleError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolEmailRecpTitle} onChange={(e) => handleSchoolEmailChange(e.target.value)} />
                                        <span className='text-danger'>{schoolEmailRecpTitleError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 1</label>
                                        <input type="text" className={`form-control font14 ${schoolSocial1Error ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolSocial1} onChange={(e) => handleSocialLink1Change(e.target.value)} />
                                        <span className='text-danger'>{schoolSocial1Error}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Warning Text</label>
                                        <input type="text" className={`form-control font14 ${schoolWarningError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolWarning} onChange={(e) => handleWarningTextChange(e.target.value)} />
                                        <span className='text-danger'>{schoolWarningError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 3</label>
                                        <input type="text" className={`form-control font14 ${schoolSocial3Error ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolSocial3} onChange={(e) => handleSocialLink3Change(e.target.value)} />
                                        <span className='text-danger'>{schoolSocial3Error}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 2</label>
                                        <input type="text" className={`form-control font14 ${schoolSocial2Error ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolSocial2} onChange={(e) => handleSocialLink2Change(e.target.value)} />
                                        <span className='text-danger'>{schoolSocial2Error}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Update Logo</label>
                                        {/* <input type="text" className={`form-control font14 ${schoolPhotoError ? 'border-1 border-danger' : ''}`} id="exampleFormControlInput1" value={schoolPhoto} onChange={(e) => handleSchoolPhotoChange(e.target.files)} /> */}
                                        <div className="d-flex bg-white">
                                            {schoolPhoto && changeImageType ? (
                                                <input type='text' className={`form-control font14 ${schoolPhotoError ? 'formcontrolErrorImageborder' : 'formcontrolImageborder'}`} id="validationDefault02" value={schoolPhoto.split('/').pop()} readOnly />
                                            ) : (
                                                <input type='file' className={`form-control font14 ${schoolPhotoError ? 'formcontrolErrorImageborder' : 'formcontrolImageborder'}`} accept="image/png, image/jpg, image/svg, image/jpeg" id="validationDefault02" onChange={(e) => handleSchoolPhotoChange(e.target.files)} />
                                            )}
                                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                                    {changeImageType ? 'Edit' : 'View'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className='text-danger'>{schoolPhotoError}</span>
                                    </div>
                                </div>
                                <div className="row p-5">
                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                        <button className='btn addCategoryButtons font16 text-white' type='button' onClick={UpdateSchoolSettingFun}>Update Settings</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6 text-start">
                                        <button className='btn cancelButtons font16'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </Container>
        </>
    )
}

export default SchoolSetting




