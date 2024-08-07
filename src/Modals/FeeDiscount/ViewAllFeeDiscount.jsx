import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { deleteFeeDiscountByIdApi, getAllFeeDiscountApi, getFeeDiscountByIdApi } from '../../Utils/Apis'
import DataLoader from '../../Layouts/Loader'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'

const Container = styled.div``;

const ViewAllFeeDiscount = ({ goData, ViewId }) => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, stSearchByKey] = useState('')
    const [FeeDiscountData, setFeeDiscountData] = useState([])
    const [DeleteWarning, setDeleteWarning] = useState(true)
    const [DelFeeDiscountIdData, setDelFeeDiscountIdData] = useState('')
    const [EditFeeDiscountId, setEditFeeDiscountId] = useState('')

    const [EditFeeDiscountName, setEditFeeDiscountName] = useState('');
    const [EditFeeDiscountCode, setEditFeeDiscountCode] = useState('');
    const [EditFeeDiscountDescription, setEditFeeDiscountDescription] = useState('');
    const [EditFineType, setEditFineType] = useState('');
    const [EditFineAmount, setEditFineAmount] = useState('');

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllFeeDiscountData();
    }, [token, pageNo])


    const getAllFeeDiscountData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeDiscountApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeDiscountData(response?.data?.feeDiscounts);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    toast.success(response.data.message);
                    setDeleteWarning(true)
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

    const getFeeDiscountDataById = async (id) => {
        try {
            setloaderState(true);
            setEditFeeDiscountId(id)
            var response = await getFeeDiscountByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setEditFeeDiscountName(response?.data?.feeGroup?.feeDiscountName);
                    setEditFeeDiscountCode(response?.data?.feeGroup?.feeDiscountCode);
                    setEditFeeDiscountDescription(response?.data?.feeGroup?.feeDiscountDescription);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    toast.success(response.data.message);
                    setDeleteWarning(true)
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

    const DeleteFeeDiscountById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteFeeDiscountByIdApi(id);
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

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handlePage = (id) => {
        goData(true)
        ViewId(id)
    }

    return (
        <Container className='container-fluid'>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <th className=''><span className='font14'>#</span></th>
                            <th><span className='font14'>Name</span></th>
                            <th><span className='font14'>Discount Code</span></th>
                            <th><span className='font14'>Percentage (%)</span></th>
                            <th><span className='font14'>Amount</span></th>
                            <th className='text-center'><span className='font14'>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {FeeDiscountData.map((item, index) => (
                            <tr key={item.feeDiscountId} className='align-middle'>
                                <th className='greyText'><h3>{index + 1}</h3></th>
                                <td className='greyText font14'>{item.feeDiscountName}</td>
                                <td className='greyText font14'>{item.feeDiscountCode}</td>
                                <td className='greyText font14'>{item.discountPercentage ? item.discountPercentage :<span>-</span>}</td>
                                <td className='greyText font14'>{item.discountValue ? item.discountValue :<span>-</span>}</td>
                                <td className='text-center'>
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' onClick={() => handlePage(item.feeDiscountId)}>
                                        <Icon icon="gridicons:tag" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                    </button>
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editFeeDiscount" aria-controls="editFeeDiscount" onClick={() => getFeeDiscountDataById(item.feeDiscountId)}>
                                        <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                    </button>
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' onClick={() => setViewFeeDiscountId(item.feeDiscountId)}>
                                        <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                    </button>
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
                {/* {FeeDiscountData.length > 0
                    ?
                    <>
                        
                    </>
                    :
                    <p className='p-5 text-center'><img src="./images/search.svg" alt="" className='img-fluid' /></p>
                } */}
            </div>

            {/* Edit Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeDiscount" aria-labelledby="editFeeDiscountLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Fees Discount</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <form className='row' action="">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                            <input type="text" className="form-control font14" id="exampleFormControlInput1" value={EditFeeDiscountName} onChange={(e)=> setEditFeeDiscountName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Discount Code</label>
                            <input type="text" className="form-control font14" id="exampleFormControlInput1" value={EditFeeDiscountCode} onChange={(e)=> setEditFeeDiscountCode(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Fine Type</label>
                            <div className="d-flex justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" checked={EditFineType === ""} value="" disabled readOnly />
                                    <label className="form-check-label font14" htmlFor="exampleRadios3">
                                        None
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" checked={EditFineType === "Percentage"} value="Percentage" onChange={(e) => setEditFineType(e.target.value)} />
                                    <label className="form-check-label font14" htmlFor="exampleRadios1">
                                        Percentage
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" checked={EditFineType === "FixedAmount"} value="FixedAmount" onChange={(e) => setEditFineType(e.target.value)} />
                                    <label className="form-check-label font14" htmlFor="exampleRadios2">
                                        Fixed Amount
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                                    <input type="text" className="form-control font14 " id="exampleFormControlInput1" value={EditFineType === 'Percentage' ? EditFineAmount : ''} disabled={EditFineType === 'FixedAmount'} onChange={(e) => setEditFineAmount(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Fix Amount</label>
                                    <input type="text" className="form-control font14 " id="exampleFormControlInput1" value={EditFineType === 'FixedAmount' ? EditFineAmount : ''} disabled={EditFineType === 'Percentage'} onChange={(e) => setEditFineAmount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                            <input type="text" className="form-control font14" id="exampleFormControlInput1" value={EditFeeDiscountDescription} onChange={(e)=> setEditFeeDiscountDescription(e.target.value)}/>
                        </div>
                    </form>
                    <p className='text-center p-3'>
                        <button className='btn addButtons2 font14 text-white me-2'>Edit Fee Discount</button>
                        <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </p>
                </div>
            </div>



            {/* Delete Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeMaster" aria-labelledby="deleteFeeMasterLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="deleteFeeGroupeLabel">Delete Fees Group</h2>
                </div>
                <div className="offcanvas-body p-3">
                    {DeleteWarning
                        ?
                        <>
                            <div className=''>
                                <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                <p className='text-center warningHeading'>Are you Sure?</p>
                                <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                <p className='text-center p-3'>
                                    <button className='btn deleteButtons text-white' onClick={() => DeleteFeeDiscountById(DelFeeDiscountIdData)}>Delete</button>
                                    <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <div >
                                <div className="">
                                    <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                    <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Deleted</p>
                                        <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllFeeMasterData}>Continue</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

            <Toaster />
        </Container>
    )
}

export default ViewAllFeeDiscount

