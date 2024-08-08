import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContactGetAllApi } from '../Utils/Apis'

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

const Conta_contac = ({ data }) => {
  const staffId = data.data;

  console.log('child to child data in state nowwwwww', staffId)
  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [contractStart, setContractStart] = useState()
  const [basicSalary, setBasicSalary] = useState()
  const [departmnt, setDepartmnt] = useState()
  const [hourlyRate, setHourlyRate] = useState()
  const [designation, setDesignation] = useState()
  const [payslip, setPayslip] = useState()

  const [officeShift, setOfficeShift] = useState()
  const [LeaveCate, setLeaveCate] = useState()
  const [contractEnd, setContractEnd] = useState()
  const [lastName, setLastName] = useState()
  const [status, setStatus] = useState()
  console.log('true false',status)



   // User post Api 
   const ContactDataApi = async () => {
    const formData = new FormData()
    formData.append('contactDate', contractStart);
    formData.append('basicSalary', basicSalary);
    formData.append('hourlyRate', hourlyRate);
    formData.append('contractEnd', contractEnd);
    formData.append('paySlipType', payslip);
    formData.append('shift', officeShift);
   
    setLoader(true)
    try {
        const response = await UserContactGetAllApi(staffId,formData);
        console.log('my staff post api response', response)
        if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            setStatus(response?.data?.status)
            // setFunction(response?.data?.otherstaff?.staffStatus)

            setLoader(false)
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        console.log(error)
    }
}
  return (
    <Container>
      <div className="container-fluid pt-2">
        <div className="row p-3 pb-0">
          <div className="col-lg-4 col-md-4 col-sm-12  ">
            <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contract Date</label>
              <input type="date" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : contractStart} onChange={(e) => setContractStart(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="24-02-2024" />
            </div>
            <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Basic Salary</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : basicSalary}  onChange={(e) => setBasicSalary(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="15000" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12  ">
          <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Department</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : departmnt}  onChange={(e) => setDepartmnt(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="24-02-2024" />
            </div>
          
            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Hourly Rate</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : hourlyRate}  onChange={(e) => setHourlyRate(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="100" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Designation</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : designation}  onChange={(e) => setDesignation(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="100" />
            </div>
            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Payslip Type</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : payslip}  onChange={(e) => setPayslip(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="100" />
            </div>
          
           
          </div>
        </div>
        <div className="row px-3">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
          <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Office Shift</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : officeShift}  onChange={(e) => setOfficeShift(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="100" />
            </div>
            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Leave Categories </label>

            <form class="form-floating">
              <input type="email" class="form-control" id="floatingInputValue" value={status === "success" ? '' : LeaveCate}  onChange={(e) => setLeaveCate(e)} placeholder="" />
            </form>

            <p className='label-color heading-14'>If All is selected, then all leave categories will show to employee which are
              added in the system.</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="mb-3  pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contract End</label>
              <input type="date" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={status === "success" ? '' : contractEnd}  onChange={(e) => setContractEnd(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Date of Leaving" />
            </div>
            {/* <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Role Description </label>
            <form class="form-floating">
              <input type="email" class="form-control" id="floatingInputValue" placeholder="" />
            </form> */}
          </div>
        </div>
        <div className="row mt-2 buttons-topss">
          <div className='my-button11 heading-16'>
            <button type="button" class="btn btn-outline-success my-green"  onClick={ContactDataApi}>Submit Contract</button>
            <button type="button" class="btn btn-outline-success">Cancel</button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Conta_contac
