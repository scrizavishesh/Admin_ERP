import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import ViewParticularFeeDiscount from '../Modals/FeeDiscount/ViewParticularFeeDiscount';
import ViewAllFeeDiscount from '../Modals/FeeDiscount/ViewAllFeeDiscount';
import { addNewFeeDiscountApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

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
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .form-check-input:checked{
    background-color: #008479;
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

const FeesDiscount = () => {

  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [showGetByIdData, setShowGetByIdData] = useState(false);
  const [DiscountNameValue, setDiscountNameValue] = useState('');
  const [DiscountCodeValue, setDiscountCodeValue] = useState('');
  const [DiscountDescriptionValue, setDiscountDescriptionValue] = useState('');
  const [AddDiscountType, setAddDiscountType] = useState('');
  const [Percentage, setPercentage] = useState('');
  const [Amount, setAmount] = useState('');
  const [AddWarning, setAddWarning] = useState(true);
  const [ViewFeeDiscountId, setViewFeeDiscountId] = useState('')

  const dataHandle = () => {
    setShowGetByIdData(true)
  }

  const dataHandleState = () => {
    setShowGetByIdData(false)
  }

  const UpdatingViewId = (id) => {
    setViewFeeDiscountId(id)
  }


  const AddNewFeeDiscount = async () => {
    try {
      const formData = new FormData();
      formData.append('feeDiscountName', DiscountNameValue);
      formData.append('feeDiscountCode', DiscountCodeValue);
      formData.append('feeDiscountDescription', DiscountDescriptionValue);
      formData.append('percentage', parseInt(Percentage));
      formData.append('discountValue', parseInt(Amount));

      var response = await addNewFeeDiscountApi(formData);
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
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees Discount</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Fees Discount Details</p>
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
                  <div className="col-md-7 col-sm-12 col-8 text-sm-end text-start ps-0 pe-0">
                    <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                      <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                    </form>
                  </div>
                  <div className="col-md-5 col-sm-12 col-4">
                    <div className="row justify-content-end">
                      <button className="btn addButtons3 text-white font14 textVerticalCenter" type="button" data-bs-toggle="offcanvas" data-bs-target="#addFeeDiscount" aria-controls="addFeeDiscount">+ Add Fees Discount</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {showGetByIdData ? <ViewParticularFeeDiscount ViewFeeDiscountId={ViewFeeDiscountId}  goData={dataHandleState} /> : <ViewAllFeeDiscount goData={dataHandle} ViewId={UpdatingViewId} />}
          </div>
        </div>
      </div>


      {/* Add Fee Master */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeDiscount" aria-labelledby="addFeeDiscountLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Add Fees Discount</h2>
        </div>
        <div className="offcanvas-body p-3">
          {AddWarning
            ?
            <>
              <form className='row' action="">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                  <input type="text" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Name" onChange={(e) => setDiscountNameValue(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Discount Code</label>
                  <input type="text" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Discount Code" onChange={(e) => setDiscountCodeValue(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail4" className="form-label font14">Discount Type</label>
                  <div className="d-flex justify-content-between">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" defaultChecked disabled />
                      <label className="form-check-label font14" htmlFor="exampleRadios3">
                        None
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="percentage" onChange={(e) => setAddDiscountType(e.target.value)} onClick={()=> setAmount(0)}/>
                      <label className="form-check-label font14" htmlFor="exampleRadios1">
                        Percentage
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="amount" onChange={(e) => setAddDiscountType(e.target.value)} onClick={()=> setPercentage(0)}/>
                      <label className="form-check-label font14" htmlFor="exampleRadios2">
                        Amount
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                      <input type="number" className="form-control font14 " id="exampleFormControlInput1" placeholder="0%" disabled={AddDiscountType === 'amount'} value={Percentage} onChange={(e) => setPercentage(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label font14">Amount</label>
                      <input type="number" className="form-control font14 " id="exampleFormControlInput1" placeholder="0.00" disabled={AddDiscountType === 'percentage'} value={Amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                  <input type="text" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Description" onChange={(e) => setDiscountDescriptionValue(e.target.value)} />
                </div>
              </form>
              <p className='text-center p-3'>
                <button className='btn addButtons2 font14 text-white me-2' onClick={AddNewFeeDiscount}>Add Fee Discount</button>
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
                    <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                  </div>
                  <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=> xsetAddWarning(true)}>Continue</button>
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

export default FeesDiscount