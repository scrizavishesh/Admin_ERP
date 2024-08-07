import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, addSamplePaperApi, getSamplePaperByIdApi, updateSamplePaperApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const EditSamplePaper = ({EditItemId}) => {

    const token = localStorage.getItem('token');
    const [EditSamplePaper, setEditSamplePaper] = useState(true);

    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allTeacherData, setAllTeacherData] = useState([]);

    const [classId, setClassId] = useState('')
    const [ClasssError, setClasssError] = useState('')

    const [SectionId, setSectionId] = useState('')
    const [SectionIdError, setSectionIdError] = useState('')

    const [Subject, setSubject] = useState('')
    const [SubjectError, setSubjectError] = useState('')

    const [Teacher, setTeacher] = useState('')
    const [TeacherError, setTeacherError] = useState('')

    const [Statuus, setStatuus] = useState('')
    const [StatuusError, setStatuusError] = useState('')

    const [SamplePaperUpload, setSamplePaperUpload] = useState('')
    const [SamplePaperUploadError, setSamplePaperUploadError] = useState('')

    const [Title, setTitle] = useState('')
    const [TitleError, setTitleError] = useState('')

    const [refreshEdit, setRefreshEdit] = useState('')

    useEffect(() => {
        getAllClassData();
        getSamplePaperById()
    }, [token, refreshEdit, EditItemId])

    useEffect(()=>{
        handleClassChange(classId);
    }, [classId])

    useEffect(()=>{
        getAllTeacherData(Subject);
    }, [Subject])

    const PageRefreshOnEdit = () => {
        setEditSamplePaper(!EditSamplePaper);
        setRefreshEdit(!refreshEdit);
    }

    const getSamplePaperById = async () => {
        try {
            var response = await getSamplePaperByIdApi(EditItemId);
            console.log(response, 'sample')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setTitle(response?.data?.SamplePaper?.title);
                    setClassId(response?.data?.SamplePaper?.classId);
                    setSectionId(response?.data?.SamplePaper?.sectionId);
                    setSubject(response?.data?.SamplePaper?.subjectId);
                    setTeacher(response?.data?.SamplePaper?.teacherId);
                    setStatuus(response?.data?.SamplePaper?.status);
                    setSamplePaperUpload(response?.data?.SamplePaper?.samplePaperPath);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllTeacherData = async (val) => {
        try {
            const subjectIdForTeacher = parseInt(val)
            var response = await getTeacherBySubjectApi(classId , subjectIdForTeacher);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllTeacherData(response?.data?.teacher);
                    console.log(response?.data?.teacher, 'teacher');
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const EditNewSamplePaper = async () => {
        if (validateFields()) {
            try {
                console.log(Title, 'title')
                const formData = new FormData();
                formData.append('title', Title)
                formData.append('ClassId', classId)
                formData.append('sectionId', SectionId)
                formData.append('subjectId', Subject)
                formData.append('teacherId', Teacher)
                formData.append('status', Statuus)
                formData.append('file', SamplePaperUpload)

                var response = await updateSamplePaperApi(EditItemId, formData);
                console.log(response)
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setEditSamplePaper(!EditSamplePaper);
                    }
                }
            }
            catch {

            }
        }
    }

    const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

    const validateTextFields = (value) => {
        if (!value.trim()) {
            return '*This Field is required';
        } else if (!textAlphaRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        if (!classId) {
            setClasssError('* This Feild is required');
            isValid = false;
        } else {
            setClasssError('');
        }

        if (!SectionId) {
            setSectionIdError('* This Feild is required');
            isValid = false;
        } else {
            setSectionIdError('');
        }

        if (!Subject) {
            setSubjectError('* This Feild is required');
            isValid = false;
        } else {
            setSubjectError('');
        }

        if (!Teacher) {
            setTeacherError('* This Feild is required');
            isValid = false;
        } else {
            setTeacherError('');
        }

        if (!SamplePaperUpload) {
            setSamplePaperUploadError('* This Feild is required');
            isValid = false;
        } else {
            setSamplePaperUploadError('');
        }

        if (!Title) {
            setTitleError('* This Feild is required');
            isValid = false;
        } else {
            setTitleError('');
        }

        return isValid;
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        console.log(classNoVal)
        setClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllSubjectData(selectedClass.subjects || []);
            setAllSectionData(selectedClass.section || []);

        } else {
            setAllSubjectData([]);
            setAllSectionData([]);
        }
    };



    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        {EditSamplePaper
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TitleError ? 'border-1 border-danger' : ''}`} placeholder='Enter Title' value={Title} onChange={(e) => { setTitle(e.target.value), setTitleError(validateTextFields(e.target.value)) }} />
                                        <span className='text-danger'>{TitleError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
                                        <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={classId} onChange={(e) => handleClassChange(e)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{ClasssError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Section</label>
                                        <select className={`form-select font14 ${SectionIdError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={SectionId} onChange={(e) => setSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allSectionData?.map(option => (
                                                <option key={option.classSecId} value={option.classSecId}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{SectionIdError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
                                        <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => { setSubject(e.target.value), getAllTeacherData(e.target.value) }}
                                        >
                                            <option >--- Choose ---</option>
                                            {allSubjectData?.map((option) => (
                                                <option key={option.subjectId} value={option.subjectId}>
                                                    {option.subjectName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{SubjectError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Teacher</label>
                                        <select className={`form-select font14 ${TeacherError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Teacher} onChange={(e) => { setTeacher(e.target.value), setTeacherError('') }}>
                                            <option defaultValue value=''>--- Choose ---</option>
                                            {allTeacherData.map(option => (
                                                <option key={option.staffId} value={option.staffId}>
                                                    {option.staffName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{TeacherError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEdit1" className='form-label font14'>Status</label>
                                        <select className={`form-select font14 ${StatuusError ? 'border-1 border-danger' : ''} `} value={Statuus} aria-label="Default select example" onChange={(e) => { setStatuus(e.target.value), setStatuusError('') }}>
                                            <option>--- Choose ---</option>
                                            <option value='Active'>Active</option>
                                            <option value='Draft'>Draft</option>
                                            <option value='Archives'>Archives</option>
                                        </select>
                                        <span className='text-danger'>{StatuusError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">SamplePaper Upload</label>
                                        <input type="file" id="exampleInputEmail1" className={`form-control font14 ${SamplePaperUploadError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setSamplePaperUpload(e.target.files[0]), setSamplePaperUploadError('') }} />
                                        <span className='text-danger'>{SamplePaperUploadError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateCreateButtons text-white' type='button' onClick={EditNewSamplePaper}>Create</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div>
                                    <p className='modalLightBorder p-2 mb-0'>Student List</p>
                                    <div className="mt-3  ">
                                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                            <p className='warningHeading'>Successful Updated</p>
                                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                        </div>
                                        <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnEdit}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default EditSamplePaper