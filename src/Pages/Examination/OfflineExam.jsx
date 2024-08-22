import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { deleteOfflineExamApi, getAllClassApi, getAllOfflineExamApi, getAllSubjectByClassApi, getRoomDataApi, getSearchOfflineExamApi } from '../../Utils/Apis';
import AddExam from '../../Modals/OfflineExam/AddExam';
import EditExam from '../../Modals/OfflineExam/EditExam';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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

    .form-select{
        color: var(--greyState);
        box-shadow: none;
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

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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


const OfflineExam = () => {

    const token = localStorage.getItem('token');

    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('')

    // const [SearchBtn, setSearchBtn] = useState(false);
    const [DeleteWarning, setDeleteWarning] = useState(true);

    const [allOfflineExamData, setAllOfflineExamData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allRoomData, setAllRoomData] = useState([]);
    const [delOfflineExamIDD, setDelOfflineExamIDD] = useState('');

    const [classNo, setClassNo] = useState(0);
    const [classId, setClassId] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const [refreshDelete, setRefreshDelete] = useState(false);

    const [isChecked, setIsChecked] = useState(false);


    const [EditId, setEditId] = useState('');
    const [reload, setReload] = useState(false);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Pagination

    const [dataRefresh, setDataRefresh] = useState(false);

    const handleOfflineExamState = (updatedData) => {
        setDataRefresh(updatedData);
    };


    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     const [val1, val2] = value.split(',');
    //     setClassNo(val1);
    //     setClassId(val2);
    // }

    useEffect(() => {
        // getAllRoomData();
        getAllClassData();
        getAllOfflineExamData();
    }, [token, dataRefresh, pageNo, reload])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const DeleteOfflineExamDataById = async () => {
        if (isChecked) {
            try {
                setloaderState(true);
                var response = await deleteOfflineExamApi(delOfflineExamIDD);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setloaderState(false);
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

    const getAllOfflineExamData = async () => {
        try {
            setloaderState(true);
            var response = await getAllOfflineExamApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllOfflineExamData(response?.data?.examDetails);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getSearchedOfflineExamData = async () => {
        try {
            setloaderState(true);
            console.log(classId, subjectId)
            // const formData = new FormData();
            // formData.append('classId', parseInt(classId))
            // formData.append('subjectId', parseInt(subjectId))

            // const data = {
            //     'classId' : parseInt(classId),
            //     'subjectId' : parseInt(subjectId),
            // }
            const response = await getSearchOfflineExamApi(classId, subjectId);
            console.log(response, 'searchByKey response')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllOfflineExamData(response?.data?.examDetails);
                    setTotalItems(10);
                    toast.success(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (e) {
            console.log(e, 'catch')
        }
    }

    const getAllClassData = async () => {
        try {
            setloaderState(true);
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllSubjectData = async (val) => {
        try {
            setloaderState(true);
            var response = await getAllSubjectByClassApi(val);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllSubjectData(response?.data?.subjects);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const handleReload = () => {
        setReload(true);
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
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Offline Exam</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Offline Exam List</p>
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
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllOfflineExamData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#addCategory_staticBackdrop" aria-controls="addCategory_staticBackdrop">
                                                <span className="btn ps-0 pe-0 addButtons text-white font16">+ ADD Exam</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-md-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                    <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => { setClassId(e.target.value), getAllSubjectData(e.target.value) }}>
                                        <option >--- Choose ---</option>
                                        {allClassData?.map(option => (
                                            <option key={option.classId} value={option?.classId}>
                                                {option.classNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Subject</label>
                                    <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setSubjectId(e.target.value)}>
                                        <option >--- Choose ---</option>
                                        {allSubjectData?.map(option => (
                                            <option key={option.subjectId} value={option.subjectId}>
                                                {option.subjectName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn addCategoryButtons text-white' onClick={getSearchedOfflineExamData}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                                </p>
                            </form>
                            <div className="row">
                                <div className="row overflow-scroll">
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className=''><span className='font14'>#</span></th>
                                                <th><span className='font14'>Title</span></th>
                                                <th><span className='font14'>Room Number</span></th>
                                                <th><span className='font14'>Starting Time</span></th>
                                                <th><span className='font14'>Ending Time</span></th>
                                                <th><span className='font14'>Total Marks</span></th>
                                                <th className='text-center'><span className='font14'>Action</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allOfflineExamData.map((item, index) => (
                                                <tr key={item.id} className='align-middle'>
                                                    <th className='greyText'><h3>{index + 1}</h3></th>
                                                    <td className='greyText'><h3>{item.examCategory}</h3></td>
                                                    <td className='greyText'><h3>{item.roomNumber}</h3></td>
                                                    <td className='greyText'><h3>{item.startingDateTime}</h3></td>
                                                    <td className='greyText'><h3>{item.endingDateTime}</h3></td>
                                                    <td className='greyText'><h3>{item.totalMarks}</h3></td>
                                                    <td>
                                                        <div className="dropdown dropdownbtn">
                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <span>Action</span>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => setEditId(item.id)}>
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDelOfflineExamIDD(item.id)}>
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
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}




                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addCategory_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Add Offline Exam</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        <AddExam offlineExamState={handleOfflineExamState} />
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}




                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Edit Offline Exam</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        <EditExam EditId={EditId} Reload={handleReload}/>
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}




                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Delete Exam Category</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        {DeleteWarning
                            ?
                            <>
                                <div className=''>
                                    <p className='modalLightBorder p-2'>OfflineExam</p>
                                    <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                    <p className='text-center warningHeading'>Are you Sure?</p>
                                    <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                    <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                    <p className='text-center p-3'>
                                        <button className='btn deleteButtons text-white' onClick={DeleteOfflineExamDataById}>Delete</button>
                                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </div>
                            </>
                            :
                            <>
                                <div >
                                    <p className='border-bottom p-3'>OfflineExam</p>
                                    <div className="">
                                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                            <p className='warningHeading'>Successful Deleted</p>
                                            <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                        </div>
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleReload}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}



            </Container>
        </>
    )
}

export default OfflineExam
