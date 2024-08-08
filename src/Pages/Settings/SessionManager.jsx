import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { activeSessionDataApi, addNewSessionApi, deleteSessionApi, getAllSessionDataAPI, getSessionDataByIdAPI, updateSessionApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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

    .activeSession{
        background-color: var(--activebglightgreen);
    }

    .orangeText{
        color: var(--activeOrangeBorder);
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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
    
    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }


`;

const SessionManager = () => {

    const token = localStorage.getItem('token');

    const [AddWarning, setAddWarning] = useState(true);
    const [EditWarning, setEditWarning] = useState(true);
    const [DeleteWarning, setDeleteWarning] = useState(true);

    const [activeSessionData, setActiveSession] = useState();

    const [sessionData, setSessionData] = useState([]);
    const [sessionVal, setSessionVal] = useState();
    const [sessionError, setSessionError] = useState('');

    const [sessionId, setSessionId] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');

    const [startDateEdit, setStartDateEdit] = useState('');
    const [endDateEdit, setEndDateEdit] = useState('');
    const [statusEdit, setStatusEdit] = useState('');

    const [startDateEditError, setStartDateEditError] = useState('');
    const [endDateEditError, setEndDateEditError] = useState('');

    const [sessionEditId, setSessionEditId] = useState('');
    const [DeleteId, setDeleteId] = useState('');
    const [isChecked, setIsChecked] = useState();

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Pagination

    useEffect(() => {
        getAllSession()
    }, [token, pageNo])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setStartDate(formattedDate);
        setStartDateError('')
    };

    const handleEndDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setEndDate(formattedDate);
        setEndDateError('')
    };

    const handleStartDateEditChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setStartDateEdit(formattedDate);
        setStartDateEditError('')
    };

    const handleEndDateEditChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setEndDateEdit(formattedDate);
        setEndDateEditError('')
    };

    const getAllSession = async () => {
        try {
            var response = await getAllSessionDataAPI(pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    console.log(response)
                    setSessionData(response?.data?.sessions);
                    setActiveSession(response?.data?.activeSession?.currentYear)
                    toast.success(response?.data?.message)
                    setAddWarning(true)
                    setEditWarning(true)
                    setDeleteWarning(true)
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
        }
    }

    const getSessionById = async (id) => {
        try {
            setSessionEditId(id);
            var response = await getSessionDataByIdAPI(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStartDateEdit(response?.data?.session?.startDate);
                    setEndDateEdit(response?.data?.session?.endDate);
                    console.log(response?.data?.session?.startDate);
                    console.log(response?.data?.session?.endDate);
                    toast.success(response?.data?.message)
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
        }
    }

    const AddNewSession = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();
                formData.append("startDate", startDate);
                formData.append("endDate", endDate);

                var response = await addNewSessionApi(formData);

                console.log(response)

                if (response?.status === 200) {
                    console.log(response)

                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setAddWarning(!AddWarning)
                    }
                }
                else {
                    console.log(response?.data?.message);
                }
            }
            catch (error) {
                console.log(error, 'error')
            }
        }
    }

    const activeSession = async () => {
        try {
            console.log(sessionId, 'idddd')
            var response = await activeSessionDataApi(sessionId);
            console.log(response, 'active session response')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error, 'error')
        }
    }

    const UpdateSessionById = async () => {
        try {
            const formData = new FormData();
            formData.append('startDate', startDateEdit)
            formData.append('endDate', endDateEdit)

            var response = await updateSessionApi(sessionEditId, formData);
            console.log(response, 'session manager')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    // setSessionData(response?.data?.sessions);
                    setEditWarning(false)
                    toast.success(response?.data?.message)
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
        }
    }

    const validateFields = () => {
        let isValid = true;

        if (!startDate) {
            setStartDateError('* This Field is required');
            isValid = false;
        } else {
            setStartDateError('');
        }

        if (!endDate) {
            setEndDateError('* This Field is required');
            isValid = false;
        } else {
            setEndDateError('');
        }
        return isValid;
    };

    const DeleteSessionById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteSessionApi(id);
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
                console.error('Error during delete:', error);
            }
        }
    }


    return (

        <Container>
            <div className="container-fluid p-4">
                <div className="row pb-3 gap-xl-0 gap-3">
                    <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Settings</a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Session Manager</li>
                            </ol>
                        </nav>
                        <p className='font16 ps-0 fontWeight500'>Session Manager</p>
                    </div>
                    <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                        <div className="row gap-sm-0 gap-3">

                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12 text-end">
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
                            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12 text-end align-self-center">
                                <div className="row gap-md-0 gap-sm-3">
                                    <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                        <form className="d-flex" role="search">
                                            <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                            <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                                        </form>
                                    </div>
                                    <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                        <div className="row">
                                        <button className="btn ps-0 pe-0 addButtons text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#Add_staticBackdrop" aria-controls="Add_staticBackdrop"><span className='font14 textVerticalCenter'>+ Add Session</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="overflow-scroll cardradius bg-white p-3">
                        <p className='activeSession font18 p-2 ps-3 fontWeight500'>Active session - <small className='font18 orangeText fontWeight500'>{activeSessionData}</small></p>
                        <form action="" className="row">
                            <div className="mb-3 mt-3">
                                <label htmlFor="validationDefault02" className="form-label font14">Session*</label>
                                <select className={`form-select font14 ${sessionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => setSessionId(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    {sessionData?.map(option => (
                                        <option key={option.sessionId} value={option.sessionId}>
                                            {option.sessionName}
                                        </option>
                                    ))}
                                </select>
                                <span className='text-danger'>{sessionError}</span>
                            </div>
                            <p className='text-center m-3'><button className='btn addButtons text-white' type='button' onClick={activeSession}>Active</button></p>
                        </form>

                        <table className="table align-middle table-striped">
                            <thead>
                                <tr>
                                    <th><h2>#</h2></th>
                                    <th><h2>Session title</h2></th>
                                    <th><h2>Status</h2></th>
                                    <th className='text-center'><h2>Action</h2></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessionData.map((item, index) => (
                                    <tr key={item.sessionId} className='my-bg-color align-middle'>
                                        <th className='greyText'><h3>{index + 1}</h3></th>
                                        <td className='greyText'><h3>{item.sessionName}</h3></td>
                                        <td className='greyText'>{item.status ? <h3 className='activeText'>Active</h3> : <h3 className='deactiveText'>InActive</h3>}</td>
                                        <td className='text-center'>
                                            <div className="dropdown dropdownbtn">
                                                <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span>Action</span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getSessionById(item.sessionId)}>
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteId(item.sessionId)}>
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


            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Add_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header border-bottom border-2 p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Add Session</h2>
                </div>
                <div className="offcanvas-body p-0">
                    <div>
                        {AddWarning
                            ?
                            <>
                                <div>
                                    <div className="p-3">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="validationDefault02" className="form-label font14">Start Date*</label>
                                                <input className={`form-control font14 ${startDateError ? 'border-1 border-danger' : ''}`} type="date" onChange={(e) => handleStartDateChange(e)} min="1970-04-01" />
                                                <span className='text-danger'>{startDateError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="validationDefault02" className="form-label font14">End Date*</label>
                                                <input className={`form-control font14 ${endDateError ? 'border-1 border-danger' : ''}`} type="date" onChange={(e) => handleEndDateChange(e)} min="1970-04-01" />
                                                <span className='text-danger'>{endDateError}</span>
                                            </div>
                                        </form>
                                        <p className='text-center p-3'>
                                            <button className='btn addButtons text-white' onClick={AddNewSession}>Create</button>
                                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
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
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSession}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <Toaster />
            </div>


            {/* *********************************************************************************************************************************************************************************************************************** */}
            {/* *********************************************************************************************************************************************************************************************************************** */}


            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header border-bottom border-2 p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Session Edit</h2>
                </div>
                <div className="offcanvas-body p-0">
                    {/* <EditSamplePaper/> */}
                    <div>
                        {EditWarning
                            ?
                            <>
                                <div>
                                    <div className="p-3">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="validationDefault02" className="form-label font14">Start Date*</label>
                                                <input className={`form-control font14 ${startDateEditError ? 'border-1 border-danger' : ''}`} type="date" value={startDateEdit} onChange={(e) => handleStartDateEditChange(e)} min="1970-04-01" />
                                                <span className='text-danger'>{startDateEditError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="validationDefault02" className="form-label font14">End Date*</label>
                                                <input className={`form-control font14 ${endDateEditError ? 'border-1 border-danger' : ''}`} type="date" value={endDateEdit} onChange={(e) => handleEndDateEditChange(e)} min="1970-04-01" />
                                                <span className='text-danger'>{endDateEditError}</span>
                                            </div>
                                        </form>
                                        <p className='text-center p-3'>
                                            <button className='btn addButtons text-white' onClick={UpdateSessionById}>Update</button>
                                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
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
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSession}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>


            {/* **********************************************************************************************************************************************************************************/}
            {/* ************************************************************************************************************************************************************************************/}




            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <span className="offcanvas-title" id="staticBackdropLabel">Session</span>
                </div>
                <div className="offcanvas-body p-0">
                    <div>
                        {DeleteWarning
                            ?
                            <>
                                <div className=''>
                                    <p className='modalLightBorder p-2'>Session</p>
                                    <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                    <p className='text-center warningHeading'>Are you Sure?</p>
                                    <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                    <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                    <p className='text-center p-3'>
                                        <button className='btn deleteButtons text-white' onClick={()=> DeleteSessionById(DeleteId)}>Delete</button>
                                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
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
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSession}>Continue</button>
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

    )
}

export default SessionManager