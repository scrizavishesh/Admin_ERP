import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutApi } from '../Utils/Apis';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
    background-color: var(--sidebarBackground);
    width: ${({ sidebaropen }) => (sidebaropen ? '224px' : '64px')};
    transition: all 0.3s ease;
    position: sticky;
    bottom:0;

    ul {
        max-height: calc(100vh - 10vh);
        overflow: auto;
    }

    .dashed{
        list-style: none !important;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .borderTOP {
        border-top: 1px solid var(--borderSidebar);
    }

    .borderBottom {
        border-bottom: 1px solid var(--borderSidebar);
    }

    .menus {
        position: relative;
        padding: 1rem;
        display: flex;
        color: #000;
        align-items: center;
        white-space: nowrap;
        text-decoration : none !important;
        transition: background-color 0.3s, color 0.3s,;

        &:hover {
            background-color: #008479;
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &:hover::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        &.active {
            background-color: var(--greenTextColor);
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &.active::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        .menu-text {
            display: ${({ sidebaropen }) => (sidebaropen ? 'inline' : 'none')};
            margin-left: 10px;
            transition: margin-left 0.3s ease;
        }

        ${({ sidebaropen }) => !sidebaropen && `
            &:hover .menu-text {
                display: inline;
                position: absolute;
                left: 55px;
                white-space: nowrap;
                background-color: var(--greenTextColor);
                padding: 0.68rem 1.5rem 0.68rem 1.5rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-right: 5px solid orange;
            }

            &:hover .menu-text::before {
                content: "";
                position: absolute;
                right: -2.5px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-right: 10px solid orange;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }
        `}
    }

    .collapse-menu {
        padding-left: 1.5rem;
    }
`;

const StickyHeader = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--sidebarBackground);
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        justify-content: space-between;

        .sidebarclass{
            position: relative;
        }

        .toggle-icon {
            position: absolute;
            right: -15px !important;
            margin-top: 7% !important;
            display: block !important;
        }
    }

    .toggle-icon {
        display: none;
        cursor: pointer;
        color: #fff;
    }
`;

const Sidebar = () => {

    const token = localStorage.getItem('token');
    const { sidebaropen, toggleSidebar } = useSidebarContext();

    const location = useLocation();

    const [activeLink, setActiveLink] = useState(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        localStorage.setItem('activeLink', currentPath);
        return currentPath;
    });

    useEffect(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        setActiveLink(currentPath);
        localStorage.setItem('activeLink', currentPath);
    }, [location.pathname]);

    const handleActiveLink = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    useEffect(()=>{
    },[token])

    const handleLogout = async() =>{
        try{
            var response = await logoutApi();
            console.log(response)
            if(response?.status===200){
                if(response?.data?.status==='success'){
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload(); 
                }
            }
            else{
                console.log(response?.data?.msg);
            }
        }
        catch{

        }
    }

    return (
        <Container sidebaropen={sidebaropen}>
            <div className="container-fluid">

                {/* Scriza Logo */}

                <StickyHeader className="row borderBottom">
                    <div className={`${sidebaropen ? "p-2" : "pt-3 pb-4"} text-white d-flex justify-content-center align-self-center`}>
                        <img className={` sidebarclass {sidebaropen ? "p-0" : "pt-4 pb-4"}`} src={sidebaropen ? "./images/Scrizalogo.svg" : "./images/ScrizaSmallLogo.png"} alt="sidebarLogo" style={{ transition: 'opacity 0.3s ease' }} />
                        <Icon className='toggle-icon' icon="emojione:left-arrow" width="1.7em" height="1.7em" onClick={toggleSidebar} />
                    </div>
                </StickyHeader>
                

                {/* Sidebar Items */}

                <div className="row p-0">
                <ul className='p-0'>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveLink('dashboard')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Dashboard</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Admin' || activeLink === 'Teacher' || activeLink === 'Accountant' || activeLink === 'Librarian' || activeLink === 'other_staff' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAddon" onClick={() => handleActiveLink('Admin')} >
                                <Icon icon="fa:user-o" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Users</h3>
                            </Link>
                            <div id="collapseAddon" className="collapse collapse-menu">
                                 {/* {`collapse collapse-menu ${sidebaropen === '' ? '' : 'ps-1'}`} */}
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/admin" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Admin' ? 'active' : ''}`} onClick={() => handleActiveLink('Admin')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                              {/* codicon:dash */}
                                            <h3 className="menu-text">Admin</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/teacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Teacher' ? 'active' : ''}`} onClick={() => handleActiveLink('Teacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Teacher</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/accountant" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Accountant' ? 'active' : ''}`} onClick={() => handleActiveLink('Accountant')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Accountant</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/librarian" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Librarian' ? 'active' : ''}`} onClick={() => handleActiveLink('Librarian')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Librarian</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/other_staff" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'other_staff' ? 'active' : ''}`} onClick={() => handleActiveLink('other_staff')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Other Staff</h3>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/teacherpermission" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'addFeature' ? 'active' : ''}`} onClick={() => handleActiveLink('addFeature')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Teacher Permission</h3>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/admissionForm" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' || activeLink === 'allStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAdmission" onClick={() => handleActiveLink('admissionForm')} >
                                <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Admissions</h3>
                            </Link>
                            <div id="collapseAdmission" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/admissionForm" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Students</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/allStudent" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'allStudent' ? 'active' : ''}`} onClick={() => handleActiveLink('allStudent')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">All Students</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' || activeLink === 'vehicle' || activeLink === 'route' || activeLink === 'dropPoint' || activeLink === 'assignStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTransport" onClick={() => handleActiveLink('driver')} >
                                <Icon icon="fluent-mdl2:bus" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Transport</h3>
                            </Link>
                            <div id="collapseTransport" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' ? 'active' : ''}`} onClick={() => handleActiveLink('driver')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Driver</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/vehicle" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'vehicle' ? 'active' : ''}`} onClick={() => handleActiveLink('vehicle')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Vehicle</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/route" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'route' ? 'active' : ''}`} onClick={() => handleActiveLink('route')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Route</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dropPoint" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dropPoint' ? 'active' : ''}`} onClick={() => handleActiveLink('dropPoint')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Drop Point</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignStudent" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignStudent' ? 'active' : ''}`} onClick={() => handleActiveLink('assignStudent')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Students</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'examCategory' || activeLink === 'offlineExam' || activeLink === 'marks' || activeLink === 'grades' || activeLink === 'marksheet' || activeLink === 'promotion' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseExamination" onClick={() => handleActiveLink('examCategory')} >
                                <Icon icon="icon-park-outline:id-card-v" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Examination</h3>
                            </Link>
                            <div id="collapseExamination" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'examCategory' ? 'active' : ''}`} onClick={() => handleActiveLink('examCategory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Exam Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/offlineExam" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'offlineExam' ? 'active' : ''}`} onClick={() => handleActiveLink('offlineExam')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Offline Exams</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/marks" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'marks' ? 'active' : ''}`} onClick={() => handleActiveLink('marks')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Marks</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/grades" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'grades' ? 'active' : ''}`} onClick={() => handleActiveLink('grades')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Grades</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/marksheet" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'marksheet' ? 'active' : ''}`} onClick={() => handleActiveLink('marksheet')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Marksheet</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/promotion" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'promotion' ? 'active' : ''}`} onClick={() => handleActiveLink('promotion')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Promotion</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/academic" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyAttendance' || activeLink === 'dailyAttendance' || activeLink === 'classList' || activeLink === 'sections' || activeLink === 'classRoutine' || activeLink === 'subject' || activeLink === 'assignSubjectTeacher' || activeLink === 'syllabus' || activeLink === 'classRoom' || activeLink === 'departments' || activeLink === 'assignClassTeacher' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAcademic" onClick={() => handleActiveLink('dailyAttendance')} >
                                <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Academic</h3>
                            </Link>
                            <div id="collapseAcademic" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/dailyattendance" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyAttendance' ? 'active' : ''}`} onClick={() => handleActiveLink('dailyAttendance')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Daily Attendance</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classlist" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'classList' ? 'active' : ''}`} onClick={() => handleActiveLink('classList')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class List</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/section" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'sections' ? 'active' : ''}`} onClick={() => handleActiveLink('sections')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Sections</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classroutine" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'classRoutine' ? 'active' : ''}`} onClick={() => handleActiveLink('classRoutine')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class Routine</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/subject" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'subject' ? 'active' : ''}`} onClick={() => handleActiveLink('subject')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Subject</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignsubjectteacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignSubjectTeacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignSubjectTeacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Subject Teacher</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/syllabus" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'syllabus' ? 'active' : ''}`} onClick={() => handleActiveLink('syllabus')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Syllabus</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Classroom" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'classRoom' ? 'active' : ''}`} onClick={() => handleActiveLink('classRoom')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class Room</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Department" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'departments' ? 'active' : ''}`} onClick={() => handleActiveLink('departments')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Departments</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignclassteacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignClassTeacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignClassTeacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Class Teacher</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/discount" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'accounting' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAccounting" onClick={() => handleActiveLink('acconting')} >
                                <Icon icon="map:accounting" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Accounting</h3>
                            </Link>
                            <div id="collapseAccounting" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/discount" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Discount</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/fee" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fee Type</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feecollection" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fee Collection</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/manageinvoice" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Manage Invoice</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dueinvoisce" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Due Invoice</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/income" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Income</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/incomecategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Income Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/expense" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Expense</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/expensecategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Expense Category</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/samplepaper" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'samplepaper' ? 'active' : ''}`} onClick={() => handleActiveLink('samplepaper')} >
                                <Icon icon="fluent:document-bullet-list-24-regular" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Sample Paper</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/assignment" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignment' ? 'active' : ''}`} onClick={() => handleActiveLink('assignment')} >
                                <Icon icon="el:list-alt" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Assignment</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/HumanResource" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'userrole' || activeLink === 'takeattendance' || activeLink === 'leavestatus' || activeLink === 'assignleave' || activeLink === 'payroll' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseHumanResource" onClick={() => handleActiveLink('userrole')} >
                                {/* <Icon icon="covid:transmission-virus-human-transmit-1" width="1.5em" height="1.5em" /> */}
                                <img src="./images/HR.svg" alt="" />
                                <h3 className="menu-text">Human Resource</h3>
                            </Link>
                            <div id="collapseHumanResource" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/userrole" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'userrole' ? 'active' : ''}`} onClick={() => handleActiveLink('userrole')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Role & Permission</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/takeattendance" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'takeattendance' ? 'active' : ''}`} onClick={() => handleActiveLink('takeattendance')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Take Attendance</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/leavestatus" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'leavestatus' ? 'active' : ''}`} onClick={() => handleActiveLink('leavestatus')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Leave Status</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignleave" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignleave' ? 'active' : ''}`} onClick={() => handleActiveLink('assignleave')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Leave</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/payroll" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'payroll' ? 'active' : ''}`} onClick={() => handleActiveLink('payroll')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Payroll</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* <li>
                            <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseInventory" onClick={() => handleActiveLink('Inventory')} >
                                <Icon icon="mingcute:profile-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Inventory</h3>
                            </Link>
                            <div id="collapseInventory" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Issue Item</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Item Stock</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Item</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Store</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Supplier</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                        {/* <li>
                            <Link to="/Alumni" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Alumni' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAlumni" onClick={() => handleActiveLink('Alumni')} >
                                <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Alumni</h3>
                            </Link>
                            <div id="collapseAlumni" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/Alumni" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Alumni' ? 'active' : ''}`} onClick={() => handleActiveLink('Alumni')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Alumni</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'booklistmanager' || activeLink === 'bookissuereport' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseLibrary" onClick={() => handleActiveLink('booklistmanager')} >
                                <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Library</h3>
                            </Link>
                            <div id="collapseLibrary" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/booklistmanager" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'booklistmanager' ? 'active' : ''}`} onClick={() => handleActiveLink('booklistmanager')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Book List Manager</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/bookissuereport" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'bookissuereport' ? 'active' : ''}`} onClick={() => handleActiveLink('bookissuereport')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Book Issue Report</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/holiday" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'holiday' ? 'active' : ''}`} onClick={() => handleActiveLink('holiday')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Holiday</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notice" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'notice' ? 'active' : ''}`} onClick={() => handleActiveLink('notice')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Notice</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/event" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'event' ? 'active' : ''}`} onClick={() => handleActiveLink('event')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Event</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/onlinecourse" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'onlinecourse' ? 'active' : ''}`} onClick={() => handleActiveLink('onlinecourse')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Online Course</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'collectFees' || activeLink === 'searchFeePayment' || activeLink === 'searchDueFees' || activeLink === 'feesMaster' || activeLink === 'feesGroup' || activeLink === 'feesType' || activeLink === 'feesDiscount' || activeLink === 'feesCarryForword' || activeLink === 'feesReminder' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapsefeeCollection" onClick={() => handleActiveLink('collectFees')} >
                                <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Fee Collection</h3>
                            </Link>
                            <div id="collapsefeeCollection" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/collectFees" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'collectFees' ? 'active' : ''}`} onClick={() => handleActiveLink('collectFees')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Collect Fees</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/searchFeePayment" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'searchFeePayment' ? 'active' : ''}`} onClick={() => handleActiveLink('searchFeePayment')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Search Fee Payment</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/searchDueFees" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'searchDueFees' ? 'active' : ''}`} onClick={() => handleActiveLink('searchDueFees')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Search Due Fees</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesMaster" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesMaster' ? 'active' : ''}`} onClick={() => handleActiveLink('feesMaster')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Master</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesGroup" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesGroup' ? 'active' : ''}`} onClick={() => handleActiveLink('feesGroup')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Group</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesType" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesType' ? 'active' : ''}`} onClick={() => handleActiveLink('feesType')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Type</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesDiscount" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesDiscount' ? 'active' : ''}`} onClick={() => handleActiveLink('feesDiscount')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Discount</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesCarryForword" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesCarryForword' ? 'active' : ''}`} onClick={() => handleActiveLink('feesCarryForword')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Carry Forword</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feesReminder" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feesReminder' ? 'active' : ''}`} onClick={() => handleActiveLink('feesReminder')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fees Reminder</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li></li>
                        <li></li>
                        <li className='borderBottom' ></li>
                        <li>
                            <Link to="/systemSettingPage" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'schoolSetting' || activeLink === 'sessionManager' || activeLink === 'paymentSettings' || activeLink === 'subscription' || activeLink === 'myAccount' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseSettings" onClick={() => handleActiveLink('schoolSetting')} >
                                <Icon icon="solar:settings-outline" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Settings</h3>
                            </Link>
                            <div id="collapseSettings" className="collapse collapse-menu">
                                <ul className='list-unstyled p-0'>
                                    <li>
                                        <Link to="/schoolSetting" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'schoolSetting' ? 'active' : ''}`} onClick={() => handleActiveLink('schoolSetting')} >
                                            <Icon icon="radix-icons:dash" width="1.4em" height="1.4em" />
                                            <h3 className="menu-text">School Settings</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sessionManager" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'sessionManager' ? 'active' : ''}`} onClick={() => handleActiveLink('sessionManager')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Session Manager</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/paymentSettings" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'paymentSettings' ? 'active' : ''}`} onClick={() => handleActiveLink('paymentSettings')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Payment Settings</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/subscription" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'subscription' ? 'active' : ''}`} onClick={() => handleActiveLink('subscription')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Subscription</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/myAccount" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'myAccount' ? 'active' : ''}`} onClick={() => handleActiveLink('myAccount')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">My Account</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveLink('logout')} data-bs-toggle="offcanvas" data-bs-target="#logoutCanvas" aria-controls="logoutCanvas" >
                                <Icon icon="material-symbols:logout" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Logout</h3>
                            </Link>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>

            {/* Logout */}

            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="logoutCanvas" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title fontWeight900" id="staticBackdropLabel">Logout Message</h2>
                </div>
                <div className="offcanvas-body p-0">
                    <div>
                        <div>
                            <p className='border-bottom p-2'>Logout</p>
                            <div className="text-center p-5">
                                <p className='mb-2'><img src="./images/logout.svg" alt="" /></p>
                                <h1 className='mb-2'>Are you Sure?</h1>
                                <h3 className='greyText'>Are you Sure you want to logout?</h3>
                                <p className='text-center p-3'>
                                    <button className='btn deleteButtons text-white' onClick={handleLogout}>Logout</button>
                                    <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
};

export default Sidebar;
