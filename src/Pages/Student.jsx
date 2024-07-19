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
.my-dropdown-menu{
     border-radius: 5px;
    border: 1px solid #E4E7EB;
    color: #000;
    background: #FFF;
    height: 34px;
  }
  .my-dropdown-menu span{
    color: #fff;
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
  .delete-content2233 span{
    color: #000;
    font-weight: 400;
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
    border-radius: 8px;
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


/* ############# offcanvas ############## */

/* ########## media query ###########  */
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


@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
`;
// ## style css area end ####  


const Student = () => {


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


    return (
        <Container>
          <div className="container-fluid main-body p-3">
     
         <div className='d-flex justify-content-between for-dislay-direction'>
         <div className="breadCrum ms-2">
         <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
             <ol className="breadcrumb ms-2">
                 <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                 <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Users</li>
                 <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Student</Link></li>
             </ol>
         </nav>
         </div>
     
         <div className='d-flex g-1 for-media-query'>
            <div className='d-flex me-2 export1'>
                <div className='greyText pt-1 pe-2 heading-14'>Class</div>
                 <div className="dropdown my-dropdown-menu ">
                    <button className="btn btn-secondary heading-14 dropdown-toggle my-dropdown-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        One <span>ddddddddddd</span>
                    </button>

                    <ul className="dropdown-menu heading-14">
                        <li><a className="dropdown-item" href="#">1</a></li>
                        <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">2</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">3</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">4</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">5</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">6</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">7</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">8</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">9</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">10</a></li>
                    </ul>
                </div>
            </div>

            <div className='d-flex me-2 export2'>
                <div className='greyText pt-1 pe-2 heading-14'>Section</div>
                 <div className="dropdown my-dropdown-menu ">
                    <button className="btn btn-secondary heading-14 dropdown-toggle my-dropdown-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        A <span>ddddddddddddd</span>
                    </button>

                    <ul className="dropdown-menu heading-14">
                        <li><a className="dropdown-item" href="#">1</a></li>
                        <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">2</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">3</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">4</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">5</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">6</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">7</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">8</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">9</a></li>
                          <hr className='m-0  mx-3'/>
                        <li><a className="dropdown-item" href="#">10</a></li>
                    </ul>
                </div>
            </div>

            <div className='me-2 search-responsive'>
                <div className="input-group mb-3 ">
                    <input type="text" className="form-control form-focus font-color" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{cursor:'pointer',height:"34px"}} id="basic-addon2">Search</span>
                </div>
            </div>
     
         </div>
        
         </div>
         <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{marginTop:'-22px'}}>Student List</h5>
     
         <div className="main-content-conatainer pt-1 ">
                 {/* ###### copy content till here for all component ######  */}
     
        <div className="table-container px-3 table-responsive">
          
        <table className="table table-sm ">
           <thead className=''>
             <tr className='heading-16 text-color-000' style={{fontWeight:'500'}}>
               <th className=''>#</th>
               <th>Student Id</th>
               <th>Name</th>
               <th>Parents Name</th>
               <th>Address</th>
               <th>Phone</th>
               <th>Email</th>
               <th>Actions</th>
             </tr>
           </thead>
     
           <tbody className='heading-14 align-middle greyTextColor'>
             <tr className='heading-14' >
               <td className=' greyText'>1.</td>
               <td className=' greyText'>PQ6985364</td>
               <td className=' greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className=' greyText'>Mara Mann</td>
               <td className=' greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td className=' greyText'>+91 9994353674</td>
               <td className=' greyText'>xyz12@gmail.com</td>
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
               <td   className=' table-row-bg-color greyText'>1.</td>
               <td className='table-row-bg-color greyText'>PQ6985364</td>

               <td className='table-row-bg-color greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className='table-row-bg-color greyText'>Mara Mann</td>

               <td   className=' table-row-bg-color greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td   className=' table-row-bg-color greyText'>+91 9994353674</td>
               <td   className=' table-row-bg-color greyText'>xyz12@gmail.com</td>
               <td   className=' table-row-bg-color greyText'>
               <div className="dropdown my-button-show">
                   <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Action  &nbsp;
                     <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                   </svg>
     
                   </button>
                   <ul className="dropdown-menu anchor-color heading-14">
                     <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                     <li><a className="dropdown-item" href="#">View Detail</a></li>
                     <li><a className="dropdown-item" href="#">Delete</a></li>
                   </ul>
               </div>
               </td>
             </tr>
             <tr className='heading-14' >
               <td className=' greyText'>1.</td>
               <td className=' greyText'>PQ6985364</td>

               <td className=' greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className=' greyText'>Mara Mann</td>

               <td   className=' greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td   className=' greyText'>+91 9994353674</td>
               <td   className=' greyText'>xyz12@gmail.com</td>
          
               <td   className=' greyText'>
               <div className="dropdown my-button-show">
                   <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Action  &nbsp;
                     <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                   </svg>
     
                   </button>
                   <ul className="dropdown-menu anchor-color heading-14">
                     <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                     <li><a className="dropdown-item" href="#">View Detail</a></li>
                     <li><a className="dropdown-item" href="#">Delete</a></li>
                   </ul>
               </div>
               </td>
             </tr>
             <tr className='heading-14' >
               <td   className=' table-row-bg-color greyText'>1.</td>
               <td className='table-row-bg-color greyText'>PQ6985364</td>

               <td className='table-row-bg-color greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className='table-row-bg-color greyText'>Mara Mann</td>

               <td   className=' table-row-bg-color greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td   className=' table-row-bg-color greyText'>+91 9994353674</td>
               <td   className=' table-row-bg-color greyText'>xyz12@gmail.com</td>
               {/* <td   className=' table-row-bg-color greyText'>+91 9999999999</td> */}
               {/* <td className='my-td-style-yellow  table-row-bg-color'><span>New</span></td> */}
               <td   className=' table-row-bg-color greyText'>
               <div className="dropdown my-button-show">
                   <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Action  &nbsp;
                     <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                   </svg>
     
                   </button>
                   <ul className="dropdown-menu anchor-color heading-14">
                     <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                     <li><a className="dropdown-item" href="#">View Detail</a></li>
                     <li><a className="dropdown-item" href="#">Delete</a></li>
                   </ul>
               </div>
               </td>
             </tr>
             <tr className='heading-14' >
               <td   className=' greyText'>1.</td>
               <td className=' greyText'>PQ6985364</td>

               <td className=' greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className=' greyText'>Mara Mann</td>

               <td   className=' greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td   className=' greyText'>+91 9994353674</td>
               <td   className=' greyText'>xyz12@gmail.com</td>
               {/* <td   className=' table-row-bg-color greyText'>+91 9999999999</td> */}
               {/* <td className='my-td-style-yellow  table-row-bg-color'><span>New</span></td> */}
               <td   className=' greyText'>
               <div className="dropdown my-button-show">
                   <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Action  &nbsp;
                     <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                   </svg>
     
                   </button>
                   <ul className="dropdown-menu anchor-color heading-14">
                     <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                     <li><a className="dropdown-item" href="#">View Detail</a></li>
                     <li><a className="dropdown-item" href="#">Delete</a></li>
                   </ul>
               </div>
               </td>
             </tr>
             <tr className='heading-14' >
               <td   className=' table-row-bg-color greyText'>1.</td>
               <td className='table-row-bg-color greyText'>PQ6985364</td>

               <td className='table-row-bg-color greyText'>
               <div className='d-flex'>
               <div className="img-div">
               <img src="./images/image 1 (1).png" alt="" />
               </div>
                <span className='ps-2 pt-1'>John doe</span>
               </div>
                 </td>
                 <td className='table-row-bg-color greyText'>Mara Mann</td>

               <td   className=' table-row-bg-color greyText'>4290 Gregory Lane Louisville, KY 40202</td>
               <td   className=' table-row-bg-color greyText'>+91 9994353674</td>
               <td   className=' table-row-bg-color greyText'>xyz12@gmail.com</td>
               {/* <td   className=' table-row-bg-color greyText'>+91 9999999999</td> */}
               {/* <td className='my-td-style-yellow  table-row-bg-color'><span>New</span></td> */}
               <td   className=' table-row-bg-color greyText'>
               <div className="dropdown my-button-show">
                   <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Action  &nbsp;
                     <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                   </svg>
     
                   </button>
                   <ul className="dropdown-menu anchor-color heading-14">
                     <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Edit</Link></li>
                     <li><a className="dropdown-item" href="#">View Detail</a></li>
                     <li><a className="dropdown-item" href="#">Delete</a></li>
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
                 
                           {/* ##### offcanvas edit start ########  */}
                           <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                             {/* ########## content area #################  */}
                                 {
                                   
                                   show && (
                                     <div className="container-fluid">
                                     <div className="offcanvas-header">
                                      <Link  data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                      <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Admin Edit</h5>
                                    </div>
                                    <hr className='' style={{marginTop:'-3px'}}/>
                                  <div className="inputs">
            
                                    <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Name</label>
                                    <input type="email" className="form-control form-focus input-bg label-color" style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="John Doe" /> 
                                    </div>
                                  </div>
            
                                    <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Address</label>
                                    <input type="email" className="form-control form-focus " style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="4290 Gregory Lane Louisville, KY 40202" /> 
                                    </div>
            
                                    <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Email</label>
                                    <input type="email" className="form-control form-focus input-bg label-color" style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="xyz12@gmail.com" /> 
                                    </div>
                                      <div>
                                      <label for="exampleFormControlTextarea1" className="form-label label-color">Contact No</label>
                                    <div className="input-group mb-3 cont-drop-btn">
                                        <button className="btn btn-outline-secondary dropdown-toggle" style={{border:'1px solid #ced4da'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
                                        <ul className="dropdown-menu">
                                          <li><a className="dropdown-item" href="#">Action</a></li>
                                          <li><a className="dropdown-item" href="#">Another action</a></li>
                                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                                          <li><hr className="dropdown-divider" /> </li>
                                          <li><a className="dropdown-item" href="#">Separated link</a></li>
                                        </ul>
                                        <input type="number" className="form-control form-focus" aria-label="Text input with dropdown button" />
                                    </div>
                                      </div>
                                      <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Email</label>
                                    <input type="file" className="form-control form-focus input-bg label-color" style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="xyz12@gmail.com" /> 
                                    </div>
                                        <div className='my-button11 '>
                                  <button type="button" className="btn btn-outline-success" onClick={(e)=>{UpdateHandleBtn()}}>Update</button>
                                  <button type="button" className="btn btn-outline-success">Cancel</button>
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
                                       <p >Successful Updated</p>
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
                                           <img src="./images/Ellipse 26 (4).png" alt="" />
                                       </div>
                                       <div className="delete-content2233 mt-2">
                                         <p className='heading-25'>Marah Petersen</p>
                                         <p className='heading-14'>admin@example.com</p>
                                         <p className='heading-14'>Student Id - <span className='heading-16'><b>PQ6985384</b></span></p>
                                       </div>
                                     </div>
                                     
                                     <div className='view-details-background-color p-3 mt-4'>
     
                                     <div className="between-content mt- ">

                                       <div className='d-flex justify-content-between  mb-2'>
                                         <div >
                                         <p className='heading-14 label-color'>Class & Section:</p>
                                         </div>
                                         <div >
                                           <p  className='heading-14 ' style={{paddingRight:'100px'}}>One</p>
                                         </div>
                                       </div>

                                       <div className='d-flex justify-content-between  mb-2'>
                                         <div >
                                         <p className='heading-14 label-color'>Section:</p>
                                         </div>
                                         <div >
                                           <p  className='heading-14 ' style={{paddingRight:'117px'}}>C</p>
                                         </div>
                                       </div>

                                       <div className='d-flex justify-content-between  '>
                                         <div >
                                         <p className='heading-14 label-color'>Address:</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 '>4290 Gregory Lane <br />Louisville, KY 40202</p>
                                         </div>
                                       </div>
     
                                     </div>
     
                                     {/* <hr  className='mt-4'/> */}
                                       <div className='d-flex   justify-content-between mt-3'>
                                         <div >
                                           <p className='heading-14 label-color'>Phone No:</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 pe-4'>+91 0123456789</p>
                                         </div>
                                       </div>
     
                                       <div className='d-flex  justify-content-between  mt-3'>
                                         <div >
                                           <p className='heading-14 label-color'>Gender</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 ' style={{paddingRight:'90px'}}>Male</p>
                                         </div>
                                       </div>

                                       <div className='pt-3 greenText'>
                                        <p>Parents Details</p>
                                        <hr  className='m-0 mt-2'/>
                                        </div>
                                        <div className='d-flex   justify-content-between mt-3 '>
                                         <div >
                                           <p className='heading-14 label-color'>Father's Name:</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 ' style={{paddingRight:'48px'}}>Mara Mann</p>
                                         </div>
                                       </div>

                                        <div className='d-flex   justify-content-between mt-3'>
                                         <div >
                                           <p className='heading-14 label-color'>Contact No:</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 pe-3' >+91 9999999999</p>
                                         </div>
                                       </div>

                                        <div className='d-flex   justify-content-between mt-3'>
                                         <div >
                                           <p className='heading-14 label-color'>Email:</p>
                                         </div>
                                         <div >
                                           <p className='heading-14 ' >mara@example.com</p>
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

export default Student
