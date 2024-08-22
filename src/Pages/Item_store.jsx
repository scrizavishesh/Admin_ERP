import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { ItemStorePostApi } from '../Utils/Apis'
import { ItemStoreGetAllApi } from '../Utils/Apis'
import { ItemStoreDeleetApi } from '../Utils/Apis'
import { ItemStoreGetByIdApi } from '../Utils/Apis'
import { ItemUpdatedApi } from '../Utils/Apis'

import "flatpickr/dist/themes/light.css";
// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6 !important;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
}
.overflow-y {
  max-height: 300px; 
  overflow-y: auto; 
}
.my-own-outline-btn{
    border: 1px solid #008479;
    color: #008479;
}

.button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
.cancel-btn{
    color: #959494;
   border-color: #cdcdcd;
  
    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
    color: #fff ;
    pointer-events: none;
    background-color: #B50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
  background-color: #B50000;
  border-color: #B50000;
} 

.unpaid{
    background-color: #B50000;
    color: #fff;
    padding: 2px 10px;
    font-size: 13px;
    border-radius: 15px ;
    display: inline-block;
}
.paid{
    background-color: #00A67E;
    color: #fff;
    font-size: 13px;
    padding: 2px 10px;
    border-radius: 15px ;
    display: inline-block;
}
.my-green{
    background-color: #008479;
    color: #fff !important;
}
.modal-header{
    border-bottom: none !important;
}
.main{
    border-top: none !important;
}
.main-content{
    background-color: #F0F0FF;
    padding: 8px;
}
.img-content img{
    width: 80px;
}
.img-content {
    padding: 4px 0px 0px 4px;
}
.ul-1{
    list-style: none;
    color: #8F8F8F;
}
.ul-2{
    list-style: none;
}
.outer-border{
    border: 1px solid #DDDDEB;
    padding: 0px 12px 0px 12px;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  


const Item_store = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [searchKey, setSearchKey] = useState('')
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [income, setIncome] = useState('income')

  const [storeName, setStoreName] = useState()
  const [storeCode, setStoreCode] = useState()
  const [description, setDescription] = useState()

  const [active, setActive] = useState()


  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)

  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [ItemStoreData, setItemStoreData] = useState([])

  const [myIncomeCategoryData, setMyIncomeCategoryData] = useState([])
  console.log(' item store data', ItemStoreData)


  useEffect(() => {
    MyItemStoreGetAllApi()

}, [])

