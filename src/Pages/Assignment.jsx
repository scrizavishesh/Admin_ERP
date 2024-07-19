import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
// import { getAllClassApi, getDownloadAssignmentDataApi, getSearhAssignmentDataApi } from '../Utils/Apis';
import AddAssignment from '../Modals/Assignments/AddAssignment';
import EditAssignment from '../Modals/Assignments/EditAssignment';
import { deleteAssignmentApi, getAllClassApi, getSearhAssignmentDataApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import ProgressBar from "@ramonak/react-progress-bar";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    height: 92vh;
    
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
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

    .ExportBtns{
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
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
    

`;


const Assignment = () => {


    //loader State
    const [loaderState, setloaderState] = useState(false);


    const token = localStorage.getItem('token');
    const [SearchBtn, setSearchBtn] = useState(false);
    const [DeleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);


    const [EditItemId, setEditItemId] = useState('')
    const [DeleteItemId, setDeleteItemId] = useState('')

    const [classNo, setClassNo] = useState('');
    const [classId, setClassId] = useState(0);
    const [sectionId, setSectionId] = useState(0);
    const [subjectId, setSubjectId] = useState(0);
    const [allClassData, setAllClassData] = useState([]);
    const [assignmentStatus, setAssignmentStatus] = useState([]);

    const [allAssignmentData, setAllAssignmentData] = useState([]);

    const [refreshDelete, setRefreshDelete] = useState(false);


    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    // Pagination


    const handleChange = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setClassNo(val1);
        setClassId(val2);
        console.log(val2)
    }


    useEffect(() => {
        getAllClassData();
    }, [token, refreshDelete, allAssignmentData, pageNo]);


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    const PageRefreshOnDelete = () => {
        setDeleteWarning(!DeleteWarning);
        setRefreshDelete(!refreshDelete);
    }


    const getAllAssignment = async () => {
        try {
            var response = await getSearhAssignmentDataApi(classId, sectionId, subjectId, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSearchBtn(true)
                    setAllAssignmentData(response?.data?.assignment);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message)
            }
        }
        catch (e) {
            console.log(e);

        }
    }


    const getAllClassData = async () => {
        try {
            setloaderState(true)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const DeleteAssignmentDataById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteAssignmentApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setDeleteWarning(!DeleteWarning)
                        toast.success(response?.data?.msg)
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

    const cancelSearch = () => {
        setSearchBtn(false)
    }

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
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Assignment</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Assignment</p>
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
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start p-0">
                                            <button className="btn ps-0 pe-0 addCategoryButtons text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#add_staticBackdrop" aria-controls="add_staticBackdrop"><span className='font14 textVerticalCenter'>+ Add Assignment</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                    <select className="form-select font14" aria-label="Default select example" onChange={handleChange}>
                                        <option >--- Choose ---</option>
                                        {allClassData?.map((option, index) => (
                                            <option key={option.classId} value={`${index}, ${option?.classId}`}>
                                                {option.classNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                    <select className="form-select font14" aria-label="Default select example" onChange={(e) => setSectionId(e.target.value)}>
                                        <option >--- Choose ---</option>
                                        {allClassData[classNo]?.section?.map(option => (
                                            <option key={option.classSecId} value={option.classSecId}>
                                                {option.sectionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Subject</label>
                                    <select className="form-select font14" aria-label="Default select example" onChange={(e) => setSubjectId(e.target.value)}>
                                        <option >--- Choose ---</option>
                                        {allClassData[classNo]?.subjects?.map(option => (
                                            <option key={option.subjectId} value={option.subjectId}>
                                                {option.subjectName} {option.subjectId}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn addCategoryButtons text-white' onClick={getAllAssignment}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3' onClick={cancelSearch}>Cancel</button>
                                </p>
                            </form>
                            {SearchBtn
                                ?
                                <>
                                    <div className="row">
                                        <div className="overflow-scroll">
                                            {allAssignmentData && allAssignmentData.length === 0 ? (
                                                <div className="d-flex justify-content-center p-5">
                                                    <img src="./images/search.svg" alt="" className='img-fluid' />
                                                </div>
                                            ) : (
                                                <>
                                                    <table className="table align-middle table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className='tableHeading text-center'><span className='font14'>#</span></th>
                                                                <th className='tableHeading '><span className='font14'>Title</span></th>
                                                                <th className='tableHeading '><span className='font14'>Teacher</span></th>
                                                                <th className='tableHeading '><span className='font14'>Details</span></th>
                                                                <th className='tableHeading '><span className='font14'>Deadline</span></th>
                                                                <th className='tableHeading '><span className='font14'>Submission</span></th>
                                                                <th className='tableHeading '><span className='font14'>Status</span></th>
                                                                <th className='tableHeading text-center'><span className='font14'>Action</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allAssignmentData.map((item, index) => (
                                                                <tr key={item.id} className='align-middle'>
                                                                    <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.title}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.teacherId}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <p className='font14 align-self-start'>Class - {item.classNo}</p>
                                                                        <p className='font14 align-self-start'>Section - {item.sectionName}</p>
                                                                        <p className='font14 align-self-start'>Subject - {item.subjectName}</p>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <p className='font14 align-self-start'>Start Time - {item.startDate}</p>
                                                                        <p className='font14 align-self-start'>End Time - {item.endDate}</p>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'><ProgressBar completed={item.currentSubmissions} height='12px' maxCompleted={item.totalSubmissions} fontSize='2px' /></span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        {item.status === 'ACTIVE' ? <span className='font14 align-self-start activeText'>Active</span> : <span className='font14 align-self-start deactiveText'>InActive</span>}
                                                                    </td>
                                                                    <td className='text-center'>
                                                                        <div className="dropdown dropdownbtn">
                                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span>Action</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                <li>
                                                                                    <Link className="dropdown-item greyText" to={`/assignment/openAssignment/${item.id}`}>
                                                                                        {/* {`/assignment/openAssignment/${item.id}`} */}
                                                                                        Open
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setEditItemId(item.id)}>
                                                                                        Edit
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <Link className="dropdown-item greyText" to={`/assignment/submitAssignment/${item.id}`}>
                                                                                        Submission
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteItemId(item.id)}>
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
                                                </>
                                            )}
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="./images/search.svg" alt="" className='img-fluid' />
                                    </div>
                                </>
                            }
                        </div>
                    </div>




                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}


                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="add_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header border-bottom border-2 p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <h2 className="offcanvas-title" id="staticBackdropLabel">Assignment Add</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <AddAssignment />
                        </div>
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
                            <h2 className="offcanvas-title" id="staticBackdropLabel">Assignment Edit</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <EditAssignment EditItemId={EditItemId} />
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
                            <span className="offcanvas-title" id="staticBackdropLabel">Assignment</span>
                        </div>
                        <div className="offcanvas-body p-0">
                            <div>
                                {DeleteWarning
                                    ?
                                    <>
                                        <div className=''>
                                            <p className='modalLightBorder p-2'>Assignment</p>
                                            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                            <p className='text-center warningHeading'>Are you Sure?</p>
                                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                            <p className='text-center p-3'>
                                                <button className='btn deleteButtons text-white' onClick={() => DeleteAssignmentDataById(DeleteItemId)}>Delete</button>
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

                    <Toaster />

                </div>
            </Container>
        </>
    )
}

export default Assignment


