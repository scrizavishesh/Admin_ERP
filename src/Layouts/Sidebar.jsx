import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutApi } from '../Utils/Apis';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
    background-color: var(--sidebarBackground);
    width: ${({ sidebarOpen }) => (sidebarOpen ? '224px' : '64px')};
    transition: all 0.3s ease;

    ul {
        max-height: calc(100vh - 10px);
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
            display: ${({ sidebarOpen }) => (sidebarOpen ? 'inline' : 'none')};
            margin-left: 10px;
            transition: margin-left 0.3s ease;
        }

        ${({ sidebarOpen }) => !sidebarOpen && `
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
    /* z-index: 999; */
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
    const { sidebarOpen, toggleSidebar } = useSidebarContext();

    // const [activeLink, setActiveLink] = useState('dashboard');
    // const handleActiveLink = (link) => {
    //     setActiveLink(link);
    // };

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
        <Container sidebarOpen={sidebarOpen}>
            <div className="container-fluid">
                <StickyHeader className="row borderBottom">
                    <div className={`${sidebarOpen ? "p-2" : "pt-3 pb-4"} text-white d-flex justify-content-center align-self-center`}>
                        <img className={` sidebarclass {sidebarOpen ? "p-0" : "pt-4 pb-4"}`} src={sidebarOpen ? "./images/Scrizalogo.svg" : "./images/ScrizaSmallLogo.png"} alt="sidebarLogo" style={{ transition: 'opacity 0.3s ease' }} />
                        <Icon className='toggle-icon' icon="emojione:left-arrow" width="1.7em" height="1.7em" onClick={toggleSidebar} />
                    </div>
                </StickyHeader>

                <div className="row p-0">
                    <ul className='p-0'>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveLink('dashboard')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Dashboard</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Admin' || activeLink === 'Teacher' || activeLink === 'Accountant' || activeLink === 'Librarian' || activeLink === 'other_staff' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAddon" onClick={() => handleActiveLink('Admin')} >
                                <Icon icon="fa:user-o" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Users</h3>
                            </Link>
                            <div id="collapseAddon" className="collapse collapse-menu">
                                 {/* {`collapse collapse-menu ${sidebarOpen === '' ? '' : 'ps-1'}`} */}
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/admin" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Admin' ? 'active' : ''}`} onClick={() => handleActiveLink('Admin')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                              {/* codicon:dash */}
                                            <h3 className="menu-text">Admin</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/teacher" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Teacher' ? 'active' : ''}`} onClick={() => handleActiveLink('Teacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Teacher</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/accountant" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Accountant' ? 'active' : ''}`} onClick={() => handleActiveLink('Accountant')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Accountant</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/librarian" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Librarian' ? 'active' : ''}`} onClick={() => handleActiveLink('Librarian')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Librarian</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/other_staff" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'other_staff' ? 'active' : ''}`} onClick={() => handleActiveLink('other_staff')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Other Staff</h3>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/teacherpermission" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'addFeature' ? 'active' : ''}`} onClick={() => handleActiveLink('addFeature')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Teacher Permission</h3>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/admissionForm" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' || activeLink === 'allStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAdmission" onClick={() => handleActiveLink('admissionForm')} >
                                <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Admissions</h3>
                            </Link>
                            <div id="collapseAdmission" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/admissionForm" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Students</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/allStudent" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'allStudent' ? 'active' : ''}`} onClick={() => handleActiveLink('allStudent')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">All Students</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' || activeLink === 'vehicle' || activeLink === 'route' || activeLink === 'dropPoint' || activeLink === 'assignStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTransport" onClick={() => handleActiveLink('driver')} >
                                <Icon icon="fluent-mdl2:bus" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Transport</h3>
                            </Link>
                            <div id="collapseTransport" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' ? 'active' : ''}`} onClick={() => handleActiveLink('driver')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Driver</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/vehicle" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'vehicle' ? 'active' : ''}`} onClick={() => handleActiveLink('vehicle')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Vehicle</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/route" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'route' ? 'active' : ''}`} onClick={() => handleActiveLink('route')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Route</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dropPoint" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'dropPoint' ? 'active' : ''}`} onClick={() => handleActiveLink('dropPoint')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Drop Point</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignStudent" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignStudent' ? 'active' : ''}`} onClick={() => handleActiveLink('assignStudent')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Students</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'examCategory' || activeLink === 'offlineExam' || activeLink === 'marks' || activeLink === 'grades' || activeLink === 'marksheet' || activeLink === 'promotion' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseExamination" onClick={() => handleActiveLink('examCategory')} >
                                <Icon icon="icon-park-outline:id-card-v" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Examination</h3>
                            </Link>
                            <div id="collapseExamination" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'examCategory' ? 'active' : ''}`} onClick={() => handleActiveLink('examCategory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Exam Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/offlineExam" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'offlineExam' ? 'active' : ''}`} onClick={() => handleActiveLink('offlineExam')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Offline Exams</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/marks" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'marks' ? 'active' : ''}`} onClick={() => handleActiveLink('marks')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Marks</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/grades" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'grades' ? 'active' : ''}`} onClick={() => handleActiveLink('grades')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Grades</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/marksheet" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'marksheet' ? 'active' : ''}`} onClick={() => handleActiveLink('marksheet')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Marksheet</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/promotion" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'promotion' ? 'active' : ''}`} onClick={() => handleActiveLink('promotion')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Promotion</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/academic" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyAttendance' || activeLink === 'dailyAttendance' || activeLink === 'classList' || activeLink === 'sections' || activeLink === 'classRoutine' || activeLink === 'subject' || activeLink === 'assignSubjectTeacher' || activeLink === 'syllabus' || activeLink === 'classRoom' || activeLink === 'departments' || activeLink === 'assignClassTeacher' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAcademic" onClick={() => handleActiveLink('dailyAttendance')} >
                                <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Academic</h3>
                            </Link>
                            <div id="collapseAcademic" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/dailyattendance" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyAttendance' ? 'active' : ''}`} onClick={() => handleActiveLink('dailyAttendance')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Daily Attendance</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classlist" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'classList' ? 'active' : ''}`} onClick={() => handleActiveLink('classList')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class List</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/section" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'sections' ? 'active' : ''}`} onClick={() => handleActiveLink('sections')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Sections</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classroutine" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'classRoutine' ? 'active' : ''}`} onClick={() => handleActiveLink('classRoutine')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class Routine</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/subject" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'subject' ? 'active' : ''}`} onClick={() => handleActiveLink('subject')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Subject</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignsubjectteacher" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignSubjectTeacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignSubjectTeacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Subject Teacher</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/syllabus" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'syllabus' ? 'active' : ''}`} onClick={() => handleActiveLink('syllabus')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Syllabus</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Classroom" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'classRoom' ? 'active' : ''}`} onClick={() => handleActiveLink('classRoom')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class Room</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Department" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'departments' ? 'active' : ''}`} onClick={() => handleActiveLink('departments')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Departments</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignclassteacher" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignClassTeacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignClassTeacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Class Teacher</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/accounting" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'accounting' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAccounting" onClick={() => handleActiveLink('acconting')} >
                                <Icon icon="map:accounting" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Accounting</h3>
                            </Link>
                            <div id="collapseAccounting" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/accounting" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' ? 'active' : ''}`} onClick={() => handleActiveLink('admissionForm')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Accounting</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/samplepaper" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'samplepaper' ? 'active' : ''}`} onClick={() => handleActiveLink('samplepaper')} >
                                <Icon icon="fluent:document-bullet-list-24-regular" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Sample Paper</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/assignment" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignment' ? 'active' : ''}`} onClick={() => handleActiveLink('assignment')} >
                                <Icon icon="el:list-alt" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Assignment</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/HumanResource" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'userrole' || activeLink === 'takeattendance' || activeLink === 'leavestatus' || activeLink === 'assignleave' || activeLink === 'payroll' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseHumanResource" onClick={() => handleActiveLink('userrole')} >
                                {/* <Icon icon="covid:transmission-virus-human-transmit-1" width="1.5em" height="1.5em" /> */}
                                <img src="./images/HR.svg" alt="" />
                                <h3 className="menu-text">Human Resource</h3>
                            </Link>
                            <div id="collapseHumanResource" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/userrole" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'userrole' ? 'active' : ''}`} onClick={() => handleActiveLink('userrole')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Role & Permission</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/takeattendance" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'takeattendance' ? 'active' : ''}`} onClick={() => handleActiveLink('takeattendance')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Take Attendance</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/leavestatus" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'leavestatus' ? 'active' : ''}`} onClick={() => handleActiveLink('leavestatus')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Leave Status</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignleave" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignleave' ? 'active' : ''}`} onClick={() => handleActiveLink('assignleave')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Leave</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/payroll" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'payroll' ? 'active' : ''}`} onClick={() => handleActiveLink('payroll')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Payroll</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseInventory" onClick={() => handleActiveLink('Inventory')} >
                                <Icon icon="mingcute:profile-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Inventory</h3>
                            </Link>
                            <div id="collapseInventory" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/Inventory" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Inventory' ? 'active' : ''}`} onClick={() => handleActiveLink('Inventory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Inventory</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/Alumni" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Alumni' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAlumni" onClick={() => handleActiveLink('Alumni')} >
                                <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Alumni</h3>
                            </Link>
                            <div id="collapseAlumni" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/Alumni" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'Alumni' ? 'active' : ''}`} onClick={() => handleActiveLink('Alumni')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Alumni</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'booklistmanager' || activeLink === 'bookissuereport' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseSMSCenter" onClick={() => handleActiveLink('booklistmanager')} >
                                <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Library</h3>
                            </Link>
                            <div id="collapseSMSCenter" className="collapse collapse-menu">
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/booklistmanager" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'booklistmanager' ? 'active' : ''}`} onClick={() => handleActiveLink('booklistmanager')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Book List Manager</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/bookissuereport" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'bookissuereport' ? 'active' : ''}`} onClick={() => handleActiveLink('bookissuereport')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Book Issue Report</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/holiday" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'holiday' ? 'active' : ''}`} onClick={() => handleActiveLink('holiday')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Holiday</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notice" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'notice' ? 'active' : ''}`} onClick={() => handleActiveLink('notice')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Notice</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/event" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'event' ? 'active' : ''}`} onClick={() => handleActiveLink('event')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Event</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/onlinecourse" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'onlinecourse' ? 'active' : ''}`} onClick={() => handleActiveLink('onlinecourse')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Online Course</h3>
                            </Link>
                        </li>
                        <li></li>
                        <li></li>
                        <li className='borderBottom' ></li>
                        <li>
                            <Link to="/systemSettingPage" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'schoolSetting' || activeLink === 'sessionManager' || activeLink === 'paymentSettings' || activeLink === 'subscription' || activeLink === 'myAccount' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseSettings" onClick={() => handleActiveLink('schoolSetting')} >
                                <Icon icon="solar:settings-outline" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Settings</h3>
                            </Link>
                            <div id="collapseSettings" className="collapse collapse-menu">
                                <ul className='list-unstyled p-0'>
                                    <li>
                                        <Link to="/schoolSetting" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'schoolSetting' ? 'active' : ''}`} onClick={() => handleActiveLink('schoolSetting')} >
                                            <Icon icon="radix-icons:dash" width="1.4em" height="1.4em" />
                                            <h3 className="menu-text">School Settings</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sessionManager" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'sessionManager' ? 'active' : ''}`} onClick={() => handleActiveLink('sessionManager')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Session Manager</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/paymentSettings" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'paymentSettings' ? 'active' : ''}`} onClick={() => handleActiveLink('paymentSettings')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Payment Settings</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/subscription" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'subscription' ? 'active' : ''}`} onClick={() => handleActiveLink('subscription')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Subscription</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/myAccount" className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'myAccount' ? 'active' : ''}`} onClick={() => handleActiveLink('myAccount')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">My Account</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveLink('logout')} data-bs-toggle="offcanvas" data-bs-target="#logoutCanvas" aria-controls="logoutCanvas" >
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












// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useSidebarContext } from '../Dashboard/DashboardLayout';
// import { Icon } from '@iconify/react';
// import 'animate.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { logoutApi } from '../Utils/Apis';

// const Container = styled.div`
//     background-color: var(--sidebarBackground);
//     transition: width 0.2s ease;
//     height: 100vh;

//     .sticky-top{
//         background-color: var(--sidebarBackground);
//     }

//     .borderTOP{
//         border-top: 1px solid var(--borderSidebar);
//     }

//     .borderBottom{
//         border-bottom: 1px solid var(--borderSidebar);
//     }
//     @media screen and (max-width: 1000px) and (min-width: 0px) {
//         width: 200px;
//         transition: width 0.2s ease-in !important;
//     }
    
//     .crossicon{
//         display: none !important;
//     }

//     @media screen and (max-width: 1000px) {
//         .crossicon{
//             display: block !important;
//             margin-left: 11% !important;
//             margin-top: -5% !important;
//             cursor: pointer
//         }

//     }

//     .itemVisible, .subitemVisible {
//         opacity: 1;
//         position: static;
//         transition: opacity 0.3s ease;
//     }

//     .itemHidden,  .addonSubitem {
//         display: none;
//         z-index: 999;
//         position: relative;
//         left: 3.4%;
//         transition: opacity 0.2s ease;
//         padding: 0.63% 2% 0.63% 2%;
//         margin-top: -0.72% !important;
//     }

//     .menus:hover .itemHidden{
//         position: absolute;
//         display: block !important;
//         background-color: var(--buttonBgColor) !important;
//         color: #fff;
//     }

//     .addonmenu:hover .addonSubitem {
//         display: block;
//         background-color: var(--buttonBgColor) !important;
//         color: #fff;
//     }

//     .menus:hover .icon{
//         color: #fff;
//         /* background-color: var(--buttonBgColor); */
//     }

//     .submenus:hover , .menus:hover{
//         background-color: var(--buttonBgColor);
//         /* position: relative; */
//         border-right: 5px solid var(--activeOrangeBorder)
//     }

//     .submenus:hover::before , .menus:hover::before , .actionOptions:hover::before{
//         content: "";
//         display: block;
//         width: 5px; 
//         height: 5px; 
//         border-top: 8px solid transparent;
//         border-bottom: 8px solid transparent;
//         border-right: 8px solid var(--activeOrangeBorder);
//         position: absolute;
//         top: 32%;
//         right: -1%;
//     }
    
// `;

// const Sidebar = () => {

//     const navigate= useNavigate();

//     const [activeLink , setActiveLink] = useState('dashboard')
//     const [refreshPage , setRefreshPage] = useState(false)

//     const { sidebaropen } = useSidebarContext();

//     const {toggleSidebar } = useSidebarContext();  

//     useEffect(() => { 
//         localStorage.setItem('activeOption', JSON.stringify(activeLink));
//     }, [activeLink])

//     useEffect(()=>{},[refreshPage])

//     const toggleicon = window.innerWidth <= 1000 ? !sidebaropen : sidebaropen;


//     const handleLogout = async() =>{
//         try{
//             var response = await logoutApi();
//             console.log('Api called')
//             if(response?.status===200){
//                 console.log('Api called 200')
//                 if(response?.data?.status==='success'){
//                     localStorage.removeItem('token')
//                     console.log('first')
//                     navigate('/')
//                     PageRefresh();
//                 }
//             }
//             else{
//                 console.log(response?.data?.msg);
//             }
//         }
//         catch{

//         }
//     }

//     const PageRefresh = () => {
//         setRefreshPage(!refreshPage);
//     }
  

//     return (
//         <>
//             <Container>
//                 <div className='container-fluid'>
//                     <div className="row">
//                         <ul className='list-unstyled p-0 m-0'>
                            
//                             <li className={`sticky-top ${toggleicon ? 'ps-4 pe-4 pt-1 pb-1' : 'p-3'} d-flex justify-content-center crossiconli`}>
//                                 {toggleicon ? <img className='img-fluid' src="./images/Scrizalogo.svg" alt="" /> : <img className='' src="./images/ScrizaSmallLogo.png" alt="" />}<span className="btn-close crossicon" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleSidebar}></span>
//                             </li>
                            
                            
//                             <li className={`p-2 menus borderTOP ${activeLink === 'dashboard'? 'actionOptions': ''} ${toggleicon ? '' : 'pt-1'}`} onClick={() => setActiveLink('dashboard')}>
//                                 <Link to='/' className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'dashboard' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2  font14 fontweight500 ${toggleicon ? 'itemVisible': `${activeLink==='dashboard' ? 'd-none' : ''}`}`}>Dashboard</span>
//                                 </Link>
//                             </li>
                            

//                             <li className={`p-2 menus borderTOP ${activeLink === 'Admissions' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? 'actionOptions': ''}`} onClick={() => setActiveLink('Admissions')}>
//                                 <Link to='#AdmissionsCollapse' className={`d-flex p-1 text-decoration-none ${activeLink === 'Admissions' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? 'text-white': 'text-black'}`} data-bs-toggle={`${toggleicon? 'collapse': ''}`} role="button" aria-expanded="false" aria-controls={`${toggleicon? 'addOnCollapse': ''}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Admissions' || activeLink === 'addAddons' || activeLink === 'addFeatures' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Admissions</span>
//                                 </Link>
//                             </li>
                            
//                             <div className="collapse bg-white" id="AdmissionsCollapse">
//                                 <ul className='list-unstyled p-0 m-0'>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Admissions'? 'actionOptions': ''}`} onClick={() => setActiveLink('Admissions')}>
//                                         <Link to='/admissionForm' className={`d-flex p-1 text-decoration-none ${activeLink === 'Admissions'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Admissions' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Add Student</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Students'? 'actionOptions': ''}`} onClick={() => setActiveLink('Students')}>
//                                         <Link to='/allStudent' className={`d-flex p-1 text-decoration-none ${activeLink === 'Students'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Students' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Students</span>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>



//                             {/* <li className={`p-2 menus borderTOP ${activeLink === 'roleAndPermission'? 'actionOptions': ''}`} onClick={() => setActiveLink('roleAndPermission')}>
//                                 <Link to='/rolePermissions' className={`d-flex p-1 text-decoration-none ${activeLink === 'roleAndPermission'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'roleAndPermission' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Roles & Permission</span>
//                                 </Link>
//                             </li> */}
                            

//                             {/* <li className={`p-2 menus borderTOP ${activeLink === 'Admissions'? 'actionOptions': ''}`} onClick={() => setActiveLink('Admissions')}>
//                                 <Link to='/admissionForm' className={`d-flex p-1 text-decoration-none ${activeLink === 'Admissions'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Admissions' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Admissions</span>
//                                 </Link>
//                             </li> */}
                            
                            

//                             <li className={`p-2 menus borderTOP ${activeLink === 'Transport' || activeLink === 'Vehicle' || activeLink === 'AddRoute' || activeLink === 'AddDropPoint' || activeLink === 'AssignStudent'  ? 'actionOptions': ''}`} onClick={() => setActiveLink('Transport')}>
//                                 <Link to='#transportCollapse' className={`d-flex p-1 text-decoration-none ${activeLink === 'Transport' || activeLink === 'Vehicle' || activeLink === 'AddRoute' || activeLink === 'AddDropPoint' || activeLink === 'AssignStudent'  ? 'text-white': 'text-black'}`} data-bs-toggle={`${toggleicon? 'collapse': ''}`} role="button" aria-expanded="false" aria-controls={`${toggleicon? 'addOnCollapse': ''}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Transport' || activeLink === 'Vehicle' || activeLink === 'AddRoute' || activeLink === 'AddDropPoint' || activeLink === 'AssignStudent'  ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Transport</span>
//                                 </Link>
//                             </li>
                            
//                             <div className="collapse bg-white" id="transportCollapse">
//                                 <ul className='list-unstyled p-0 m-0'>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Transport' ? 'actionOptions': ''}`} onClick={() => setActiveLink('Transport')}>
//                                         <Link to='/driver' className={`d-flex p-1 text-decoration-none ${activeLink === 'Transport'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Transport' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Driver</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Vehicle'? 'actionOptions': ''}`} onClick={() => setActiveLink('Vehicle')}>
//                                         <Link to='/vehicle' className={`d-flex p-1 text-decoration-none ${activeLink === 'Vehicle'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Vehicle' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Vehicle</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'AddRoute'? 'actionOptions': ''}`} onClick={() => setActiveLink('AddRoute')}>
//                                         <Link to='/addRoute' className={`d-flex p-1 text-decoration-none ${activeLink === 'AddRoute'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'AddRoute' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Add Route</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'AddDropPoint'? 'actionOptions': ''}`} onClick={() => setActiveLink('AddDropPoint')}>
//                                         <Link to='/addDropPoint' className={`d-flex p-1 text-decoration-none ${activeLink === 'AddDropPoint'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'AddDropPoint' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}> Add Drop Point</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'AssignStudent'? 'actionOptions': ''}`} onClick={() => setActiveLink('AssignStudent')}>
//                                         <Link to='/assignStudent' className={`d-flex p-1 text-decoration-none ${activeLink === 'AssignStudent'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'AssignStudent' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Assign Student</span>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>


                            
                            

//                             <li className={`p-2 menus borderTOP ${activeLink === 'ExamCategory' || activeLink === 'OfflineExam' || activeLink === 'Marks' || activeLink === 'Grades' || activeLink === 'Marksheet' || activeLink === 'Promotion' ? 'actionOptions': ''}`} onClick={() => setActiveLink('ExamCategory')}>
//                                 <Link to='#examinationCollapse' className={`d-flex p-1 text-decoration-none ${activeLink === 'ExamCategory' || activeLink === 'OfflineExam' || activeLink === 'Marks' || activeLink === 'Grades' || activeLink === 'Marksheet' || activeLink === 'Promotion' ? 'text-white': 'text-black'}`} data-bs-toggle={`${toggleicon? 'collapse': ''}`} role="button" aria-expanded="false" aria-controls={`${toggleicon? 'addOnCollapse': ''}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'ExamCategory' || activeLink === 'OfflineExam' || activeLink === 'Marks' || activeLink === 'Grades' || activeLink === 'Marksheet' || activeLink === 'Promotion' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Examination</span>
//                                 </Link>
//                             </li>
                            
//                             <div className="collapse bg-white" id="examinationCollapse">
//                                 <ul className='list-unstyled p-0 m-0'>
//                                     <li className={`p-2 submenus borderTO ${activeLink === 'ExamCategory'? 'actionOptions': ''}`} onClick={() => setActiveLink('ExamCategory')}>
//                                         <Link to='/examCategory' className={`d-flex p-1 text-decoration-none ${activeLink === 'ExamCategory'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'ExamCategory' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Exam Category</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'OfflineExam'? 'actionOptions': ''}`} onClick={() => setActiveLink('OfflineExam')}>
//                                         <Link to='/offlineExam' className={`d-flex p-1 text-decoration-none ${activeLink === 'OfflineExam'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'OfflineExam' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Offline Exam</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Marks'? 'actionOptions': ''}`} onClick={() => setActiveLink('Marks')}>
//                                         <Link to='/marks' className={`d-flex p-1 text-decoration-none ${activeLink === 'Marks'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Marks' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Marks</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Grades'? 'actionOptions': ''}`} onClick={() => setActiveLink('Grades')}>
//                                         <Link to='/grades' className={`d-flex p-1 text-decoration-none ${activeLink === 'Grades'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Grades' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Grades</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Marksheet'? 'actionOptions': ''}`} onClick={() => setActiveLink('Marksheet')}>
//                                         <Link to='/marksheet' className={`d-flex p-1 text-decoration-none ${activeLink === 'Marksheet'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Marksheet' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Marksheet</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Promotion'? 'actionOptions': ''}`} onClick={() => setActiveLink('Promotion')}>
//                                         <Link to='/promotion' className={`d-flex p-1 text-decoration-none ${activeLink === 'Promotion'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Promotion' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden addonSubitem'}`}>Promotion</span>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>



//                             <li className={`p-2 menus borderTOP ${activeLink === 'assignment'? 'actionOptions': ''}`} onClick={() => setActiveLink('assignment')}>
//                                 <Link to='/assignment' className={`d-flex p-1 text-decoration-none ${activeLink === 'assignment'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'assignment' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Assignment</span>
//                                 </Link>
//                             </li>

//                             <li className={`p-2 menus borderTOP borderBottom ${activeLink === 'samplePaper'? 'actionOptions': ''}`} onClick={() => setActiveLink('samplePaper')}>
//                                 <Link to='/samplePaper' className={`d-flex p-1 text-decoration-none ${activeLink === 'samplePaper'? 'text-white': 'text-black'} ${toggleicon ? '': 'justify-content-center'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'samplePaper' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Sample Paper</span>
//                                 </Link>
//                             </li>
                            


//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
// {/* ********************** */}
                            
//                             <li className={`p-2 menus borderTOP ${activeLink === 'settings' ||activeLink === 'SessionManager' ||activeLink === 'PaymentSettings' ||activeLink === 'Gradebook' ||activeLink === 'Subscription' ||activeLink === 'MyAccount' ? 'actionOptions': ''}`} onClick={() => setActiveLink('settings')}>
//                                 <Link className={`d-flex p-1 text-decoration-none ${activeLink === 'settings' ||activeLink === 'SessionManager' ||activeLink === 'Subscription' ||activeLink === 'Gradebook' ||activeLink === 'PaymentSettings' ||activeLink === 'MyAccount' ? 'text-white': 'text-black'}`} data-bs-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'settings' ||activeLink === 'SessionManager' ||activeLink === 'PaymentSettings' ||activeLink === 'Gradebook' ||activeLink === 'Subscription' ||activeLink === 'MyAccount' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Settings</span>
//                                 </Link>
//                             </li>
                            
//                             <div className="collapse bg-white" id="collapseExample">
//                                 <ul className='list-unstyled p-0 m-0'>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'settings'? 'actionOptions': ''}`} onClick={() => setActiveLink('settings')}>
//                                         <Link to='/schoolSetting' className={`d-flex p-1 text-decoration-none ${activeLink === 'settings'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'settings' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>School Settings</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'SessionManager'? 'actionOptions': ''}`} onClick={() => setActiveLink('SessionManager')}>
//                                         <Link to='/sessionManager' className={`d-flex p-1 text-decoration-none ${activeLink === 'SessionManager'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'SessionManager' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>SessionManager</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'PaymentSettings'? 'actionOptions': ''}`} onClick={() => setActiveLink('PaymentSettings')}>
//                                         <Link to='/paymentSettings' className={`d-flex p-1 text-decoration-none ${activeLink === 'PaymentSettings'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'PaymentSettings' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>PaymentSettings</span>
//                                         </Link>
//                                     </li>
//                                     {/* <li className={`p-2 submenus borderTOP ${activeLink === 'Gradebook'? 'actionOptions': ''}`} onClick={() => setActiveLink('Gradebook')}>
//                                         <Link to='/gradeBook' className={`d-flex p-1 text-decoration-none ${activeLink === 'Gradebook'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Gradebook' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>Gradebook</span>
//                                         </Link>
//                                     </li> */}
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'Subscription'? 'actionOptions': ''}`} onClick={() => setActiveLink('Subscription')}>
//                                         <Link to='/subscription' className={`d-flex p-1 text-decoration-none ${activeLink === 'Subscription'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'Subscription' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>Subscription</span>
//                                         </Link>
//                                     </li>
//                                     <li className={`p-2 submenus borderTOP ${activeLink === 'MyAccount'? 'actionOptions': ''}`} onClick={() => setActiveLink('MyAccount')}>
//                                         <Link to='/myAccount' className={`d-flex p-1 text-decoration-none ${activeLink === 'MyAccount'? 'text-white': 'text-black'}`}>
//                                             <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'MyAccount' ? '#fff' : '#000'}`}} /></span>
//                                             <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'subitemVisible': 'subitemHidden'}`}>My Account</span>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>



//                             <li className={`p-2 menus borderTOP borderBottom ${activeLink === 'logout'? 'actionOptions': ''}`} onClick={() => handleLogout()}>
//                                 <Link className={`d-flex p-1 text-decoration-none ${activeLink === 'logout'? 'text-white': 'text-black'}`}>
//                                     <span className='icon'><Icon icon="ant-design:dashboard-outlined" width="1.5em" height="1.3em" style={{color: `${activeLink === 'logout' ? '#fff' : '#000'}`}} /></span>
//                                     <span className={`ms-2 font14 fontweight500 ${toggleicon ? 'itemVisible': 'itemHidden'}`}>Logout</span>
//                                 </Link>
//                             </li>

//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                             <li className='p-2'>
//                                 <span className={`d-flex p-1 text-decoration-none ${activeLink === 'dashboard'? 'text-white': 'text-black'}`}></span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </Container>
//         </>
//     );
// };

// export default Sidebar;