import React, { useEffect, useState } from 'react'
import { getCollectedStudentFeeByIdApi, getStudentDataByIdApi } from '../Utils/Apis';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';

const Container = styled.div`
    
`;

const FeeDataOfStudent = ({ StudentId }) => {

    const id = StudentId;

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    // Variable State
    const [studentFeeRes, setStudentFeeRes] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getAllCollectFeesByStudentId();
    }, [token, StudentId, pageNo])

    const getAllCollectFeesByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCollectedStudentFeeByIdApi(StudentId, pageSize, pageNo);
            console.log(response, 'feeeeee')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentFeeRes(response?.data?.feePaid)
                    toast.success(response?.data?.message);
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
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


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                                <th className=''><span className='font14'>#</span></th>
                                <th><span className='font14'>Fee Group</span></th>
                                <th><span className='font14'>Fee Code</span></th>
                                <th><span className='font14'>Due Date</span></th>
                                <th><span className='font14'>Status</span></th>
                                <th><span className='font14'>Amount</span></th>
                                <th><span className='font14'>Payment Id</span></th>
                                <th><span className='font14'>Mode</span></th>
                                <th><span className='font14'>Payment Date</span></th>
                                <th><span className='font14'>Discount</span></th>
                                <th><span className='font14'>Fine</span></th>
                                <th><span className='font14'>Paid</span></th>
                                <th><span className='font14'>Balance</span></th>
                                <th className='text-center'><span className='font14'>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            {studentFeeRes.map((item, index) => (
                                <tr className='align-middle'>
                                    <th className='greyText font14'>{index + 1}</th>
                                    <td className='greyText font14'>{item.feeGroup.split('_').join(' ')}</td>
                                    <td className='greyText font14'>{item.feeType}</td>
                                    <td className='greyText font14'>{item.dueDate}</td>
                                    <td className='greyText font14'>{item.mode}</td>
                                    <td className='greyText font14'>{item.amount}</td>
                                    <td className='greyText font14'>{item.paymentId}</td>
                                    <td className='greyText font14'>{item.paymentMode}</td>
                                    <td className='greyText font14'>{item.paymentDate}</td>
                                    <td className='greyText font14'>{item.discount}</td>
                                    <td className='greyText font14'>{item.fineAmount}</td>
                                    <td className='greyText font14'>{item.paid}</td>
                                    <td className='greyText font14'>{item.balance}</td>
                                    <td className='text-end'>
                                        <div className="dropdown dropdownbtn">
                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span>Action</span>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#AddFee" onClick={() => setEditId(item.id)}>
                                                        Add Fee
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#PrintFee" onClick={() => setDelOfflineExamIDD(item.id)}>
                                                        Print
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
            <Toaster />
        </Container>
    )
}

export default FeeDataOfStudent