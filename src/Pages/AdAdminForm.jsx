import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RolePermissionGetApi } from '../Utils/Apis'
// import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { StaffPostApi } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';
// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6;  
  }
.main-content-conatainer22{
    background-color: #fff;
    margin: 10px;
    height: fit-content;
    border-radius: 5px;
}

.header-1{
    background-color: var(  --LightGreenHeadingBgColor) !important;
    border-radius: 5px;
    margin-top: 15px;
}
.header-1 h6{
    margin-top: 2px;
}
.input-icon img{
    object-fit: cover;
    width: 18px;
    margin-left: 7px;
    margin-top: 4px;
}
.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none  !important;
}
.form-focus-input:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: 1px solid #ced4da !important;
    outline: none !important;
    box-shadow: none  !important;
}
.form-control:focus {
    border-color: #ced4da !important;
}
.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
}
.my-button11 button:hover{
    background-color: var( --buttonBgColor) !important;
    color: var(  --whiteColor) !important;
}

  /* ########## media query ###########  */
  @media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}
  @media only screen and (max-width: 768px) {
    .for-media-margin{
       padding: 0px 14px 0px 14px  !important;
    }
    .media-margin-top{
        margin-top: 10px;
    }
    .phone-adjust-media{
        margin-left: 15px;
    }
    .photo-adjust-media{
        margin-bottom: 0;
        margin-top: 10px;
    }
}
@media only screen and (max-width: 758px) {
    .gender-adjust-media{
        margin-top: 10px;
        margin-bottom: 0;
    }
    .photo-adjust-media{
        /* margin-bottom: 0; */
        /* margin-top: 7px; */
    }
}
`;

// ## style css area end ####  

const AdAdminForm = () => {

    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)

    const [staffName, setStaffName] = useState()
    const [staffEmail, setStaffEmail] = useState()
    const [staffAddress, setStaffAddress] = useState()
    const [staffPhone, setStaffPhone] = useState()
    const [staffGender, setStaffGender] = useState()
    const [roleId, setRoleId] = useState()
    const [staffImage, setStaffImage] = useState()
    const [roleNameForPage, setRoleNameForPage] = useState()
    console.log('my lowerCase roleName',roleNameForPage)
    const [ExtraField, setExtraField] = useState(false)

    const [rolePermisAllData, setRolePermisAllData] = useState([])
    //   console.log('my image',staffImage)

    //   ---------- validate states start ------------- 

    const [isValidRequired, setIsValidRequired] = useState(false);
    const [isEmailValidRequired, setIsEmailValidRequired] = useState(false);
    const [isAddressValidRequired, setIsAddressValidRequired] = useState(false);
    const [isContactValidRequired, setIsContactValidRequired] = useState(false);
    const [isImageValidRequired, setIsImageValidRequired] = useState(false);

    //   ---------- validate states end ------------- 

    useEffect(() => {
        MyRolPermisGetAllApi()
    }, [])

    const [errors, setErrors] = useState({});
    // ###### validation ##########

    const FuncValidation = () => {
        // for name 
        if (staffName === "" || !staffName) {
            setIsValidRequired(true)
        }
        else {
        }
        // for email 
        if (staffEmail === "" || !staffEmail) {
            setIsEmailValidRequired(true)
        }
        else {
        }
        // for addresss 
        if (staffAddress === "" || !staffAddress) {
            setIsAddressValidRequired(true)
        }
        // for contact 
        if (staffPhone === "" || !staffPhone) {
            setIsContactValidRequired(true)
        }
        // for image file
        if (staffImage === "" || !staffImage) {
            setIsImageValidRequired(true)
        }
        else {
        }

        return errors;
    }
    const handleName = (e2) => {
        setStaffName(e2);
        const nameRegex = /^[A-Za-z]+$/;
        setIsValidRequired(nameRegex.test(e2));
        if (e2 === "") {
            setIsValidRequired(true)
        } else {
            setIsValidRequired(false)
        }
    }

    const handleEmail = (e2) => {
        setStaffEmail(e2);
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        setIsEmailValidRequired(emailRegex.test(e2));
        if (e2 === "") {
            setIsEmailValidRequired(true)
        } else {
            setIsEmailValidRequired(false)
        }
    }
    const handleAddress = (e2) => {
        setStaffAddress(e2);
        const nameRegex = /^[A-Za-z]+$/;
        // const contactRegex = /^\+?(91)?([6-9]{1})([0-9]{9})$/;
        setIsAddressValidRequired(nameRegex.test(e2));
        if (e2 === "") {
            setIsAddressValidRequired(true)
        } else {
            setIsAddressValidRequired(false)
        }
    }
    const handleContact = (e2) => {
        setStaffPhone(e2);
        const contactRegex = /^\+?(91)?([6-9]{1})([0-9]{9})$/;
        setIsContactValidRequired(contactRegex.test(e2));
        if (e2 === "") {
            setIsContactValidRequired(true)
        } else {
            setIsContactValidRequired(false)
        }
    }
    const handleImageFile = (e2) => {
        // console.log('my iamge ',e2)
        setStaffImage(e2);

        const imagetRegex = /^[\w\-. ]+\.(jpg|png)$/;
        setIsImageValidRequired(imagetRegex.test(e2));
        if (e2 === "") {
            setIsImageValidRequired(true)
        } else {
            setIsImageValidRequired(false)
        }
    }
    // ###### validation  end##########


    // post Api 

    const SubcPutDataApi = async () => {
        if (FuncValidation()) {
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
                const response = await StaffPostApi(formData);
                console.log('my staff post api response', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    // localStorage.setItem('ID', roleId)
                    // navigate("/teacher", {state : {id : roleId}})
                    // navigate("/teacher")
                    const cleanRoleName = roleNameForPage.trim()
                    navigate(`/${cleanRoleName}`)
                    setLoader(false)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }


    }


    const handleChange = (event) => {
        const value = event.target.value;
        const [val1, val2] = value.split(',');
        console.log('my val2', val2)
        setRoleId(parseInt(val1));
        setRoleNameForPage(val2.toLowerCase());

        // if(val2 === 'OTHER_STAFF'){
        //     setExtraField(true)
        // }else{
        //     setExtraField(false)
        // }

        // console.log('First Value:', val1);
        // console.log('Second Value:', val2);
    };

    // Role permission Get All Api  from role permission page  
    const MyRolPermisGetAllApi = async () => {
        try {
            const response = await RolePermissionGetApi();
            console.log('My role permission get all data12', response)

            if (response?.status === 200) {
                // toast.success(response?.data?.msg)
                setRolePermisAllData(response?.data?.roles)
            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            {
                loader && (
                    <HashLoader />
                )
            }
            <div className="container-fluid main-body p-3">
                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb ps-2">
                                <li className="breadcrumb-item active font-color heading-14" aria-current="page">Home</li>
                                <li className="breadcrumb-item active font-color heading-14" aria-current="page">Users</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Other Staff</Link></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <h5 className='ms-2 margin-minus22 heading-16 ps-2'>Add Staff Form</h5>

                <div className="main-content-conatainer22 pt-4 ">

                    <div className="row heading-14" style={{ marginTop: '-15px' }}>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3 ps-3 pt-2 for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label text-color-000">Name*</label>
                                <input type="text" className="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" onChange={(e) => handleName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput1" placeholder="Enter Name" />
                            </div>
                            <div className='my-class-for-validation mb-2' >
                                {isValidRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                                        Name is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div className="mb-3 pe-3 pt-2 for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label text-color-000">Email*</label>
                                <input type="email" className="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Email" />
                            </div>
                            <div className='my-class-for-validation mb-2' >
                                {isEmailValidRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                                        Email is required
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="row heading-14 " style={{ marginTop: '' }}>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3 ps-3 pt-2 for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label text-color-000">Address*</label>
                                <input type="text" className="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" onChange={(e) => handleAddress(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput1" placeholder="Enter Address" />
                            </div>
                            <div className='my-class-for-validation mb-2' >
                                {isAddressValidRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                                        Address is required
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                            <label for="exampleFormControlInput1 " className="form-label heading-14 mb-1 text-color-000 phone-adjust-media">Phone*</label>

                            <div className="input-group  mb-3  pe-3  for-media-margin  ">
                                <button className="btn btn-outline-secondary heading-14 text-color-000 dropdown-toggle input-border-color" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Separated link</a></li>
                                </ul>
                                <input type="text" className="form-control form-focus-input heading-14 grey-input-text-color input-border-color" aria-label="Text input with dropdown button" onChange={(e) => handleContact(e.target.value)} placeholder='Enter Phone Number' autocomplete="off" />
                            </div>
                            <div className='my-class-for-validation mb-2' >
                                {isContactValidRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                                        Conatct is required
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>

                    <div className="row heading-14" >
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3  ps-3 pt-2 for-media-margin">
                                <label for="exampleFormControlInput1 " className="form-label heading-14 text-color-000 gender-adjust-media">Gender*</label>
                                <select className="form-select form-control-md form-focus-input heading-14 grey-input-text-color input-border-color" onChange={(e) => setStaffGender(e.target.value)} aria-label="Default select example" style={{ borderRadius: '5px' }} >
                                    <option selected>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6  col-sm-12">
                            <div className="mb-3   pt-2 pe-3 for-media-margin">
                                <label for="exampleFormControlInput1 " className="form-label heading-14 text-color-000 gender-adjust-media">Role Name*</label>
                                <select className="form-select form-control-md form-focus-input heading-14 grey-input-text-color input-border-color" onChange={handleChange} aria-label="Default select example" style={{ borderRadius: '5px' }} >
                                    <option value="" >--Choose--</option>
                                    {
                                        rolePermisAllData.map(item => (
                                            <option value={`${item.roleId}, ${item.roleName}`} >{item.roleName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row heading-14" style={{ marginTop: '-15px' }}>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3 ps-3 p-0 pt-2 for-media-margin">
                                <label for="formFileSm" className="form-label text-color-000 photo-adjust-media">Photo*</label>
                                <input type="file" className="form-control form-control-md form-focus-input heading-14 grey-input-text-color input-border-color" onChange={(e) => handleImageFile(e.target.files[0])} style={{ borderRadius: '5px' }} />
                            </div>
                            <div className='my-class-for-validation mb-2' >
                                {isImageValidRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                                        jpg and png supported
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col--6">
                            {
                                ExtraField && (
                                    <div className="mb-3 pe-3 pt-2 for-media-margin">
                                        <label for="exampleFormControlInput1" className="form-label text-color-000">Select Role</label>
                                        <input type="email" className="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" onChange={(e) => setStaffEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Email" />
                                    </div>
                                )
                            }
                        </div>
                    </div>


                    {/* ####### buttons ######  */}

                    <div className="row ">
                        <div className='my-button11 heading-16 mb-5 mt-3'>
                            <button type="button" className="btn btn-outline-success" onClick={(e) => SubcPutDataApi()}>Add Staff</button>
                            <button type="button" className="btn btn-outline-success">Cancel</button>
                            <Toaster />
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default AdAdminForm
