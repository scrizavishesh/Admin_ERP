import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
  max-height: 300px; /* Set the maximum height as needed */
  overflow-y: auto; /* Add vertical scrollbar if necessary */
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


const Gradebooks = () => {

    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)

    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)
  
  const UpdateHandleBtn = (e) =>{
  
    if(show === true && hide === false){
      setShow(false)
      setHide(true)
    } else {
      setShow(true)
    }
  }
  
  const showNamedelete = () =>{
    if(showadd === true && hideedit === false){
      setShowadd(false)
      setHideedit(true)
    } else {
      setShowadd(true)
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
                 <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                 <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Gradebooks</Link></li>
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
         {/* <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ ADD Class Routine</Link> */}
         </div>
         </div>
         <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{marginTop:'-22px'}}>Gradebooks</h5>
        
         <div className="main-content-conatainer pt-1 ">
                 {/* ###### copy content till here for all component ######  */}
            <div className="row p-3">
                <div className="col-lg-4 col-md-4 col-sm-12  ">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>5</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>A</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Exam Category</label>
                    <select class="form-select  form-select-sm" aria-label="Default select example">
                    <option selected>Class test</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> 
                    </div>
                </div>
           
            </div>
            {/* ####### buttons ######  */}
            <div className="row buttons-topss">
                <div className='my-button11 heading-16'>
                    <button type="button" class="btn btn-outline-success heading-16 ">Search</button>
                    <button type="button" class="btn btn-outline-success heading-16">Cancel</button>
                </div>
             </div>
             
       
        <div className=' for-dislay-direction pt-4 pe-2'>
         <div className='d-flex g-1  for-media-query' style={{float:'right'}}>
             <Link type="button " className="btn export1 btn-outline-secondary my-own-outline-btn me-2  " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234">
               <span>  
               <svg width="15" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8404 0L20.0003 3.15992L17.5914 5.56989L14.4314 2.40997L16.8404 0ZM5.2666 14.7337H8.42653L16.102 7.05822L12.9421 3.89829L5.2666 11.5738V14.7337Z" fill="#008479"/>
                    <path d="M16.8529 17.8935H5.43296C5.40558 17.8935 5.37714 17.904 5.34975 17.904C5.31499 17.904 5.28023 17.8945 5.24442 17.8935H2.10662V3.14714H9.31862L11.4252 1.04053H2.10662C0.944817 1.04053 0 1.98429 0 3.14714V17.8935C0 19.0563 0.944817 20.0001 2.10662 20.0001H16.8529C17.4116 20.0001 17.9475 19.7781 18.3425 19.3831C18.7376 18.988 18.9595 18.4522 18.9595 17.8935V8.76338L16.8529 10.87V17.8935Z" fill="#008479"/>
               </svg>

                 </span> &nbsp; 
                 <span>Edit</span>
             </Link>
             <button type="button " className="btn export2 btn-outline-secondary my-own-outline-btn me-2 ">
               <span>  
               <svg width="16" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8889 5.55556H3.33333C1.49444 5.55556 0 7.05 0 8.88889V15.5556H4.44444V20H17.7778V15.5556H22.2222V8.88889C22.2222 7.05 20.7278 5.55556 18.8889 5.55556ZM15.5556 17.7778H6.66667V12.2222H15.5556V17.7778ZM18.8889 10C18.2722 10 17.7778 9.50556 17.7778 8.88889C17.7778 8.27222 18.2722 7.77778 18.8889 7.77778C19.5056 7.77778 20 8.27222 20 8.88889C20 9.50556 19.5056 10 18.8889 10ZM17.7778 0H4.44444V4.44444H17.7778V0Z" fill="#008479"/>
                    </svg>

                 </span> &nbsp; 
                 <span>Print</span>
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
         </div>
        </div>
        <div className="table-container px-3 table-responsive w-100">
     
     <table className="table table-sm ">
        <thead className='text-center'>
          <tr className='heading-16 text-color-000' style={{fontWeight:'500'}}>
            <th className='table-row-bg-color'></th>
            <th className='table-row-bg-color'>Student Name</th>
            <th className='table-row-bg-color'>Math</th>
            <th className='table-row-bg-color'>Drawing</th>
            <th className='table-row-bg-color'>Hindi</th>
            <th className='table-row-bg-color'>G.Sc</th>
            <th className='table-row-bg-color'>S.Sc</th>
            <th className='table-row-bg-color'>Computer</th>
            <th className='table-row-bg-color'>Biology</th>
            <th className='table-row-bg-color'>Action</th>
          </tr>
        </thead>
  
        <tbody className='heading-14 align-middle greyTextColor text-center'>
          <tr className='heading-14' > 
            <td className=' greyText '>1</td>
            <td className=' greyText'>
            <div className='d-flex'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
           
            <td   className=' greyText'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
          <tr className='heading-14' >
            <td className=' greyText table-row-bg-color'>1</td>
            <td className=' greyText table-row-bg-color'>
            <div className='d-flex table-row-bg-color'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
           
            <td   className=' greyText table-row-bg-color'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
            <tr className='heading-14' > 
            <td className=' greyText '>1</td>
            <td className=' greyText'>
            <div className='d-flex'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
           
            <td   className=' greyText'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
          <tr className='heading-14' >
            <td className=' greyText table-row-bg-color'>1</td>
            <td className=' greyText table-row-bg-color'>
            <div className='d-flex table-row-bg-color'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
           
            <td   className=' greyText table-row-bg-color'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
            <tr className='heading-14' > 
            <td className=' greyText '>1</td>
            <td className=' greyText'>
            <div className='d-flex'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
           
            <td   className=' greyText'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
          <tr className='heading-14' >
            <td className=' greyText table-row-bg-color'>1</td>
            <td className=' greyText table-row-bg-color'>
            <div className='d-flex table-row-bg-color'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
           
            <td   className=' greyText table-row-bg-color'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
        
            <tr className='heading-14' > 
            <td className=' greyText '>1</td>
            <td className=' greyText'>
            <div className='d-flex'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
            <td className=' greyText'>56 </td>
           
            <td   className=' greyText'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
          <tr className='heading-14' >
            <td className=' greyText table-row-bg-color'>1</td>
            <td className=' greyText table-row-bg-color'>
            <div className='d-flex table-row-bg-color'>
            <div className="img-div">
            <img src="./images/image 1 (1).png" alt="" />
            </div>
             <span className='ps-2 pt-1'>John doe</span>
            </div>
              </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
            <td className=' greyText table-row-bg-color'>56 </td>
           
            <td   className=' greyText table-row-bg-color'>
            <div className="dropdown my-button-show">
                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Action  &nbsp;
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                </svg>
                </button>
                <ul className="dropdown-menu anchor-color heading-14">
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li>
                  <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                </ul>
            </div>
            </td>
          </tr>
       
            
        </tbody>
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
                         <path d="M8 0.84875L7.1375 0L0 7L7.1375 14L8 13.1556L1.72917 7L8 0.84875Z" fill="black"/>
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
                         <path d="M0 0.84875L0.8625 0L8 7L0.8625 14L0 13.1556L6.27083 7L0 0.84875Z" fill="black"/>
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
                                     <div className="container-fluid">
                                     <div className="offcanvas-header">
                                      <Link  data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                      <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Class Routine</h5>
                                    </div>
                                    <hr className='' style={{marginTop:'-3px'}}/>
                                  
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Class </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Section </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Subject </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Teacher</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Assign a Teacher </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Day</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select a Day </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Hour</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Starting Hour </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Minute</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Starting Minute </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Hour</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Ending Hour </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Minute</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Ending Minute </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                   
                                 
                                  <div className='my-button11 '>
                                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e)=>{UpdateHandleBtn()}}>Add Class Routine</button>
                                  <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
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
                                {/* ##### offcanvase added  end ########  */}
                                
                           </div>                   
                           {/* ##### offcanvas edit start ########  */}
                           <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel">
                                 {
                                   showadd && (
                                     <div className="container-fluid">
                                     <div className="offcanvas-header">
                                      <Link  data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                      <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Class Routine</h5>
                                    </div>
                                    <hr className='' style={{marginTop:'-3px'}}/>
                                  
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Class </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Section </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Subject </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Teacher</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Assign a Teacher </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Day</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select a Day </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Hour</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Starting Hour </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Minute</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Starting Minute </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Hour</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Ending Hour </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                    <div className="mb-1  ">
                                    <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Minute</label>
                                    <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                        <option selected>Select Ending Minute </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </select>
                                     </div>
                                   
                                 
                                  <div className='my-button11 '>
                                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e)=>{showNamedelete()}}>Update Routine</button>
                                  <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                                  </div>
                                </div>
                                   )
                                 }
                                 {/* ################# After click ###############  */}
                               {
                                 hideedit && (
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
                                   <p >Successful Edit</p>
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
                                {/* ##### offcanvase edit end ########  */}

                           </div>                   
                            
     
                        
                      
     
         </div>
        </Container>
       )
}

export default Gradebooks
