import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addNewOfflineExamApi, getAllClassApi, getAllSubjectByClassApi, getExamCategoryDataApi, getOfflineExamDataByIdApi, getRoomDataApi, updateOfflineExamApi } from '../../Utils/Apis';
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

const EditExam = ({ EditId }) => {

    const token = localStorage.getItem('token');
    const [EditExam, setEditExam] = useState(true);

    const [allRoomData, setAllRoomData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);

    const [Categories, setCategories] = useState('')
    const [CategoriesError, setCategoriesError] = useState('')

    const [Classs, setClasss] = useState('')
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

    const [refreshEdit, setRefreshEdit] = useState('')


    useEffect(() => {
        getAllRoomData();
        getAllClassData();
        getAllExamCategoryData();
        getOfflineExamDataById();
    }, [token, EditId, refreshEdit])

    useEffect(() => {
        handleClassChange(Classs);
    }, [Classs]);

    const getOfflineExamDataById = async () => {
        try {
            var response = await getOfflineExamDataByIdApi(EditId);
            if (response?.status === 200) {
                console.log(response, 'ressssssssssssssssss get by id data')
                if (response?.data?.status === 'success') {
                    setCategories(response?.data?.Details?.examCategoryId);
                    setClasss(response?.data?.Details?.classId);
                    setSubject(response?.data?.Details?.subjectId);
                    setRoomNo(response?.data?.Details?.roomNumber);
                    setDaate(response?.data?.Details?.date);
                    setStartingTime(response?.data?.Details?.startingTime);
                    setEndingTime(response?.data?.Details?.endingTime);
                    setTotalMarks(response?.data?.Details?.totalMarks);
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

    const getAllExamCategoryData = async () => {
        try {
            const searchKey = '';
            var response = await getExamCategoryDataApi(searchKey);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setExamCategoryData(response?.data?.categories);
                    toast.success(response.data.message);
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
            const searchKey = '';
            var response = await getRoomDataApi(searchKey);
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


    const UpdateOfflineExam = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();
                formData.append('categoryId', Categories)
                formData.append('classId', Classs)
                formData.append('subjectId', Subject)
                console.log('subjectId', Subject)
                formData.append('roomId', RoomNo)
                formData.append('date', Daate)
                formData.append('startingTime', StartingTime)
                formData.append('endingTime', EndingTime)
                formData.append('totalMarks', TotalMarks)

                var response = await updateOfflineExamApi(EditId, formData);
                console.log(response, 'offline exam')
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        console.log(response, 'res after success');
                        setEditExam(!EditExam)
                    }
                }
            }
            catch {

            }
        }
    }

    const markRegex = /^(10|[1-9][0-9]|[1-4][0-9]{2}|500)$/;

    const validateMark = (value) => {
        if (!value.trim()) {
            return '*This Field is required';
        } else if (!markRegex.test(value)) {
            return 'Invalid characters in name !!';
        }
        return '';
    };


    const validateFields = () => {
        let isValid = true;

        if (!Categories) {
            setCategoriesError('* This Feild is required');
            isValid = false;
        } else {
            setCategoriesError('');
        }

        if (!Classs) {
            setClasssError('* This Feild is required');
            isValid = false;
        } else {
            setClasssError('');
        }

        if (!Subject) {
            setSubjectError('* This Feild is required');
            isValid = false;
        } else {
            setSubjectError('');
        }

        if (!RoomNo) {
            setRoomNoError('* This Feild is required');
            isValid = false;
        } else {
            setRoomNoError('');
        }

        if (!Daate) {
            setDaateError('* This Feild is required');
            isValid = false;
        } else {
            setDaateError('');
        }

        if (!StartingTime) {
            setStartingTimeError('* This Feild is required');
            isValid = false;
        } else {
            setStartingTimeError('');
        }

        if (!EndingTime) {
            setEndingTimeError('* This Feild is required');
            isValid = false;
        } else {
            setEndingTimeError('');
        }

        if (!TotalMarks) {
            setTotalMarksError('* This Feild is required');
            isValid = false;
        } else {
            setTotalMarksError('');
        }

        return isValid;
    }

    const PageRefreshOnEdit = () => {
        setEditExam(!EditExam);
        setRefreshEdit(!refreshEdit);
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setClasss(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllSubjectData(selectedClass.subjects || []);

        } else {
            setAllSubjectData([]);
        }
        // setSubject('')
    };
    

    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        {EditExam
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Name</label>
                                        <select className={`form-select font14 ${CategoriesError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Categories} onChange={(e) => { setCategories(e.target.value), setCategoriesError('') }}>
                                            <option >--- Choose ---</option>
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
                                        <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Classs} onChange={(e) => handleClassChange(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option, index) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{ClasssError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
                                        <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => { setSubject(e.target.value), setSubjectError('') }}>
                                            <option >--- Choose ---</option>
                                            {allSubjectData?.map((option) => (
                                                <option key={option.subjectId} value={option.subjectId}>
                                                    {option.subjectName},{option.subjectId}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{SubjectError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class Room</label>
                                        <select className={`form-select font14 ${RoomNoError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={RoomNo} onChange={(e) => { setRoomNo(e.target.value), setRoomNoError('') }}>
                                            <option >--- Choose ---</option>
                                            {allRoomData?.map(option => (
                                                <option key={option.roomId} value={option?.rooms}>
                                                    {option.roomNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{RoomNoError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Date</label>
                                        <input type="date" id="exampleInputEmail1" className={`form-control font14 ${DaateError ? 'border-1 border-danger' : ''}`} value={Daate} onChange={(e) => { setDaate(e.target.value), setDaateError('') }} />
                                        <span className='text-danger'>{DaateError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Time</label>
                                        <input type="time" id="exampleInputEmail1" className={`form-control font14 ${StartingTimeError ? 'border-1 border-danger' : ''}`} value={StartingTime} onChange={(e) => { setStartingTime(e.target.value), setStartingTimeError('') }} />
                                        <span className='text-danger'>{StartingTimeError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Time</label>
                                        <input type="time" id="exampleInputEmail1" className={`form-control font14 ${EndingTimeError ? 'border-1 border-danger' : ''}`} value={EndingTime} onChange={(e) => { setEndingTime(e.target.value), setEndingTimeError('') }} />
                                        <span className='text-danger'>{EndingTimeError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
                                        <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} placeholder='Enter Total Marks' value={TotalMarks} onChange={(e) => { setTotalMarks(e.target.value), setTotalMarksError(validateMark(e.target.value)) }} />
                                        <span className='text-danger'>{TotalMarksError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn addButtons2 text-white' type='button' onClick={UpdateOfflineExam}>Update Exam</button>
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
                                    <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnEdit}>Continue</button>
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

export default EditExam