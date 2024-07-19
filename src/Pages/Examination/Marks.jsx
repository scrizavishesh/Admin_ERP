import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MarksTable from '../../Modals/Marks/MarksTable';
import { getAllClassApi, getAllMarksApi, getAllSessionDataAPI, getExamCategoryDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import ReactPaginate from 'react-paginate';

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

const Marks = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [SearchBtn, setSearchBtn] = useState(false);

    const [indexxx, setIndexxx] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [sessionSelect, setSessionSelect] = useState('');
    const [examCategorySelect, setExamCategorySelect] = useState('');

    const [marksData, setMarksData] = useState([]);
    // console.log(marksData[0], 'Marks')
    const [sessionData, setSessionData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);

    const [className, setClassName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [sectionName, setSectionName] = useState('')

    useEffect(() => {
        getAllSession();
        getAllClassData();
        getAllExamCategoryData();
    }, [token]);

    const getAllClassData = async () => {
        try {
            setSearchBtn(false)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSearchBtn(true)
                    setAllClassData(response?.data?.classes);
                    toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const getAllSession = async () => {
        try {
            var response = await getAllSessionDataAPI();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSessionData(response?.data?.sessions);
                    toast.success(response?.data?.msg)
                    // setTotalItems(10);
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
        }
    }


    const getAllExamCategoryData = async () => {
        try {
            const search = '';
            var response = await getExamCategoryDataApi(search);
            if (response?.status === 200) {
                console.log(response, 'ressssssssssssssss')
                if (response?.data?.status === 'success') {
                    console.log('success')
                    setExamCategoryData(response?.data?.categories);
                    console.log(response?.data?.categories, 'fgh')
                    toast.success(response.data.message);
                    // setTotalItems(10)
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch { }
    }

    const getAllMarksData = async () => {
        try {
            setloaderState(true);
            var response = await getAllMarksApi(classId, sectionId, subjectId, sessionSelect, examCategorySelect);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setSearchBtn(false)
                    setMarksData(response?.data?.Marks);
                    console.log(response?.data?.Marks, 'marks data at get api for 1st time');
                    // setTotalItems(10)
                    toast.success(response.data.msg);
                }
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.msg);
            }
        }
        catch (e) {
            console.log('Error during data get', e)
            setloaderState(false);
        }
    }


    const handleChange = (e) => {
        const value = e.target.value;
        const [val1, val2, val3] = value.split(',');
        setIndexxx(val1);
        setClassId(val2);
        setClassName(val3)
    }

    const handleSection = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setSectionId(val1);
        setSectionName(val2);
    }

    const handleSubject = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setSubjectId(val1);
        setSubjectName(val2);
    }


    return (
        <>
            <Container className='h-100 overflow-scroll'>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Marks</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Manage Marks</p>
                        </div>
                        {/* <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to CSV</span>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to PDF</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                    <div className="row gap-md-0 gap-sm-3">
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" />
                                                <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addDriver'><span className='font14 textVerticalCenter'>+ ADD Driver</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Exam Category</label>
                                            <select className="form-select font14" aria-label="Default select example" onChange={(e) => setExamCategorySelect(e.target.value)}>
                                                <option defaultValue>Select a Exam Category</option>
                                                {ExamCategoryData?.map((option) => (
                                                    <option key={option.categoryId} value={option?.examCategoryName}>
                                                        {option.examCategoryName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                            <select className="form-select font14" aria-label="Default select example" onChange={handleChange}>
                                                <option >--- Choose ---</option>
                                                {allClassData?.map((option, index) => (
                                                    <option key={option.classId} value={`${index}, ${option?.classId}, ${option.classNo}`}>
                                                        {option.classNo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                            <select className="form-select font14" aria-label="Default select example" onChange={handleSection}>
                                                <option >--- Choose ---</option>
                                                {allClassData[indexxx]?.section?.map(option => (
                                                    <option key={option.classSecId} value={`${option?.classSecId}, ${option.sectionName}`} >
                                                        {option.sectionName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Subject</label>
                                            <select className="form-select font14" aria-label="Default select example" onChange={handleSubject}>
                                                <option >--- Choose ---</option>
                                                {allClassData[indexxx]?.subjects?.map(option => (
                                                    <option key={option.subjectId} value={`${option?.subjectId}, ${option.subjectName}`} >
                                                        {option.subjectName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Session</label>
                                            <select className="form-select font14" aria-label="Default select example" onChange={(e) => setSessionSelect(e.target.value)}>
                                                <option defaultValue>Select a Session</option>
                                                {sessionData?.map(option => (
                                                    <option key={option.sessionId} value={option.sessionName} >
                                                        {option.sessionName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn updateButtons text-white' onClick={getAllMarksData}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                                </p>
                            </form>
                            <div className="row">
                                {SearchBtn
                                    ?
                                    <>
                                        <div className="d-flex justify-content-center p-5">
                                            <img src="./images/search.svg" alt="" className='img-fluid' />
                                        </div>
                                    </>
                                    :
                                    <MarksTable marksData={marksData} className={className} sectionName={sectionName} subjectName={subjectName} sessionSelect={sessionSelect} examCategorySelect={examCategorySelect} />
                                }
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default Marks