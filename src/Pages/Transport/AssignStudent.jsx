import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import DeleteAdmin from '../../Modals/Admin/DeleteAdmin';
import AssignStudentFrom from '../../Modals/AssignStudent/AssignStudentFrom';
import { getAssignStudentDataApi, unAssignStudentApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

// Styled-Component
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
    
    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .pointer{
        cursor: pointer;
    }

`;

const AssignStudent = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // Modal State
    const [AssignStudent, setAssignStudent] = useState(true);
    // Data States
    const [AssignStudentData, setAssignStudentData] = useState([]);
    const [assignStudentTableData, setAssignStudentTableData] = useState([]);
    // Variable States
    const [searchByKey, setSearchByKey] = useState('')
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    console.log(assignStudentTableData, 'data')
    // UseEffect Call

    useEffect(() => {
        getAllAssignStudentData();
    }, [token, currentPage, pageNo])

    // API IMPLEMENTATION

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getAllAssignStudentData = async () => {
        try {
            setAssignStudent(true)
            setloaderState(true);
            var response = await getAssignStudentDataApi(searchByKey, pageNo, pageSize);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAssignStudentData(response?.data?.vehicles);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response.data.message);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const UnAssignStudentData = async (StudentId) => {
        try {
            const formData = new FormData();
            formData.append('studentId', StudentId)
            var response = await unAssignStudentApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setRefershPage(!refreshPage)
                    getAllAssignStudentData()
                    toast.success(response.data.msg);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    return (
        <>
            <Container>

                {/* Data Loader Visibility */}

                {
                    loaderState && (
                        <DataLoader />
                    )
                }

                {/* Main Code */}

                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Admin</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Admin List</p>
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
                                                <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllAssignStudentData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white font14 textVerticalCenter" data-bs-toggle="offcanvas" data-bs-target="#assignStudent_staticBackdrop" aria-controls="assignStudent_staticBackdrop" >+ Assign Student</Link>
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
                                        <th><span className='font14'>#</span></th>
                                        <th><span className='font14'>Vehicle info</span></th>
                                        <th><span className='font14'>Route</span></th>
                                        <th><span className='font14'>Driver Name</span></th>
                                        <th><span className='font14'>Driver No</span></th>
                                        <th><span className='font14'>Student Name</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AssignStudentData.map((item, index) => (
                                        <tr key={item.vehicleId} className='my-bg-color align-middle'>
                                            <th className='greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.vehicleNo}</h3></td>
                                            <td className='greyText'><h3>{item.route}</h3></td>
                                            <td className='greyText'><h3>{item.driverName}</h3></td>
                                            <td className='greyText'><h3>{item.driverNo}</h3></td>
                                            <td className='greyText'><h3 className='align-self-center pointer' data-bs-toggle="modal" data-bs-target="#StudentDetailsModal" onClick={() => setAssignStudentTableData(item.students)}>Details <Icon icon="material-symbols:info-outline" width="1.4em" height="1.4em" style={{ color: '#008479' }} /></h3></td>
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

                {/* Assign New Student OffCanvas */}

                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="assignStudent_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Assign Student</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        <AssignStudentFrom AssignStudent={AssignStudent} setAssignStudent={setAssignStudent} ReloadData={getAllAssignStudentData} />
                    </div>
                </div>
                
                {/* <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder ps-0 pe-0">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title" id="staticBackdropLabel">Assign Student Details</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        <DeleteAdmin />
                    </div>
                </div> */}


                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}

                {/* Student Details Data Modal */}

                <div className="modal modal-lg fade" id="StudentDetailsModal" tabIndex="-1" aria-labelledby="StudentDetailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header pb-2">
                                <h2 className="modal-title" id="StudentDetailsModalLabel">Student Details</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Student Id</th>
                                            <th>Student Name</th>
                                            <th>Drop Name</th>
                                            <th className='text-center'><span className='font14'>Action</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignStudentTableData.map((item, index) => (
                                            <tr key={item.studentId} className='my-bg-color align-middle'>
                                                <th className='greyText'><h3>{index + 1}</h3></th>
                                                <td className='greyText'><h3>{item.studentId}</h3></td>
                                                <td className='greyText'><h3>{item.studentName}</h3></td>
                                                <td className='greyText'><h3>{item.dropName}</h3></td>
                                                <td className='text-center'><img src='./images/dlt_Icon.svg' data-bs-dismiss="modal" onClick={() => UnAssignStudentData(item.studentId)} style={{ cursor: 'pointer' }} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>



                <Toaster />
            </Container>
        </>
    )
}

export default AssignStudent