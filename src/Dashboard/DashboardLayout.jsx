import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../Layouts/Navbar';
import Sidebar from '../Layouts/Sidebar';
import Main from '../Main/Main';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }

    .mainContent{
        height: 100% !important;
        background-color: #F2F3F6 !important;
    }


`;

const SidebarContainer = styled.div`
    flex-shrink: 0;
    width: ${(props) => (props.sidebaropen ? '224px' : '64px')};
    transition: width 0.6s ease, transform 0.3s ease;
    background-color: var(--sidebarBackground);
    z-index: 2;

    @media screen and (max-width: 1000px) {
        transform: translateX(${(props) => (props.sidebaropen ? '0' : '-100%')});
        position: absolute;
        z-index: 999;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
    }
`;

const MainContainer = styled.div`
    width: ${(props) => (props.sidebaropen ? '85%' : '96%')};
    transition: all width 0.6s ease; 
    background-color: #F2F3F6;

    @media screen and (max-width: 1000px) {
        width: 100% !important;
    }
`;


const SidebarContext = createContext();
export const useSidebarContext = () => useContext(SidebarContext);

const DashboardLayout = () => {
    const [sidebaropen, setSidebarOpen] = useState(() => window.innerWidth > 1000);

    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth > 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebaropen);
    };

    return (
        <SidebarContext.Provider value={{ sidebaropen, toggleSidebar }}>
            <Container>
                <SidebarContainer sidebaropen={sidebaropen} className='hideScrollBar'>
                    <Sidebar className='h-100'/>
                </SidebarContainer>
                <MainContainer sidebaropen={sidebaropen} className='hideScrollBar'>
                    <div className="container-fluid">
                        <div className="row bg-white">
                            <Navbar />
                        </div>
                        <div className="row mainContent h-100 overflow-scroll">
                            <Main />
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </SidebarContext.Provider>
    );
};

export default DashboardLayout;