import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
// import { getAllClassApi, getDownloadSamplePaperDataApi, getSearhSamplePaperDataApi } from '../Utils/Apis';
import AddSamplePaper from '../Modals/SamplePapers/AddSamplePaper';
import EditSamplePaper from '../Modals/SamplePapers/EditSamplePaper';
import { deleteSamplePaperApi, getAllClassApi, getDownloadSamplePaperDataApi, getSearhSamplePaperDataApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import generatePDF from 'react-to-pdf';

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


const SamplePaper = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const targetRef = useRef();

    const token = localStorage.getItem('token');
    const [SearchBtn, setSearchBtn] = useState(false);
    const [DeleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [searchByKey, setSearchByKey] = useState('')


    const [EditItemId, setEditItemId] = useState('')
    const [DeleteItemId, setDeleteItemId] = useState('')

    const [classNo, setClassNo] = useState('');
    const [classId, setClassId] = useState(0);
    const [sectionId, setSectionId] = useState(0);
    const [subjectId, setSubjectId] = useState(0);
    const [allClassData, setAllClassData] = useState([]);
    const [SamplePaperStatus, setSamplePaperStatus] = useState([]);

    const [allSamplePaperData, setAllSamplePaperData] = useState([]);

    const [refreshDelete, setRefreshDelete] = useState(false);


    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
    }, [token, refreshDelete, allSamplePaperData, pageNo]);


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const PageRefreshOnDelete = () => {
        setDeleteWarning(!DeleteWarning);
        setRefreshDelete(!refreshDelete);
    }

    const getAllSamplePaper = async () => {
        try {
            setSearchBtn(true)
            setloaderState(true)
            console.log(pageSize)
            var response = await getSearhSamplePaperDataApi(classId, sectionId, subjectId, searchByKey, pageNo, pageSize);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllSamplePaperData(response?.data?.samplePaper);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response.data.message)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (e) {
            console.log(e);

        }
    }

    const dowloadSamplePaperById = async (sampleId) => {
        try {
            setloaderState(true)
            generatePDF(targetRef, { filename: 'Sample Paper.pdf' })
            console.log(sampleId)
            var response = await getDownloadSamplePaperDataApi(sampleId);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    console.log(response, 'after success')
                    toast.success(response.data.message)
                }
            }
            else {
                setloaderState(false)
                console.log(response?.data?.message);
            }
        }
        catch (e) {
            setloaderState(false)
            console.log('Error during downloading :',e);

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
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }


    const DeleteSamplePaperDataById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteSamplePaperApi(id);
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
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">SamplePaper</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>SamplePaper</p>
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
                                                <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllSamplePaper}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start p-0">
                                            <button className="btn ps-0 pe-0 addCategoryButtons text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#add_staticBackdrop" aria-controls="add_staticBackdrop"><span className='font14 textVerticalCenter'>+ Add SamplePaper</span></button>
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
                                                {option.subjectName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn addCategoryButtons text-white' onClick={getAllSamplePaper}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3' onClick={cancelSearch}>Cancel</button>
                                </p>
                            </form>
                            {SearchBtn
                                ?
                                <>
                                    <div className="row">
                                        <div className="overflow-scroll">
                                            {allSamplePaperData && allSamplePaperData.length === 0 ? (
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
                                                                <th className='tableHeading '><span className='font14'>Class</span></th>
                                                                <th className='tableHeading '><span className='font14'>Section</span></th>
                                                                <th className='tableHeading '><span className='font14'>Subject</span></th>
                                                                <th className='tableHeading '><span className='font14'>Teacher</span></th>
                                                                <th className='tableHeading '><span className='font14'>Download</span></th>
                                                                <th className='tableHeading text-center'><span className='font14'>Action</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allSamplePaperData.map((item, index) => (
                                                                <tr key={item.sampleId} className='align-middle'>
                                                                    <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.title}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.classNo}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.sectionName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.subjectName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.teacherName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <p className='font14 align-self-start m-0'>
                                                                            <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em" style={{ color: 'red' }} />
                                                                            <Link className='ms-2' to='' onClick={() => dowloadSamplePaperById(item.sampleId)}>Download</Link>
                                                                        </p>
                                                                    </td>
                                                                    <td className='text-center'>
                                                                        <div className="dropdown dropdownbtn">
                                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span>Action</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setEditItemId(item.sampleId)}>
                                                                                        Edit
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteItemId(item.sampleId)}>
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
                            <h2 className="offcanvas-title" id="staticBackdropLabel">Sample Paper Add</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <AddSamplePaper />
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
                            <h2 className="offcanvas-title" id="staticBackdropLabel">SamplePaper Edit</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <EditSamplePaper EditItemId={EditItemId} />
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
                            <span className="offcanvas-title" id="staticBackdropLabel">SamplePaper</span>
                        </div>
                        <div className="offcanvas-body p-0">
                            <div>
                                {DeleteWarning
                                    ?
                                    <>
                                        <div className=''>
                                            <p className='modalLightBorder p-2'>SamplePaper</p>
                                            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                            <p className='text-center warningHeading'>Are you Sure?</p>
                                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                            <p className='text-center p-3'>
                                                <button className='btn deleteButtons text-white' onClick={() => DeleteSamplePaperDataById(DeleteItemId)}>Delete</button>
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
                    <Toaster />

                    {/* ***********************************************************************************************************************************************************************************/}
                    {/* ***********************************************************************************************************************************************************************************/}



                </div>
            </Container>
        </>
    )
}

export default SamplePaper