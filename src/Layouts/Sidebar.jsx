import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutApi } from '../Utils/Apis';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

    .show{
        height: 100%;
        overflow: hidden;
        transition: height .35s ease !important;
    }

    .hide{
        height: 0;
        overflow: hidden;
        transition: height .35s !important;
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
    
    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
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
    const navigate = useNavigate();
    const { sidebaropen, toggleSidebar } = useSidebarContext();

    const [UserDropOpen, setUserDropOpen] = useState(false);
    const [AdmissionDropOpen, setAdmissionDropOpen] = useState(false);
    const [TransportDropOpen, setTransportDropOpen] = useState(false);
    const [ExaminationDropOpen, setExaminationDropOpen] = useState(false);
    const [AcademicDropOpen, setAcademicDropOpen] = useState(false);
    const [AccountingDropOpen, setAccountingDropOpen] = useState(false);
    const [HrDropOpen, setHrDropOpen] = useState(false);
    const [FeeCollectionDropOpen, setFeeCollectionDropOpen] = useState(false);
    const [InventoryDropOpen, setInventoryDropOpen] = useState(false);
    const [LibraryDropOpen, setLibraryDropOpen] = useState(false);
    const [SettingsDropOpen, setSettingsDropOpen] = useState(false);

    const [LogoutSuccess, setLogoutSuccess] = useState(true);

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
    }, [token, location.pathname]);

    const handleActiveLink = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    const handleLogout = async () => {
        try {
            var response = await logoutApi();
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    localStorage.removeItem('token')
                    setLogoutSuccess(false);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const handleContinue = () => {
        window.location.reload();
        window.location.reload();
        navigate('/')
    }

    const handleActiveWithOutDrop = (val) => {
        handleActiveLink(val);
        setUserDropOpen(false)
        setAccountingDropOpen(false);
        setAdmissionDropOpen(false)
        setTransportDropOpen(false)
        setExaminationDropOpen(false)
        setAcademicDropOpen(false)
        setHrDropOpen(false)
        setFeeCollectionDropOpen(false)
        setInventoryDropOpen(false)
        setLibraryDropOpen(false)
        setSettingsDropOpen(false)
    }

    const handleActiveDropAndLink = (val) => {
        handleActiveLink(val)

        if (val === 'admin') {
            setUserDropOpen(!UserDropOpen)
            navigate('/admin');
            setAccountingDropOpen(false);
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'admissionForm') {
            setAdmissionDropOpen(!AdmissionDropOpen)
            navigate('/admissionForm');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'driver') {
            setTransportDropOpen(!TransportDropOpen)
            navigate('/driver');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'examCategory') {
            setExaminationDropOpen(!ExaminationDropOpen)
            navigate('/examCategory');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'dailyattendance') {
            setAcademicDropOpen(!AcademicDropOpen)
            navigate('/dailyattendance');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'discount') {
            setAccountingDropOpen(!AccountingDropOpen);
            navigate('/discount');
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'userrole') {
            setHrDropOpen(!HrDropOpen)
            navigate('/admin');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'booklistmanager') {
            setLibraryDropOpen(!LibraryDropOpen)
            navigate('/booklistmanager');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'collectFees') {
            setFeeCollectionDropOpen(!FeeCollectionDropOpen)
            navigate('/collectFees');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
        }
        else if (val === 'schoolSetting') {
            setSettingsDropOpen(!SettingsDropOpen)
            navigate('/schoolSetting');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setInventoryDropOpen(false)
            setLibraryDropOpen(false)
        }
        else if (val === 'issueItem') {
            setInventoryDropOpen(!InventoryDropOpen)
            navigate('/issueItem');
            setAccountingDropOpen(false);
            setUserDropOpen(false)
            setAdmissionDropOpen(false)
            setTransportDropOpen(false)
            setExaminationDropOpen(false)
            setAcademicDropOpen(false)
            setHrDropOpen(false)
            setFeeCollectionDropOpen(false)
            setLibraryDropOpen(false)
            setSettingsDropOpen(false)
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
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('dashboard')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Dashboard</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admin' || activeLink === 'teacher' || activeLink === 'accountant' || activeLink === 'librarian' || activeLink === 'other_staff' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAddon" onClick={() => handleActiveDropAndLink('admin')} >
                                <div className="flex-grow-1">
                                    <Icon icon="fa:user-o" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Users</h3>
                                </div>
                                <div className="">
                                    {UserDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseAddon" className={`collapse collapse-menu ${UserDropOpen ? 'show' : 'hide'}`}>
                                {/* {`collapse collapse-menu ${sidebaropen === '' ? '' : 'ps-1'}`} */}
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/admin" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admin' ? 'active' : ''}`} onClick={() => handleActiveLink('admin')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            {/* codicon:dash */}
                                            <h3 className="menu-text">Admin</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/teacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'teacher' ? 'active' : ''}`} onClick={() => handleActiveLink('teacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Teacher</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/accountant" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'accountant' ? 'active' : ''}`} onClick={() => handleActiveLink('accountant')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Accountant</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/librarian" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'librarian' ? 'active' : ''}`} onClick={() => handleActiveLink('librarian')} >
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
                            <Link to="/admissionForm" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'admissionForm' || activeLink === 'allStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAdmission" onClick={() => handleActiveDropAndLink('admissionForm')} >
                                <div className="flex-grow-1">
                                    <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Admissions</h3>
                                </div>
                                <div className="">
                                    {AdmissionDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseAdmission" className={`collapse collapse-menu ${AdmissionDropOpen ? 'show' : 'hide'}`}>
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
                            <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' || activeLink === 'addDriver' || activeLink === 'addVehicle' || activeLink === 'vehicle' || activeLink === 'route' || activeLink === 'dropPoint' || activeLink === 'assignStudent' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTransport" onClick={() => handleActiveDropAndLink('driver')} >
                                <div className="flex-grow-1">
                                    <Icon icon="fluent-mdl2:bus" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Transport</h3>
                                </div>
                                <div className="">
                                    {TransportDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseTransport" className={`collapse collapse-menu ${TransportDropOpen ? 'show' : 'hide'}`}>
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/driver" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'driver' || activeLink === 'addDriver' ? 'active' : ''}`} onClick={() => handleActiveLink('driver')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Driver</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/vehicle" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'vehicle' || activeLink === 'addVehicle' ? 'active' : ''}`} onClick={() => handleActiveLink('vehicle')} >
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
                            <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'examCategory' || activeLink === 'offlineExam' || activeLink === 'marks' || activeLink === 'grades' || activeLink === 'marksheet' || activeLink === 'promotion' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseExamination" onClick={() => handleActiveDropAndLink('examCategory')} >
                                <div className="flex-grow-1">
                                    <Icon icon="icon-park-outline:id-card-v" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Examination</h3>
                                </div>
                                <div className="">
                                    {ExaminationDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseExamination" className={`collapse collapse-menu ${ExaminationDropOpen ? 'show' : 'hide'}`}>
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
                            <Link to="/academic" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyattendance' || activeLink === 'classlist' || activeLink === 'sections' || activeLink === 'classroutine' || activeLink === 'subject' || activeLink === 'assignsubjectteacher' || activeLink === 'syllabus' || activeLink === 'Classroom' || activeLink === 'Department' || activeLink === 'assignclassteacher' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAcademic" onClick={() => handleActiveDropAndLink('dailyattendance')} >
                                <div className="flex-grow-1">
                                    <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Academic</h3>
                                </div>
                                <div className="">
                                    {AcademicDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseAcademic" className={`collapse collapse-menu ${AcademicDropOpen ? 'show' : 'hide'}`}>
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/dailyattendance" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dailyattendance' ? 'active' : ''}`} onClick={() => handleActiveLink('dailyattendance')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Daily Attendance</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classlist" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'classlist' ? 'active' : ''}`} onClick={() => handleActiveLink('classlist')} >
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
                                        <Link to="/classroutine" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'classroutine' ? 'active' : ''}`} onClick={() => handleActiveLink('classroutine')} >
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
                                        <Link to="/assignsubjectteacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignsubjectteacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignsubjectteacher')} >
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
                                        <Link to="/Classroom" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Classroom' ? 'active' : ''}`} onClick={() => handleActiveLink('Classroom')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Class Room</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Department" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Department' ? 'active' : ''}`} onClick={() => handleActiveLink('Department')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Departments</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/assignclassteacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignclassteacher' ? 'active' : ''}`} onClick={() => handleActiveLink('assignclassteacher')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Assign Class Teacher</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'discount' || activeLink === 'fee' || activeLink === 'feecollection' || activeLink === 'manageinvoice' || activeLink === 'dueinvoisce' || activeLink === 'income' || activeLink === 'incomecategory' || activeLink === 'expense' || activeLink === 'expensecategory' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseAccounting" onClick={() => handleActiveDropAndLink('discount')} >
                                <div className="flex-grow-1">
                                    <Icon icon="map:accounting" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Accounting</h3>
                                </div>
                                <div className="">
                                    {AccountingDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseAccounting" className={`collapse collapse-menu ${AccountingDropOpen ? 'show' : 'hide'}`}>
                                <ul className='dashed'>
                                    <li>
                                        <Link to="/discount" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'discount' ? 'active' : ''}`} onClick={() => handleActiveLink('discount')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Discount</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/fee" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'fee' ? 'active' : ''}`} onClick={() => handleActiveLink('fee')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fee Type</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feecollection" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'feecollection' ? 'active' : ''}`} onClick={() => handleActiveLink('feecollection')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Fee Collection</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/manageinvoice" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'manageinvoice' ? 'active' : ''}`} onClick={() => handleActiveLink('manageinvoice')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Manage Invoice</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dueinvoisce" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dueinvoisce' ? 'active' : ''}`} onClick={() => handleActiveLink('dueinvoisce')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Due Invoice</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/income" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'income' ? 'active' : ''}`} onClick={() => handleActiveLink('income')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Income</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/incomecategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'incomecategory' ? 'active' : ''}`} onClick={() => handleActiveLink('incomecategory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Income Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/expense" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'expense' ? 'active' : ''}`} onClick={() => handleActiveLink('expense')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Expense</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/expensecategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'expensecategory' ? 'active' : ''}`} onClick={() => handleActiveLink('expensecategory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Expense Category</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/samplepaper" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'samplepaper' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('samplepaper')} >
                                <Icon icon="fluent:document-bullet-list-24-regular" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Sample Paper</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/assignment" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'assignment' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('assignment')} >
                                <Icon icon="el:list-alt" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Assignment</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/HumanResource" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'userrole' || activeLink === 'takeattendance' || activeLink === 'leavestatus' || activeLink === 'assignleave' || activeLink === 'payroll' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseHumanResource" onClick={() => handleActiveDropAndLink('userrole')} >
                                <div className="flex-grow-1">
                                    {/* <Icon icon="covid:transmission-virus-human-transmit-1" width="1.5em" height="1.5em" /> */}
                                    <img src="./images/HR.svg" alt="" />
                                    <h3 className="menu-text">Human Resource</h3>
                                </div>
                                <div className="">
                                    {HrDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseHumanResource" className={`collapse collapse-menu ${HrDropOpen ? 'show' : 'hide'}`}>
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
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'collectFees' || activeLink === 'searchFeePayment' || activeLink === 'searchDueFees' || activeLink === 'feesMaster' || activeLink === 'feesGroup' || activeLink === 'feesType' || activeLink === 'feesDiscount' || activeLink === 'feesCarryForword' || activeLink === 'feesReminder' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapsefeeCollection" onClick={() => handleActiveDropAndLink('collectFees')} >
                                <div className="flex-grow-1">
                                    <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Fee Collection</h3>
                                </div>
                                <div className="">
                                    {FeeCollectionDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapsefeeCollection" className={`collapse collapse-menu ${FeeCollectionDropOpen ? 'show' : 'hide'}`}>
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
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'issueItem' || activeLink === 'addIssueItem' || activeLink === 'addItemStock' || activeLink === 'addItem' || activeLink === 'itemCategory' || activeLink === 'itemStore' || activeLink === 'itemSupplier' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseInventory" onClick={() => handleActiveDropAndLink('issueItem')} >
                                <div className="flex-grow-1">
                                    <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Inventory</h3>
                                </div>
                                <div className="">
                                    {InventoryDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseInventory" className={`collapse collapse-menu ${InventoryDropOpen ? 'show' : 'hide'}`}>
                                <ul className='dashed'>
                                    <li>
                                        <Link to='/issueItem' className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'issueItem' || activeLink === 'addIssueItem' ? 'active' : ''}`} onClick={() => handleActiveLink('issueItem')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Issue Item</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/addItemStock" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'addItemStock' ? 'active' : ''}`} onClick={() => handleActiveLink('addItemStock')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Item Stock</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/addItem" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'addItem' ? 'active' : ''}`} onClick={() => handleActiveLink('addItem')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Add Item</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/itemCategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'itemCategory' ? 'active' : ''}`} onClick={() => handleActiveLink('itemCategory')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Category</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/itemStore" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'itemStore' ? 'active' : ''}`} onClick={() => handleActiveLink('itemStore')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Store</h3>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/itemSupplier" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'itemSupplier' ? 'active' : ''}`} onClick={() => handleActiveLink('itemSupplier')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <h3 className="menu-text">Item Supplier</h3>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/holiday" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'holiday' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('holiday')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Holiday</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notice" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'notice' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('notice')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Notice</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/event" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'event' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('event')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Event</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/onlinecourse" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'onlinecourse' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('onlinecourse')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Online Course</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'booklistmanager' || activeLink === 'bookissuereport' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseLibrary" onClick={() => handleActiveDropAndLink('booklistmanager')} >
                                <div className="flex-grow-1">
                                    <Icon icon="mdi:message-reply-text-outline" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Library</h3>
                                </div>
                                <div className="">
                                    {LibraryDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseLibrary" className={`collapse collapse-menu ${LibraryDropOpen ? 'show' : 'hide'}`}>
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
                        <li></li>
                        <li></li>
                        <li className='borderBottom' ></li>
                        <li>
                            <Link to="/systemSettingPage" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'schoolSetting' || activeLink === 'sessionManager' || activeLink === 'paymentSettings' || activeLink === 'subscription' || activeLink === 'myAccount' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseSettings" onClick={() => handleActiveDropAndLink('schoolSetting')} >
                                <div className="flex-grow-1">
                                    <Icon icon="solar:settings-outline" width="1.5em" height="1.5em" />
                                    <h3 className="menu-text">Settings</h3>
                                </div>
                                <div className="">
                                    {SettingsDropOpen ? <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" /> : <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />}
                                </div>
                            </Link>
                            <div id="collapseSettings" className={`collapse collapse-menu ${SettingsDropOpen ? 'show' : 'hide'}`}>
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
                            <Link className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('logout')} data-bs-toggle="offcanvas" data-bs-target="#logoutCanvas" aria-controls="logoutCanvas" >
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
                    {LogoutSuccess
                        ?
                        <>
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
                        </>
                        :
                        <>
                            <div>
                                <p className='modalLightBorder p-2 mb-0'>Logout</p>
                                <div className="mt-3">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Updated</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleContinue}>Continue</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </Container>
    );
};

export default Sidebar;