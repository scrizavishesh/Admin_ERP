import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { AddNewVehicleApi, getAllRouteApi, getDriverDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
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
`;

const AddVehicle = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const [vehicleNumber, setVehicleNumber] = useState('')
    const [vehicleModel, setVehicleModel] = useState('')
    const [chassisNumber, setChassisNumber] = useState('')
    const [assignDriver, setAssignDriver] = useState('')
    const [seatCapacity, setSeatCapacity] = useState('')
    const [route, setRoute] = useState('')

    const [vehicleNumberError, setVehicleNumberError] = useState('')
    const [vehicleModelError, setVehicleModelError] = useState('')
    const [chassisNumberError, setChassisNumberError] = useState('')
    const [assignDriverError, setAssignDriverError] = useState('')
    const [seatCapacityError, setSeatCapacityError] = useState('')
    const [routeError, setRouteError] = useState('')

    const [allRouteData, setAllRouteData] = useState([]);
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        getAllRouteData();
        getAllDriverData();
    }, [token])

    const getAllRouteData = async () => {
        setloaderState(true)
        try {
            const searchKey = '';
            const pageNo = '';
            const pageSize = '';
            var response = await getAllRouteApi(searchKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllRouteData(response?.data?.routes);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllDriverData = async () => {
        setloaderState(true)
        try {
            const searchKey = '';
            const pageNo = '';
            const pageSize = '';
            var response = await getDriverDataApi(searchKey, pageNo, pageSize);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setDriverData(response?.data?.drivers);
                    toast.success(response.data.message);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch(error) { 
            toast.error(error);
            setloaderState(false)
        }
    }

    const handleVehicleNum = (value) => {
        setVehicleNumber(value)
        setVehicleNumberError(validateNum(value))
    }

    const handleVehicleModel = (value) => {
        setVehicleModel(value)
        setVehicleModelError(validateModel(value))
    }

    const handleChassisNum = (value) => {
        setChassisNumber(value)
        setChassisNumberError(validateChassisNum(value))
    }

    const handleSeatCapacity = (value) => {
        setSeatCapacity(value)
        setSeatCapacityError(validateSeat(value))
    }

    const vehicleModelRegex = /^[A-Za-z0-9 .\-_/]+$/;
    const vehicleNumRegex = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/; //MP 09 AB 9875
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

    const validateSeat = (value) => {
        if (!value.trim()) {
            return '*Chassis number is required';
        } else if (!seatRegex.test(value)) {
            return 'Invalid characters in Seat Capacity !!';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        const vehicleNumberError = validateNum(vehicleNumber);
        if (vehicleNumberError) {
            setVehicleNumberError(vehicleNumberError);
            isValid = false;
        } else {
            setVehicleNumberError('');
        }

        const vehicleModelError = validateModel(vehicleModel);
        if (vehicleModelError) {
            setVehicleModelError(vehicleModelError);
            isValid = false;
        } else {
            setVehicleModelError('');
        }

        const vehicleChassisNumberError = validateChassisNum(chassisNumber);
        if (vehicleChassisNumberError) {
            setChassisNumberError(vehicleChassisNumberError);
            isValid = false;
        } else {
            setChassisNumberError('');
        }

        if (!seatCapacity) {
            setSeatCapacityError('* This field is required');
            isValid = false;
        } else if (!seatRegex.test(seatCapacity)) {
            setSeatCapacityError('Invalid characters in Seat Capacity !!');
            isValid = false;
        } else {
            setSeatCapacityError('');
        }

        return isValid;
    };

    const AddNewVehicle = async () => {
        if (validateFields()) {
            try {
                setloaderState(true)
                const formData = new FormData();
                formData.append('vehicleNo', vehicleNumber),
                    formData.append('vehicleModel', vehicleModel),
                    formData.append('chassisNo', chassisNumber),
                    formData.append('driverId', assignDriver),
                    formData.append('totalSeat', seatCapacity),
                    formData.append('routeId', route)

                var response = await AddNewVehicleApi(formData);
                console.log(response, 'add vehicle');
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        setloaderState(false)
                        toast.success(response?.data?.message)
                        setTimeout(() => {
                            navigate('/vehicle');
                        }, 1000);
                    }
                    else{
                        toast.error(response?.data?.message, 'else 1');
                        setloaderState(false)
                    }
                }
                else{
                    toast.error(response?.data?.message, 'else 2');
                    setloaderState(false)
                }
            }
            catch(error) { 
                toast.error(error);
                console.log(eror, 'catch error')
                setloaderState(false)
            }
        }
        else{
            toast.error('Please Validate All Fields Correctly')
        }
    }

    const handleCancelBtn = async () => {
        navigate('/vehicle')
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
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Vehicle</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Add Vehicle Form</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form className="row g-3">
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Vehicle Number*</label>
                                        <input type="text" className={`form-control font14 ${vehicleNumberError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Vehicle Number" onChange={(e) => handleVehicleNum(e.target.value)} />
                                        <span className='text-danger'>{vehicleNumberError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Vehicle Model*</label>
                                        <input type="text" className={`form-control font14 ${vehicleModelError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Vehicle Model" onChange={(e) => handleVehicleModel(e.target.value)} />
                                        <span className='text-danger'>{vehicleModelError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Chassis Number*</label>
                                        <input type="text" className={`form-control font14 ${chassisNumberError ? 'border-1 border-danger' : ''}`} maxLength='17' id="validationDefault01" placeholder="Enter Chassis Number" onChange={(e) => handleChassisNum(e.target.value)} />
                                        <span className='text-danger'>{chassisNumberError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Assign driver*</label>
                                        {/* <input type="text" className={`form-control font14 ${ assignDriverError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Select Driver" onChange={(e) => handleDriver(e.target.value)}/> */}
                                        <select type="select" className={`form-select font14 ${assignDriverError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Select Driver" onChange={(e) => { setAssignDriver(e.target.value), setAssignDriverError('') }}>
                                            <option value=''>-- Select Driver --</option>
                                            {driverData?.map(option => (
                                                <option key={option.driverId} value={option.driverId}>
                                                    {option.driverName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{assignDriverError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Seat Capacity*</label>
                                        <input type="text" className={`form-control font14 ${seatCapacityError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Seat Capacity" onChange={(e) => handleSeatCapacity(e.target.value)} />
                                        <span className='text-danger'>{seatCapacityError}</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Route*</label>
                                        <select type="select" className={`form-select font14 ${routeError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" onChange={(e) => { setRoute(e.target.value), setRouteError('') }}>
                                            <option value=''>-- Select Route --</option>
                                            {allRouteData?.map(option => (
                                                <option key={option.routeId} value={option.routeId}>
                                                    {option.routeName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{routeError}</span>
                                    </div>
                                </form>
                                <div className="row p-5">
                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                        <button className='btn AddBtnn font16 text-white' onClick={AddNewVehicle}>Add Vehicle</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6 text-start">
                                        <button className='btn CancelBtnn font16' onClick={handleCancelBtn}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default AddVehicle