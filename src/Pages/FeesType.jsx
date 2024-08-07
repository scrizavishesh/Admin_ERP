import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewFeeTypeApi, deleteFeeTypeByIdApi, getAllClassApi, getAllFeeTypeApi, getAllOfflineExamApi, getFeeTypeByIdApi, updateFeeTypeByIdApi } from '../Utils/Apis';
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
    
`;

const FeesType = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('');
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [feeTypeName, setFeeTypeName] = useState('');
  const [feeTypeCode, setFeeTypeCode] = useState('');
  const [feeTypeDescription, setFeeTypeDescription] = useState('');
  const [AddWarning, setAddWarning] = useState(true);
  const [EditWarning, setEditWarning] = useState(true);
  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [DelFeeTypeIdData, setDelFeeTypeIdData] = useState();
  const [EditFeeTypeIdData, setEditFeeTypeIdData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [EditFeeTypeName, setEditFeeTypeName] = useState('');
  const [EditFeeTypeCode, setEditFeeTypeCode] = useState('');
  const [EditFeeTypeDescription, setEditFeeTypeDescription] = useState('');
  const [OriginalFeeTypeName, setOriginalFeeTypeName] = useState('');
  const [OriginalFeeTypeCode, setOriginalFeeTypeCode] = useState('');
  const [OriginalFeeTypeDescription, setOriginalFeeTypeDescription] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllFeeTypeData();
  }, [token, pageNo, pageSize])

  const getAllFeeTypeData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeTypeApi(searchByKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setFeeTypeData(response?.data?.feeTypes);
          console.log(response?.data?.feeTypes);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);
          toast.success(response.data.message);
          setAddWarning(true);
          setEditWarning(true);
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
      console.log('Error Facing during Get All Fee Type API - ', error)
    }
  }

  const addNewFeeType = async () => {
    try {
      const formData = new FormData();
      formData.append('feeTypeName', feeTypeName);
      formData.append('feeTypeCode', feeTypeCode);
      formData.append('description', feeTypeDescription);

      var response = await addNewFeeTypeApi(formData);
      console.log(response);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAddWarning(false);
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

  const getFeeTypeDataById = async (id) => {
    try {
      setEditFeeTypeIdData(id)
      setloaderState(true);
      var response = await getFeeTypeByIdApi(id);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setEditFeeTypeName(response?.data?.feeType?.feeTypeName)
          setEditFeeTypeCode(response?.data?.feeType?.feeTypeCode)
          setEditFeeTypeDescription(response?.data?.feeType?.description)
          setOriginalFeeTypeName(response?.data?.feeType?.feeTypeName)
          setOriginalFeeTypeCode(response?.data?.feeType?.feeTypeCode)
          setOriginalFeeTypeDescription(response?.data?.feeType?.description)
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
      console.log('Error Facing during Get All Fee Type API - ', error)
    }
  }

  const updateFeeTypeById = async (id) => {
    try {
      const formData = new FormData();
      if(EditFeeTypeName !== OriginalFeeTypeName){
        formData.append('feeTypeName', EditFeeTypeName);
      }
      if(EditFeeTypeCode !== OriginalFeeTypeCode){
        formData.append('feeTypeCode', EditFeeTypeCode);
      }
      if(EditFeeTypeDescription !== OriginalFeeTypeDescription){
        formData.append('feeTypeDescription', EditFeeTypeDescription);
      }

      var response = await updateFeeTypeByIdApi(id,formData);
      console.log(response);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setEditWarning(false);
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

  const DeleteFeeTypeById = async (id) => {
    if (isChecked) {
      try {
        var response = await deleteFeeTypeByIdApi(id);
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
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees Type</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Fees Type Details</p>
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
                      <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllFeeTypeData}>Search</span></button>
                    </form>
                  </div>
                  <div className="col-md-4 col-sm-12 col-4">
                    <div className="row justify-content-end">
                      <button className="btn addButtons2 text-white font14 textVerticalCenter" type="button" data-bs-toggle="offcanvas" data-bs-target="#addFeeType" aria-controls="addFeeType">+ Add Fees Type</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <table className="table align-middle table-striped">
              <thead>
                <tr>
                  <th><span className='font14'>Fee Type Name</span></th>
                  <th><span className='font14'>Fees code</span></th>
                  <th className='text-end'><span className='font14'>Action</span></th>
                </tr>
              </thead>
              <tbody>
                {feeTypeData
                 ?
                  feeTypeData.map((item) => (
                  <tr key={item.feeTypeId} className='align-middle'>
                    <td className='greyText font14'>{item.feeTypeName}</td>
                    <td className='greyText font14'>{item.feeTypeCode}</td>
                    <td className='text-end'>
                      <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editFeeType" aria-controls="editFeeType" onClick={()=> getFeeTypeDataById(item.feeTypeId)}>
                        <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                      </button>
                      <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteFeeType" aria-controls="deleteFeeType" onClick={()=> setDelFeeTypeIdData(item.feeTypeId)}>
                        <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                      </button>
                    </td>
                  </tr>
                ))
                 :
                 <p className='text-danger font14'>No Data Found</p>
                }

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


      {/* Add Fee Type */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeType" aria-labelledby="addFeeTypeLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Add Fees Type</h2>
        </div>
        <div className="offcanvas-body p-3">
          {AddWarning
            ?
            <>
              <form className='row' action="">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1 font14" className="form-label">Name</label>
                  <input type="email" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Name" onChange={(e) => setFeeTypeName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1 font14" className="form-label">Fees Code*</label>
                  <input type="email" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Code" onChange={(e) => setFeeTypeCode(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1 font14" className="form-label">Description</label>
                  <textarea className="form-control font14" id="exampleFormControlTextarea1" rows="3" placeholder='Text Description......' onChange={(e) => setFeeTypeDescription(e.target.value)}></textarea>
                </div>
              </form>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' onClick={() => addNewFeeType()}>Add Fee Type</button>
                <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
              </p>
            </>
            :
            <>
              <div>
                <div className="mt-3">
                  <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                  <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                    <p className='warningHeading'>Successful Added</p>
                    <p className='greyText warningText pt-2'>Your Fee Type has been<br />Successfully Saved</p>
                  </div>
                  <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllFeeTypeData}>Continue</button>
                </div>
              </div>
            </>
          }
        </div>
      </div>


      {/* Edit Fee Type */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeType" aria-labelledby="editFeeTypeLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Fees Type</h2>
        </div>
        <div className="offcanvas-body p-3">
          {EditWarning
            ?
            <>
              <form className='row' action="">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1 font14" className="form-label">Name</label>
                  <input type="email" className="form-control font14" id="exampleFormControlInput1" value={EditFeeTypeName} onChange={(e) => setEditFeeTypeName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1 font14" className="form-label">Fees Code*</label>
                  <input type="email" className="form-control font14" id="exampleFormControlInput1" value={EditFeeTypeCode} onChange={(e) => setEditFeeTypeCode(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1 font14" className="form-label">Description</label>
                  <textarea className="form-control font14" id="exampleFormControlTextarea1" rows="3" value={EditFeeTypeDescription} onChange={(e) => setEditFeeTypeDescription(e.target.value)}></textarea>
                </div>
              </form>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' onClick={() => updateFeeTypeById(EditFeeTypeIdData)}>Update Fee Type</button>
                <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
              </p>
            </>
            :
            <>
              <div>
                <div className="mt-3">
                  <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                  <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                    <p className='warningHeading'>Successful Updated</p>
                    <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                  </div>
                  <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllFeeTypeData}>Continue</button>
                </div>
              </div>
            </>
          }
        </div>
      </div>


      {/* Delete Fee Type */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeType" aria-labelledby="deleteFeeTypeLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Delete Fees Type</h2>
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
                  <button className='btn deleteButtons text-white' onClick={() => DeleteFeeTypeById(DelFeeTypeIdData)}>Delete</button>
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
                  <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllFeeTypeData}>Continue</button>
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

export default FeesType