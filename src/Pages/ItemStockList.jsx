import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewIssueItemApi, deleteIssueItemByIdApi, deleteItemStockByIdApi, getAllIssueItemApi, getAllItemApi, getAllItemStockApi, getIssueItemByIdApi, updateIssueItemByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import EditItemStock from '../Modals/ItemStock/EditItemStock';

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
    
`;

const ItemStockList = ({Reload}) => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [searchByKey, setSearchByKey] = useState('');
  const [ItemStockData, setItemStockData] = useState([]);
  const [EditId, setEditId] = useState('');
  const [DeleteId, setDeleteId] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    getAllItemStockData();
  }, [token, pageNo, pageSize, Reload])

  const getAllItemStockData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemStockApi(pageNo, pageSize);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemStockData(response?.data?.itemStock);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);
          toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'stock');
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const DeleteItemStockById = async () => {
    if (isChecked) {
      try {
        var response = await deleteItemStockByIdApi(DeleteId);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.message)
          }
        }
        else {
          toast.error(response?.error, 'dlt');
        }
      }
      catch (error) {
        console.error('Error during login:', error);
      }
    }
  }



  return (
    <Container>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="container-fluid">
        <div className="row pb-3">
          <p className='font20 mb-2 mt-3 p-0'>Item Stock List</p>
          <table className="table align-middle table-striped table-bordered">
            <thead>
              <tr>
                <th className='font14'>#</th>
                <th className='font14'>Item</th>
                <th className='font14'>Item Category</th>
                <th className='font14'>Supplier</th>
                <th className='font14'>Store</th>
                <th className='font14'>QTY</th>
                <th className='font14'>Purchase Price ($)</th>
                <th className='font14'>Date</th>
                <th className='text-center font14'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {ItemStockData.map((item, index) => (
                <tr key={item.id} className='align-middle'>
                  <td className='greyText font14'>{index + 1}</td>
                  <td className='greyText font14'>{item.itemName}</td>
                  <td className='greyText font14'>{item.itemCategory}</td>
                  <td className='greyText font14'>{item.supplierName}</td>
                  <td className='greyText font14'>{item.storeName}</td>
                  <td className='greyText font14'>{item.itemQuantity}</td>
                  <td className='greyText font14'>{item.purchasePrice}</td>
                  <td className='greyText font14'>{item.dateCreated}</td>
                  <td className='text-center'>
                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editItemStock" aria-controls="editItemStock" onClick={() => setEditId(item?.id)}>
                      <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                    </button>
                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteItemStock" aria-controls="deleteItemStock" onClick={() => setDeleteId(item?.id)}>
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
        </div>
      </div>



      {/* Edit Item */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editItemStock" aria-labelledby="editItemStockLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="editItemStockLabel">Edit Item Stock</h2>
        </div>
        <div className="offcanvas-body p-0 pt-3">
          <EditItemStock EditId={EditId} ReloadData={Reload}/>
        </div>
      </div>

      {/* Delete Item */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteItemStock" aria-labelledby="deleteItemStockLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="deleteItemStockLabel">Delete Item</h2>
        </div>
        <div className="offcanvas-body p-0 pt-3">
          {DeleteWarning
            ?
            <>
              <div className=''>
                <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                <p className='text-center warningHeading'>Are you Sure?</p>
                <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                <p className='text-center p-3'>
                  <button className='btn deleteButtons text-white' onClick={DeleteItemStockById}>Delete</button>
                  <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                </p>
              </div>
            </>
            :
            <>
              <div className="">
                <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                  <p className='warningHeading'>Successful Deleted</p>
                  <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                </div>
                <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllItemStockData}>Continue</button>
              </div>
            </>
          }
        </div>
      </div>



      <Toaster />
    </Container>
  )
}

export default ItemStockList