import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


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


const ManageInvoice = () => {

    const [loader, setLoader] = useState(false)
    const [forDelete, setForDelete] = useState(false)

    const [searchKey, setSearchKey] = useState('')
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)

    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)

    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)


    return (
        <Container>
            {
                loader && (
                    <HashLoaderCom />
                )
            }
            <div className="container-fluid main-body p-3">

                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb ms-2">
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Manage Invoice</Link></li>
                            </ol>
                        </nav>
                    </div>
                    <div className='d-flex g-1 for-media-query'>
                        <div className='me-2 search-responsive'>
                            <div className="input-group mb-3 ">
                                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2">Search</span>
                            </div>
                        </div>
                        <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Add Invoice</Link>
                    </div>
                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Manage Invoice Details</h5>

                <div className="main-content-conatainer pt-1 ">
                    {/* ###### copy content till here for all component ######  */}
                    <div className="row p-3">
                        <div className="col-lg-4 col-md-4 col-sm-12  ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Date range</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                                    <option value="" >--Choose--</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12  ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                                    <option value="" >All Class</option>
                                    {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                                <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                                    <option value="">--Choose--</option>
                                    {/* {
                        sectionData.map(item =>
                          <option value={item.sectionId}>{item.sectionName}</option>
                        )
                      } */}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* ####### buttons ######  */}
                    <div className="row mb-3 buttons-topss">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success my-green" >Search</button>
                            <button type="button" class="btn btn-outline-success">Cancel</button>
                        </div>
                    </div>

                    <div className="table-container px-3 table-responsive">
                        <table className="table table-sm table-striped">
                            <thead className=''>
                                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                    <th className='' style={{ width: '100px' }}>#</th>
                                    <th>Invoice No</th>
                                    <th>Student</th>
                                    <th>Invoice Title</th>
                                    <th>Total Amount</th>
                                    <th>Discount</th>
                                    <th>Due Amount</th>
                                    <th>Status</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor'>
                                <tr className='heading-14' >
                                    <td className=' greyText'>Table</td>
                                    <td className=' greyText' >Table</td>
                                    <td className=' greyText' >Table</td>
                                    <td className=' greyText' >Table</td>
                                    <td className=' greyText' >Table</td>
                                    <td className=' greyText' >Table</td>
                                    <td className=' greyText' ><p className='unpaid'>Unpaid</p></td>

                                    <td className=' greyText'><p className='paid'>Paid</p></td>

                                    <td className=' greyText' >
                                        <div className="dropdown my-button-show">
                                            <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Action  &nbsp;
                                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                                    <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                                                </svg>
                                            </button>
                                            <ul className="dropdown-menu anchor-color heading-14">
                                                <li><Link className="dropdown-item" to={''} data-bs-target="#exampleModal" data-bs-toggle="modal">View</Link></li>
                                                <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234" >Edit</Link></li>
                                                <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight">Delete</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>


                                {/* {
                  syllabusAllData.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText'>{index + 1}</td>
                      <td className=' greyText' >{item.titleName}</td>

                      <td className=' greyText' onClick={(e) => MySyllabusDownloadGetApi(item.syllabusId)}>

                        <button type="button " className="btn export1 btn-outline-secondary my-own-outline-btn me-2 " onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>
                          <span>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H13C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16Z" fill="#008479" />
                              <path d="M10.9201 7.62C10.8451 7.43738 10.7177 7.28105 10.554 7.17072C10.3903 7.06039 10.1976 7.00099 10.0001 7H8.00014V1C8.00014 0.734784 7.89478 0.48043 7.70725 0.292893C7.51971 0.105357 7.26536 0 7.00014 0C6.73492 0 6.48057 0.105357 6.29303 0.292893C6.1055 0.48043 6.00014 0.734784 6.00014 1V7H4.00014C3.80271 7.00099 3.61 7.06039 3.44628 7.17072C3.28256 7.28105 3.15516 7.43738 3.08014 7.62C3.00356 7.80211 2.98264 8.00282 3.02001 8.19681C3.05739 8.3908 3.15138 8.56938 3.29014 8.71L6.29014 11.71C6.38524 11.801 6.49739 11.8724 6.62014 11.92C6.73984 11.9729 6.86927 12.0002 7.00014 12.0002C7.13101 12.0002 7.26044 11.9729 7.38014 11.92C7.50289 11.8724 7.61504 11.801 7.71014 11.71L10.7101 8.71C10.8489 8.56938 10.9429 8.3908 10.9803 8.19681C11.0176 8.00282 10.9967 7.80211 10.9201 7.62Z" fill="#008479" />
                            </svg>
                          </span> &nbsp;
                          <span>Download</span>
                        </button>
                      </td>

                      <td className=' greyText' ref={targetRef}>{item.subject}</td>
                      <td className=' greyText' >
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action  &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234" onClick={(e) => SyllabusGetByIdApi(item.syllabusId)}>Edit</Link></li>
                            <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.syllabusId)}>Delete</Link></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                } */}
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
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Syllabus</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Title" />
                                    </div>
                                    <div>
                                        {/* {isValidNameRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Title is required
                      </p>
                    )} */}
                                    </div>

                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {/* {
                        sectionData.map(item =>
                          <option value={item.sectionName}>{item.sectionName}</option>
                        )
                      } */}
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {/* {
                        subjectData.map(item =>
                          <option value={item.subjectName}>{item.subjectName}</option>
                        )
                      } */}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Upload Syllabus</label>
                                        <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Class" />
                                    </div>
                                    <div>
                                        {/* {isImageValidRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        jpg and png supported
                      </p>
                    )} */}
                                    </div>



                                    <div className='my-button11 '>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" >Add Syllabus</button>
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
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Class Routine</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Class" />
                                    </div>
                                    <div>
                                        {/* {isValidNameRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Title is required
                      </p>
                    )} */}
                                    </div>

                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus label-color" aria-label="Default select example">
                                            <option selected >--Choose--</option>
                                            {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {/* {
                        sectionData.map(item =>
                          <option value={item.sectionName}>{item.sectionName}</option>
                        )
                      } */}
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                        <select class="form-select  form-select-sm form-focus label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {/* {
                      subjectData.map(item =>
                        <option value={item.subjectName}>{item.subjectName}</option>
                      )
                    } */}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Upload Syllabus</label>
                                        <input type="file" class="form-control form-control-sm" value={''} id="exampleFormControlInput1" placeholder="Select File" />
                                    </div>
                                    <div>
                                        {/* {isImageValidRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        jpg and png supported
                      </p>
                    )} */}
                                    </div>

                                    <div className='my-button11'>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" >Update Syllabus</button>
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
                                                <input className="form-check-input my-form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label agree" for="flexCheckDefault">
                                                    I Agree to delete the Profile Data
                                                </label>
                                            </div>

                                            <div className="mt-4">
                                                <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true}  >Delete</button>
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

            {/* Modal area ################### */}
            <div class="modal modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title heading-18" id="exampleModalLabel">Windsor Park High School</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container-fluid ">
                            <div className="main-content">
                                <div className="row p-2">
                                    <div className="col-2">
                                        <p className='img-content'>
                                            <img src="./public/images/Group 266 (1).png" alt="" />
                                        </p>
                                    </div>
                                    <div className="col-4 ps-0">
                                        <div className="row">
                                            <p>Bertha N. Fisher</p>
                                            <div className="col-6 pe-0">
                                                <ul className='heading-14 ul-1 '>
                                                    <li>Class:</li>
                                                    <li>Section:</li>
                                                    <li>Email:</li>
                                                    <li>Phone:</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 ps-0">
                                                <ul className='heading-14 ul-2'>
                                                    <li>One</li>
                                                    <li>A</li>
                                                    <li>saqib@scriza.in:</li>
                                                    <li>9876543456</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 mt-4">
                                        <div className="row">
                                            <div className="col-6 pe-0">
                                                <ul className='heading-14 ul-1 '>
                                                    <li>Invoice::</li>
                                                    <li>Status:</li>
                                                    <li>Date::</li>
                                                    <li>Month:</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 ps-0 ">
                                                <ul className='heading-14 ul-2'>
                                                    <li>#INV00056</li>
                                                    <li><p className='unpaid'>Unpaid</p></li>
                                                    <li>Apr 1, 2024</li>
                                                    <li>Apr 2024</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-container  mt-3 table-responsive">

                                <table className="table table-sm  ">
                                    <thead className=''>
                                        <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                                            <th className='tableGreyBackgroundColor pe-0' style={{ width: '100px' }} >#</th>
                                            <th className='tableGreyBackgroundColor' style={{ width: '100px' }}>Class</th>
                                            <th className='tableGreyBackgroundColor' style={{ width: '100px' }}>Section </th>
                                            <th className='tableGreyBackgroundColor' style={{ width: '100px' }}>Room</th>
                                            <th className='tableGreyBackgroundColor' style={{ width: '100px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='heading-14 align-middle  '>
                                        <tr className='heading-14' >
                                            <td className='  pe-0'>1</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                        </tr>
                                        <tr className='heading-14' >
                                            <td className='  pe-0'>1</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                        </tr>
                                        <tr className='heading-14' >
                                            <td className='  pe-0'>1</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                            <td className='  pe-0'>Table</td>
                                        </tr>
                                    </tbody>
                                    <Toaster />
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                    <div className="table heading-14 outer-border">
                                        <thead>
                                            <tr >
                                                <th style={{ width: '500px' }}>Subtotal</th>
                                                <th>23,750</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Discount</td>
                                                <td>500</td>
                                            </tr>
                                            <tr>
                                                <td>Total:</td>
                                                <td>23,250</td>
                                            </tr>
                                            <tr>
                                                <td>Paid Amount:</td>
                                                <td>23,250</td>
                                            </tr>
                                            <tr>
                                                <td>Due Amount:</td>
                                                <td style={{color:'#008479'}}>0</td>
                                            </tr>
                                            <tr>
                                                <td>Paid Date:</td>
                                                <td>Apr 1, 2024</td>
                                            </tr>
                                        </tbody>
                                    </div>
                                </div>
                            <div className="row mb-3 buttons-topss">
                        <div className='my-button11 heading-16 py-2'>
                            <button type="button" class="btn btn-outline-success my-green" >Download</button>
                            <button type="button" class="btn btn-outline-success my-green">Print</button>
                        </div>
                    </div>
                            </div>

                        </div>
                        {/* <div class="modal-footer main">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Modal area ################### */}
        </Container>
    )
}

export default ManageInvoice
