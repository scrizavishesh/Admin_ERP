import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { deleteDriverApi, getDriverCSVDataApi, getDriverDataApi, getDriverDataByIdApi, updateDriverDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';
// import { CSVLink } from 'react-csv';

const Container = styled.div`

    height: 92vh;

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

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

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        line-height: 22px;
        color: var(--greyInputTextColor) !important;
    }

    .textVerticalCenter{
        line-height: 22px;
    }
    
    .form-check-input{
        width: 18px;
        height: 18px;
    }

    .formcontrolinput{
        border-radius: 0px !important;
    }

    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

const Driver = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [driverData, setDriverData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')

    // const [csvData, setCSVData] = useState([])

    const [EditWarning, setEditWarning] = useState(true);
    const [DeleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const [getByIdDriverName, setgetByIdDriverName] = useState('');
    const [getByIdDriverAddress, setgetByIdDriverAddress] = useState('');
    const [getByIdDriverPhone, setgetByIdDriverPhone] = useState('');
    const [getByIdDriverEmail, setgetByIdDriverEmail] = useState('');
    const [OriginalDriverIdDataEmail, setOriginalDriverIdDataEmail] = useState('');

    const [getByIdDriverGender, setgetByIdDriverGender] = useState('');
    const [getByIdDriverImage, setgetByIdDriverImage] = useState('');

    const [getByIdDriverNameError, setgetByIdDriverNameError] = useState('');
    const [getByIdDriverAddressError, setgetByIdDriverAddressError] = useState('');
    const [getByIdDriverPhoneError, setgetByIdDriverPhoneError] = useState('');
    const [getByIdDriverEmailError, setgetByIdDriverEmailError] = useState('');
    const [getByIdDriverGenderError, setgetByIdDriverGenderError] = useState('');
    const [getByIdDriverImageError, setgetByIdDriverImageError] = useState('');

    const [driverIDD, setDriverIDD] = useState('')
    const [delDriverIDD, setDelDriverIDD] = useState('')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Pagination

    useEffect(() => {
        getAllDriverData();

        if(getByIdDriverGender){
            validateFields();
        }

    }, [token, pageNo, getByIdDriverGender])

    const getAllDriverData = async () => {
        try {
            setloaderState(true);
            var response = await getDriverDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setDriverData(response?.data?.drivers);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    toast.success(response.data.message);
                    setEditWarning(true);
                    setDeleteWarning(true);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch { }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handleCSVFile = async () => {
        try {
            var response = await getDriverCSVDataApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch { }
    }

    const DeleteBtnClicked = (id) => {
        setDelDriverIDD(id)
    }

    const DeleteDriverDataById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteDriverApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setDeleteWarning(!DeleteWarning)
                        toast.success(response?.data?.message)
                    }
                }
                else {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
            }
        }
    }


    const UpdateDriverDataById = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();

                formData.append("driverName", getByIdDriverName)

                if (getByIdDriverEmail !== OriginalDriverIdDataEmail) {
                    formData.append("driverEmail", getByIdDriverEmail)
                }

                formData.append("driverAddress", getByIdDriverAddress)
                formData.append("phoneNo", getByIdDriverPhone)
                formData.append("gender", getByIdDriverGender)

                var response = await updateDriverDataApi(driverIDD, formData);

                if (response?.status === 200) {
                    console.log('200')
                    console.log(response)
                    if (response.data.status === 'success') {
                        console.log('success')
                        setEditWarning(!EditWarning);
                        toast.success(response?.data?.message)
                    }
                    else {
                        console.log('fail')
                    }
                } else {
                    toast.error(response?.error);
                }
            } catch (error) {
                console.error('Error during update:', error);
            }
        }
        else{
            toast.error('Please Validate All Fields Correctly')
        }
    };

    const getDriverDataById = async (id) => {
        try {
            setDriverIDD(id);
            var response = await getDriverDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setgetByIdDriverName(response?.data?.driver?.driverName);
                    setgetByIdDriverAddress(response?.data?.driver?.driverAddress);
                    setgetByIdDriverPhone(response?.data?.driver?.phoneNumber);
                    setgetByIdDriverEmail(response?.data?.driver?.driverEmail);
                    setOriginalDriverIdDataEmail(response?.data?.driver?.driverEmail);
                    setgetByIdDriverGender(response?.data?.driver?.gender);
                    setgetByIdDriverImage(response?.data?.driver?.driverImage);
                    toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const validateFields = () => {
        let isValid = true;

        const getByIdDriverNameErrorNew = validateDriverName(getByIdDriverName)
        if (getByIdDriverNameErrorNew) {
            setgetByIdDriverNameError(getByIdDriverNameErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverNameError('');
        }

        const driverEmailErrorNew = validateDriverEmail(getByIdDriverEmail)
        if (driverEmailErrorNew) {
            setgetByIdDriverEmailError(driverEmailErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverEmailError('');
        }

        const driverAddressErrorNew = validateDriverAddress(getByIdDriverAddress)
        if (driverAddressErrorNew) {
            setgetByIdDriverAddressError(driverAddressErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverAddressError('');
        }

        const driverPhoneErrorNew = validateDriverPhone(getByIdDriverPhone)
        if (driverPhoneErrorNew) {
            setgetByIdDriverPhoneError(driverPhoneErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverPhoneError('');
        }

        const driverGenderErrorNew = validateDriverGender(getByIdDriverGender)
        if (driverGenderErrorNew) {
            setgetByIdDriverGenderError(driverGenderErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverGenderError('');
        }

        const driverImageErrorNew = validateDriverImage(getByIdDriverImage)
        if (driverImageErrorNew) {
            setgetByIdDriverImageError(driverImageErrorNew);
            isValid = false;
        } else {
            setgetByIdDriverImageError('');
        }

        return isValid;
    };


    const handleDriverNameChange = (value) => {
        setgetByIdDriverName(value);
        setgetByIdDriverNameError(validateDriverName(value))
    }

    const validateDriverName = (value) => {
        if (value.trim() === '') {
            return '* Driver Name is required';
        }
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleDriverEmailChange = (value) => {
        setgetByIdDriverEmail(value);
        setgetByIdDriverEmailError(validateDriverEmail(value))
    }

    const validateDriverEmail = (value) => {
        if (value.trim() === '') {
            return '* Driver Email is required';
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleDriverAddressChange = (value) => {
        setgetByIdDriverAddress(value);
        setgetByIdDriverAddressError(validateDriverAddress(value))
    }

    const validateDriverAddress = (value) => {
        if (value.trim() === '') {
            return '* Driver Address is required';
        }
        const addressRegex = /^[A-Za-z0-9\s]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleDriverPhoneChange = (value) => {
        setgetByIdDriverPhone(value);
        setgetByIdDriverPhoneError(validateDriverPhone(value))
    }

    const validateDriverPhone = (value) => {
        if (value.trim() === '') {
            return '* Driver Phone is required';
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleDriverGenderChange = (value) => {
        setgetByIdDriverGender(value);
        setgetByIdDriverGenderError(validateDriverGender(value))
    }

    const validateDriverGender = (value) => {
        if (!value || value == '') {
            return '* Gender is required';
        }
        return '';
    };

    const handleDriverImageChange = (value) => {
        setgetByIdDriverImage(value[0]);
        setgetByIdDriverImageError(validateDriverImage(value[0]))
    }

    const validateDriverImage = (value) => {
        if (!value) {
            return '* Photo is required';
        }
        else if (value.size < 10240 || value.size > 204800) {
            return '* File size must be between 10 KB to 200 KB';
        }
        return '';
    };
    



    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Driver</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Driver List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" onClick={handleCSVFile}>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to CSV</span>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to PDF</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                    <div className="row gap-md-0 gap-sm-3">
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllDriverData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addDriver'><span className='font14 textVerticalCenter'>+ ADD Driver</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3 pe-0">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th><h2>#</h2></th>
                                        <th><h2>Name</h2></th>
                                        <th><h2>Address</h2></th>
                                        <th><h2>Phone</h2></th>
                                        <th><h2>Email</h2></th>
                                        <th><h2>Action</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driverData.map((item, index) => (
                                        <tr key={item.id} className='my-bg-color align-middle'>
                                            <th className='greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.driverName}</h3></td>
                                            <td className='greyText'><h3>{item.driverAddress}</h3></td>
                                            <td className='greyText'><h3>{item.phoneNumber}</h3></td>
                                            <td className='greyText'><h3>{item.driverEmail}</h3></td>
                                            <td>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getDriverDataById(item.driverId)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.driverId)}>
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="d-flex">
                                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                                <div className="ms-auto">
                                    <ReactPaginate
                                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                        breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                        onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />


                {/* *********************************************************************************************************************************************************************************************************************** */}
                {/* *********************************************************************************************************************************************************************************************************************** */}


                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header border-bottom border-2 p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="staticBackdropLabel">Driver Edit</h2>
                    </div>
                    <div className="offcanvas-body p-0">
                        <div>
                            {EditWarning
                                ?
                                <>
                                    <div>
                                        {/* <p className='modalLightBorder orangeText p-2'>{getByIdDriverName}</p> */}
                                        <div className="p-3">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Driver Name</label>
                                                    <input type="text" className={`form-control borderRadius5 p-2 formcontrolinput font14 ${getByIdDriverNameError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getByIdDriverName} onChange={(e) => handleDriverNameChange(e.target.value)} />
                                                    <span className='text-danger'>{getByIdDriverNameError}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Driver Email</label>
                                                    <input type="mail" className={`form-control borderRadius5 p-2 formcontrolinput font14 ${getByIdDriverEmailError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getByIdDriverEmail} onChange={(e) => handleDriverEmailChange(e.target.value)} />
                                                    <span className='text-danger'>{getByIdDriverEmailError}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Driver Address</label>
                                                    <input type="text" className={`form-control borderRadius5 p-2 formcontrolinput font14 ${getByIdDriverAddressError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getByIdDriverAddress} onChange={(e) => handleDriverAddressChange(e.target.value)} />
                                                    <span className='text-danger'>{getByIdDriverAddressError}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Phone Number</label>
                                                    <input type="tel" className={`form-control borderRadius5 p-2 formcontrolinput font14 ${getByIdDriverPhoneError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getByIdDriverPhone} onChange={(e) => handleDriverPhoneChange(e.target.value)} />
                                                    <span className='text-danger'>{getByIdDriverPhoneError}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Gender</label>
                                                    <select className={`form-select borderRadius5 font14 ${getByIdDriverGenderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={getByIdDriverGender} onChange={(e) => handleDriverGenderChange(e.target.value)}>
                                                        <option>----- Select Gender -----</option>
                                                        <option value='Male'>Male</option>
                                                        <option value='Female'>Female</option>
                                                    </select>
                                                    <span className='text-danger'>{getByIdDriverGenderError}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Driver Image</label>
                                                    <input type="text" className={`form-control borderRadius5 p-2 formcontrolinput font14 ${getByIdDriverImageError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getByIdDriverImage.split('/').pop()} onChange={(e) => handleDriverImageChange(e.target.files)} />
                                                    <span className='text-danger'>{getByIdDriverImageError}</span>
                                                </div>
                                            </form>
                                            <p className='text-center p-3'>
                                                <button className='btn addButtons text-white' onClick={UpdateDriverDataById}>Update Driver</button>
                                                <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>Cancel</button>
                                            </p>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <p className='modalLightBorder p-2 mb-0'>Driver List</p>
                                        <div className="mt-3  ">
                                            <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                            <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Updated</p>
                                                <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}


                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title" id="staticBackdropLabel">Packages</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        <div>
                            {DeleteWarning
                                ?
                                <>
                                    <div className=''>
                                        <p className='modalLightBorder p-2'>Driver</p>
                                        <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                        <p className='text-center warningHeading'>Are you Sure?</p>
                                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                        <p className='text-center p-3'>
                                            <button className='btn deleteButtons text-white' onClick={() => DeleteDriverDataById(delDriverIDD)}>Delete</button>
                                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>Cancel</button>
                                        </p>
                                    </div>
                                </>
                                :
                                <>
                                    <div >
                                        <p className='border-bottom p-3'>Driver</p>
                                        <div className="">
                                            <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                            <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Deleted</p>
                                                <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}




            </Container>
        </>
    )
}

export default Driver




