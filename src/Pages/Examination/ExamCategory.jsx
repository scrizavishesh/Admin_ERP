import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewExamCategoryApi, deleteExamCategoryApi, getExamCategoryDataApi, getExamCategoryDataByIdApi, updateExamCategoryDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    height: 92vh;
    
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
`;


const ExamCategory = () => {

    const token = localStorage.getItem('token');

    // loader State
    const [loaderState, setloaderState] = useState(false);

    // Data States
    const [ExamCategoryData, setExamCategoryData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')

    // Offcanvas State
    const [AddExamCategory, setAddExamCategory] = useState(true);
    const [EditExamCategory, setEditExamCategory] = useState(true);
    const [DeleteWarning, setDeleteWarning] = useState(true);

    // State id's for delete and edit
    const [ExamCategoryById, setExamCategoryById] = useState('');
    const [deleteExamCategoryId, setDeleteExamCategoryId] = useState('');

    // state for creating exam category
    const [ExamCategory, setExamCategory] = useState('');
    const [ExamCategoryError, setExamCategoryError] = useState('');

    // state for updating exam category
    const [UpdateExamCategoryName, setUpdateExamCategoryName] = useState('');
    const [UpdateExamCategoryNameError, setUpdateExamCategoryNameError] = useState('');

    // for verifying either delete is agreed or not
    const [isChecked, setIsChecked] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Use Effect Calls
    useEffect(() => {
        getAllExamCategoryData();
    }, [token, pageNo])

    // Pagination handle function
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    // Get all Exam category data for table
    const getAllExamCategoryData = async () => {
        try {
            setloaderState(true);
            setEditExamCategory(true);
            setAddExamCategory(true);
            setDeleteWarning(true);
            var response = await getExamCategoryDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setExamCategoryData(response?.data?.categories);
                    setTotalItems(10)
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch { }
    }

    // Get Exam category data by id
    const getExamCategoryDataById = async (id) => {
        setExamCategoryById(id)
        try {
            setloaderState(true);
            var response = await getExamCategoryDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setUpdateExamCategoryName(response?.data?.Category?.examCategoryName);
                    toast.success(response.data.msg);
                    validationCheck();
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch { }
    }

    // Add new Exam category data
    const AddNewExamCategory = async () => {
        const ExamCategoryNameValidate = validateExamCategoryName(ExamCategory);
        if (ExamCategoryNameValidate) {
            setExamCategoryError(ExamCategoryNameValidate);
            return;
        }
        setExamCategoryError('');

        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('examCategoryName', ExamCategory)
            var response = await addNewExamCategoryApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    console.log(response, 'res after success');
                    setAddExamCategory(!AddExamCategory)
                }
            }
        }
        catch {

        }
    }

    // Delete Exam category data
    const DeleteExamCategory = async () => {
        if (isChecked) {
            try {
                setloaderState(true);
                var response = await deleteExamCategoryApi(deleteExamCategoryId);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setloaderState(false);
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

    // Update Exam category data
    const updateExamCategoryById = async () => {
        const UpdateExamCategoryNameValidate = validateUpdateExamCategoryName(UpdateExamCategoryName);
        if (UpdateExamCategoryNameValidate) {
            setUpdateExamCategoryNameError(UpdateExamCategoryNameValidate);
            return;
        }
        setUpdateExamCategoryNameError('');

        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('examCategoryName', UpdateExamCategoryName)
            var response = await updateExamCategoryDataApi(ExamCategoryById, formData);

            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setloaderState(false);
                    setEditExamCategory(!EditExamCategory);
                    toast.success(response?.data?.msg)
                }
            } else {
                toast.error(response?.error);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    const handleExamCategoryName = (value) => {
        setExamCategory(value);
        setExamCategoryError(validateExamCategoryName(value))
    }

    const validateExamCategoryName = (value) => {
        if (value.trim() === '') {
            return '* Exam Category Name is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleUpdateExamCategoryName = (value) => {
        setUpdateExamCategoryName(value);
        setUpdateExamCategoryNameError(validateUpdateExamCategoryName(value))
    }

    const validateUpdateExamCategoryName = (value) => {
        if (value.trim() === '') {
            return '* Exam Category Name is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    // validate the data the is retrived by get By Id
    const validationCheck = () => {
        const UpdateExamCategoryNameValidate = validateUpdateExamCategoryName(UpdateExamCategoryName);
        if (UpdateExamCategoryNameValidate) {
            setUpdateExamCategoryNameError(UpdateExamCategoryNameValidate);
            return;
        }
        setUpdateExamCategoryNameError('');
    }

    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                {/* All Data */}
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Exam Category</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Exam Category List</p>
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
                                        <div className="col-md-7 col-sm-12 col-7 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllExamCategoryData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-5 col-sm-12 col-5 text-sm-end text-start">
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#addCategory_staticBackdrop" aria-controls="addCategory_staticBackdrop">
                                                <span className="btn ps-0 pe-0 addCategoryButtons text-white font14">+ ADD Exam Category</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            {ExamCategoryData
                                ?
                                <>
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className='text-start'><span className='font14'>#</span></th>
                                                <th><span className='font14'>Title</span></th>
                                                <th className='text-end'><span className='font14'>Action</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ExamCategoryData.map((item, index) => (
                                                <tr key={item.categoryId} className='my-bg-color align-middle'>
                                                    <th className='text-start greyText'><h3>{index + 1}</h3></th>
                                                    <td className='greyText'><h3>{item.examCategoryName}</h3></td>
                                                    <td className='text-end'>
                                                        <div className="dropdown dropdownbtn">
                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <span>Action</span>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getExamCategoryDataById(item.categoryId)}>
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteExamCategoryId(item.categoryId)}>
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
                                :
                                <div className='p-1 font12 text-danger'>No Data Found !!</div>
                            }
                        </div>
                    </div>
                </div>

                {/* Add Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addCategory_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Create ExamCategory</span>
                    </div>
                    <div className="offcanvas-body scrollBarHide">
                        {AddExamCategory
                            ?
                            <>
                                <form className='row'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Category</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${ExamCategoryError ? 'border-1 border-danger' : ''}`} placeholder='Enter Exam Title' onChange={(e) => handleExamCategoryName(e.target.value)} />
                                        <span className='text-danger'>{ExamCategoryError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateCategoryButtons text-white' type='button' onClick={AddNewExamCategory}>Create Category</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div className="mt-3  ">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Updated</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllExamCategoryData}>Continue</button>
                                </div>
                            </>
                        }
                    </div>
                </div>

                {/* Update Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Edit Exam Category</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        {EditExamCategory
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Name</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${UpdateExamCategoryNameError ? 'border-1 border-danger' : ''}`} value={UpdateExamCategoryName} onChange={(e) => handleUpdateExamCategoryName(e.target.value)} />
                                        <span className="text-danger">{UpdateExamCategoryNameError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateButtons text-white' type='button' onClick={updateExamCategoryById}>Update</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div className="mt-3">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'>
                                        <img src="./images/Correct.svg" alt="" />
                                    </div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Updated</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllExamCategoryData}>Continue</button>
                                </div>
                            </>
                        }
                    </div>
                </div>

                {/* Delete Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-1">
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
                                    <p className='modalLightBorder p-2'>Exam Category</p>
                                    <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                    <p className='text-center warningHeading'>Are you Sure?</p>
                                    <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                    <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                    <p className='text-center p-3'>
                                        <button className='btn deleteButtons text-white' onClick={() => DeleteExamCategory(deleteExamCategoryId)}>Delete</button>
                                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </div>
                            </>
                            :
                            <>
                                <div >
                                    <p className='border-bottom p-2'>Exam Category</p>
                                    <div className="">
                                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                            <p className='warningHeading'>Successful Deleted</p>
                                            <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                        </div>
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllExamCategoryData}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <Toaster />
            </Container>
        </>
    )
}

export default ExamCategory