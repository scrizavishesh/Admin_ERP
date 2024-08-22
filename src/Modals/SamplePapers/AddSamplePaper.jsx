import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, addSamplePaperApi } from '../../Utils/Apis';
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

const AddSamplePaper = () => {

    const token = localStorage.getItem('token');
    const [AddSamplePaper, setAddSamplePaper] = useState(true);

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

    const [refreshAdd, setRefreshAdd] = useState('')

    useEffect(() => {
        getAllClassData();
    }, [token, refreshAdd])

    useEffect(() => {
        getAllTeacherData(Subject);
    }, [Subject])

    const PageRefreshOnAdd = () => {
        setAddSamplePaper(!AddSamplePaper);
        setRefreshAdd(!refreshAdd);
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
            var response = await getTeacherBySubjectApi(classId, val);
            console.log(response)
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

    const handleTitleChange = (value) => {
        setTitle(value);
        setTitleError(validateTitle(value))
    }

    const validateTitle = (value) => {
        if (value.trim() === '') {
            return '* Title is required';
        }
        const titleRegex = /^[a-zA-Z\s]+$/;
        if (!titleRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleClassChange = (value) => {
        const classIdVal = parseInt(value);
        setClassId(classIdVal);
        const selectedClass = allClassData.find(c => c.classId === classIdVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
        }
        setClasssError(validateClass(classIdVal));
    }

    const validateClass = (value) => {
        if (!value || value == '') {
            return '* Class is required';
        }
        return '';
    };

    const handleSectionChange = (value) => {
        setSectionId(value);
        setSectionIdError(validateSection(value))
    }

    const validateSection = (value) => {
        if (!value || value == '') {
            return '* Section is required';
        }
        return '';
    };

    const handleSubjectChange = (value) => {
        setSubject(value);
        setSubjectError(validateSubject(value))
    }

    const validateSubject = (value) => {
        if (!value || value == '') {
            return '* Subject is required';
        }
        return '';
    };

    const handleTeacherChange = (value) => {
        setTeacher(value);
        setTeacherError(validateTeacher(value))
    }

    const validateTeacher = (value) => {
        if (!value || value == '') {
            return '* Teacher is required';
        }
        return '';
    };

    const handleStatusChange = (value) => {
        setStatuus(value);
        setStatuusError(validateStatus(value))
    }

    const validateStatus = (value) => {
        if (!value || value == '') {
            return '* Status is required';
        }
        return '';
    };

    const handleFileChange = (value) => {
        setSamplePaperUpload(value);
        setSamplePaperUploadError(validateSamplePaperImage(value))
    }

    const validateSamplePaperImage = (value) => {
        if (!value) {
            return '* File Upload is required';
        }
        else if (value.size < 10240 || value.size > 204800) { // 1 KB = 1024 bytes
            return '* File size must be between 10 KB to 200 KB';
        }
        return '';
    };
    

    const AddNewSamplePaper = async () => {
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

                var response = await addSamplePaperApi(formData);
                console.log(response)
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setAddSamplePaper(!AddSamplePaper);
                    }
                }
            }
            catch {

            }
        }
    }

    const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

    const validateFields = () => {
        let isValid = true;

        if (!classId || classId == '') {
            setClasssError('* This Feild is required');
            isValid = false;
        } else {
            setClasssError('');
        }

        if (!SectionId || SectionId == '' ) {
            setSectionIdError('* This Feild is required');
            isValid = false;
        } else {
            setSectionIdError('');
        }

        if (!Subject || Subject == '' ) {
            setSubjectError('* This Feild is required');
            isValid = false;
        } else {
            setSubjectError('');
        }

        if (!Teacher || Teacher == '' ) {
            setTeacherError('* This Feild is required');
            isValid = false;
        } else {
            setTeacherError('');
        }

        if (!SamplePaperUpload || SamplePaperUpload == '' ) {
            setSamplePaperUploadError('* This Feild is required');
            isValid = false;
        } else {
            setSamplePaperUploadError('');
        }

        if (!Title || Title == '' ) {
            setTitleError('* This Feild is required');
            isValid = false;
        } 
        else {
            setTitleError('');
        }

        return isValid;
    }



    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        {AddSamplePaper
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TitleError ? 'border-1 border-danger' : ''}`} placeholder='Enter Title' value={Title} onChange={(e) => handleTitleChange(e.target.value)} />
                                        <span className='text-danger'>{TitleError}</span>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
                                        <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={classId} onChange={(e) => handleClassChange(e.target.value)}>
                                            <option selected disabled >--- Choose ---</option>
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
                                        <select className={`form-select font14 ${SectionIdError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={SectionId} onChange={(e) => handleSectionChange(e.target.value)}>
                                            <option selected disabled >--- Choose ---</option>
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
                                        <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => handleSubjectChange(e.target.value)}>
                                            <option selected disabled >--- Choose ---</option>
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
                                        <select className={`form-select font14 ${TeacherError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Teacher} onChange={(e) => handleTeacherChange(e.target.value) } >
                                            <option selected disabled >--- Choose ---</option>
                                            {allTeacherData.map(option => (
                                                <option key={option.staffId} value={option.staffId}>
                                                    {option.staffName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{TeacherError}</span>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputAdd1" className='form-label font14'>Status</label>
                                        <select className={`form-select font14 ${StatuusError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleStatusChange(e.target.value) } >
                                            <option defaultValue value=''>--- Choose ---</option>
                                            <option value='Active'>Active</option>
                                            <option value='Draft'>Draft</option>
                                            <option value='Archives'>Archives</option>
                                        </select>
                                        <span className='text-danger'>{StatuusError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">SamplePaper Upload</label>
                                        <input type="file" id="exampleInputEmail1" className={`form-control font14 ${SamplePaperUploadError ? 'border-1 border-danger' : ''}`} accept='.pdf' onChange={(e) => handleFileChange(e.target.files[0]) } />
                                        <span className='text-danger'>{SamplePaperUploadError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateCreateButtons text-white' type='button' onClick={AddNewSamplePaper}>Create</button>
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
                                        <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnAdd}>Continue</button>
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

export default AddSamplePaper











// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { addNewOfflineExamApi, getAllClassApi, getAllSubjectByClassApi, getExamCategoryDataApi, getRoomDataApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';

// const Container= styled.div`
//     .form-select, .form-control::placeholder, .form-control{
//         color: var(--greyState);
//         box-shadow: none;
//         border-color: var(--greyState);
//     }

//     .table-striped>tbody>tr:nth-of-type(odd)>* {
//         --bs-table-bg-type: var(--tableGreyBackgroundColor);
//     }
//     .correvtSVG{
//         position: relative;
//         width: fit-content ;
//         margin-left: 43% !important;
//         margin-bottom: -16% !important;
//         background-color: #2BB673;
//         width: 73px;
//         height: 73px;
//         align-items: center;
//     }

//     .contbtn{
//         margin-left: 41% !important;
//         margin-top: -20% !important;
//     }

//     .greydiv{
//         background-color: #FBFBFB;
//     }

//     .scrollBarHide::-webkit-scrollbar {
//         display: none;
//     }


// `;

// const AddSamplePaper = () => {

//     const token = localStorage.getItem('token');
//     const [AddSamplePaper, setAddSamplePaper]= useState(true);

//     const [allTeacherData , setAllTeacherData] = useState([]);
//     const [allClassData , setAllClassData] = useState([]);
//     const [allSubjectData , setAllSubjectData] = useState([]);
//     const [ExamCategoryData, setExamCategoryData] = useState([]);
    
//     const [Classs, setClasss] = useState('')
//     const [ClasssError, setClasssError] = useState('')

//     const [SectionId, setSectionId] = useState('')
//     const [SectionIdError, setSectionIdError] = useState('')

//     const [Subject, setSubject] = useState('')
//     const [SubjectError, setSubjectError] = useState('')

//     const [Teacher, setTeacher] = useState('')
//     const [TeacherError, setTeacherError] = useState('')

//     const [Statuus, setStatuus] = useState('')
//     const [StatuusError, setStatuusError] = useState('')

//     const [StartingTime, setStartingTime] = useState('')
//     const [StartingTimeError, setStartingTimeError] = useState('')

//     const [SamplePaperUpload, setSamplePaperUpload] = useState('')
//     const [SamplePaperUploadError, setSamplePaperUploadError] = useState('')

//     const [Title, setTitle] = useState('')
//     const [TitleError, setTitleError] = useState('')

//     const [classId , setClassId] = useState('');
//     const [indexx , setIndexx] = useState('');

//     useEffect(()=>{
//         getAllClassData();
//     },[token])

//     const getAllClassData = async() => {
//         try{
//             var response = await getAllClassApi();
//             if(response?.status===200){
//             if(response?.data?.status==='success'){
//                 setAllClassData(response?.data?.classes);
//             }
//             }
//             else{
//             console.log(response?.data?.message);
//             }
//         }
//         catch{
  
//         }
//     }

//     const AddNewOfflineExam = async () => {
//         if (validateFields()) {
//             try {
//                 const formData = new FormData();
//                 formData.append('title', Title)
//                 formData.append('classId', Classs)
//                 formData.append('sectionId', SectionId)
//                 formData.append('subjectId', Subject)
//                 formData.append('teacherId', Teacher)
//                 formData.append('status', Statuus)
//                 formData.append('startingTime', StartingTime)
//                 formData.append('SamplePaperUpload', SamplePaperUpload)

//                 var response = await addNewOfflineExamApi(formData);
//                 console.log(response, 'exam cate')
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         console.log(response, 'res after success');
//                         setAddSamplePaper(!AddSamplePaper)
//                     }
//                 }
//             }
//             catch {

//             }
//         }
//     }

//     const markRegex = /^(10|[1-9][0-9]|[1-4][0-9]{2}|500)$/;

//     const validateMark = (value) => {
//         if (!value.trim()) {
//             return '*This Field is required';
//         } else if (!markRegex.test(value)) {
//             return 'Invalid characters in name !!';
//         }
//         return '';
//     };


//     const validateFields = () => {
//         let isValid = true;

//         if (!Categories) {
//             setCategoriesError('* This Feild is required');
//             isValid = false;
//         } else {
//             setCategoriesError('');
//         }

//         if (!Classs) {
//             setClasssError('* This Feild is required');
//             isValid = false;
//         } else {
//             setClasssError('');
//         }

//         if (!Subject) {
//             setSubjectError('* This Feild is required');
//             isValid = false;
//         } else {
//             setSubjectError('');
//         }

//         if (!Teacher) {
//             setTeacherError('* This Feild is required');
//             isValid = false;
//         } else {
//             setTeacherError('');
//         }

//         if (!Daate) {
//             setDaateError('* This Feild is required');
//             isValid = false;
//         } else {
//             setDaateError('');
//         }

//         if (!StartingTime) {
//             setStartingTimeError('* This Feild is required');
//             isValid = false;
//         } else {
//             setStartingTimeError('');
//         }

//         if (!SamplePaperUpload) {
//             setSamplePaperUploadError('* This Feild is required');
//             isValid = false;
//         } else {
//             setSamplePaperUploadError('');
//         }

//         if (!Title) {
//             setTitleError('* This Feild is required');
//             isValid = false;
//         } else {
//             setTitleError('');
//         }

//         return isValid;
//     }

//     const handleChange = (e) => {
//         const value = e.target.value;
//         const [val1, val2] = value.split(',');
//         setIndexx(val1);
//         setClassId(val2);
//     }

//   return (
//     <>
//         <Container>
//             <div className="container-fluid ">
//                 <div className="row">
//                     {AddSamplePaper
//                         ?
//                             <>
//                                 <form className='p-3'>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TitleError ? 'border-1 border-danger' : ''}`} placeholder='Enter Title' value={Title} onChange={(e)=> {setTitle(e.target.value), setTitleError(validateMark(e.target.value))}}/>
//                                         <span className='text-danger'>{TitleError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example"  onChange={handleChange}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData?.map((option, index) => (
//                                                 <option key={option.classId} value={`${index}, ${option?.classId}`}>
//                                                     {option.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{ClasssError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Section</label>
//                                         <select className={`form-select font14 ${SectionIdError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e)=> setSectionId(e.target.value)}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData[indexx]?.section?.map(option => (
//                                                 <option key={option.classSecId} value={option.classSecId}>
//                                                     {option.sectionName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SectionIdError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e)=> {setSubject(e.target.value), setSubjectError('')}}>
//                                             <option >--- Choose ---</option>
//                                             {allSubjectData?.map(option => (
//                                                 <option key={option.subjectId} value={option.subjectId}>
//                                                     {option.subjectName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SubjectError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Teacher</label>
//                                         <select className={`form-select font14 ${TeacherError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Teacher} onChange={(e)=> {setTeacher(e.target.value), setTeacherError('')}}>
//                                             <option >--- Choose ---</option>
//                                             {allTeacherData?.map(option => (
//                                                 <option key={option.rooms} value={option?.rooms}>
//                                                     {option.Teacher}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{TeacherError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputAdd1" className='form-label font14'>Status</label>
//                                         <select className={`form-select font14 ${StatuusError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleDriverGenderChange(e.target.value)}>
//                                             <option>--- Choose ---</option>
//                                             <option value='Active'>Active</option>
//                                             <option value='Female'>InActive</option>
//                                         </select>
//                                         <span className='text-danger'>{StatuusError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Sample Paper Upload</label>
//                                         <input type="file" id="exampleInputEmail1" className={`form-control font14 ${SamplePaperUploadError ? 'border-1 border-danger' : ''}`} onChange={(e)=> {setSamplePaperUpload(e.target.value), setSamplePaperUploadError('')}}/>
//                                         <span className='text-danger'>{SamplePaperUploadError}</span>
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn updateCreateButtons text-white' type='button' onClick={AddNewOfflineExam}>Create Exam</button>
//                                         <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                         :
//                             <>
//                                 <div>
//                                     <div className="mt-3  ">
//                                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center p-5">
//                                             <p className='warningHeading'>Successful Updated</p>
//                                         </div>
//                                         <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Continue</button>
//                                     </div>
//                                 </div>
//                             </>
//                     }
                
//                 </div>
//                 <Toaster/>
//             </div>
//         </Container>
//     </>
//   )
// }

// export default AddSamplePaper