// Income category Post Api 
const MyItemCategoryPostApi = async () => {

  const formdata = {
    "storeName": storeName,
    "storeCode": storeCode,
    "description": description
  }
    setLoader(true)
    try {
        const response = await ItemStorePostApi(formdata);
        console.log('item store response', response)
        if (response?.status === 200) {
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);
                MyItemStoreGetAllApi()
                setHidedelete(true)
                if (response?.data?.status === "success") {
                    setActive(true)
                }
                setLoader(false)
                setShow(false)
                setHide(true)
            } else {
                toast.error(response?.data?.message);
                // setShow(true)
            }
        } else {
            toast.error(response?.data?.msg);
        }
    } catch (error) {
        console.log(error)
    }
}
   // Get All api  
   const MyItemStoreGetAllApi = async () => {
    setLoader(true)
    
    try {
      const response = await ItemStoreGetAllApi();
      console.log('my Item storeee all dataaaaa', response);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setItemStoreData(response?.data?.itemStore)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Delete api
  const MyItemStoreDelApi = async (id) => {
    setLoader(true)

    try {
      const response = await ItemStoreDeleetApi(id);
      console.log('my-item-delete-response', response)

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyItemStoreGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)

      } else {
        toast.error(response?.data?.message);
        setShowdelete(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

     // Get By Id  api  
     const MyItemStoreGetByIdApi = async (id) => {
      setIdForUpdate(id)
      setLoader(true)
      try {
        const response = await ItemStoreGetByIdApi(id);
        console.log('my Item storeee all by id  dataa', response);
        if (response?.status === 200) {
          toast.success(response?.data?.message)

          setStoreName(response?.data?.itemStore?.storeName)
          setStoreCode(response?.data?.itemStore?.storeCode)
          setDescription(response?.data?.itemStore?.description)

          setLoader(false)
        } else {
          toast.error(response?.data?.classes?.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
     // Put api 
   const MyItemCategoryPutApi = async () => {
    setLoader(true)
    try {
      const formdata = {
        "storeName": storeName,
        "storeCode": storeCode,
        "description": description
      }
      const response = await ItemUpdatedApi(IdForUpdate, formdata);
      console.log('MY_put-response_response12345654', response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setShowadd(false)
        setHideedit(true)
        MyItemStoreGetAllApi()
        setLoader(false)

      } else {
        toast.error(response?.data?.message);
        setShowadd(true)
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Inventory</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Item Store</Link></li>
              </ol>
            </nav>
          </div>
        
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Item Store</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">

            <div className="col-lg-4 col-md-6 col-sm-12  ">
              <div className="mb-3" >
                <label for="exampleFormControlInput1" className="form-label label-color heading-14">Item Store Name *</label>
                <input type="text" className="form-control form-focus form-control-sm   heading-14" value={active === true ? '' : storeName} onChange={(e) => setStoreName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Store " />
              </div>

              {/* <input type="text" class="form-control  form-control-sm form-focus font-color" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="name@example.com" /> */}

            </div>
            <div className="col-lg-4 col-md-6 col-sm-12  ">
              <div className="mb-3" >
                <label for="exampleFormControlInput1" className="form-label label-color heading-14">Item Store Code *</label>
                <input type="text" className="form-control form-focus form-control-sm   heading-14" value={active === true ? '' : storeCode} onChange={(e) => setStoreCode(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter code " />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="mb-3" >
                <label for="exampleFormControlInput1" className="form-label label-color heading-14">Description *</label>
                <input type="text" className="form-control form-focus form-control-sm   heading-14" value={active === true ? '' : description} onChange={(e) => setDescription(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter description " />
              </div>
            </div>

          </div>
          {/* ####### buttons ######  */}
          <div className="row mb-3 buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success my-green" onClick={MyItemCategoryPostApi}>Add Item Store</button>
              <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
          </div>
          <div>
            <p className='p-2 ps-4 heading-18'>Item Store List</p>
          </div>
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='' style={{ width: '10%' }}>#</th>
                  <th style={{ width: '30%' }}>Item Store Name</th>
                  <th style={{ width: '20%' }}>Item Store Code</th>
                  <th style={{ width: '30%' }}>Description</th>
                  <th style={{ width: '0' }}>Action</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
              
                {
                  ItemStoreData?.map((item, index) => (
                    <tr className='heading-14' >
                    <td className=' greyText'>{index + 1}</td>
                    <td className=' greyText' >{item.storeName}</td>
                    <td className=' greyText' >{item.storeCode}</td>
                    <td className=' greyText' >{item.description}</td>
                    <td className=' greyText' >
                      <div className='d-flex '>
                        <Link className="dropdown-item " to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234" onClick={(e) => MyItemStoreGetByIdApi(item.id)} >
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2813 8.92188L10.0781 4.71875L0.15625 14.6406V18.8438H4.35938L14.2813 8.92188ZM1.40625 17.5938V15.1563L10.0781 6.48438L12.5156 8.92188L3.84375 17.5938H1.40625Z" fill="#8F8F8F" />
                            <path d="M15.4688 17.5938H8.59375V18.8438H15.4688V17.5938Z" fill="#8F8F8F" />
                            <path d="M18.2812 17.5938H17.0312V18.8438H18.2812V17.5938Z" fill="#8F8F8F" />
                            <path d="M11.1875 3.625L15.3906 7.82812L18.25 4.9375L14.0625 0.75L11.1875 3.625ZM15.375 6.04687L12.9531 3.625L14.0625 2.51562L16.4844 4.9375L15.375 6.04687Z" fill="#8F8F8F" />
                          </svg>
  
                        </Link>
                        <Link className="dropdown-item " to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.id)}>
                          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.4043 4.96289L3.36906 20.0337" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3.36914 20.0332C3.36914 20.5666 3.80192 21 4.33396 21" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.33398 21H15.5491" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.5488 21C16.0809 21 16.513 20.5666 16.513 20.0332" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5131 20.0337L17.4792 4.96289H2.4043" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.2267 4.03125C19.2267 4.54226 18.813 4.95659 18.3027 4.95659" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.302 4.95508H1.5791" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.57925 4.95659C1.07032 4.95659 0.655273 4.54226 0.655273 4.03125" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M0.655273 4.03139C0.655273 3.52242 1.07032 3.10742 1.57925 3.10742" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.5791 3.10742H18.302" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.3027 3.10742C18.813 3.10742 19.2267 3.52247 19.2267 4.03139" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.8555 3.09247V1.64453" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.855 1.64445C12.855 1.11236 12.423 0.679688 11.8916 0.679688" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.8913 0.679688H7.99121" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.9915 0.679688C7.45875 0.679688 7.02734 1.11241 7.02734 1.64445" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.02734 1.64453V3.09247H12.855" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.69043 6.89258V18.769" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.52344 6.89258V18.769" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.3594 6.89258V18.769" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1914 6.89258V18.769" stroke="#8F8F8F" stroke-miterlimit="2.6131" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
  
                        </Link>
  
                      </div>
  
                    </td>
                  </tr>
                  ))}
              </tbody>
              <Toaster />
            </table>
          </div>

          <div className="row ">
            <div className='d-flex justify-content-between px-5'>
              <div className='heading-13'>
                <p>Showing 1 to 10 entries</p>
              </div>
              <div >
                <nav aria-label="Page navigation example">
                  <ul className="pagination my-pagina " >
                    <li className="page-item">
                      <a className="page-link pagination-a" href="#" aria-label="Previous">
                        <span aria-hidden="true">
                          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0.84875L7.1375 0L0 7L7.1375 14L8 13.1556L1.72917 7L8 0.84875Z" fill="black" />
                          </svg>
                        </span>
                      </a>
                      &nbsp;
                    </li>
                    &nbsp;
                    <li className="page-item"><a className="page-link pagination-a" href="#">1</a></li>&nbsp;
                    <li className="page-item"><a className="page-link pagination-a" href="#">2</a></li>&nbsp;
                    <li className="page-item"><a className="page-link pagination-a" href="#">3</a></li>&nbsp;
                    <li className="page-item"><a className="page-link pagination-a" href="#">4</a></li>&nbsp;
                    <li className="page-item"><a className="page-link pagination-a" href="#">5</a></li>&nbsp;
                    <li className="page-item">
                      <a className="page-link pagination-a" href="#" aria-label="Next" >
                        <span aria-hidden="true">
                          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.84875L0.8625 0L8 7L0.8625 14L0 13.1556L6.27083 7L0 0.84875Z" fill="black" />
                          </svg>

                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

          </div>
        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          {
            show && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Income</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div className="offcanvas-body pt-0">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Date</label>
                    <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setDate(e.target.value)} placeholder="Select Title" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Amount</label>
                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" />
                  </div>


                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label   heading-16">Income Category</label>
                    <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setCategoryId(e.target.value)} aria-label="Default select example" >
                      <option selected>Select Income Category</option>
                      {/* {
                        incomeCategoryData?.map(item =>
                          <option value={item.id}>{item.name}</option>
                        )
                      } */}
                    </select>
                  </div>
                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={''} >Add Income</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>

              </>


            )
          }
          {/* ################# After click ###############  */}
          {
            hide && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="delete-section  mt-5">
                  <div className="bg-container">
                    <div className="img-container">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Added</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
          {/* ##### offcanvase added  end ########  */}

        </div>
        {/* ##### offcanvas edit start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel">
          {
            showadd && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Item Category</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Item Store Name *</label>
                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" value={storeName}  onChange={(e) => setStoreName(e.target.value)} placeholder="Select Title" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Item Store Code *</label>
                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" value={storeCode}  onChange={(e) => setStoreCode(e.target.value)} placeholder="Select Title" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Description</label>
                    <textarea class="form-control" placeholder="Leave a comment here" value={description} onChange={(e) => setDescription(e.target.value)} id="floatingTextarea"></textarea>
                  </div>


                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={MyItemCategoryPutApi} >Update</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>

              </>


            )
          }
          {/* ################# After click ###############  */}
          {
            hideedit && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="delete-section  mt-5">
                  <div className="bg-container">
                    <div className="img-container">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Edit</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
          {/* ##### offcanvase edit end ########  */}
        </div>
        {/* ################ offcanvas delete start #############  */}

        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel">

          {
            showdelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-form-check-input" type="checkbox" onClick={(e) => setForDelete(true)} value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={(e) => MyItemStoreDelApi(IdForDelete)} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            )
          }
          {/* ############## After click ##############  */}

          {
            hidedelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p className='heading-20'>Successful Delete</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb my-button112233" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ################ offcanvas delete end #############  */}
      </div>

    </Container>
  )
}

export default Item_store
