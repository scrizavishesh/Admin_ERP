import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

import { Link, useLocation } from 'react-router-dom';
import { NoticeGetByIdApi } from '../Utils/Apis'



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
    padding-bottom: 170px;
    /* height: 50vh; */
    border-radius: 5px;

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
  background-color: #F2F3F6;
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
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .my-placeholder::placeholder{
    color: #c9c8c8;
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


const NoticeViewPage = () => {

  const location = useLocation()

  const [transferIdData, setTransferIdData] = useState([])

  // setTransferId(location.state.id)

    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [showdelete, setShowdelete] = useState(true)
  
  const UpdateHandleBtn = (e) =>{
  
    if(show === true && hide === false){
      setShow(false)
      setHide(true)
    } else {
      setShow(true)
    }
  }
  
  const showNamedelete = () =>{
    if(showdelete === true && hidedelete === false){
      setShowdelete(false)
      setHidedelete(true)
    } else {
      setShowdelete(true)
    }
  }

  useEffect(()=>{
    MyNoticeGetByIdApi(location.state.id)
  },[location.state.id])

  // Get by id 
  
  const MyNoticeGetByIdApi = async (id) => {
  try {
    const response = await NoticeGetByIdApi(id);
    console.log('NOTICE-VIEW data get by id',response)
    setTransferIdData(response?.data?.notice)
    if (response?.status === 200) {
      toast.success(response?.data?.msg);

    } else {
      toast.error(response?.data?.msg);
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Container>

      <div className="container-fluid main-body p-3">
 
     <div className='d-flex justify-content-between for-dislay-direction'>
 
     <div className="breadCrum ms-2">
     <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
         <ol className="breadcrumb ms-2">
             <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
             {/* <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li> */}
             <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Notice</Link></li>
         </ol>
     </nav>
     </div>
     <div className='d-flex g-1 for-media-query'>
         <button type="button " className="btn export1 btn-outline-secondary my-own-outline-btn me-2 ">
           <span>  
             <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479"/>
             </svg>
             </span> &nbsp; 
             <span>Export to CSV</span>
         </button>
         <button type="button " className="btn export2 btn-outline-secondary my-own-outline-btn me-2 ">
           <span>  
             <svg width="14" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4.37317 11.25C4.02799 11.25 3.74817 11.5299 3.74817 11.875V14.375C3.74817 14.7201 4.02799 15 4.37317 15C4.71834 15 4.99817 14.7201 4.99817 14.375V14.167H5.41467C6.22018 14.167 6.87317 13.514 6.87317 12.7085C6.87317 11.903 6.22018 11.25 5.41467 11.25H4.37317ZM5.41467 12.917H4.99817V12.5H5.41467C5.52982 12.5 5.62317 12.5934 5.62317 12.7085C5.62317 12.8236 5.52982 12.917 5.41467 12.917Z" fill="#008479"/>
               <path d="M11.249 11.8743C11.2495 11.5294 11.5292 11.25 11.874 11.25H13.1219C13.4672 11.25 13.7469 11.5299 13.7469 11.875C13.7469 12.2201 13.4672 12.5 13.1219 12.5H12.4983L12.4978 12.9181H13.1219C13.4672 12.9181 13.7469 13.1979 13.7469 13.5431C13.7469 13.8883 13.4672 14.1681 13.1219 14.1681H12.4985L12.499 14.3734C12.4999 14.7186 12.2208 14.9991 11.8757 15C11.5304 15.0009 11.2499 14.7217 11.249 14.3766L11.2469 13.5424L11.249 11.8743Z" fill="#008479"/>
               <path d="M8.12134 11.25C7.77615 11.25 7.49634 11.5299 7.49634 11.875V14.375C7.49634 14.7201 7.77615 15 8.12134 15H8.74814C9.78366 15 10.6232 14.1605 10.6232 13.125C10.6232 12.0895 9.78366 11.25 8.74814 11.25H8.12134ZM8.74634 13.75V12.5H8.74814C9.09329 12.5 9.37316 12.7799 9.37316 13.125C9.37316 13.4701 9.09329 13.75 8.74814 13.75H8.74634Z" fill="#008479"/>
               <path d="M8.74817 5.625V0H3.12317C2.08764 0 1.24817 0.839463 1.24817 1.875V8.85215C0.520887 9.11006 0 9.80411 0 10.6198V15.6237C0 16.4395 0.520887 17.1335 1.24817 17.3915V18.125C1.24817 19.1605 2.08764 20 3.12317 20H14.3732C15.4087 20 16.2482 19.1605 16.2482 18.125V17.3916C16.9757 17.1337 17.4967 16.4396 17.4967 15.6237V10.6198C17.4967 9.80399 16.9757 9.10986 16.2482 8.85204V7.5H10.6232C9.58768 7.5 8.74817 6.66054 8.74817 5.625ZM1.875 9.99481H15.6217C15.9668 9.99481 16.2467 10.2746 16.2467 10.6198V15.6237C16.2467 15.969 15.9668 16.2487 15.6217 16.2487H1.87501C1.52982 16.2487 1.25 15.969 1.25 15.6237V10.6198C1.25 10.2746 1.52982 9.99481 1.875 9.99481Z" fill="#008479"/>
               <path d="M9.99817 5.625V0.3125L15.9357 6.25H10.6232C10.278 6.25 9.99817 5.97017 9.99817 5.625Z" fill="#008479"/>
               </svg>
             </span> &nbsp; 
             <span>Export to PDF</span>
         </button>
     <div className='me-2 search-responsive'>
         <div className="input-group mb-3 ">
             <input type="text" className="form-control form-focus font-color" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
             <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{cursor:'pointer',height:"34px"}} id="basic-addon2">Search</span>
         </div>
     </div>
     <Link type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"  >+ Add Notice</Link>
     </div>
    
     </div>
     <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{marginTop:'-22px'}}>Notice Details</h5>
    
     <div className="main-content-conatainer pt-1 ">
             {/* ###### copy content till here for all component ######  */}
 
   <div className="row">
    <div className="col-11">
        <h2 className='FontSize20 ps-4 pt-4'>{transferIdData.noticeTitle} </h2>
        <p className='ps-4 paraGraphColor heading-14 pt-1 '>{transferIdData.noticeDate} {`${transferIdData.noticeTime ? transferIdData.noticeTime : ''}`}</p>
    </div>
    <div className="col-1 ps-0 pt-2">
    <Link type="button" class="btn btn-outline-secondary buttonBorder" to={'/notice'}>
        <span>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.81266 11.0217L0 5.51083L6.81266 0L7.8 0.804501L1.97469 5.51083L7.8 10.2172L6.81266 11.0217Z" fill="#134563"/>
        </svg>
            </span>  
            <span className='ps-2'>Back</span>
      </Link>

    </div>
   </div>

   <hr className='mx-3 HrColor'/>
   <div className='heading-14 px-4 pt-3'>
        <p>{transferIdData.noticeDescription}</p>
   </div>
 
     
         </div>
             {/* ################## Off Canvas Area ####################  */}
             
                       {/* ##### offcanvas edit start ########  */}
                       <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                         {/* ########## content area #################  */}
                         {
                               show && (
                                 <div className="container-fluid">
                                 <div className="offcanvas-header">
                                  <Link  data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Role</h5>
                                </div>
                                <hr className='' style={{marginTop:'-3px'}}/>
                            
                                <div className="mb-1  ">
                                    <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label heading-16  label-color">Subject</label>
                                    <input type="email" className="form-control input-bg my-placeholder label-color form-control-md  heading-16" id="exampleFormControlInput1" placeholder="Enter Subject Name" />
                                    </div>
                                     </div>
                                    <div className='my-button11 '>
                                    <button type="button" className="btn btn-outline-success heading-16" onClick={(e)=>{UpdateHandleBtn()}}>Add Role</button>
                                    <button type="button" className="btn btn-outline-success heading-16 ">Cancel</button>
                                    </div>
                           
                            </div>
                               )
                             }
                             {/* ################# After click ###############  */}
                           {
                             hide && (
                               <div className="container-fluid">
                                  <div className="offcanvas-header">
                                  <Link  data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                                </div>
                                <hr className='' style={{marginTop:'-3px'}}/>
                               <div className="delete-section  mt-5">
                               <div className="bg-container">
                                 <div className="img-container">
                                   <img src="./images/XMLID_1_.png" alt="" />
                                 </div>
                                 <div className="content mt-5">
                                   <p >Successful Added</p>
                                   <hr style={{width:''}}/>
                                   <p className='mb-5' style={{color:'#ADADBD',fontSize:'14px'}}>Your Changes has been <br /> Successfully Saved</p>
                                 </div>
                                 <div className='button-position'>
                                 <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{fontSize:'14px'}}>Continue</button>
                                 </div>
 
                               </div>
                           </div>
                               </div>
                             )
                           }
                       </div>                   
                         {/* ##### offcanvase edit  end ########  */}
 
                       {/* ############## Offcanvas view profile ######### */}
                       <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight33" aria-labelledby="offcanvasRightLabel">
                       <div className="container-fluid">
                       <div className="offcanvas-header p-0 pt-3">
                             <Link  data-bs-dismiss="offcanvas" className='ps-3' ><img src="./images/Vector (13).svg" alt="" /></Link>
 
                               <h5 className="offcanvas-title heading-16 pe-3" id="offcanvasRightLabel">View Profile</h5>
                             </div>
                             <hr />
                             <div className="offcanvas-body">
                                 <div className="main-container">
                                   <div className="image-container">
                                       <img src="./images/Ellipse 26 (3).png" alt="" />
                                   </div>
                                   <div className="delete-content mt-2">
                                     <p>John Doe</p>
                                     <p className='heading-14'>admin@example.com</p>
                                   </div>
                                 </div>
                                 
                                 <div className='view-details-background-color p-3 mt-4'>
 
                                 <div className="between-content mt- ">
                                   <div className='d-flex justify-content-between  '>
                                     <div >
                                     <p className='heading-14 label-color'>Address:</p>
                                     </div>
                                     <div >
                                       <p className='heading-14 '>4290 Gregory Lane <br />Louisville, KY 40202</p>
                                     </div>
                                   </div>
 
                                 </div>
 
                                 <hr  className='mt-4'/>
                                   <div className='d-flex   justify-content-between mt-2'>
                                     <div >
                                       <p className='heading-14 label-color'>Phone No:</p>
                                     </div>
                                     <div >
                                       <p className='heading-14 pe-4'>+91 0123456789</p>
                                     </div>
                                   </div>
                                   <hr  className='mt-4'/>
 
                                   <div className='d-flex  justify-content-between '>
                                     <div >
                                       <p className='heading-14 label-color'>Gender</p>
                                     </div>
                                     <div >
                                       <p className='heading-14 ' style={{paddingRight:'90px'}}>Male</p>
                                     </div>
                                   </div>
                                 </div>
                             </div>
                       </div>
                           
                       </div>
                       {/* ############## Offcanvas view profile ######### */}
 
                          {/* ################ offcanvas delete start #############  */}
                          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel">
                            
                             {
                               showdelete && (
                           <div className="container-fluid">
                               <div className="offcanvas-header p-0 pt-3">
                               <Link  data-bs-dismiss="offcanvas"  className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                             <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                             </div>
                             <hr  className=''/>
                                
                                 <div className="offcanvas-body">
                         
                                 <div className="sure-main-container mt-4">
                                 <div className="sure-container">
                                   <div>
                                   <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000"/>
                                       <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000"/>
                                       <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000"/>
                                   </svg>
                                   </div>
                                   {/* <div className="symbol-container">
                                     <img src="./images/Group.png" alt="" />
                                   </div> */}
                                   <div className="sure-content mt-2">
                                     <h5 className='heading-20'>Are you sure?</h5>
                                     <p>This Action will be permanently <br /> delete the Profile Data</p>
                                   </div>
                                   <div className="form-check mt-1">
                                       <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> 
                                       <label className="form-check-label agree" for="flexCheckDefault">
                                       I Agree to delete the Profile Data
                                       </label>
                                     </div>
 
                                 <div className="mt-4">
                                   <button type="button" className="btn btn-outline-primary button00" onClick={(e)=>showNamedelete()}>Delete</button>
                                   <button type="button" className="btn btn-outline-primary button00 ms-2">Cancel</button>
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
                               <Link  data-bs-dismiss="offcanvas"  className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                             <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                             </div>
                                   <hr  className=''/>
                                   <div className="delete-section mt-5">
                                   <div className="bg-container">
                                 <div className="img-container22">
                                   <img src="./images/XMLID_1_.png" alt="" />
                                 </div>
                                 <div className="content mt-5">
                                   <p >Successful Delete</p>
                                   <hr style={{width:''}}/>
                                   <p className='mb-5' style={{color:'#ADADBD',fontSize:'14px'}}>Your profile has been <br /> Successfully Delete</p>
                                 </div>
                                 <div className='button-position'>
                                 <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{fontSize:'14px'}}>Continue</button>
     
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

export default NoticeViewPage
