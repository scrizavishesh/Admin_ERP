import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { addNewGradeApi, deleteGradeApi, getGradeDataApi, getGradeDataByIdApi, updateGradeByIdApi } from '../../Utils/Apis';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

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

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    
`;


const Grades = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [AllGradeData, setAllGradeData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')

    const [AddGradeCategory, setAddGradeCategory] = useState(true);
    const [EditGradeCategory, setEditGradeCategory] = useState(true);
    const [DeleteWarning, setDeleteWarning] = useState(true);

    const [deleteGradeId, setDeleteGradeId] = useState('');

    const [GradeById, setGradeById] = useState(0);
    const [GradeByIdError, setGradeByIdError] = useState('');

    const [Grade, setGrade] = useState('');
    const [GradeError, setGradeError] = useState('');

    const [GradePoint, setGradePoint] = useState('');
    const [GradePointError, setGradePointError] = useState('');

    const [MarkFrom, setMarkFrom] = useState('');
    const [MarkFromError, setMarkFromError] = useState('');

    const [MarkUpto, setMarkUpto] = useState('');
    const [MarkUptoError, setMarkUptoError] = useState('');

    const [isChecked, setIsChecked] = useState(false);


    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Pagination

    useEffect(() => {
        getAllGradeData();
    }, [token, pageNo])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getAllGradeData = async () => {
        try {
            setloaderState(true);
            var response = await getGradeDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllGradeData(response?.data?.grades);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response.data.message);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch { }
    }

    const DeleteGrade = async () => {
        if (isChecked) {
            try {
                console.log('first')
                var response = await deleteGradeApi(deleteGradeId);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setDeleteWarning(!DeleteWarning)
                        toast.success(response?.data?.message)
                    }
                    else {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                    }
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                setloaderState(false);
                console.error('Error during update:', error);
                toast.error('Error during update:', error)
            }
        }
        else {
            toast.error('Please Agree to Delete Grade')
        }
    }

    const AddNewGrades = async () => {
        if (validateAddFields()) {
            setloaderState(true);
            try {
                const formData = new FormData();
                formData.append('grade', Grade)
                formData.append('gradePoint', GradePoint)
                formData.append('marksFrom', MarkFrom)
                formData.append('marksUpTo', MarkUpto)

                var response = await addNewGradeApi(formData);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                        setAddGradeCategory(!AddGradeCategory)
                    }
                    else {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                    }
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                setloaderState(false);
                console.error('Error during update:', error);
                toast.error('Error during update:', error)
            }
        }
        else {
            toast.error('Please Validate All Fields Correctly')
        }
    }

    const getGradeDataById = async (id) => {
        try {
            setloaderState(true);
            setGradeById(id)
            const idd = parseInt(id)
            var response = await getGradeDataByIdApi(idd);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setGradeById(response?.data?.grade?.grade)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error during update:', error);
            toast.error('Error during update:', error)
        }
    }

    const EditGrades = async () => {
        if (validateEditFields()) {
            try {
                setloaderState(true)
                const formData = new FormData();
                formData.append('grade', GradeById)
                var response = await updateGradeByIdApi(GradeById, formData);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        setEditGradeCategory(false);
                        setloaderState(false);
                        toast.success(response?.data?.message)
                    }
                    else {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                    }
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                setloaderState(false);
                console.error('Error during update:', error);
                toast.error('Error during update:', error)
            }
        }
        else {
            toast.error('Please Validate All Fields Correctly')
        }
    }


    const handleGradeUpdateById = (val) => {
        setGradeById(val);
        setGradeByIdError(validateGrade(val));
    }

    const handleGradeChange = (val) => {
        setGrade(val);
        setGradeError(validateGrade(val));
    }

    const handleGradePointChange = (val) => {
        setGradePoint(val);
        setGradePointError(validateGradePoint(val));
    }

    const handleMarkFromChange = (val) => {
        setMarkFrom(val);
        setMarkFromError(validateMark(val));
    }

    const handleMarkUpToChange = (val) => {
        setMarkUpto(val);
        setMarkUptoError(validateMark(val));
    }

    const gardeRegex = /^(A[12]|B[12]|C[12]|D[12]|E)$/;
    const gradePointRegex = /^(10(\.0{1,2})?|[1-9](\.\d{1,2})?|0?\.[1-9]\d?)$/;
    const markRegex = /^(0|[1-9][0-9]|[1-4][0-9]{2}|500)$/;


    const validateGrade = (value) => {
        if (!value.trim()) {
            return '*This Field is required';
        } else if (!gardeRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };

    const validateGradePoint = (value) => {
        if (!value.trim()) {
            return '*This Field is required';
        } else if (!gradePointRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };

    const validateMark = (value) => {
        if (!value.trim()) {
            return '*This Field is required';
        } else if (!markRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };

    const validateAddFields = () => {
        let isValid = true;

        if (!Grade) {
            setGradeError('* This Field is required');
            isValid = false;
        } else if (!gardeRegex.test(Grade)) {
            setGradeError('Invalid characters in name !!');
            isValid = false;
        } else {
            setGradeError('');
        }

        if (!GradePoint) {
            setGradePointError('* This Field is required');
            isValid = false;
        } else if (!gradePointRegex.test(GradePoint)) {
            setGradePointError('Invalid characters in name !!');
            isValid = false;
        } else {
            setGradePointError('');
        }

        if (!MarkFrom) {
            setMarkFromError('* This Field is required');
            isValid = false;
        } else if (!markRegex.test(MarkFrom)) {
            setMarkFromError('Invalid characters in name !!');
            isValid = false;
        } else {
            setMarkFromError('');
        }

        if (!MarkUpto) {
            setMarkUptoError('* This Field is required');
            isValid = false;
        } else if (!markRegex.test(MarkUpto)) {
            setMarkUptoError('Invalid characters in name !!');
            isValid = false;
        } else {
            setMarkUptoError('');
        }

        return isValid;
    };

    const validateEditFields = () => {
        let isValid = true;

        if (!GradeById) {
            setGradeError('* This Field is required');
            isValid = false;
        } else if (!gardeRegex.test(GradeById)) {
            setGradeError('Invalid characters in name !!');
            isValid = false;
        } else {
            setGradeError('');
        }

        return isValid;
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
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Grades</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Grades List</p>
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
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllGradeData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#addCategory_staticBackdrop" aria-controls="addCategory_staticBackdrop">
                                                <span className="btn ps-0 pe-0 addButtons text-white font14">+ Add Grades</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th className='text-center'><span className='font14'>#</span></th>
                                        <th><span className='font14'>Grade</span></th>
                                        <th><span className='font14'>Grade Point</span></th>
                                        <th><span className='font14'>Mark From</span></th>
                                        <th><span className='font14'>Mark Upto</span></th>
                                        <th className='text-center'><span className='font14'>Action</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllGradeData.map((item, index) => (
                                        <tr key={item.id} className='my-bg-color align-middle'>
                                            <th className='text-center greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.grade}</h3></td>
                                            <td className='greyText'><h3>{item.gradePoint}</h3></td>
                                            <td className='greyText'><h3>{item.marksFrom}</h3></td>
                                            <td className='greyText'><h3>{item.marksUpTo}</h3></td>
                                            <td className='text-center'>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getGradeDataById(item.id)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteGradeId(item.id)}>
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



                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}



                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addCategory_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header ps-0 modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Create Grade</span>
                        </div>
                        <div className="offcanvas-body scrollBarHide">
                            {AddGradeCategory
                                ?
                                <>
                                    <form className='row'>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Grade</label>
                                            <input type="text" id="exampleInputEmail1" className={`form-control borderRadius5 font14 ${GradeError ? 'border-1 border-danger' : ''}`} placeholder='Enter Grade' onChange={(e) => handleGradeChange(e.target.value)} />
                                            <span className='text-danger'>{GradeError}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Grade point</label>
                                            <input type="text" id="exampleInputEmail1" className={`form-control borderRadius5 font14 ${GradePointError ? 'border-1 border-danger' : ''}`} placeholder='Enter Grade Point' onChange={(e) => handleGradePointChange(e.target.value)} />
                                            <span className='text-danger'>{GradePointError}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Mark From</label>
                                            <input type="text" id="exampleInputEmail1" className={`form-control borderRadius5 font14 ${MarkFromError ? 'border-1 border-danger' : ''}`} placeholder='Enter Mark From' onChange={(e) => handleMarkFromChange(e.target.value)} />
                                            <span className='text-danger'>{MarkFromError}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Mark Upto</label>
                                            <input type="text" id="exampleInputEmail1" className={`form-control borderRadius5 font14 ${MarkUptoError ? 'border-1 border-danger' : ''}`} placeholder='Enter Mark Upto' onChange={(e) => handleMarkUpToChange(e.target.value)} />
                                            <span className='text-danger'>{MarkUptoError}</span>
                                        </div>
                                        <p className='text-center p-3'>
                                            <button className='btn updateCategoryButtons text-white' type='button' onClick={AddNewGrades}>Create Grade</button>
                                            <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
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
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>Continue</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>


                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}



                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Edit Grade</span>
                        </div>
                        <div className="offcanvas-body p-0 scrollBarHide">
                            {EditGradeCategory
                                ?
                                <>
                                    <form className='p-3'>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Name</label>
                                            <input type="text" id="exampleInputEmail1" className={`form-control borderRadius5 font14 ${GradeByIdError ? 'border-1 border-danger' : ''}`} value={GradeById} onChange={(e) => handleGradeUpdateById(e.target.value)} />
                                            <span className='text-danger'>{GradeByIdError}</span>
                                        </div>
                                        <p className='text-center p-3'>
                                            <button className='btn updateButtons text-white' type='button' onClick={EditGrades}>Update</button>
                                            <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>Cancel</button>
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
                                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>Continue</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>


                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}


                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />

                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Delete Grade</span>
                        </div>
                        <div className="offcanvas-body p-0 scrollBarHide">
                            {DeleteWarning
                                ?
                                <>
                                    <div className=''>
                                        <p className='modalLightBorder p-2'>Grade</p>
                                        <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                        <p className='text-center warningHeading'>Are you Sure?</p>
                                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                        <p className='text-center p-3'>
                                            <button className='btn deleteButtons text-white' type='button' onClick={DeleteGrade}>Delete</button>
                                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>Cancel</button>
                                        </p>
                                    </div>
                                </>
                                :
                                <>
                                    <div >
                                        <p className='border-bottom p-2'>Grade</p>
                                        <div className="">
                                            <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                            <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Deleted</p>
                                                <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllGradeData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
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

export default Grades