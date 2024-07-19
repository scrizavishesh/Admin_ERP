import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getVehicleDataApi, getAllDropPointByVehicleApi, assignStudentApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
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

`;

const AssignStudentForm = ({AssignStudent, setAssignStudent,  ReloadData }) => {

    const token = localStorage.getItem('token');
    // Data States
    const [VehicleData, setVehicleData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allDropData, setAllDropData] = useState([]);
    // Variable States
    const [vehicleNum, setVehicleNum] = useState('');
    const [ClassNo, setClassNo] = useState('');
    const [Section, setSection] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [DropId, setDropId] = useState('');
    // Error States
    const [vehicleNumError, setVehicleNumError] = useState('');
    const [ClassNoError, setClassNoError] = useState('');
    const [SectionError, setSectionError] = useState('');
    const [StudentIdError, setStudentIdError] = useState('');
    const [DropIdError, setDropIdError] = useState('');

    useEffect(() => {
        getAllVehicleData();
        getAllClassData();
    }, [token])

    useEffect(() => {
        getAllDropPointData();
    }, [vehicleNum])

    const getAllVehicleData = async () => {
        try {
            const searchKey = '';
            const pageNo = '';
            const pageSize = '';
            var response = await getVehicleDataApi(searchKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setVehicleData(response?.data?.vehicles);
                    toast.success(response.data.message);
                }
            }
            else {
                toast.error(response?.data?.msg);
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
                    toast.success(response.data.message);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllDropPointData = async () => {
        try {
            var response = await getAllDropPointByVehicleApi(vehicleNum);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllDropData(response?.data?.drops);
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const AssignStudentData = async () => {
        const VehicleValidate = validateVehicle(vehicleNum);
        const ClassNoValidate = validateClass(ClassNo);
        const SectionValidate = validateSection(Section);
        const StudentValidate = validateStudent(StudentId);
        const DropPointValidate = validateDropPoint(DropId);

        if (VehicleValidate || ClassNoValidate || SectionValidate || StudentValidate || DropPointValidate) {
            setVehicleNumError(VehicleValidate);
            setClassNoError(ClassNoValidate);
            setSectionError(SectionValidate);
            setStudentIdError(StudentValidate);
            setDropIdError(DropPointValidate);
            return;
        }

        setVehicleNumError('');
        setClassNoError('');
        setSectionError('');
        setStudentIdError('');
        setDropIdError('');
        try {
            const formData = new FormData();
            formData.append("vehicleNo", vehicleNum);
            formData.append("classNo", ClassNo);
            formData.append("sec", Section);
            formData.append("studentId", StudentId);
            formData.append("dropId", DropId);

            var response = await assignStudentApi(formData);

            console.log(response)

            if (response?.status === 200) {
                console.log(response)

                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.msg)
                    setAssignStudent(false)
                    navigate('/allStudent')
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch (error) {
            // toast.error('Error during assigning vehicle to a new Student', error)
        }
    }

    const handleVehicle = (value) => {
        setVehicleNum(value)
        setVehicleNumError(validateVehicle(value))
    }

    const validateVehicle = (value) => {
        if (value === '') {
            return '* Vehicle is required';
        }
        return '';
    };

    const handleStudent = (value) => {
        setStudentId(value)
        setStudentIdError(validateStudent(value))
    }

    const validateStudent = (value) => {
        if (value === '') {
            return '* Student is required';
        }
        return '';
    };

    const handleDropPoint = (value) => {
        setDropId(value)
        setDropIdError(validateDropPoint(value))
    }

    const validateDropPoint = (value) => {
        if (value === '') {
            return '* Drop Point is required';
        }
        return '';
    };

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setClassNo(classNoVal);
        setClassNoError(validateClass(classNoVal));
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };

    const validateClass = (value) => {
        if (value === '') {
            return '* Class is required';
        }
        return '';
    };

    const handleSectionChange = (val) => {
        const sectionNameVal = val;
        setSection(sectionNameVal);
        setSectionError(validateSection(sectionNameVal));
        const selectedSection = allSectionData.find(c => c.sectionName === sectionNameVal);

        if (selectedSection) {
            setAllSubjectData(selectedSection.studentDTO || []);
        } else {
            setAllSubjectData([]);
        }
    };

    const validateSection = (value) => {
        if (value === '') {
            return '* Section is required';
        }
        return '';
    };


    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        {AssignStudent
                            ?
                            <>
                                <form className='p-3'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Vehicle</label>
                                        <select className={`form-select font14 ${vehicleNumError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleVehicle(e.target.value)}>
                                            <option value='' selected disabled >--- Select ---</option>
                                            {VehicleData?.map(option => (
                                                <option key={option.vehicleId} value={option.vehicleNumber}>
                                                    {option.vehicleModel}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{vehicleNumError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
                                        <select className={`form-select font14 ${ClassNoError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleClassChange(e.target.value)}>
                                            <option value='' selected disabled >--- Select ---</option>
                                            {allClassData?.map((option, index) => (
                                                <option key={option.classId} value={option?.classNo}>
                                                    {option.classNo}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{ClassNoError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Section</label>
                                        <select className={`form-select font14 ${SectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleSectionChange(e.target.value)}>
                                            <option value='' selected disabled >--- Select ---</option>
                                            {allSectionData?.map((option, index) => (
                                                <option key={option.classSecId} value={option?.sectionName}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{SectionError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Student</label>
                                        <select className={`form-select font14 ${StudentIdError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleStudent(e.target.value)}>
                                            <option value='' selected disabled >--- Select ---</option>
                                            {allSubjectData?.map(option => (
                                                <option key={option.studentId} value={option.studentId}>
                                                    {option.studentName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{StudentIdError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label font14">Drop Point</label>
                                        <select className={`form-select font14 ${DropIdError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleDropPoint(e.target.value)}>
                                            <option value='' selected disabled >--- Select ---</option>
                                            {allDropData?.map(option => (
                                                <option key={option.dropId} value={option.dropId}>
                                                    {option.stopName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-danger'>{DropIdError}</span>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateButtons text-white' type='button' onClick={AssignStudentData}>Assign</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div>
                                    <p className="modalLightBorder p-2 mb-0">Vehicle List</p>
                                    <div className="mt-3">
                                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                            <p className='warningHeading'>Successful Updated</p>
                                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                        </div>
                                        <button className="btn contbtn continueButtons text-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ReloadData}>Continue</button>
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

export default AssignStudentForm