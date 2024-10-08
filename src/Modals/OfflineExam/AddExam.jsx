import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addNewOfflineExamApi, getAllClassApi, getAllSubjectByClassApi, getExamCategoryDataApi, getRoomDataApi } from '../../Utils/Apis';
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

const AddExam = ({ offlineExamState }) => {

    const today = new Date().toISOString().split("T")[0];

    const token = localStorage.getItem('token');
    const [AddExam, setAddExam] = useState(true);

    const [allRoomData, setAllRoomData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);

    const [Categories, setCategories] = useState('')
    const [CategoriesError, setCategoriesError] = useState('')

    const [indexxx, setIndexxx] = useState('');
    const [ClassId, setClassId] = useState('');
    const [ClasssError, setClasssError] = useState('')

    const [Subject, setSubject] = useState('')
    const [SubjectError, setSubjectError] = useState('')

    const [RoomNo, setRoomNo] = useState('')
    const [RoomNoError, setRoomNoError] = useState('')

    const [Daate, setDaate] = useState('')
    const [DaateError, setDaateError] = useState('')

    const [StartingTime, setStartingTime] = useState('')
    const [StartingTimeError, setStartingTimeError] = useState('')

    const [EndingTime, setEndingTime] = useState('')
    const [EndingTimeError, setEndingTimeError] = useState('')

    const [TotalMarks, setTotalMarks] = useState('')
    const [TotalMarksError, setTotalMarksError] = useState('')

    const searchVal = '';
    const pageNoVal = '';
    const sizeVal = '';

    const handleDataStateChange = () => {
        offlineExamState(true);
        setAddExam(!AddExam);

    };

    useEffect(() => {
        getAllRoomData();
        getAllClassData();
        getAllExamCategoryData();
    }, [token])


    const getAllExamCategoryData = async () => {
        try {
            var response = await getExamCategoryDataApi(searchVal, pageNoVal, sizeVal);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setExamCategoryData(response?.data?.categories);
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch { }
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

    const getAllRoomData = async () => {
        try {
            var response = await getRoomDataApi(searchVal, pageNoVal, sizeVal);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllRoomData(response?.data?.rooms);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const handleTotalMarksChange = (value) => {
        setTotalMarks(value);
        setTotalMarksError(validateMark(value))
    }

    const validateMark = (value) => {
        const markRegex = /^(0[1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/;
        if (!value.trim()) {
            return '*Total Marks is required';
        } else if (!markRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };

    const handleCategoriesChange = (value) => { 
        setCategories(value);
        setCategoriesError(validateCategories(value))
    }

    const validateCategories = (value) => {
        if (!value || value == '') {
            return '* Exam Category is required';
        }
        return '';
    };

    const handleClassChange = (value) => {
        const [val1, val2] = value.split(',');
        setIndexxx(val1);
        setClassId(val2);
        setClasssError(validateClass(val2))
    }

    const validateClass = (value) => {
        if (!value || value == '') {
            return '* Class is required';
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

    const handleClassRoomChange = (value) => { 
        setRoomNo(value);
        setRoomNoError(validateClassRoom(value))
    }

    const validateClassRoom = (value) => {
        if (!value || value == '') {
            return '* Class Room is required';
        }
        return '';
    };

    const handleDateeChange = (value) => { 
        console.log(value)
        setDaate(value);
        setDaateError(validateDate(value))
    }

    const validateDate = (value) => {
        if (!value || value == '') {
            return '* Date is required';
        }
        return '';
    };

    const handleStartTimeChange = (value) => { 
        setStartingTime(value);
        setStartingTimeError(validateStartTime(value))
    }

    const validateStartTime = (value) => {
        if (!value || value == '') {
            return '* Start Time is required';
        }
        return '';
    };

    const handleEndTimeChange = (value) => { 
        setEndingTime(value);
        setEndingTimeError(validateEndTime(value))
    }

    const validateEndTime = (value) => {
        if (!value || value == '') {
            return '* End Time is required';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        const getByIdCategoriesErrorNew = validateCategories(Categories)
        if (getByIdCategoriesErrorNew) {
            setCategoriesError(getByIdCategoriesErrorNew);
            isValid = false;
        } else {
            setCategoriesError('');
        }

        const getByIdClassIdErrorNew = validateClass(ClassId)
        if (getByIdClassIdErrorNew) {
            setClasssError(getByIdClassIdErrorNew);
            isValid = false;
        } else {
            setClasssError('');
        }

        const getByIdSubjectErrorNew = validateSubject(Subject)
        if (getByIdSubjectErrorNew) {
            setSubjectError(getByIdSubjectErrorNew);
            isValid = false;
        } else {
            setSubjectError('');
        }

        const getByIdRoomNoErrorNew = validateClassRoom(RoomNo)
        if (getByIdRoomNoErrorNew) {
            setRoomNoError(getByIdRoomNoErrorNew);
            isValid = false;
        } else {
            setRoomNoError('');
        }

        const getByIdDaateErrorNew = validateDate(Daate)
        if (getByIdDaateErrorNew) {
            setDaateError(getByIdDaateErrorNew);
            isValid = false;
        } else {
            setDaateError('');
        }

        const getByIdStartingTimeErrorNew = validateStartTime(StartingTime)
        if (getByIdStartingTimeErrorNew) {
            setStartingTimeError(getByIdStartingTimeErrorNew);
            isValid = false;
        } else {
            setStartingTimeError('');
        }

        const getByIdEndingTimeErrorNew = validateEndTime(EndingTime)
        if (getByIdEndingTimeErrorNew) {
            setEndingTimeError(getByIdEndingTimeErrorNew);
            isValid = false;
        } else {
            setEndingTimeError('');
        }

        const getByIdTotalMarksErrorNew = validateMark(TotalMarks)
        if (getByIdTotalMarksErrorNew) {
            setTotalMarksError(getByIdTotalMarksErrorNew);
            isValid = false;
        } else {
            setTotalMarksError('');
        }

        return isValid;
    }

    const AddNewOfflineExam = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();
                formData.append('categoryId', Categories)
                formData.append('classId', ClassId)
                formData.append('subjectId', Subject)
                formData.append('roomId', RoomNo)
                formData.append('date', Daate)
                formData.append('startingTime', StartingTime)
                formData.append('endingTime', EndingTime)
                formData.append('totalMarks', TotalMarks)

                var response = await addNewOfflineExamApi(formData);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setAddExam(!AddExam)
                        setDataUpdate(!dataUpdate)
                    }
                    else{
                        toast.error(response?.data?.message)
                    }
                }
                else{
                    toast.error(response?.data?.message)
                }
            }
            catch {

            }
        }
    }


    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        {AddExam
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Name</label>
                                        <select className={`form-select font14 ${CategoriesError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => handleCategoriesChange(e.target.value)}>
                                            <option value=''>--- Choose ---</option>
                                            {ExamCategoryData?.map(option => (
                                                <option key={option.categoryId} value={option?.categoryId}>
                                                    {option.examCategoryName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{CategoriesError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
                                        <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e)=> handleClassChange(e.target.value)}>
                                            <option value=''>--- Choose ---</option>
                                            {allClassData?.map((option, index) => (
                                                <option key={option.classId} value={`${index}, ${option.ClassId}`}>
                                                    {option.classNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{ClasssError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
                                        <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => handleSubjectChange(e.target.value)}>
                                            <option value=''>--- Choose ---</option>
                                            {allClassData[indexxx]?.subjects?.map(option => (
                                                <option key={option.subjectId} value={option.subjectId} >
                                                    {option.subjectName}, {option.subjectId}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{SubjectError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class Room</label>
                                        <select className={`form-select font14 ${RoomNoError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => handleClassRoomChange(e.target.value)}>
                                            <option value=''>--- Choose ---</option>
                                            {allRoomData?.map(option => (
                                                <option key={option.roomId} value={option?.roomId}>
                                                    {option.roomNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{RoomNoError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Date</label>
                                        <input type="date" id="exampleInputEmail1" className={`form-control font14 ${DaateError ? 'border-1 border-danger' : ''}`} min={today} onChange={(e) => handleDateeChange(e.target.value)} />
                                        <span className='text-danger'>{DaateError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Time</label>
                                        <input type="time" id="exampleInputEmail1" className={`form-control font14 ${StartingTimeError ? 'border-1 border-danger' : ''}`} onChange={(e) => handleStartTimeChange(e.target.value)} />
                                        <span className='text-danger'>{StartingTimeError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Time</label>
                                        <input type="time" id="exampleInputEmail1" className={`form-control font14 ${EndingTimeError ? 'border-1 border-danger' : ''}`} onChange={(e) => handleEndTimeChange(e.target.value)} />
                                        <span className='text-danger'>{EndingTimeError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} placeholder='Enter Total Marks' onChange={(e) =>  handleTotalMarksChange(e.target.value)} />
                                        <span className='text-danger'>{TotalMarksError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn addButtons text-white' type='button' onClick={AddNewOfflineExam}>Create Exam</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div className="mt-3">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'>
                                        <img src="./images/Correct.svg" alt="" />
                                    </div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Updated</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleDataStateChange}>Continue</button>
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

export default AddExam




















// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { addNewOfflineExamApi, getAllClassApi, getAllSubjectByClassApi, getExamCategoryDataApi, getRoomDataApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';

// const Container = styled.div`
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

// const AddExam = ({ offlineExamState }) => {

//     const token = localStorage.getItem('token');
//     const [AddExam, setAddExam] = useState(true);

//     const [allRoomData, setAllRoomData] = useState([]);
//     const [allClassData, setAllClassData] = useState([]);
//     const [allSubjectData, setAllSubjectData] = useState([]);
//     const [ExamCategoryData, setExamCategoryData] = useState([]);

//     const [Categories, setCategories] = useState('')
//     const [CategoriesError, setCategoriesError] = useState('')

//     const [Classs, setClasss] = useState('')
//     const [ClasssError, setClasssError] = useState('')

//     const [Subject, setSubject] = useState('')
//     const [SubjectError, setSubjectError] = useState('')

//     const [RoomNo, setRoomNo] = useState('')
//     const [RoomNoError, setRoomNoError] = useState('')

//     const [Daate, setDaate] = useState('')
//     const [DaateError, setDaateError] = useState('')

//     const [StartingTime, setStartingTime] = useState('')
//     const [StartingTimeError, setStartingTimeError] = useState('')

//     const [EndingTime, setEndingTime] = useState('')
//     const [EndingTimeError, setEndingTimeError] = useState('')

//     const [TotalMarks, setTotalMarks] = useState('')
//     const [TotalMarksError, setTotalMarksError] = useState('')

//     const [indexxx, setIndexxx] = useState('');
//     const [classId, setClassId] = useState('');

//     const handleDataStateChange = () => {
//         offlineExamState(true);
//         setAddExam(!AddExam);

//     };

//     useEffect(() => {
//         getAllRoomData();
//         getAllClassData();
//         getAllExamCategoryData();
//     }, [token])


//     const getAllExamCategoryData = async () => {
//         try {
//             const searchKey = '';
//             const page = '';
//             const size = '';
//             var response = await getExamCategoryDataApi(searchKey, page, size);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setExamCategoryData(response?.data?.categories);
//                     toast.success(response.data.msg);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch { }
//     }

//     const getAllClassData = async () => {
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const getAllRoomData = async () => {
//         try {
//             const searchKey = '';
//             const page = '';
//             const size = '';
//             var response = await getRoomDataApi(searchKey, page, size);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllRoomData(response?.data?.rooms);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const AddNewOfflineExam = async () => {
//         if (validateFields()) {
//             try {
//                 const formData = new FormData();
//                 formData.append('categoryId', Categories)
//                 formData.append('classId', classId)
//                 formData.append('subjectId', Subject)
//                 formData.append('roomId', RoomNo)
//                 formData.append('date', Daate)
//                 formData.append('startingTime', StartingTime)
//                 formData.append('endingTime', EndingTime)
//                 formData.append('totalMarks', TotalMarks)

//                 var response = await addNewOfflineExamApi(formData);
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         setAddExam(!AddExam)
//                         setDataUpdate(!dataUpdate)
//                     }
//                     else{
//                         toast.error(response?.data?.message)
//                     }
//                 }
//                 else{
//                     toast.error(response?.data?.message)
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

//         if (!classId) {
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

//         if (!RoomNo) {
//             setRoomNoError('* This Feild is required');
//             isValid = false;
//         } else {
//             setRoomNoError('');
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

//         if (!EndingTime) {
//             setEndingTimeError('* This Feild is required');
//             isValid = false;
//         } else {
//             setEndingTimeError('');
//         }

//         if (!TotalMarks) {
//             setTotalMarksError('* This Feild is required');
//             isValid = false;
//         } else if (!markRegex.test(TotalMarks)) {
//             return 'Invalid characters in name !!';
//         } else {
//             setTotalMarksError('');
//         }

//         return isValid;
//     }


//     const handleChange = (e) => {
//         const value = e.target.value;
//         const [val1, val2] = value.split(',');
//         setIndexxx(val1);
//         setClassId(val2);
//     }

//     return (
//         <>
//             <Container>
//                 <div className="container-fluid ">
//                     <div className="row">
//                         {AddExam
//                             ?
//                             <>
//                                 <form className='p-3'>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Name</label>
//                                         <select className={`form-select font14 ${CategoriesError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => { setCategories(e.target.value), setCategoriesError('') }}>
//                                             <option >--- Choose ---</option>
//                                             {ExamCategoryData?.map(option => (
//                                                 <option key={option.categoryId} value={option?.categoryId}>
//                                                     {option.examCategoryName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{CategoriesError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={handleChange}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData?.map((option, index) => (
//                                                 <option key={option.classId} value={`${index}, ${option.classId}`}>
//                                                     {option.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{ClasssError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => { setSubject(e.target.value), setSubjectError('') }}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData[indexxx]?.subjects?.map(option => (
//                                                 <option key={option.subjectId} value={option.subjectId} >
//                                                     {option.subjectName}, {option.subjectId}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SubjectError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class Room</label>
//                                         <select className={`form-select font14 ${RoomNoError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => { setRoomNo(e.target.value), setRoomNoError('') }}>
//                                             <option >--- Choose ---</option>
//                                             {allRoomData?.map(option => (
//                                                 <option key={option.roomId} value={option?.roomId}>
//                                                     {option.roomNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{RoomNoError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Date</label>
//                                         <input type="date" id="exampleInputEmail1" className={`form-control font14 ${DaateError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setDaate(e.target.value), setDaateError('') }} />
//                                         <span className='text-danger'>{DaateError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${StartingTimeError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setStartingTime(e.target.value), setStartingTimeError('') }} />
//                                         <span className='text-danger'>{StartingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${EndingTimeError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setEndingTime(e.target.value), setEndingTimeError('') }} />
//                                         <span className='text-danger'>{EndingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} placeholder='Enter Total Marks' onChange={(e) => { setTotalMarks(e.target.value), setTotalMarksError(validateMark(e.target.value)) }} />
//                                         <span className='text-danger'>{TotalMarksError}</span>
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn addButtons text-white' type='button' onClick={AddNewOfflineExam}>Create Exam</button>
//                                         <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                             :
//                             <>
//                                 <div className="mt-3">
//                                     <div className='correvtSVG p-3 pt-4 rounded-circle'>
//                                         <img src="./images/Correct.svg" alt="" />
//                                     </div>
//                                     <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                         <p className='warningHeading'>Successful Updated</p>
//                                         <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                     </div>
//                                     <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleDataStateChange}>Continue</button>
//                                 </div>
//                             </>
//                         }

//                     </div>
//                     <Toaster />
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default AddExam



