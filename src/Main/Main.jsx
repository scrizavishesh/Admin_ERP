import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard'
import AdmissionForm from '../Pages/AdmissionForm/AdmissionForm'
import ExcelUpload from '../Pages/AdmissionForm/ExcelUpload'
import SingleStudentAdmission from '../Pages/AdmissionForm/SingleStudentAdmission'
import ExamCategory from '../Pages/Examination/ExamCategory'
import Grades from '../Pages/Examination/Grades'
import Marks from '../Pages/Examination/Marks'
import OfflineExam from '../Pages/Examination/OfflineExam'
import Promotion from '../Pages/Examination/Promotion'
import Marksheet from '../Pages/Examination/Marksheet'
import AddDriver from '../Pages/Transport/AddDriver'
import AddVehicle from '../Pages/Transport/AddVehicle'
import AssignStudent from '../Pages/Transport/AssignStudent'
import Driver from '../Pages/Transport/Driver'
import Vehicle from '../Pages/Transport/Vehicle'
import SamplePaper from '../Pages/SamplePaper'
import Assignment from '../Pages/Assignment'
import SchoolSetting from '../Pages/Settings/SchoolSetting'
import SessionManager from '../Pages/Settings/SessionManager'
import GradeBook from '../Pages/Settings/GradeBook'
import PaymentSettings from '../Pages/Settings/PaymentSettings'
import Subscription from '../Pages/Settings/Subscription'
import MyAccount from '../Pages/Settings/MyAccount'
import AddRoute from '../Pages/Transport/AddRoute'
import AddDropPoint from '../Pages/Transport/AddDropPoint'
import AllStudents from '../Pages/AdmissionForm/AllStudents'
import OpenAssignment from '../Modals/Assignments/OpenAssignment'
import SubmitAssignment from '../Modals/Assignments/SubmitAssignment'
import PageNotFound from '../Pages/PageNotFound'
import styled from 'styled-components';
import DropPoint from '../Pages/Transport/DropPoint'
import AllRoute from '../Pages/Transport/Route'

// Saqib 


import Admin from '../Pages/Admin';
import AdAdminForm from '../Pages/AdAdminForm';
import Teacher from '../Pages/Teacher';
import Accountant from '../Pages/Accountant';
import Librarian from '../Pages/Librarian';
import Student from '../Pages/Student';
import OtherStaff from '../Pages/OtherStaff';
import TeacherPermission from '../Pages/TeacherPermission';
import TeacherPermission22 from '../Pages/TeacherPermission22';
import DailyAttendance from '../Pages/DailyAttendance';
import ClassList from '../Pages/ClassList';
import ClassRoutine from '../Pages/ClassRoutine';
import Subject from '../Pages/Subject';
import Gradebooks from '../Pages/Gradebooks';
import Syllabus from '../Pages/Syllabus';
import ClassRoom from '../Pages/ClassRoom';
import Departments from '../Pages/Departments';
import UserRole from '../Pages/RolePermission';
import UserList from '../Pages/UserList';
import TakeAttendance from '../Pages/TakeAttendance';
import Leave from '../Pages/Leave';
import StateTable_1 from '../Pages/StateTable_1';
import Payroll from '../Pages/Payroll';
import PayRoll_Create from '../Pages/PayRoll_Create';
import SmsSetting from '../Pages/SmsSetting';
import SmsSettingState1 from '../Pages/SmsSettingState1';
import SmsSettingState2 from '../Pages/SmsSettingState2';
import SmsSettingState3 from '../Pages/SmsSettingState3';
import SmsSender from '../Pages/SmsSender';
import BookListManager from '../Pages/BookListManager';
import BookIssueReport from '../Pages/BookIssueReport';
import Holiday from '../Pages/Holiday';
import Notice from '../Pages/Notice';
import NoticeViewPage from '../Pages/NoticeViewPage';
import Event from '../Pages/Event';
import Login from '../Pages/Event';
import Section from '../Pages/Section';
import RolePermisGetAll from '../Pages/RolePermisGetAll';
import OnlineCourse from '../Pages/OnlineCourse';
import AssignLeave from '../Pages/AssignLeave';
import LeaveStatus from '../Pages/LeaveStatus';
import AssignSubjectTeacher from '../Pages/AssignSubjectTeacher';
import AssignClassTeacher from '../Pages/AssignClassTeacher';

const Container = styled.div`
`;

