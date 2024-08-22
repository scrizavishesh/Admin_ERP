import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PromotionTable from '../../Modals/Promotion/PromotionTable';
import { getAllClassApi, getAllPromotedStudentsDataAPI, getAllSessionDataAPI } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

`;

const Promotion = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [SearchBtn, setSearchBtn] = useState(false);
    const [sessionData, setSessionData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allPrevSectionData, setAllPrevSectionData] = useState([]);
    const [allNextSectionData, setAllNextSectionData] = useState([]);
    const [prevClassId, setPrevClassId] = useState('')
    const [nextClassId, setNextClassId] = useState('')
    
    const [nextSession, setNextSession] = useState('')
    const [prevSectionId, setPrevSectionId] = useState('')
    const [nextSectionId, setNextSectionId] = useState('')

    useEffect(() => {
        getAllSession();
        getAllClassData();
    }, [token]);

    const getAllClassData = async () => {
        try {
            setloaderState(true)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                    toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllSession = async () => {
        try {
            setloaderState(true)
            var response = await getAllSessionDataAPI();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setSessionData(response?.data?.sessions);
                    toast.success(response?.data?.message)
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
        }
    }

    const handlePrevClassChange = (val) => {
        const classNoVal = parseInt(val);
        setPrevClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);
    
        if (selectedClass) {
            setAllPrevSectionData(selectedClass.section || []);
            console.log("all Prev SectionData:", selectedClass.section);
        } else {
            setAllPrevSectionData([]);
        }
    };
    
    const handleNextClassChange = (val) => {
        const classNoVal = parseInt(val);
        setNextClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);
    
        if (selectedClass) {
            setAllNextSectionData(selectedClass.section || []);
            console.log("all Next SectionData:", selectedClass.section);
        } else {
            setAllNextSectionData([]);
        }
    };
    


    const getAllPromotedStudentsData = async () => {
        try {
            setSearchBtn(true)
            const response = await getAllPromotedStudentsDataAPI(nextSession, prevSectionId, nextSectionId);
            if (response?.status === 200){
                if(response?.data?.status === 'success') {
                    toast.success(response?.data?.message);
                }
                else {
                    toast.error(response?.data?.msg);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Exam Category</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Promotion</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Promotion</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form class="row g-3">
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Current session</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example">
                                            <option defaultValue>Select a Session</option>
                                            {sessionData?.map(option => (
                                                <option key={option.sessionId} value={option.sessionName} >
                                                    {option.sessionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Next session</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setNextSession(e.target.value)}>
                                            <option defaultValue>Select a Session</option>
                                            {sessionData?.map(option => (
                                                <option key={option.sessionId} value={option.sessionName} >
                                                    {option.sessionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Promoting from</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e)=> handlePrevClassChange(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Section</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setPrevSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allPrevSectionData?.map(option => (
                                                <option key={option.classSecId} value={option.classSecId}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Promoting To</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e)=> handleNextClassChange(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-12">
                                        <label for="inputEmail4" class="form-label font14">Section</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setNextSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allNextSectionData?.map(option => (
                                                <option key={option.classSecId} value={option.classSecId}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button type='button' className='btn addCategoryButtons2 text-white' onClick={getAllPromotedStudentsData}>Manage Promotion</button>
                                        <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                                    </p>
                                </form>
                                <div className="row">
                                    {SearchBtn
                                        ?
                                        <><p>No Data</p></>
                                        :
                                        <>
                                            <div className="d-flex justify-content-center p-5">
                                                <img src="./images/search.svg" alt="" className='img-fluid' />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default Promotion
