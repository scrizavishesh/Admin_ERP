import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { deleteVehicleApi, getAllRouteApi, getDriverDataApi, getVehicleDataApi, getVehicleDataByIdApi, updateVehicleDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

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


    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

`;

const Vehicle = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [vehicleData, setVehicleData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Pagination

    // Warnings
    const [editWarning, setEditWarning] = useState(true);
    const [DeleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    // Refresh states
    const [refreshUpdate, setRefreshUpdate] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);
    const [refreshDelete, setRefreshDelete] = useState(false);

    // Vehicle data fields
    const [originalVehicleIdNumber, setOriginalVehicleIdNumber] = useState('');
    const [vehicleIdNumber, setVehicleIdNumber] = useState('');
    const [vehicleIdModel, setVehicleIdModel] = useState('');
    const [vehicleIdChassisNumber, setVehicleIdChassisNumber] = useState('');
    const [vehicleIdDriver, setVehicleIdDriver] = useState(0);
    const [vehicleIdSeatCapacity, setVehicleIdSeatCapacity] = useState('');
    const [vehicleIdRoute, setVehicleIdRoute] = useState('');

    // Error messages
    const [vehicleIdNumberError, setVehicleIdNumberError] = useState('');
    const [vehicleIdModelError, setVehicleIdModelError] = useState('');
    const [vehicleIdChassisNumberError, setVehicleIdChassisNumberError] = useState('');
    const [vehicleIdDriverError, setVehicleIdDriverError] = useState('');
    const [vehicleIdSeatCapacityError, setVehicleIdSeatCapacityError] = useState('');
    const [vehicleIdRouteError, setVehicleIdRouteError] = useState('');

    const [vehicleId, setVehicleId] = useState('');
    const [delVehicleId, setDelVehicleId] = useState('');

    const [allRouteData, setAllRouteData] = useState([]);
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        getAllVehicleData();
        getAllDriverData();
        getAllRouteData();
    }, [token, currentPage, refreshDelete, refreshUpdate, refreshPage, pageNo]);


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getAllVehicleData = async () => {
        setloaderState(true);
        try {
            const response = await getVehicleDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setloaderState(false);
                setVehicleData(response?.data?.vehicles);
                // setTotalItems(10);
                toast.success(response.data.message);
            } else {
                console.log(response?.data?.message);
            }
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
        }
    };

    const getAllRouteData = async () => {
        try {
            setloaderState(true);
            const response = await getAllRouteApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setloaderState(false);
                setAllRouteData(response?.data?.routes);
                toast.success(response?.data?.message);
            } else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error fetching route data:', error);
        }
    };

    const getAllDriverData = async () => {
        try {
            setloaderState(true);
            const searchKey='';
            const pageNo='';
            const size='';
            const response = await getDriverDataApi(searchKey, pageNo, size);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setDriverData(response?.data?.drivers);
                toast.success(response.data.message);
                setloaderState(false);
            } else {
                toast.error(response?.data?.message);
                setloaderState(false);
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error fetching driver data:', error);
        }
    };

    const DeleteBtnClicked = (id) => {
        setDelVehicleId(id);
    };

    const PageRefreshOnDelete = () => {
        setDeleteWarning(!deleteWarning);
        setRefreshDelete(!refreshDelete);
    };

    const DeleteVehicleDataById = async (id) => {
        if (isChecked) {
            try {
                const response = await deleteVehicleApi(id);
                if (response?.status === 200 && response.data.status === 'success') {
                    setDeleteWarning(!deleteWarning);
                    toast.success(response?.data?.message);
                } else {
                    toast.error(response?.error);
                }
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        }
    };

    const getVehicleDataById = async (id) => {
        try {
            setVehicleId(id);
            const response = await getVehicleDataByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const vehicle = response?.data?.vehicles;
                setVehicleIdNumber(vehicle?.vehicleNumber);
                setOriginalVehicleIdNumber(vehicle?.vehicleNumber);
                setVehicleIdModel(vehicle?.vehicleModel);
                setVehicleIdChassisNumber(vehicle?.chassisNumber);
                setVehicleIdDriver(vehicle?.driver?.driverId);
                setVehicleIdSeatCapacity(vehicle?.seatCapacity);
                setVehicleIdRoute(vehicle?.routeClass?.routeId);
                toast.success(response?.data?.message);
            } else {
                console.log(response?.data?.message);
            }
        } catch (error) {
            console.error('Error fetching vehicle data by id:', error);
        }
    };

    const updateVehicleDataById = async () => {
        if (validateEditFields()) {
            try {
                const formData = new FormData();
                if (vehicleIdNumber !== originalVehicleIdNumber) {
                    formData.append("vehicleNo", vehicleIdNumber);
                }
                formData.append("driverId", vehicleIdDriver);
                formData.append("vehicleModel", vehicleIdModel);
                formData.append("chassisNo", vehicleIdChassisNumber);
                formData.append("totalSeat", vehicleIdSeatCapacity);
                formData.append("route", vehicleIdRoute);

                const response = await updateVehicleDataApi(vehicleId, formData);
                if (response?.status === 200 && response.data.status === 'success') {
                    setEditWarning(!editWarning);
                    toast.success(response?.data?.message);
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.error('Error during update:', error);
            }
        }
    };

    const pageRefreshOnAdd = () => {
        setEditWarning(!editWarning);
        setRefreshUpdate(!refreshUpdate);
    };

    const pageRefresh = () => {
        setRefreshPage(!refreshPage);
    };

    // Validation

    const vehicleModelRegex = /^[A-Za-z0-9 .\-_/]+$/;
    const vehicleNumRegex = /^[A-Z0-9- ]{1,10}$/;
    const seatRegex = /^(100|[1-9][0-9])$/;
    const chassisNumRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

    const validateModel = (value) => {
        if (!value.trim()) {
            return '*Model is required';
        } else if (!vehicleModelRegex.test(value)) {
            return 'Invalid characters in Vehicle Model !!';
        }
        return '';
    };

    const validateNum = (value) => {
        if (!value.trim()) {
            return '*Number is required';
        } else if (!vehicleNumRegex.test(value)) {
            return 'Invalid characters in Vehicle Number !!';
        }
        return '';
    };

    const validateChassisNum = (value) => {
        if (!value.trim()) {
            return '*Chassis number is required';
        } else if (!chassisNumRegex.test(value)) {
            return 'Invalid characters in Chassis Number !!';
        }
        return '';
    };

    const validateEditFields = () => {
        let isValid = true;

        const vehicleNumberError = validateNum(vehicleIdNumber);
        if (vehicleNumberError) {
            setVehicleIdNumberError(vehicleNumberError);
            isValid = false;
        } else {
            setVehicleIdNumberError('');
        }

        const vehicleModelError = validateModel(vehicleIdModel);
        if (vehicleModelError) {
            setVehicleIdModelError(vehicleModelError);
            isValid = false;
        } else {
            setVehicleIdModelError('');
        }

        const vehicleChassisNumberError = validateChassisNum(vehicleIdChassisNumber);
        if (vehicleChassisNumberError) {
            setVehicleIdChassisNumberError(vehicleChassisNumberError);
            isValid = false;
        } else {
            setVehicleIdChassisNumberError('');
        }

        if (!vehicleIdDriver) {
            setVehicleIdDriverError('* This field is required');
            isValid = false;
        } else {
            setVehicleIdDriverError('');
        }

        if (!vehicleIdRoute) {
            setVehicleIdRouteError('* This field is required');
            isValid = false;
        } else {
            setVehicleIdRouteError('');
        }

        if (!vehicleIdSeatCapacity) {
            setVehicleIdSeatCapacityError('* This field is required');
            isValid = false;
        } else if (!seatRegex.test(vehicleIdSeatCapacity)) {
            setVehicleIdSeatCapacityError('Invalid characters in Seat Capacity !!');
            isValid = false;
        } else {
            setVehicleIdSeatCapacityError('');
        }

        return isValid;
    };


    // ***************************************     Edit Data Validation    *****************************************



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
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Vehicle</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Vehicle List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
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
                                                <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllVehicleData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addVehicle'><span className='font14 textVerticalCenter'>+ ADD Vehicle</span></Link>
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
                                        <th><span className='font14'>#</span></th>
                                        <th><span className='font14'>Vehicle Model</span></th>
                                        <th><span className='font14'>Vehicle Info</span></th>
                                        <th><span className='font14'>Driver Name</span></th>
                                        <th><span className='font14'>Driver Contact</span></th>
                                        <th><span className='font14'>Capacity</span></th>
                                        <th><span className='font14'>Route</span></th>
                                        <th><span className='font14'>Action</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicleData.map((item, index) => (
                                        <tr key={item.id} className='my-bg-color align-middle'>
                                            <th className='greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.vehicleModel}</h3></td>
                                            <td className='greyText'><h3>{item.vehicleNumber}</h3></td>
                                            <td className='greyText'><h3>{item.driver?.driverName}</h3></td>
                                            <td className='greyText'><h3>{item.driver?.phoneNumber}</h3></td>
                                            <td className='greyText'><h3>{item.seatCapacity}</h3></td>
                                            <td className='greyText'><h3>{item.routeClass.routeName}</h3></td>
                                            <td>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getVehicleDataById(item.vehicleId)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.vehicleId)}>
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
                    <Toaster />


                    {/* *********************************************************************************************************************************************************************************************************************** */}
                    {/* *********************************************************************************************************************************************************************************************************************** */}


                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header border-bottom border-2 p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <h2 className="offcanvas-title" id="staticBackdropLabel">Vehicle Edit</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <div>
                                {editWarning ? (
                                    <div className="p-3">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="vehicleNumber" className="form-label greyText font14">Vehicle Number</label>
                                                <input
                                                    type="text"
                                                    className={`form-control p-2 formcontrolinput font14 ${vehicleIdNumberError ? 'border-1 border-danger' : ''}`}
                                                    id="vehicleNumber"
                                                    value={vehicleIdNumber}
                                                    onChange={(e) => {
                                                        setVehicleIdNumber(e.target.value);
                                                        setVehicleIdNumberError(validateNum(e.target.value));
                                                    }}
                                                />
                                                <span className="text-danger">{vehicleIdNumberError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="vehicleModel" className="form-label greyText font14">Vehicle Model</label>
                                                <input
                                                    type="text"
                                                    className={`form-control p-2 formcontrolinput font14 ${vehicleIdModelError ? 'border-1 border-danger' : ''}`}
                                                    id="vehicleModel"
                                                    value={vehicleIdModel}
                                                    onChange={(e) => {
                                                        setVehicleIdModel(e.target.value);
                                                        setVehicleIdModelError(validateModel(e.target.value));
                                                    }}
                                                />
                                                <span className="text-danger">{vehicleIdModelError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="chassisNumber" className="form-label greyText font14">Chassis Number</label>
                                                <input
                                                    type="text"
                                                    className={`form-control p-2 formcontrolinput font14 ${vehicleIdChassisNumberError ? 'border-1 border-danger' : ''}`}
                                                    id="chassisNumber"
                                                    value={vehicleIdChassisNumber}
                                                    onChange={(e) => {
                                                        setVehicleIdChassisNumber(e.target.value);
                                                        setVehicleIdChassisNumberError(validateChassisNum(e.target.value));
                                                    }}
                                                />
                                                <span className="text-danger">{vehicleIdChassisNumberError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="driverId" className="form-label greyText font14">Driver Id</label>
                                                <select
                                                    className={`form-select font14 ${vehicleIdDriverError ? 'border-1 border-danger' : ''}`}
                                                    id="driverId"
                                                    value={vehicleIdDriver}
                                                    onChange={(e) => setVehicleIdDriver(e.target.value)}
                                                >
                                                    <option value="">-- Select Driver --</option>
                                                    {driverData?.map(option => (
                                                        <option key={option.driverId} value={option.driverId}>
                                                            {option.driverName}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="text-danger">{vehicleIdDriverError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="seatCapacity" className="form-label greyText font14">Total Seat</label>
                                                <input
                                                    type="text"
                                                    className={`form-control p-2 formcontrolinput font14 ${vehicleIdSeatCapacityError ? 'border-1 border-danger' : ''}`}
                                                    id="seatCapacity"
                                                    value={vehicleIdSeatCapacity}
                                                    onChange={(e) => setVehicleIdSeatCapacity(e.target.value)}
                                                />
                                                <span className="text-danger">{vehicleIdSeatCapacityError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="route" className="form-label greyText font14">Route</label>
                                                <select
                                                    className={`form-select font14 ${vehicleIdRouteError ? 'border-1 border-danger' : ''}`}
                                                    id="route"
                                                    value={vehicleIdRoute}
                                                    onChange={(e) => setVehicleIdRoute(e.target.value)}
                                                >
                                                    <option value="">-- Select Route --</option>
                                                    {allRouteData?.map(option => (
                                                        <option key={option.routeId} value={option.routeId}>
                                                            {option.routeName}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="text-danger">{vehicleIdRouteError}</span>
                                            </div>
                                        </form>
                                        <p className="text-center p-3">
                                            <button className="btn addButtons2 text-white" onClick={updateVehicleDataById}>Update Vehicle</button>
                                            <button className="btn cancelButtons ms-3" data-bs-dismiss="offcanvas" aria-label="Close" onClick={pageRefresh}>Cancel</button>
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="modalLightBorder p-2 mb-0">Vehicle List</p>
                                        <div className="mt-3">
                                            <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                            <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Updated</p>
                                                <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                            </div>
                                            <button className="btn contbtn continueButtons text-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={pageRefreshOnAdd}>Continue</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}




                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header ps-0 modalHighborder p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
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
                                            <p className='modalLightBorder p-2'>Vehicle</p>
                                            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                            <p className='text-center warningHeading'>Are you Sure?</p>
                                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                            <p className='text-center p-3'>
                                                <button className='btn deleteButtons text-white' onClick={() => DeleteVehicleDataById(delVehicleIDD)}>Delete</button>
                                                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                            </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div >
                                            <p className='border-bottom p-3'>Vehicle</p>
                                            <div className="">
                                                <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                                <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                                    <p className='warningHeading'>Successful Deleted</p>
                                                    <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                                </div>
                                                <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnDelete}>Continue</button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>




                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}


<Toaster/>
                </div>
            </Container>
        </>
    )
}

export default Vehicle