const Main = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/' element={<AdminDashboard/>}/>
          <Route path='/admissionForm' element={<AdmissionForm/>}/>
          <Route path='/excelUpload' element={<ExcelUpload/>}/>
          <Route path='/singleStudentAdmission' element={<SingleStudentAdmission/>}/>
          <Route path='/examCategory' element={<ExamCategory/>}/>
          <Route path='/grades' element={<Grades/>}/>
          <Route path='/marks' element={<Marks/>}/>
          <Route path='/offlineExam' element={<OfflineExam/>}/>
          <Route path='/marksheet' element={<Marksheet/>}/>
          <Route path='/promotion' element={<Promotion/>}/>
          <Route path='/addDriver' element={<AddDriver/>}/>
          <Route path='/addVehicle' element={<AddVehicle/>}/>
          <Route path='/assignStudent' element={<AssignStudent/>}/>
          <Route path='/driver' element={<Driver/>}/>
          <Route path='/vehicle' element={<Vehicle/>}/>
          <Route path='/route' element={<AllRoute/>}/>
          <Route path='/dropPoint' element={<DropPoint/>}/>
          <Route path='/addRoute' element={<AddRoute/>}/>
          <Route path='/addDropPoint' element={<AddDropPoint/>}/>
          <Route path='/samplePaper' element={<SamplePaper/>}/>
          <Route path='/assignment' element={<Assignment/>}/>
          <Route path='/schoolSetting' element={<SchoolSetting/>}/>
          <Route path='/sessionManager' element={<SessionManager/>}/>
          {/* <Route path='/gradeBook' element={<GradeBook/>}/> */}
          <Route path='/paymentSettings' element={<PaymentSettings/>}/>
          <Route path='/subscription' element={<Subscription/>}/>
          <Route path='/myAccount' element={<MyAccount/>}/>
          <Route path='/allStudent' element={<AllStudents/>}/>
          <Route path='/assignment/openAssignment/:id' element={<OpenAssignment/>}/>
          <Route path='/assignment/submitAssignment/:id' element={<SubmitAssignment/>}/>
          <Route path="/iii" element={<iii/>} />






          {/* Saqib */}



          <Route exact path='/admin' element={<Admin/>}/>
          <Route exact path='/addadminform' element={<AdAdminForm/>}/>
          <Route exact path='/teacher' element={<Teacher/>}/>
          <Route exact path='/accountant' element={<Accountant/>}/>
          <Route exact path='/librarian' element={<Librarian/>}/>
          <Route exact path='/student' element={<Student/>}/>
          <Route exact path='/other_staff' element={<OtherStaff/>}/>
          <Route exact path='/teacherpermission' element={<TeacherPermission/>}/>
          <Route exact path='/teacherpermission22' element={<TeacherPermission22/>}/>
          <Route exact path='/dailyattendance' element={<DailyAttendance/>}/>
          <Route exact path='/classlist' element={<ClassList/>}/>
          <Route exact path='/classroutine' element={<ClassRoutine/>}/>
          <Route exact path='/subject' element={<Subject/>}/>
          <Route exact path='/gradebooks' element={<Gradebooks/>}/>
          <Route exact path='/syllabus' element={<Syllabus/>}/>
          <Route exact path='/Classroom' element={<ClassRoom/>}/>
          <Route exact path='/Department' element={<Departments/>}/>
          <Route exact path='/userrole' element={<UserRole/>}/>
          <Route exact path='/userlist' element={<UserList/>}/>
          <Route exact path='/takeattendance' element={<TakeAttendance/>}/>
          <Route exact path='/leave' element={<Leave/>}/>
          <Route exact path='/statetable1' element={<StateTable_1/>}/>
          <Route exact path='/payroll' element={<Payroll/>}/>
          <Route exact path='/payrollcreate' element={<PayRoll_Create/>}/>
          <Route exact path='/smssetting' element={<SmsSetting/>}/>
          <Route exact path='/smssettingstate1' element={<SmsSettingState1/>}/>
          <Route exact path='/smssettingstate2' element={<SmsSettingState2/>}/>
          <Route exact path='/smssettingstate3' element={<SmsSettingState3/>}/>
          <Route exact path='/smssender' element={<SmsSender/>}/>
          <Route exact path='/booklistmanager' element={<BookListManager/>}/>
          <Route exact path='/bookissuereport' element={<BookIssueReport/>}/>
          <Route exact path='/holiday' element={<Holiday/>}/>
          <Route exact path='/notice' element={<Notice/>}/>
          <Route exact path='/noticeview' element={<NoticeViewPage/>}/>
          <Route exact path='/event' element={<Event/>}/>
          {/* <Route exact path='/' element={<Login/>}/> */}
          <Route exact path='/section' element={<Section/>}/>
          <Route exact path='/rolepermissiongetall' element={<RolePermisGetAll/>}/>
          <Route exact path='/onlinecourse' element={<OnlineCourse/>}/>
          <Route exact path='/assignleave' element={<AssignLeave/>}/>
          <Route exact path='/leavestatus' element={<LeaveStatus/>}/>
          <Route exact path='/assignsubjectteacher' element={<AssignSubjectTeacher/>}/>
          <Route exact path='/assignclassteacher' element={<AssignClassTeacher/>}/>


          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default Main