import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ClassGetApi } from '../Utils/Apis'
import { SyllabusSectionGetAllApi } from '../Utils/Apis'
import { DailyAttendancehGetAll } from '../Utils/Apis'
import { DailyAttendancePostApi } from '../Utils/Apis'
import { MyDailyAttendancePutApi } from '../Utils/Apis'
import { DailyAttendancehGetAllBymonth } from '../Utils/Apis'
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

const DailyAttendance = ({ items }) => {

  const [hide, setHide] = useState(false)
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [attendance, setAttendance] = useState(false)
  const [present, setPresent] = useState([])
  const [absent, setAbsent] = useState([])
  console.log('present', present)
  console.log('absent', absent)

  const [classId, setClassId] = useState()
  const [sectionId, setSectionId] = useState()
  const [sectionId2, setSectionId2] = useState()
  console.log('my section id is', sectionId2)
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [sectionName, setSectionName] = useState()
  const [search, setSearch] = useState('')

  const [date, setDate] = useState()
  const [name, setName] = useState()
  const [radioChecked, setRadioChecked] = useState()
  const [classData, setClassData] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [dailyAttenSearDateData, setDailyAttenSearDateData] = useState([])
  const [dailyDataByMonth, setDailyDataByMonth] = useState([])

  // console.log('dailyData by month in state', dailyDataByMonth)

  const sectionHandle = (e) => {
    setSectionId2(parseInt(e))
  }
  const UpdateHandleBtn = (e) => {
    if (show === true && hide === false) {
      setShow(false)
      setHide(true)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    UpdatClassGetApi()
    if (classId) {
      MySyllabusSectionGetApi()
    }
    MyDailyAttendanceGetApi()
  }, [classId, sectionId])

  // class Get all data from class page for class id  
  const UpdatClassGetApi = async () => {
    try {
      const response = await ClassGetApi();
      console.log('class-get-all-api in Syllabus', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setClassData(response?.data?.classes)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Section by class for section 
  const MySyllabusSectionGetApi = async () => {
    try {
      const response = await SyllabusSectionGetAllApi(classId);
      console.log('Section-get-all-api in Syllabus', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setSectionData(response?.data?.allSections)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Daily attendance get all aapi by search-date
  const MyDailyAttendanceGetApi = async () => {
    try {
      // console.log('my section id and data', sectionId, date)
      const response = await DailyAttendancehGetAll(sectionId, date);
      // console.log('my Daily attendance in search-date ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setDailyAttenSearDateData(response?.data?.studentList)
        // console.log(response?.data?.studentList, 'msg student list')
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Daily attendance get all aapi by month
  const MyDailyAttendanceGetAllApiByMonth = async () => {
    // console.log('section id inside api', sectionId2)
    const formData = new FormData()
    formData.append('sectionId', sectionId2);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('searchKey', search);
    formData.append('page', 1);
    formData.append('size', 10);
    try {
      // console.log('my section id and data', sectionId, date)
      const response = await DailyAttendancehGetAllBymonth(sectionId2, month, year, search, 1, 10);
      console.log('my Daily attendance data by month ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setDailyDataByMonth(response?.data?.attendance?.studentList)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const SectionHandle = (e) => {
    const value = e;
    const [val1, val2] = value.split(',');
    setSectionId(parseInt(val1))
    const name = val2.trim()
    setSectionName(name)
  }

  // Daily attendance Post Api 
  const MyDailyAttendancePostApi = async () => {
    const data = {
      "date": date,
      "sectionId": sectionId,
      "studentList": present
    }
    setLoader(true)
    try {
      const response = await DailyAttendancePostApi(data);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.msg);
          setHidedelete(true)
          setLoader(false)
          setShow(false)
          setHide(false)
        } else {
          toast.error(response?.data?.msg);
          // setShow(true)
        }
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Daily attendance Put api 
  const MyNewDailyAttendancePutApi = async () => {
    const data = {
      "date": date,
      "sectionId": sectionId,
      "stuPresent": present,
      "stuAbsent": absent,
      "sectionName": sectionName
    }
    setLoader(true)
    try {
      const response = await MyDailyAttendancePutApi(data);
      console.log('MY_Attendance____put-Api', response)
      if (response?.status === 200) {
        toast.success(response?.data?.msg);
        setHidedelete(true)
        setLoader(false)
        setShow(false)
        setHide(false)
      } else {
        toast.error(response?.data?.msg);
        setEditshow(true)
      }

    } catch (error) {
      console.log(error)
    }
  }
  // ****************************************************************************************************************************
  const handleRadioChange = (index, value, name) => {
    const updatedData = dailyAttenSearDateData.map((item, i) =>
      i === index ? { ...item, present: value } : item
    );
    setDailyAttenSearDateData(updatedData);
    setAttendance(value)


    if (value === true) {
      let presentValue = name;
      setPresent([...present, presentValue])

    } else {
      let absentValue = name;
      setAbsent([...absent, absentValue])
    }

  };

  // ****************************************************************************************************************************

  // Table data by months 


  // const startDate = new Date(year, month, 1);
  // const endDate = new Date(year, month + 1, 0); // Last day of the month

  // const dates = [];
  // for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
  //   dates.push(new Date(date));
  // }

  // console.log(dates)



  // Table data by months 

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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Daily Attendance</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            <button type="button " className="btn export1 btn-outline-secondary my-own-outline-btn me-2 ">
              <span>
                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span>Export to CSV</span>
            </button>
            <button type="button " className="btn export2 btn-outline-secondary my-own-outline-btn me-2 ">
              <span>
                <svg width="14" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.37317 11.25C4.02799 11.25 3.74817 11.5299 3.74817 11.875V14.375C3.74817 14.7201 4.02799 15 4.37317 15C4.71834 15 4.99817 14.7201 4.99817 14.375V14.167H5.41467C6.22018 14.167 6.87317 13.514 6.87317 12.7085C6.87317 11.903 6.22018 11.25 5.41467 11.25H4.37317ZM5.41467 12.917H4.99817V12.5H5.41467C5.52982 12.5 5.62317 12.5934 5.62317 12.7085C5.62317 12.8236 5.52982 12.917 5.41467 12.917Z" fill="#008479" />
                  <path d="M11.249 11.8743C11.2495 11.5294 11.5292 11.25 11.874 11.25H13.1219C13.4672 11.25 13.7469 11.5299 13.7469 11.875C13.7469 12.2201 13.4672 12.5 13.1219 12.5H12.4983L12.4978 12.9181H13.1219C13.4672 12.9181 13.7469 13.1979 13.7469 13.5431C13.7469 13.8883 13.4672 14.1681 13.1219 14.1681H12.4985L12.499 14.3734C12.4999 14.7186 12.2208 14.9991 11.8757 15C11.5304 15.0009 11.2499 14.7217 11.249 14.3766L11.2469 13.5424L11.249 11.8743Z" fill="#008479" />
                  <path d="M8.12134 11.25C7.77615 11.25 7.49634 11.5299 7.49634 11.875V14.375C7.49634 14.7201 7.77615 15 8.12134 15H8.74814C9.78366 15 10.6232 14.1605 10.6232 13.125C10.6232 12.0895 9.78366 11.25 8.74814 11.25H8.12134ZM8.74634 13.75V12.5H8.74814C9.09329 12.5 9.37316 12.7799 9.37316 13.125C9.37316 13.4701 9.09329 13.75 8.74814 13.75H8.74634Z" fill="#008479" />
                  <path d="M8.74817 5.625V0H3.12317C2.08764 0 1.24817 0.839463 1.24817 1.875V8.85215C0.520887 9.11006 0 9.80411 0 10.6198V15.6237C0 16.4395 0.520887 17.1335 1.24817 17.3915V18.125C1.24817 19.1605 2.08764 20 3.12317 20H14.3732C15.4087 20 16.2482 19.1605 16.2482 18.125V17.3916C16.9757 17.1337 17.4967 16.4396 17.4967 15.6237V10.6198C17.4967 9.80399 16.9757 9.10986 16.2482 8.85204V7.5H10.6232C9.58768 7.5 8.74817 6.66054 8.74817 5.625ZM1.875 9.99481H15.6217C15.9668 9.99481 16.2467 10.2746 16.2467 10.6198V15.6237C16.2467 15.969 15.9668 16.2487 15.6217 16.2487H1.87501C1.52982 16.2487 1.25 15.969 1.25 15.6237V10.6198C1.25 10.2746 1.52982 9.99481 1.875 9.99481Z" fill="#008479" />
                  <path d="M9.99817 5.625V0.3125L15.9357 6.25H10.6232C10.278 6.25 9.99817 5.97017 9.99817 5.625Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span>Export to PDF</span>
            </button>
            <div className='me-2 search-responsive'>
              <div className="input-group mb-3 ">
                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2">Search</span>
              </div>
            </div>
            <div class="dropdown">
              <button className="btn btn-success heading-16 my-own-button me-3  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Attendnace
              </button>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to="#">Take Attendance </Link></li>
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight123" aria-controls="offcanvasRight" to="#">Update Attendance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Attendance</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-3 col-md-6 col-sm-12  ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Month</label>
                <select class="form-select  form-select-sm" onChange={(e) => setMonth(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                <select class="form-select  form-select-sm" onChange={(e) => setYear(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>

                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color  heading-14">Class</label>
                <select class="form-select form-focus  form-select-sm " onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                  <option value=''>--Choose--</option>
                  {
                    classData.map((item) => (
                      <option value={item.classId}>{item.classNo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                <select class="form-select  form-select-sm" onChange={(e) => sectionHandle(e.target.value)} aria-label="Default select example">
                  <option value=''>--Choose--</option>
                  {
                    sectionData.map((item) => (
                      <option value={item.sectionId}>{item.sectionName}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          {/* ####### buttons ######  */}
          <div className="row buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" onClick={MyDailyAttendanceGetAllApiByMonth}>Search</button>
              <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
          </div>

          <div className="row mt-4 mb-4 bg-color-pink p-3 m-3">
            <div className="col-1"></div>
            <div className="col-10 ">
              <div className="row heading-16 ">
                <div className="col-2 p-0 ps-5">
                  <span className='heading-16 greyText'>  Class</span>
                  - Two
                </div>
                <div className="col-2 p-0 ps-4">
                  <span className='heading-16 greyText'>Section</span>
                  - A
                </div>
                <div className="col-2 p-0">
                  <span className='heading-16 greyText'> Month</span>
                  - March 2024
                </div>
                <div className="col-4 p-0">
                  <span className='heading-16 greyText ps-4'>  Last Update at</span>
                  - 13 March 2024
                </div>
                <div className="col-2 p-0">
                  <span className='heading-16 greyText '> Time</span>
                  - 05:47:32
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='table-row-bg-color'>#</th>
                  <th className='table-row-bg-color'> Student Name</th>
                  <th className='table-row-bg-color'>1</th>
                  <th className='table-row-bg-color'>2</th>
                  <th className='table-row-bg-color'>3</th>
                  <th className='table-row-bg-color'>4</th>
                  <th className='table-row-bg-color'>5</th>
                  <th className='table-row-bg-color'>6</th>
                  <th className='table-row-bg-color'>7</th>
                  <th className='table-row-bg-color'>8</th>
                  <th className='table-row-bg-color'>9</th>
                  <th className='table-row-bg-color'>10</th>
                  <th className='table-row-bg-color'>11</th>
                  <th className='table-row-bg-color'>12</th>
                  <th className='table-row-bg-color'>13</th>
                  <th className='table-row-bg-color'>14</th>
                  <th className='table-row-bg-color'>15</th>
                  <th className='table-row-bg-color'>16</th>
                  <th className='table-row-bg-color'>17</th>
                  <th className='table-row-bg-color'>18</th>
                  <th className='table-row-bg-color'>19</th>
                  <th className='table-row-bg-color'>20</th>
                  <th className='table-row-bg-color'>21</th>
                  <th className='table-row-bg-color'>22</th>
                  <th className='table-row-bg-color'>23</th>
                  <th className='table-row-bg-color'>24</th>
                  <th className='table-row-bg-color'>25</th>
                  {/* {dates.map(date => (
                    <th key={date.toISOString()}>{date.toDateString()}</th>
                  ))} */}
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>

                {
                  dailyDataByMonth.map((item, index) => (
                    <tr className='heading-14 ' >
                      <td className=' greyText '>{index + 1}</td>
                      <td className=' greyText '>{item.name.split('-')[1]}</td>
                      {
                        item?.attendance.map((item, index) => (
                          <td className='greyText' >
                            {
                              item.status === "present" ?
                                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                                </svg>
                                :
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                                </svg>
                            }
                          </td>
                        ))
                      }

                    </tr>

                  ))}



                {/* <tr className='heading-14 ' >
                  <td className=' greyText '>1.</td>
                  <td className=' greyText '>Saqib khan</td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                </tr> */}

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

        {/* ##### offcanvas Take attendance start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          {/* ########## content area #################  */}
          {
            show && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Take Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>

                    {
                      classData.map((item) => (
                        <option value={item.classId}>{item.classNo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>

                    {
                      sectionData.map((item) => (
                        <option value={item.sectionId}>{item.sectionName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { UpdateHandleBtn() }}>Show Student List</button>
                  <button type="button" className="btn btn-outline-success ">Cancel</button>
                </div>
              </div>
            )
          }
          {/* ################# After click ###############  */}
          {
            hide && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Take Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                    <option selected>Select Class </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                    <option selected> Select Section </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className='my-non-clickable mt-4'>
                  <button type="button" class="btn btn-outline-secondary heading-16 ">Present All</button>
                  <button type="button" class="btn btn-outline-secondary ms-2">Absent All</button>
                </div>
                <div className='heading-14 d-flex  ps-1 pt-2 orangeText'>
                  <p>P - Present</p>
                  <p className='ps-4'>A - Absent</p>
                </div>

                {/* ####### table ########### */}
                <div className="table-container pt-3 table-responsive overflow-y">
                  <table className="table  ">
                    <thead className=''>
                      <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                        <th className='table-row-bg-color greyTextColor'>#</th>
                        <th className='table-row-bg-color greyTextColor'> Student Name</th>
                        <th className='table-row-bg-color greyTextColor'>Status</th>
                      </tr>
                    </thead>
                    <tbody className='heading-14 align-middle greyTextColor ' >
                      {
                        dailyAttenSearDateData.map((item, index) => (
                          <tr className='heading-14' key={index}>
                            <td className='greyText'>{index + 1}</td>
                            <td className='greyText'>{item.name ? item.name.split('-')[1] : ''}</td>
                            <td className='heading-18 pe-0 d-flex'>
                              <div className='d-flex'>
                                <p className=''  >P</p>
                                <span className='pt-1 ps-2'>
                                  <input
                                    className="form-check-input my-form-check-input123"

                                    checked={item.present === true}
                                    type="radio"
                                    onClick={() => handleRadioChange(index, true, item.name)}
                                  />
                                </span>
                              </div>
                              <div className='d-flex ps-4'>
                                <p>A</p>
                                <span className='pt-1 ps-2'>
                                  <input
                                    className="form-check-input my-form-check-input123"
                                    checked={item.present === false}
                                    type="radio"
                                    onClick={() => handleRadioChange(index, false, item.name)}
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={MyDailyAttendancePostApi}>Submit</button>
                  <button type="button" className="btn btn-outline-success ">Cancel</button>
                </div>
              </div>
            )
          }

          <div>
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
                        <p >Successful Created</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Attendance has been <br /> Successfully Created</p>
                      </div>
                      <div className='button-position'>
                        <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }} >Continue</button>

                      </div>

                    </div>
                  </div>
                </div>

              )
            }
          </div>
        </div>
        {/* ##### offcanvase Take attendance  end ########  */}


        {/* ##### offcanvas Update attendance start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight123" aria-labelledby="offcanvasRightLabel">
          {/* ########## content area #################  */}
          {
            show && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Update Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>

                    {
                      classData.map((item) => (
                        <option value={item.classId}>{item.classNo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" onChange={(e) => SectionHandle(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>

                    {
                      sectionData.map((item) => (
                        // <option value={item.sectionId}>{item.sectionName}</option>
                        <option value={`${item.sectionId}, ${item.sectionName}`}>{item.sectionName}</option>

                      ))
                    }
                  </select>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { UpdateHandleBtn() }}>Show Student List</button>
                  <button type="button" className="btn btn-outline-success ">Cancel</button>
                </div>
              </div>
            )
          }
          {/* ################# After click ###############  */}
          {
            hide && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Update Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                    <option selected>Select Class </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                    <option selected> Select Section </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className='my-non-clickable mt-4'>
                  <button type="button" class="btn btn-outline-secondary heading-16 ">Present All</button>
                  <button type="button" class="btn btn-outline-secondary ms-2">Absent All</button>
                </div>
                <div className='heading-14 d-flex  ps-1 pt-2 orangeText'>
                  <p>P - Present</p>
                  <p className='ps-4'>A - Absent</p>
                </div>

                {/* ####### table ########### */}
                <div className="table-container pt-3 table-responsive overflow-y">
                  <table className="table  ">
                    <thead className=''>
                      <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                        <th className='table-row-bg-color greyTextColor'>#</th>
                        <th className='table-row-bg-color greyTextColor'> Student Name</th>
                        <th className='table-row-bg-color greyTextColor'>Status</th>
                      </tr>
                    </thead>
                    <tbody className='heading-14 align-middle greyTextColor ' >
                      {
                        dailyAttenSearDateData.map((item, index) => (
                          <tr className='heading-14' key={index}>
                            <td className='greyText'>{index + 1}</td>
                            <td className='greyText'>{item.name ? item.name.split('-')[1] : ''}</td>
                            <td className='heading-18 pe-0 d-flex'>
                              <div className='d-flex'>
                                <p>P</p>
                                <span className='pt-1 ps-2'>
                                  <input
                                    className="form-check-input my-form-check-input123"
                                    checked={item.present === true}
                                    type="radio"
                                    onChange={() => handleRadioChange(index, true, item.name)}
                                  />
                                </span>
                              </div>
                              <div className='d-flex ps-4'>
                                <p>A</p>
                                <span className='pt-1 ps-2'>
                                  <input
                                    className="form-check-input my-form-check-input123"
                                    checked={item.present === false}
                                    type="radio"
                                    onChange={() => handleRadioChange(index, false, item.name)}
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={MyNewDailyAttendancePutApi}>Update</button>
                  <button type="button" className="btn btn-outline-success ">Cancel</button>
                </div>
              </div>
            )
          }
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
                      <p >Successful Updated</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Attendance has been <br /> Successfully Updated</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }} >Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ##### offcanvase Update attendance  end ########  */}




      </div>
    </Container>
  )
}

export default DailyAttendance;