import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { BookIssuePostApi } from '../Utils/Apis'
import { ClassGetApi } from '../Utils/Apis'
import { SectionRoomByIdGetApi } from '../Utils/Apis'
import { BookManagerGetAllApi } from '../Utils/Apis'
import { studentGetAllApi } from '../Utils/Apis'
import { bookIssueGetAllApi } from '../Utils/Apis'
import { IssueBookDeleteApi } from '../Utils/Apis'
import { IssueBookGetById } from '../Utils/Apis'
import { IssueBookPutApi } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';

import Flatpickr from "react-flatpickr";
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

.my-navlink-tabs a{
color: #000 !important;
}
.nav-link{
    color: #000 !important;
}
.my-issue-status p{
    padding: 2px;
    background-color: #A7C883;
    color: #fff ;
    border-radius: 6px;
    text-align: center;
}
.my-return-status p{
    padding: 2px;
    background-color: #F68F71;
    color: #fff;
    border-radius: 6px;
    text-align: center;
}
.my-lost-status p{
    padding: 2px;
    background-color: #B50000;
    color: #fff;
    border-radius: 6px;
    text-align: center;
}
.my-button112233RedDelete{
        background-color: #B50000 !important;
        color: #fff  !important;
    }
    .my-button112233{
      background: #008479;
      color: #fff;
      border-radius: 2px;
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
.my-button11 button{
    background-color: #008479;
    color: #fff;
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


const BookIssueReport = () => {

  const token = localStorage.getItem('token');

  const [forDelete, setForDelete] = useState(false)

  const [loader, setLoader] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [editshow, setEditshow] = useState(true)
  const [edithide, setEdithidew] = useState(false)
  const [returnbookshow, setReturnbookshow] = useState(true)
  const [returnbookhide, setReturnbookhide] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)

  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()

  const [classData, setClassdata] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [bookData, setBookData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [issuesData, setIssuesdata] = useState([])

  // const [issuedate, setIssuedate] = useState()
  const [returndate, setReturndate] = useState()
  const [Class, setClass] = useState()
  const [sectionId, setSectionId] = useState()
  const [sectionName, setSectionName] = useState()
  const [student, setStudent] = useState()
  const [book, setBook] = useState()
  const [classNo, setClassNo] = useState();
  const [searchKey, setSearchKey] = useState('');
  console.log('MY____ data search and class no and section name', classNo, sectionName)

  const [isValidDateRequired, setIsValidDateRequired] = useState(false);


  const RetunrBookHandleBtn = (e) => {

    if (returnbookshow === true && returnbookhide === false) {
      setReturnbookshow(false)
      setReturnbookhide(true)
    } else {
      setReturnbookshow(true)
    }
  }

  useEffect(() => {
    UpdatClassGetApi()
    if (sectionName && classNo) {
      MyStudentGetApi()
    }
    if (Class) {
      MySectionGetApi();
    }
    MyRolPermisGetAllApi()
    MyBookIssueGetApi()
  }, [classNo, Class, sectionId, sectionName, token])


  const [errors, setErrors] = useState({});
  // ###### validation ##########
  const FuncValidation = () => {
    // for name 
    if (returndate === "" || !returndate) {
      setIsValidDateRequired(true)
    }
    else {
    }

    return errors;
  }
  const handleDate = (e2) => {
    setReturndate(e2);
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    setIsValidDateRequired(dateRegex.test(e2));
    if (e2 === "") {
      setIsValidDateRequired(true)
    } else {
      setIsValidDateRequired(false)
    }
  }

  // ###### validation  end##########

  // Get All Api from class list page for id 

  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await ClassGetApi();
      console.log('class-get-all-api in Book issue report ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setClassdata(response?.data?.classes)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handle = (event) => {

    const value = event.target.value;
    const [val1, val2] = value.split(',');
    setClass(parseInt(val1))
    const num = val2.trim()
    setClassNo(num)

  }
  // console.log('my class IDDD', Class)

  const SectionHandle = (e) => {
    const value = e.target.value;
    const [val1, val2] = value.split(',');
    console.log('section id 123432332', val1)
    setSectionId(parseInt(val1))
    const name = val2.trim()
    setSectionName(name)
    // console.log('my section id is ', sectionId)
  }

  // Section Get All Api from section page for id 
  const MySectionGetApi = async () => {
    setLoader(true)
    try {
      const response = await SectionRoomByIdGetApi(Class);
      console.log('SECTION-get-all-api', response);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setSectionData(response?.data?.allSections)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Student Get All Api from student page for student id 

  const MyStudentGetApi = async () => {
    setLoader(true)
    try {
      const response = await studentGetAllApi(searchKey, classNo, sectionName);
      console.log('STUDENT-get-all-api123456', response);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setStudentData(response?.data?.students)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.msg);
      }
    } catch (error) {
      console.log(error)
    }

  }

  //  Get All Api from book list page for book id
  const MyRolPermisGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await BookManagerGetAllApi();

      // console.log('My Book get all DATAAA12', response)
      if (response?.status === 200) {
        toast.success(response?.data?.msg)
        setBookData(response?.data?.Books)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // ----------------------------------------------------------------

  // post Api 
  const SubcPutDataApi = async () => {
    setLoader(true)
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('returnDate', returndate);
      formData.append('classId', Class);
      formData.append('sectionId', sectionId);
      formData.append('studentId', student);
      formData.append('bookId', book);

      try {
        const response = await BookIssuePostApi(formData);
        // console.log('my book manager list post api response', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.msg);
          MyBookIssueGetApi()
          setShow(false)
          setHide(true)
          setLoader(false)
        } else {
          toast.error(response?.data?.msg);
          setShow(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

  }

  // Get All Apis 
  const MyBookIssueGetApi = async () => {
    setLoader(true)
    try {
      const response = await bookIssueGetAllApi();
      console.log(' my Issues book DATA', response);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setIssuesdata(response?.data?.TransactionList)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete api
  const MyIssueBookDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await IssueBookDeleteApi(id);
      // console.log('my-subs-api',response)
      if (response?.status === 200) {
        setHidedelete(true)
        setShowdelete(false)
        MyBookIssueGetApi()
        toast.success(response?.data?.msg);
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
        setHidedelete(true)
      }

    } catch (error) {
      console.log('catch')
    }
  }


  // Get by id 
  const MyIssueBookGetByIdApi = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await IssueBookGetById(id);
      console.log('my issue book get by IDDD', response)

      setReturndate(response?.data?.Transaction?.returnDate)
      setClassNo(response?.data?.Transaction)
      setSectionName(response?.data?.Transaction?.sectionName)
      setStudent(response?.data?.classSection?.classStudents?.studentName)
      setBook(response?.data?.book?.bookName)

      if (response?.status === 200) {
        toast.success(response?.data?.msg);
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log('catch')
    }
  }

  // Section Put api 
  const MyIssueBookPutApi = async (id) => {
    setLoader(true)
    try {
      const PuData = {
        "returnDate": returndate,
        "classId": parseInt(Class),
        "bookId": parseInt(book),
        "sectionId": parseInt(sectionId),
        "studentId": student
      }
      const response = await IssueBookPutApi(id, PuData);

      console.log('MY_SECTION____put-Api', response)
      if (response?.status === 'success') {
        toast.success(response?.data?.msg);
        MySectionGetApi()
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }

    } catch (error) {
      console.log(error)
    }
    // console.log('my-dataset',data)
  }

  const handleForDelete = () => {
    MyIssueBookDeleteApi(IdForDelete)
  }


  //  Date range 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
console.log('my both date =', startDate,endDate)
  const handleDateChange = (dates) => {
    setStartDate(formatDate(dates[0]));
    setEndDate(formatDate(dates[1]));
  };

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return "${year}-${month}-${day}";
  };

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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Back Office</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Book Issue Report</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            <div className='me-2 search-responsive'>
              <div className="input-group mb-3 ">
                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" onChange={(e) => setSearchKey(e.target.value)} aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={MyStudentGetApi}>Search</span>
              </div>
            </div>
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" to={''}>+ Issue Book</Link>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Book Issue Report Details</h5>

        <div className="main-content-conatainer  pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="row p-3 d-flex justify-content-center">
            <div className="ps-0 col-lg-6 col-md-6 col-sm-12">
              <div class="dropdown">
                <input type="text" class="form-control form-focus font-color" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="name@example.com" />
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Flatpickr
                    class="dropdown-item"
                    placeholder="Date Range"
                    value={[startDate, endDate]}
                    options={{
                      mode: 'range',
                      dateFormat: 'Y-n-j',
                    }}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>

        

          {/* ####### buttons ######  */}
          <div className="row mb-3 buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success my-button112233" >Search</button>
              <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
          </div>

          {/* ########## state change area below, when data not found in table  */}

          <div className="pt-3 mx-3  table-responsive">

            <table className="table table-sm table-striped ">
              <thead className='' style={{ borderTop: '1px solid #DDDDEB' }}>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='' >#</th>
                  <th className='' >Book name</th>
                  <th className='' >Issue Date</th>

                  <th className='' >Return Date</th>
                  <th className='' >Return Delay</th>
                  <th className='' >Student</th>
                  <th className='' >Class</th>
                  <th className='' >Status</th>
                  <th className='' >Actions</th>
                </tr>
              </thead>

              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  issuesData.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText pe-0'>{index + 1}</td>
                      <td className=' greyText pe-0'>{item.book.bookName}</td>
                      <td className=' greyText pe-0'>{item.issueDate}</td>
                      <td className=' greyText pe-0 my-anchor-view'>{item.returnDate}</td>
                      <td className=' greyText pe-0'>{item.returnDelay}</td>
                      <td className=' greyText pe-0'>{item.studentId}</td>
                      <td className=' greyText pe-0'>{item.book.bookName}</td>
                      <td className={` pe-0 ${item.bookStatus === 'Issued' ? 'my-issue-status' : ''}`}>
                        <p className={` pe-0 ${item.bookStatus === 'Issued' ? 'my-issue-status' : `${item.bookStatus === 'Lost' ? 'my-lost-status' : 'my-return-status'}`}`}>{item.bookStatus}</p>
                      </td>
                      <td className=' greyText  pe-0' >
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action  &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop11122" aria-controls="staticBackdrop" onClick={(e) => MyIssueBookGetByIdApi(item.transactionId)}>Edit</Link></li>
                            <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={(e) => setIdForDelete(item.transactionId)}>Delete</Link></li>
                            <Toaster />
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <Toaster />
            </table>
          </div>

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}

        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          {/* <div className={`offcanvas-end offcanvas${offcanvasclose ? ' offcanvas-close' : ''}`} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"> */}
          {
            show && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Issue Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16">Return Date</label>
                      <input type="date" class="form-control   label-color" id="exampleFormControlInput1" onChange={(e) => handleDate(e.target.value)} placeholder="Select Date" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                      <select class="form-select form-select-sm form-focus  label-color" onChange={handle} aria-label="Default select example">
                        <option selected value="">--Choose--</option>

                        {
                          classData.map(item => (
                            <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                          ))
                        }

                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Section</label>
                      <select class="form-select  form-select-sm form-focus  label-color" onChange={SectionHandle} aria-label="Default select example">
                        <option selected value="">--Choose--</option>
                        {
                          sectionData.map(item => (
                            <option value={`${item.sectionId}, ${item.sectionName}`}>{item.sectionName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Student</label>
                      <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setStudent(e.target.value)} aria-label="Default select example">
                        <option selected value="">--Choose--</option>

                        {
                          studentData.map(item => (
                            <option value={item.studentId}>{item.studentName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Book</label>
                      <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setBook(e.target.value)} aria-label="Default select example">
                        <option selected value="">--Choose--</option>
                        {
                          bookData.map(item => (
                            <option value={item.bookId}>{item.bookName}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success heading-16 my-button112233 btn-bgAndColor" onClick={(e) => { SubcPutDataApi() }}>Save</button>
                      <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
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
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ################## Edit Off Canvas Area ####################  */}
        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop11122" aria-labelledby="staticBackdropLabel">
          {
            editshow && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel"> Edit Issue Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16">Return Date</label>
                      <input type="date" class="form-control   label-color" id="exampleFormControlInput1" value={returndate} onChange={(e) => handleDate(e.target.value)} placeholder="Select Date" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                      <select class="form-select  form-select-sm form-focus  label-color" value={classNo} onChange={handle} aria-label="Default select example">
                        {
                          classData.map(item => (
                            <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                          ))
                        }

                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Section</label>
                      <select class="form-select  form-select-sm form-focus  label-color" value={sectionName} onChange={SectionHandle} aria-label="Default select example">
                        <option selected value="">--Choose--</option>
                        {
                          sectionData.map(item => (
                            <option value={`${item.classSecId}, ${item.sectionName}`}>{item.sectionName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Student</label>
                      <select class="form-select  form-select-sm form-focus  label-color" value={student} onChange={(e) => setStudent(e.target.value)} aria-label="Default select example">

                        {
                          studentData.map(item => (
                            <option value={item.studentId}>{item.studentName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Book</label>
                      <select class="form-select  form-select-sm form-focus  label-color" value={book} onChange={(e) => setBook(e.target.value)} aria-label="Default select example">

                        {
                          bookData.map(item => (
                            <option value={item.bookId}>{item.bookName}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success heading-16 my-button112233 btn-bgAndColor" onClick={(e) => MyIssueBookPutApi(IdForUpdate)}>Update</button>
                      <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            edithide && (
              <>
                <div className="offcanvas-header d-block for-my-display">
                  <div className="offcanvas-header p-0 ">
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>

        {/* ################## Edit Off Canvas Area end  ####################  */}



        {/* ################## Return book Off Canvas Area ####################  */}

        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop3344" aria-labelledby="staticBackdropLabel">
          {/* <div className={` offcanvas-end offcanvas${offcanvasclose ? ' offcanvas-close' : ''}`} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"> */}
          {
            returnbookshow && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Return this Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16 label-color">Issue Date</label>
                      <input type="date" class="form-control form-control-sm  r" id="exampleFormControlInput1" placeholder="Select Date" />
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16 label-color">Return Date</label>
                      <input type="date" class="form-control   " id="exampleFormControlInput1" placeholder="Select Date" />
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16">Class</label>
                      <select class="form-select  form-select-sm form-focus  " aria-label="Default select example">
                        <option selected>One</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label label-color  heading-16">Section</label>
                      <select class="form-select  form-select-sm form-focus  " aria-label="Default select example">
                        <option selected>C </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label label-colo heading-16">Student</label>
                      <select class="form-select  form-select-sm form-focus  r" aria-label="Default select example">
                        <option selected>Marah Petersen</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16">Book</label>
                      <select class="form-select  form-select-sm form-focus  " aria-label="Default select example">
                        <option selected>Ebony Gilbert </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success heading-16 my-button112233" onClick={(e) => RetunrBookHandleBtn()}>Update</button>
                      <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            returnbookhide && (
              <>
                <div className="offcanvas-header d-block for-my-display">
                  <div className="offcanvas-header p-0 ">
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
        {/* ################## Return book Off Canvas Area end ####################  */}



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
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete(true)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
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
                      <button type="button" className="btn btn-outline-primary my-button11 mt-4 mb my-button112233" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

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

export default BookIssueReport
