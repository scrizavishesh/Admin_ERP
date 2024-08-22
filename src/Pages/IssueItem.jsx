import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewIssueItemApi, deleteIssueItemByIdApi, getAllIssueItemApi, getIssueItemByIdApi, returnItemApi, updateIssueItemByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
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

  .returnedBtn{
    background-color: none !important;
    border: 1px solid var(--returned);
    color: var(--returned);
    border-radius: var(--borderRadius14);
  }

  .clickToReturnBtn{
    background-color: none !important;
    border: 1px solid var(--clickToReturn);
    color: var(--clickToReturn);
    border-radius: var(--borderRadius14);
  }

  .modal-footer{
    border: none !important
  }
    
`;

const IssueItem = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('');
  const [IssueItemData, setIssueItemData] = useState([]);
  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [DelIssueItemIdData, setDelIssueItemIdData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [returnItemId, setReturnItemId] = useState('');
  const [GetByIdItemName, setGetByIdItemName] = useState('');
  const [GetByIdItemCategory, setGetByIdItemCategory] = useState('');
  const [GetByIdItemQuantity, setGetByIdItemQuantity] = useState('');

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllIssueItemData();
  }, [token, pageNo, pageSize])

  // useEffect(() => {
  //   const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  //   const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
  //   return () => {
  //     tooltipList.forEach(tooltip => tooltip.dispose());
  //   };
  // }, [IssueItemData]);

  const getAllIssueItemData = async () => {
    try {
      setloaderState(true);
      var response = await getAllIssueItemApi(pageNo, pageSize);
      console.log(response, )
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setIssueItemData(response?.data?.issueItem);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);
          toast.success(response.data.message);
          setDeleteWarning(true);
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

  const getIssueItemDataById = async (id) => {
    try {
      setReturnItemId(id)
      setloaderState(true);
      var response = await getIssueItemByIdApi(id);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setGetByIdItemName(response?.data?.issueItem?.itemName)
          setGetByIdItemCategory(response?.data?.issueItem?.itemCategory)
          setGetByIdItemQuantity(response?.data?.issueItem?.itemQuantity)
          toast.success(response?.data?.message);
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
      console.log('Error Facing during Get Fee Group By Id API - ', error)
    }
  }

  const returnItemById = async () => {
    try {
      var response = await returnItemApi(returnItemId);
      console.log(response, 'retrurn');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          getAllIssueItemData();
          $('.modal').each(function () {
            $(this).modal('hide');
          });
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

  const DeleteIssueItemById = async (id) => {
    if (isChecked) {
      try {
        var response = await deleteIssueItemByIdApi(id);
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



  return (
    <Container>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xxl-4 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Inventory</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue Item</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Issue Item</p>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
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
                      <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllIssueItemData}>Search</span></button>
                    </form>
                  </div>
                  <div className="col-md-4 col-sm-12 col-4">
                    <div className="row">
                      <Link className="text-center addButtons2 text-white font14 text-decoration-none p-2" type="button" to="/addIssueItem">+ Add Issue Item</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3">
            {IssueItemData.length > 0
              ?
              <>
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      <th className='font14'>#</th>
                      <th className='font14'>Item</th>
                      <th className='font14'>Note</th>
                      <th className='font14'>Item Category</th>
                      <th className='font14'>Issue - Return</th>
                      <th className='font14'>Issue  To</th>
                      <th className='font14'>Issued by</th>
                      <th className='font14'>QTY</th>
                      <th className='font14'>Status</th>
                      <th className='text-center font14'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IssueItemData.map((item, index) => (
                      <tr key={item.id} className='align-middle'>
                        <td className='greyText font14'>{index + 1}</td>
                        <td className='greyText font14'>{item.itemName}</td>
                        <td className='greyText font14'>{item.note}</td>
                        <td className='greyText font14'>{item.itemCategory}</td>
                        <td className='greyText font14'>{item.issueDate} - {item.returnDate}</td>
                        <td className='greyText font14'>{item.issuedToName}</td>
                        <td className='greyText font14'>{item.issuedByName}</td>
                        <td className='greyText font14'>{item.itemQuantity}</td>
                        <td className=''>
                          {item.status == 'ISSUED'
                            ?
                            <button type="button" className="btn clickToReturnBtn font14" data-bs-toggle="modal" data-bs-target="#ReturnModal" onClick={() => getIssueItemDataById(item.id)}> Click to Return </button>
                            :
                            <button type="button" className="btn returnedBtn font14"> Returned </button>
                          }
                        </td>
                        {/* <td className='greyText font14'>
                          {(item?.feeDescription).length > 100
                            ?
                            <>
                              <span className='me-2'>
                                {item.feeDescription.substring(0, 120) + "....."}
                              </span>
                              <button className='btn p-0' type='button' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-className="custom-tooltip" data-bs-title={item.feeDescription}>
                                <Icon className='' icon="ph:info-fill" width="1.5em" height="1.5em" style={{ color: '#C1C1C1' }} />
                              </button>
                            </>
                            :
                            item.feeDescription
                          }
                        </td> */}
                        <td className='text-center'>
                          <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteIssueItem" aria-controls="deleteIssueItem" onClick={() => setDelIssueItemIdData(item?.id)}>
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

      {/* Delete Fee Group */}
      <div className="modal modal-lg fade" id="ReturnModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="ReturnModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <div className="">
                  <p className="modal-title font14" id="ReturnModalLabel">Confirm Return</p>
                  <p className="modal-title font12" id="ReturnModalLabel">Are You Sure To Return This Item?</p>
                </div>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="overflow-scroll">
                <table className="table align-middle table-striped m-0">
                  <thead>
                    <tr>
                      <th className='font14'>#</th>
                      <th className='font14'>Item</th>
                      <th className='font14'>Item Category</th>
                      <th className='font14'>Quatity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    <tr>
                      <td className='greyText font14'>1.</td>
                      <td className='greyText font14'>{GetByIdItemName}</td>
                      <td className='greyText font14'>{GetByIdItemCategory}</td>
                      <td className='greyText font14'>{GetByIdItemQuantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn printButtons text-white font14" onClick={returnItemById}>Return</button>
              <button type="button" className="btn cancelButtons font14" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>


      {/* Delete Issue Item */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteIssueItem" aria-labelledby="deleteIssueItemeLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="deleteIssueItemeLabel">Delete Fees Group</h2>
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
                  <button className='btn deleteButtons text-white' onClick={() => DeleteIssueItemById(DelIssueItemIdData)}>Delete</button>
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
                  <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllIssueItemData}>Continue</button>
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

export default IssueItem