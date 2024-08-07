import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getStudentDataByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import StudentProfileData from './StudentProfileData';
import FeeDataOfStudent from './FeeDataOfStudent';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }
    
    .greenText{
        color: var(--breadCrumActiveTextColor);
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px !important;
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

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .greenBG{
        background-color: var(--headingBackgroundColor);
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .nav-link{
        background-color: #fff !important;
        color: var(--greyTextColor) !important;
        border-radius: 0px !important;
    }

    .nav-link.active{
        background-color: var(--headingBackgroundColor) !important;
        color: #000 !important;
        border-bottom: 3px solid var(--activeOrangeBorder) !important;
        border-radius: none !important;
    }

`;


const StudentProfilePage = () => {

    const { id } = useParams();

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    useEffect(() => {
        getStudentDataById();
    }, [token])

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getStudentDataById = async () => {
        try {
            setloaderState(true);
            var response = await getStudentDataByIdApi(id);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentName(response?.data?.student?.studentName);
                    setStudentId(response?.data?.student?.studentId);
                    setFatherName(response?.data?.student?.fatherName);
                    setClassNo(response?.data?.student?.classNo);
                    setStudentPh(response?.data?.student?.studentPhone);
                    setStudentImage(response?.data?.student?.studentImage);
                    toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid pt-4 ">
                <div className="row gap-xl-0 gap-3">
                    <div className="col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection </a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Collect Fees</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Collect Fees List</p>
                    </div>
                    <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12">
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
                                    <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start p-0 align-self-center">
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
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                        <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-4">
                <div className="row bg-white cardradius2">
                    <div className="col-12">
                        <div className="row p-3">
                            <div className="col-9">
                                <div className="row greenBG cardradius2 p-3">
                                    <div className="col-2 align-self-center">
                                        <div className="row">
                                            <img src={studentImage} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="row">
                                            <h2 className='darkgreentext'>Details info</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <div className="row p-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Name: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Father Name: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={fatherName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Mobile: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentPh} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="row p-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Class (Section): </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Admission No: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentId} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Roll Number: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentRollNo} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-3 overflow-scroll">
                            <ul className="nav nav-pills mb-3 border-bottom" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <h2 className='nav-link active p-3' id="pills-Profile-tab" data-bs-toggle="pill" data-bs-target="#pills-Profile" type="button" role="tab" aria-controls="pills-Profile" aria-selected="true">Profile</h2>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h2 className='nav-link p-3' id="pills-Fees-tab" data-bs-toggle="pill" data-bs-target="#pills-Fees" type="button" role="tab" aria-controls="pills-Fees" aria-selected="false">Fees</h2>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h2 className='nav-link p-3' id="pills-Exam-tab" data-bs-toggle="pill" data-bs-target="#pills-Exam" type="button" role="tab" aria-controls="pills-Exam" aria-selected="false">Exam</h2>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h2 className='nav-link p-3' id="pills-CBSE_Examination-tab" data-bs-toggle="pill" data-bs-target="#pills-CBSE_Examination" type="button" role="tab" aria-controls="pills-CBSE_Examination" aria-selected="false">CBSE_Examination </h2>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <h2 className='nav-link p-3' id="pills-Document-tab" data-bs-toggle="pill" data-bs-target="#pills-Document" type="button" role="tab" aria-controls="pills-Document" aria-selected="false">Document</h2>
                                </li>
                            </ul>
                            <div className="tab-content p-0" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-Profile" role="tabpanel" aria-labelledby="pills-Profile-tab" tabIndex="0">
                                    <StudentProfileData StudentId={id} />
                                </div>
                                <div className="tab-pane fade" id="pills-Fees" role="tabpanel" aria-labelledby="pills-Fees-tab" tabIndex="0">
                                    <FeeDataOfStudent StudentId={id} />
                                </div>
                                <div className="tab-pane fade" id="pills-Exam" role="tabpanel" aria-labelledby="pills-Exam-tab" tabIndex="0">
                                    <div className="row">
                                        <h2 className='darkgreentext pt-3 pb-3 p-1'>Chapter Wise Weekly Test (April-2024)</h2>
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className=''><span className='font14'>#</span></th>
                                                    <th><span className='font14'>Subject</span></th>
                                                    <th><span className='font14'>Max Marks</span></th>
                                                    <th><span className='font14'>Min Marks</span></th>
                                                    <th><span className='font14'>Marks Obtained</span></th>
                                                    <th><span className='font14'>Result</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr></tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>1.</h3></th>
                                                    <td className='greyText'><h3>English</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>56</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>2.</h3></th>
                                                    <td className='greyText'><h3>Science</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>89</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>3.</h3></th>
                                                    <td className='greyText'><h3>Mathematics</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>76</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>4.</h3></th>
                                                    <td className='greyText'><h3>Hindi</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>85</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <h2 className='darkgreentext pt-3 pb-3 p-1'>Monthly Test (APRIL) GPA Grading System</h2>
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className=''><span className='font14'>#</span></th>
                                                    <th><span className='font14'>Subject</span></th>
                                                    <th><span className='font14'>Grade Point</span></th>
                                                    <th><span className='font14'>Credit Hours</span></th>
                                                    <th><span className='font14'>Quality Points</span></th>
                                                    <th><span className='font14'>Note</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr></tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>1.</h3></th>
                                                    <td className='greyText'><h3>English</h3></td>
                                                    <td className='greyText'><h3>4.00</h3></td>
                                                    <td className='greyText'><h3>2.00</h3></td>
                                                    <td className='greyText'><h3>8.00</h3></td>
                                                    <td className='greenText'><h3></h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>2.</h3></th>
                                                    <td className='greyText'><h3>Science</h3></td>
                                                    <td className='greyText'><h3>4.00</h3></td>
                                                    <td className='greyText'><h3>2.00</h3></td>
                                                    <td className='greyText'><h3>8.00</h3></td>
                                                    <td className='greenText'><h3></h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>3.</h3></th>
                                                    <td className='greyText'><h3>Mathematics</h3></td>
                                                    <td className='greyText'><h3>4.00</h3></td>
                                                    <td className='greyText'><h3>2.00</h3></td>
                                                    <td className='greyText'><h3>8.00</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>4.</h3></th>
                                                    <td className='greyText'><h3>Hindi</h3></td>
                                                    <td className='greyText'><h3>4.00</h3></td>
                                                    <td className='greyText'><h3>2.00</h3></td>
                                                    <td className='greyText'><h3>8.00</h3></td>
                                                    <td className='greenText'><h3></h3></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-CBSE_Examination" role="tabpanel" aria-labelledby="pills-CBSE_Examination-tab" tabIndex="0">
                                    <div className="row">
                                        <h2 className='darkgreentext pt-3 pb-3 p-1'>Chapter Wise Weekly Test (April-2024)</h2>
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className=''><span className='font14'>#</span></th>
                                                    <th><span className='font14'>Subject</span></th>
                                                    <th><span className='font14'>Max Marks</span></th>
                                                    <th><span className='font14'>Min Marks</span></th>
                                                    <th><span className='font14'>Marks Obtained</span></th>
                                                    <th><span className='font14'>Result</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr></tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>1.</h3></th>
                                                    <td className='greyText'><h3>English</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>56</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>2.</h3></th>
                                                    <td className='greyText'><h3>Science</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>89</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>3.</h3></th>
                                                    <td className='greyText'><h3>Mathematics</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>76</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                                <tr className='align-middle'>
                                                    <th className='greyText'><h3>4.</h3></th>
                                                    <td className='greyText'><h3>Hindi</h3></td>
                                                    <td className='greyText'><h3>100</h3></td>
                                                    <td className='greyText'><h3>33</h3></td>
                                                    <td className='greyText'><h3>85</h3></td>
                                                    <td className='greenText'><h3>Pass</h3></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-Document" role="tabpanel" aria-labelledby="pills-Document-tab" tabIndex="0">
                                    <div className="row">
                                        <h2 className='darkgreentext pt-3 pb-3 p-1'>Chapter Wise Weekly Test (April-2024)</h2>
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th><span className='font14'>Title</span></th>
                                                    <th><span className='font14'>File Name</span></th>
                                                    <th className=' text-end'><span className='font14'>Action</span></th>
                                                </tr>
                                            </thead>
                                            {/* <tbody>
                                            </tbody> */}
                                        </table>
                                        <p className='text-center'>
                                            <img src="./images/search.svg" alt="" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </Container>
    )
}

export default StudentProfilePage