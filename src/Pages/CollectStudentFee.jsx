import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewFeeApi, getAllFeeDiscountApi, getCollectedStudentFeeByIdApi, getStudentDataByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
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
        box-shadow: none !important;
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

    .greyText{
      color: var(--greyTextColor) !important;
    }

    .modal-footer{
        border: none !important;
    }
    

`;


const CollectStudentFee = () => {

    const { id } = useParams();

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    const [studentFeeRes, setStudentFeeRes] = useState([]);
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')

    const [FeeDiscountData, setFeeDiscountData] = useState([])

    const [AddFeeId, setAddFeeId] = useState('')
    const [FeeName, setFeeName] = useState('')
    const [CurrDate, setCurrDate] = useState('')
    const [PaidAmount, setPaidAmount] = useState('')
    const [DiscountCode, setDiscountCode] = useState('')
    const [FineAmount, setFineAmount] = useState('')
    const [PaymentMode, setPaymentMode] = useState('')
    const [Note, setNote] = useState('')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getStudentDataById();
        getAllCollectFeesByStudentId();
        getAllFeeDiscountData()
    }, [token, pageNo])

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getStudentDataById = async () => {
        try {
            setloaderState(true);
            var response = await getStudentDataByIdApi(id);
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

    const getAllCollectFeesByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCollectedStudentFeeByIdApi(id, pageSize, pageNo);
            console.log(response, 'feeeeee')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentFeeRes(response?.data?.feePaid)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
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

    const getAllFeeDiscountData = async () => {
        try {
            setloaderState(true);
            const page='';
            const size='';
            var response = await getAllFeeDiscountApi(searchByKey, page, size);
            console.log(response, 'fee discount')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeDiscountData(response?.data?.feeDiscounts);
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const AddFee = async () => {
        try {
          const formData = new FormData();
          formData.append('date', CurrDate);
          formData.append('paidAmount', PaidAmount);
          formData.append('discountCode', DiscountCode);
          formData.append('fineAmount', FineAmount);
          formData.append('paymentMode', PaymentMode);
          formData.append('note', Note);
    
          var response = await addNewFeeApi(AddFeeId, formData);
          console.log(response);
          if (response?.status === 200) {
            if (response?.data?.status === 'success') {
              setloaderState(false);
              toast.success(response?.data?.message)
            }
            else {
              setloaderState(false);
              toast.error(response?.data?.message)
            }
          }
    
        }
        catch {
    
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
                                            <th className='greyText font14'>{index+1}</th>
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
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#AddFee" onClick={() => {setAddFeeId(item.feePaidId), setFeeName(item.feeGroup.split('_').join(' '))}}>
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
                </div>

                <div className="modal modal-md fade" id="AddFee" tabIndex="-1" aria-labelledby="AddFeeLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content ps-3 pe-3">
                            <div className="modal-header ps-0 pe-0">
                                <span className="modal-title font16" id="AddFeeLabel">{FeeName}</span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-bod p-1">
                                <div className="container-fluid p-0">
                                    <div className="row">
                                        <form className=''>
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Date</label>
                                                <input type="date" className="form-control font14" id="inputEmail3" placeholder='10/04/2024' onChange={(e)=> setCurrDate(e.target.value)}/>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Amount</label>
                                                <input type="text" className="form-control font14" id="inputEmail3" placeholder='Enter Amount' onChange={(e)=> setPaidAmount(e.target.value)}/>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Discount Group</label>
                                                <select className="form-select font14" aria-label="Default select example" onChange={(e)=> setDiscountCode(e.target.value)}>
                                                    <option defaultValue>Select Discount Group</option>
                                                    {FeeDiscountData.map((option)=> (
                                                        <option value={option.feeDiscountCode}>{option.feeDiscountName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Discount</label>
                                                <input type="text" className="form-control font14" id="inputEmail3" placeholder='0.00' onChange={(e)=> setDiscountCode(e.target.value)}/>
                                            </div> */}
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Fine</label>
                                                <input type="text" className="form-control font14" id="inputEmail3" placeholder='0.00' onChange={(e)=> setFineAmount(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Payment Mode</label>
                                                <select className="form-select font14" aria-label="Default select example" onChange={(e)=> setPaymentMode(e.target.value)}>
                                                    <option defaultValue>Select Discount Group</option>
                                                    <option value='Offline'>Offline</option>
                                                    <option value='Online'>Online</option>
                                                    {/* {FeeDiscountData.map((option)=> (
                                                        <option value={option.feeDiscountCode}>{option.feeDiscountName}</option>
                                                    ))} */}
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="inputEmail3" className="form-label font14">Note</label>
                                                <input type="text" className="form-control font14" id="inputEmail3" placeholder='Enter Note' onChange={(e)=> setNote(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className='btn printButtons text-white' type='button' onClick={AddFee}>Add Fee</button>
                                <button type="button" className="btn cancelButtons" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="PrintFee" tabIndex="-1" aria-labelledby="PrintFeeLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="PrintFeeLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Toaster />
            </div>
        </Container>
    )
}

export default CollectStudentFee