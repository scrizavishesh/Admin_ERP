import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom';
import { getAllSubmissionsByAssignmentIdApi, getAssignmentByIdDataApi } from '../../Utils/Apis';
import { Icon } from '@iconify/react';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    height: 92vh;

    .tableHeading{
        background-color: var(--tableheadingbg) !important;
    }

    .ExportBtns{
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
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

    .tableBgColor{
        background-color: var(--bgColordiv);
    }

    .evenTableRow{
        background-color: var(--bgEvenColordiv);
    }


    .headingBgColor{
        background-color: var(--headingBackgroundColor);
    }

`;

const SubmitAssignment = () => {

    let { id } = useParams();

    const token = localStorage.getItem('token');
    const [allAssignmentData, setAllAssignmentData] = useState();
    const [allSubmissionData, setAllSubmissionData] = useState([]);
    console.log(allSubmissionData, 'mu submittion data')
    // console.log(allSubmissionData[0].studentName, 'submit data [0] Name')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    // Pagination


    useEffect(() => {
        getAssignmentById();
        getSubmissionById();
    }, [token, pageNo])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getAssignmentById = async () => {
        try {
            var response = await getAssignmentByIdDataApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllAssignmentData(response?.data?.Assignment);
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

    const getSubmissionById = async () => {
        try {
            var response = await getAllSubmissionsByAssignmentIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllSubmissionData(response?.data?.submission);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    toast.success(response?.data?.message)
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

    return (
        <>
            <Container>
                <div className="container-fluid p-4">
                    <div className="row">
                        <div className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-12 flex-frow-1 p-0">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Assignment</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Submission Details</p>
                        </div>
                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-12 mt-sm-0 mt-2">
                            <div className="row gap-sm-0 gap-3">
                                <div className="col-lg-3 col-md-3 col-sm-3 col-5 text-sm-end text-start ps-0 align-self-center">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                                        <span className='font12 textVerticalCenter'>
                                            <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to CSV</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-5 text-sm-end text-start ps-0 align-self-center">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                        <span className='font12 textVerticalCenter'>
                                            <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to PDF</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-sm-end text-start ps-0">
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch font12" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn searchButtons text-white " type="button"><span className='font12'>Search</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bg-white rounded-2 p-3 mt-3">
                        <div className='d-flex p-2 headingBgColor cardradius2'>
                            <div className="col-3"><p>Submissions - <span className='greyText font12'>{allAssignmentData?.title}</span></p></div>
                            <div className="col-2"><p>Class - <span className='greyText font12'>{allAssignmentData?.classNo}</span></p></div>
                            <div className="col-2"><p>Section- <span className='greyText font12'>{allAssignmentData?.sectionName}</span></p></div>
                        </div>
                        <div className="overflow-scroll p-0 pt-3">
                            {allSubmissionData && allSubmissionData.length === 0 ? (
                                <div className="d-flex justify-content-center p-5">
                                    <img src="./images/search.svg" alt="" className='img-fluid' />
                                </div>
                            ) : (
                                <>
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className='tableHeading text-center'><span className='font14'>#</span></th>
                                                <th className='tableHeading '><span className='font14'>Name</span></th>
                                                <th className='tableHeading '><span className='font14'>Email</span></th>
                                                <th className='tableHeading '><span className='font14'>Status</span></th>
                                                <th className='tableHeading '><span className='font14'>Result</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                            {allSubmissionData.map((item, index) => (
                                                <tr key={item.id} className='align-middle'>
                                                    <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                                    <td className='greyText'><span className='font14 align-self-start'>{item.studentName}</span></td>
                                                    <td className='greyText'><span className='font14 align-self-start'>{item.studentEmail}</span></td>
                                                    <td className='greyText'>{item.status ? <span className='font14 align-self-start activeText'>Submitted</span> : <span className='font14 align-self-start deactiveText'>Not Submitted</span>}</td>
                                                    <td className='greyText'><span className='font14 align-self-start'>{item.marks}</span></td>
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
                    <Toaster/>
                </div>
            </Container>
        </>
    )
}

export default SubmitAssignment