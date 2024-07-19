import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import StateTable_1 from './StateTable_1';
import { LeavePostApi } from '../Utils/Apis'
import { LeaveGetAllApi } from '../Utils/Apis'
import { LeaveDeleteApi } from '../Utils/Apis'
import { LeaveGetById } from '../Utils/Apis'
import { LeavePutApi } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';



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

.my-navlink-tabs a{
color: #000 !important;
}
.nav-link{
    color: #000 !important;
} 

.my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
        border-radius: 0;
        border: 1px solid #008479;
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


const Leave = () => {
  
  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)
  const [searchKey, setSearchKey] = useState()
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [hide22, setHide22] = useState(false)
    const [show22, setShow22] = useState(true)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [leaveType, setLeaveType] = useState()
    const [LeaveData, setLeaveData] = useState([])

    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    console.log('my leave ID',IdForDelete)
    // const [tabclick, setTabclick] = useState('tab3')
  

    useEffect(()=>{
      MyLeaveGetAllApi();
    },[])

  // Leave Post Api 
  const MyHolidayPostApi = async () => {
    
    const formData = new FormData()
    formData.append('leaveType', leaveType);
    setLoader(true)
    try {
      const response = await LeavePostApi(formData);
      // console.log('class-post-api', response)
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.msg);
          MyLeaveGetAllApi()
          setShow(false)
          setHide(true)
          setLoader(false)
        } else {
          toast.error(response?.data?.msg);
          setShow(true)
        }
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Leave Get All Api   
 const MyLeaveGetAllApi = async() => {
  setLoader(true)
  try {
    const response = await LeaveGetAllApi();
    console.log('Leave get All Api data',response);
    if (response?.status === 200) {
      toast.success(response?.data?.msg)
      setLeaveData(response?.data?.leave)
      setLoader(false)
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (error) {
    console.log(error)
}
}

// Delete api
const MyHolidayDeleteApi = async (id) => {
  setLoader(true)
  try {
    const response = await LeaveDeleteApi(id);
    // console.log('my-subs-api',response)
    if (response?.status === 200) {
      toast.success(response?.data?.msg);
      MyLeaveGetAllApi()
      setShowdelete(false)
      setHidedelete(true)
      setLoader(false)
    } else {
      toast.error(response?.data?.msg);
      setShowdelete(true)
    }
  } catch (error) {
    console.log('catch')
  }
}

  // Get by id 
  const MyEventGetByIdApi = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
  try {
    const response = await LeaveGetById(id);
    console.log('Leave all data by get by id',response)

    if (response?.status === 200) {
      toast.success(response?.data?.msg);
      // MyLeaveGetAllApi()
      setLeaveType(response?.data?.leave?.leaveType)
      setLoader(false)
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (error) {
    console.log('catch')
  }
}
  // Leave Put api 
  const MyLeavePutApi = async (id) => {
    setLoader(true)
    try {
      const formData = new FormData()
      formData.append('leaveType', leaveType)
      const response = await LeavePutApi(id, formData);
      console.log('MY_SECTION____put-Api', response)
      if (response?.status === 'success') {
        toast.success(response?.data?.msg);
        MyLeaveGetAllApi()
        setShow22(false)
        setHide22(true)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
        setShow22(true)
      }
    } catch (error) {
      console.log(error)
    }
    // console.log('my-dataset',data)
  }

  const handleForDelete = () =>{
    MyHolidayDeleteApi(IdForDelete)
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
     <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
         <ol className="breadcrumb ms-2">
             <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
             <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li>
             <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Leave</Link></li>
         </ol>
     </nav>
     </div>
     <div className='d-flex g-1 for-media-query'>
     <div className='me-2 search-responsive'>
         <div className="input-group mb-3 ">
             <input type="text" className="form-control form-focus font-color" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
             <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{cursor:'pointer',height:"34px"}} id="basic-addon2">Search</span>
         </div>
     </div>
     <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" to={''}>+ Create Leave</Link>
     </div>
     </div>
     <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{marginTop:'-22px'}}>Leave Details</h5>
    
     <div className="main-content-conatainer pt-1 ">

     <div className="table-container px-3 table-responsive">
    
    <table className="table table-sm table-striped">
      <thead className=''>
        <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
          <th className=' pe-0'style={{ width: '100px' }} >#</th>
          <th style={{ width: '600px' }}>Leave Type</th>
          <th style={{ width: '100px' }}>Actions</th>
        </tr>
      </thead>
        <tbody className='heading-14 align-middle greyTextColor greyText'>
        {
            LeaveData.map((item, index) => (
              <tr className='heading-14' >
              <td className=' greyText pe-0'>{index + 1}</td>
              <td className=' greyText pe-0'>{item.leaveType}</td>
              <td className=' greyText  pe-0' >
                <div className="dropdown my-button-show">
                  <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Action  &nbsp;
                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                      <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                    </svg>
                  </button>
                  <ul className="dropdown-menu anchor-color heading-14">
                    <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop202" aria-controls="staticBackdrop"  onClick={(e)=>MyEventGetByIdApi(item.id)} >Edit</Link></li>
                    <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e)=> setIdForDelete(item.id)}>Delete</Link></li>
                  </ul>
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
                    
                       <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop101" aria-labelledby="staticBackdropLabel">
                          {
                            show && (
                                <>
                                <div className="offcanvas-header">
                                <Link  data-bs-dismiss="offcanvas" >
                                <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479"/>
                                </svg>
                                </Link>
                                <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Create Leave Type</h5>
                                </div>
                                <hr className='mx-3' style={{marginTop:'-3px'}}/>

                            <div class="offcanvas-body">
                            <div className="input " >
                                 
                            <div className="mb-3" style={{marginTop:'-6px'}}>
                                <label for="exampleFormControlInput1" className="form-label  heading-14">Leave Type</label>
                                <input type="email" className="form-control form-focus label-color  heading-14" onChange={(e)=>setLeaveType(e.target.value)}  style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="Select Leave Type" /> 
                                {/* {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>} */}
                            </div>
                            <div className='my-button11 '>
                            <button type="button" className="btn btn-outline-success my-button112233"   onClick={(e) => MyHolidayPostApi()}>Submit</button>
                            <button type="button" className="btn btn-outline-success">Cancel</button>
                            {/* <Toaster /> */}
                            </div>
                            </div>
                            </div>
                                </>
                            )
                          }
                          {
                                hide && (
                                  <>
                                  <div className="offcanvas-header d-block for-my-display">
                                  <div className="offcanvas-header p-0 ">
                              <Link  data-bs-dismiss="offcanvas"  className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                            <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                            </div>
                                  <hr  className=''/>
                                  <div className="delete-section mt-5">
                                  <div className="bg-container">
                                <div className="img-container22">
                                <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10"/>
                                  <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10"/>
                                </svg>
                                  {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                                </div>
                                <div className="content mt-5">
                                  <p className='heading-20'>Successful Update</p>
                                  <hr style={{width:''}}/>
                                  <p className='mb-5' style={{color:'#ADADBD',fontSize:'14px'}}>Your profile has been <br /> Successfully Updated</p>
                                </div>
                                <div className='button-position'  >
                                <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{fontSize:'14px'}}>Continue</button>
    
                                </div>
    
                              </div>
                                  </div>
                                  </div>
                                  </>
                                )
                              }
                        </div>

                       <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop202" aria-labelledby="staticBackdropLabel">
                          {
                            show22 && (
                                <>
                                <div className="offcanvas-header">
                                <Link  data-bs-dismiss="offcanvas" >
                                <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479"/>
                                </svg>
                                </Link>
                                <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel"> Edit Create Leave Type</h5>
                                </div>
                                <hr className='mx-3' style={{marginTop:'-3px'}}/>

                            <div class="offcanvas-body">
                            <div className="input " >
                                 
                            <div className="mb-3" style={{marginTop:'-6px'}}>
                                <label for="exampleFormControlInput1" className="form-label  heading-14">Leave Type</label>
                                <input type="email" className="form-control form-focus label-color  heading-14" value={leaveType} onChange={(e)=>setLeaveType(e.target.value)}  style={{marginTop:'-4px'}} id="exampleFormControlInput1" placeholder="Select Leave Type" /> 
                                {/* {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>} */}
                            </div>
                            <div className='my-button11 '>
                            <button type="button" className="btn btn-outline-success my-button112233"   onClick={(e) => MyLeavePutApi(IdForUpdate)}>Update</button>
                            <button type="button" className="btn btn-outline-success">Cancel</button>
                            {/* <Toaster /> */}
                            </div>
                            </div>
                            </div>
                                </>
                            )
                          }
                          {
                                hide22 && (
                                  <>
                                  <div className="offcanvas-header d-block for-my-display">
                                  <div className="offcanvas-header p-0 ">
                              <Link  data-bs-dismiss="offcanvas"  className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                            <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                            </div>
                                  <hr  className=''/>
                                  <div className="delete-section mt-5">
                                  <div className="bg-container">
                                <div className="img-container22">
                                <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10"/>
                                  <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10"/>
                                </svg>
                                  {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                                </div>
                                <div className="content mt-5">
                                  <p className='heading-20'>Successful Update</p>
                                  <hr style={{width:''}}/>
                                  <p className='mb-5' style={{color:'#ADADBD',fontSize:'14px'}}>Your profile has been <br /> Successfully Updated</p>
                                </div>
                                <div className='button-position'  >
                                <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{fontSize:'14px'}}>Continue</button>
    
                                </div>
    
                              </div>
                                  </div>
                                  </div>
                                  </>
                                )
                              }
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
                                                  <input className="form-check-input my-form-check-input" onClick={()=>setForDelete(true)} type="checkbox" value="" id="flexCheckDefault" />
                                                  <label className="form-check-label agree" for="flexCheckDefault">
                                                    I Agree to delete the Profile Data
                                                  </label>
                                                </div>

                                                <div className="mt-4">
                                                  <button type="button" className="btn my-btn button00" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
                                                  <button type="button" className="btn cancel-btn  ms-2">Cancel</button>
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
                                                <p >Successful Delete</p>
                                                <hr style={{ width: '' }} />
                                                <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                                              </div>
                                              <div className='button-position'>
                                                <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

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

export default Leave
