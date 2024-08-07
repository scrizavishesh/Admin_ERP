import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getAllClassApi, getAllOfflineExamApi, getFeeByPaymentIdApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

  .blueText{
    color: var(--blueTextColor);
  }

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

  .greyText{
    color: var(--greyTextColor) !important;
  }
    
`;

const SearchFeePayment = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('')
  const [PaymentId, setPaymentId] = useState('')
  const [FeePaidData, setFeePaidData] = useState()

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };


  const getFeePaidData = async () => {
    try {
      setloaderState(true);
      var response = await getFeeByPaymentIdApi(PaymentId);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setFeePaidData(response?.data?.feePaid);
          toast.success(response?.data?.message);
          setloaderState(false);
        }
        else {
          console.log('error', response?.data?.status)
          toast.error(response?.data?.message);
          setloaderState(false);
        }
      }
      else {
        console.log('error')
        toast.error(response?.data?.message);
        setloaderState(false);
      }
    }
    catch (error) {
      console.log(error)
      setloaderState(false);
    }
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
            <div className="col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
              <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                  <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Search Fee Payment</li>
                </ol>
              </nav>
              <p className='font14 ps-0 fontWeight500'>Search Fee Payment Details</p>
            </div>
            <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12 pe-0">
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
                    <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                      <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="bg-white rounded-2 p-4">
              <form className="row pb-4">
                <div className="col-xl-4 col-md-6 col-9">
                  <label htmlFor="inputEmail4" className="form-label font14">Payment ID Details</label>
                  <input className="form-control formcontrolsearch font14" type='text' onChange={(e) => setPaymentId(e.target.value)} />
                </div>
                <button type='button' className='btn col-3 printButtons text-white align-self-end' onClick={getFeePaidData}>Search</button>
              </form>
              <div className="row">
                <div className="row overflow-scroll">
                  {FeePaidData
                    ?
                    <>
                      <table className="table align-middle table-striped">
                        <thead>
                          <tr>
                            <th className=''><span className='font14'>Payment Id</span></th>
                            <th><span className='font14'>Date</span></th>
                            <th><span className='font14'>Name</span></th>
                            <th><span className='font14'>Class</span></th>
                            <th><span className='font14'>Fee Group</span></th>
                            <th><span className='font14'>Mode</span></th>
                            <th><span className='font14'>Paid</span></th>
                            <th><span className='font14'>Discount</span></th>
                            <th><span className='font14'>Fine</span></th>
                            <th className='text-center'><span className='font14'>Action</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='align-middle'>
                            <td className='greyText font14'>{FeePaidData.paymentId}</td>
                            <td className='greyText font14'>{FeePaidData.paymentDate}</td>
                            <td className='greyText font14'>{FeePaidData.studentName}</td>
                            <td className='greyText font14'>{FeePaidData.classNo}</td>
                            <td className='greyText font14'>{FeePaidData.feeGroup}</td>
                            <td className='greyText font14'>{FeePaidData.paymentMode}</td>
                            <td className='greyText font14'>{FeePaidData.paid}</td>
                            <td className='greyText font14'>{FeePaidData.discount}</td>
                            <td className='greyText font14'>{FeePaidData.fineAmount}</td>
                            <td className='text-end'>
                              <button className="btn btn-sm editButton" type="button"> Edit </button>
                            </td>
                          </tr>
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
                    <>
                      <div className="d-flex justify-content-center p-5">
                        <img src="./images/search.svg" alt="" className='img-fluid' />
                      </div>
                    </>
                  }


                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </>
  )
}

export default SearchFeePayment