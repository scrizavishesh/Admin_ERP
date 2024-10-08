import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  /* margin-top: 5px; */
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
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
    /* border: 1px solid #008479; */
    color: #008479;
}

.my-navlink-tabs a{
color: #000 !important;
}
.nav-link{
    color: #000 !important;
} 
.myActive-Line a{
    color: #adadbd !important;
}
.my-button112233 button{
        background-color: #008479;
        color: #fff;
        font-size: 14px;  
    }
    .my-button112233{
        text-align: center;
    }
    .my-button112233 button:hover{
        background-color: #00a497;
    }
.my-form-check-input{
    background-color: var(--tableActionButtonBgColor) !important;
}
.main-div-content{
    width: 100%;
    height: 50px;
    background: var(--tableRowBgColor) !important;
}
.second-div{
    width: 100%;
    border: 1px solid var(--tableRowBgColor);
}
.textareaColor{
    color: var( --textareaColor) !important;
}
.my-button00000{
    background-color: #008479 !important;
    color: #fff !important;
}
.content-area{
    width: 100%;
  
    background-color: #F5F5F5;
    border: 1px solid #E4E7EB;
    border-radius: 5px;
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


const SmsSender = () => {

    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)

    const [tabclick, setTabclick] = useState('tab1')

  
  return (
    <Container>
    <div className="container-fluid main-body p-3">
 
     <div className='d-flex justify-content-between for-dislay-direction'>
     <div className="breadCrum ms-2">
     <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
         <ol className="breadcrumb ms-2">
             <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
             <li className="breadcrumb-item active heading-14 font-color" aria-current="page">SMS Sender</li>
             <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">SMS Sender Details</Link></li>
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
     {/* <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Create Leave</Link> */}
     </div>
     </div>
     <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{marginTop:'-22px'}}>SMS Settings Details</h5>
    
     <div className="main-content-conatainer pt-1 ">
             {/* ###### copy content till here for all component ######  */}
      
   
     
             <div className="row p-3">
                <div className="col-lg-4 col-md-6 col-sm-12  ">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Month</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>Feb</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>2024</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color  heading-14">Class</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>Two</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
            </div>
            <div className="row mb-3 buttons-topss mt-1">
            <div className='my-button112233 heading-16'>
                <button type="button" class="btn btn-outline-success">Show Receiver</button>
            </div>
         </div>
         <div className="row mx-2">
            <div className="col-lg-6 col-md-6 col-sm-12 ">

                <table className="table table-bordered heading-14 table-responsive">
                    <thead className="thead">
                        <tr >
                        <th className='table-row-bg-color'>
                            <td className='py-1 d-flex  ps-0'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Name</p>
                            </td>
                        </th>
                            <th className='py-1 pb-3 table-row-bg-color'>Phone</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Marah Petersen</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex table-row-bg-color'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Colby Maxwell</p></td>
                            <td className='py-2 ps-2 table-row-bg-color'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Soledad G. Parish</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex table-row-bg-color'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Colby Maxwell</p></td>
                            <td className='py-2 ps-2 table-row-bg-color'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Clayton Fernandez</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex table-row-bg-color'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Colby Maxwell</p></td>
                            <td className='py-2 ps-2 table-row-bg-color'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Whilemina Emerson</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex table-row-bg-color'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Colby Maxwell</p></td>
                            <td className='py-2 ps-2 table-row-bg-color'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Dolores M. Sinclair</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex table-row-bg-color'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Colby Maxwell</p></td>
                            <td className='py-2 ps-2 table-row-bg-color'>+1 (834) 942-1943</td>
                        </tr>
                        <tr >
                            <td className='py-2 d-flex'>
                            <input class="form-check-input my-form-check-input " type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <p className='ps-2'>Dolores M. Sinclair</p></td>
                            <td className='py-2 ps-2'>+1 (834) 942-1943</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="main-div-content heading-14 p-3">
                    <p>Message</p>
                </div>
                <div className="second-div">
                    <div className="msg-div">
                        <p className='ps-4 pt-3 heading-14'>Message to send</p>
                        <div class="form-floating mx-4">
                        <textarea class="form-control mt-2" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:'10px'}} ></textarea>
                        <label for="floatingTextarea2" className='textareaColor heading-14'>Write down your message within 160 characters...</label>
                        <p className='heading-14 mt-1'>Remaining characters is 160</p>
                        </div>
                    </div>
                    <div className="my-button">
                    <div className="row mb-3 buttons-topss mt-1">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success my-button00000">Send Sms</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="instruction">
                    <p className=' py-2 heading-14'>Instruction</p>
                    <div className="content-area heading-14 ">
                    <p className='px-4 pt-4 pb-2'>Before sending sms to the receivers please make sure that you
                       have set up sms settings perfectly. You can set sms <span><a href="">settings here</a></span>
                    </p>
                    <p className='heading-14 ps-4 pb-5 pt-4'>Currently activated : <b>Twilio.</b></p>
                    </div>
                </div>
            </div>
         </div>
          
   
     </div>
           
                   
                    
                  
 
     </div>
    </Container>
   )
}

export default SmsSender
