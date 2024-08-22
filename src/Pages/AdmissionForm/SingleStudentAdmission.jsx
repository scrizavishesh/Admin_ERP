import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { addNewStudentApi, getAllClassApi, getAllFeeMasterApi } from '../../Utils/Apis'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`
    overflow: scroll;

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }
`;


const SingleStudentAdmission = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data States
    const [FeeMasterData, setFeeMasterData] = useState([])
    // Variable States
    const [studentName, setStudentName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [parentNo, setParentNo] = useState('')
    const [studentEmail, setStudentEmail] = useState('')
    const [parentEmail, setParentEmail] = useState('')
    const [fatherOccupation, setFatherOccupation] = useState('')
    const [motherOccupation, setMotherOccupation] = useState('')
    const [classNo, setClassNo] = useState('')
    const [section, setSection] = useState('')
    const [studentDOB, setstudentDOB] = useState('')
    const [gender, setGender] = useState('')
    const [studentAddress, setStudentAddress] = useState('')
    const [emergencyNo, setEmergencyNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')
    // Error States
    const [studentNameError, setStudentNameError] = useState('')
    const [bloodGroupError, setBloodGroupError] = useState('')
    const [fatherNameError, setFatherNameError] = useState('')
    const [motherNameError, setMotherNameError] = useState('')
    const [parentNoError, setParentNoError] = useState('')
    const [studentEmailError, setStudentEmailError] = useState('')
    const [parentEmailError, setParentEmailError] = useState('')
    const [fatherOccupationError, setFatherOccupationError] = useState('')
    const [motherOccupationError, setMotherOccupationError] = useState('')
    const [classNoError, setClassNoError] = useState('')
    const [sectionError, setSectionError] = useState('')
    const [studentDOBError, setstudentDOBError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [studentAddressError, setStudentAddressError] = useState('')
    const [emergencyNoError, setEmergencyNoError] = useState('')
    const [studentPhError, setStudentPhError] = useState('')
    const [studentImageError, setStudentImageError] = useState('')
    //Handle Data States
    const [Indexx, setIndexx] = useState();
    const [allClassData, setAllClassData] = useState([]);

    //UseEffect Call
    useEffect(() => {
        getAllClassData();
        getAllFeeMasterData();
    }, [token])

    // All API Functions
    const getAllClassData = async () => {
        setloaderState(true);
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                    setloaderState(false);
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Class API - ', error)
        }
    }

    const getAllFeeMasterData = async () => {
        try {
            setloaderState(true);
            const searchByKey =''
            const pageNo =''
            const pageSize =''
            var response = await getAllFeeMasterApi(searchByKey, pageNo, pageSize);
            console.log(response, 'fee master')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setFeeMasterData(response?.data?.feeMaster);
                    setloaderState(false);
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const handleStudentNameChange = (value) => {
        setStudentName(value);
        setStudentNameError(validateStudentName(value))
    }

    const validateStudentName = (value) => {
        if (value.trim() === '') {
            return '* Student Name is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleBloodGroupChange = (value) => {
        setBloodGroup(value);
        setBloodGroupError(validateBloodGroup(value))
    }

    const validateBloodGroup = (value) => {
        if (value === '') {
            return '* Blood Group is required';
        }
        return '';
    };

    const handleFatherNameChange = (value) => {
        setFatherName(value);
        setFatherNameError(validateFatherName(value))
    }

    const validateFatherName = (value) => {
        if (value.trim() === '') {
            return '* Father Name is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleMotherNameChange = (value) => {
        setMotherName(value);
        setMotherNameError(validateMotherName(value))
    }

    const validateMotherName = (value) => {
        if (value.trim() === '') {
            return '* Mother Name is required';
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleParentPhoneChange = (value) => {
        setParentNo(value);
        setParentNoError(validateParentPhone(value))
    }

    const validateParentPhone = (value) => {
        if (value.trim() === '') {
            return `* Parent's Contact Number is required`;
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleStudentPhoneChange = (value) => {
        setStudentPh(value);
        setStudentPhError(validateStudentPhone(value))
    }

    const validateStudentPhone = (value) => {
        if (value.trim() === '') {
            return `* Student's Contact Number is required`;
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleStudentEmailChange = (value) => {
        setStudentEmail(value);
        setStudentEmailError(validateStudentEmail(value))
    }

    const validateStudentEmail = (value) => {
        if (value.trim() === '') {
            return `* Stundent's Email is required`;
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleParentEmailChange = (value) => {
        setParentEmail(value);
        setParentEmailError(validateParentEmail(value))
    }

    const validateParentEmail = (value) => {
        if (value.trim() === '') {
            return `* Parent's Email is required`;
        }
        const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
        if (!emailRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleFatherOccupChange = (value) => {
        setFatherOccupation(value);
        setFatherOccupationError(validateFatherOccupation(value))
    }

    const validateFatherOccupation = (value) => {
        if (value === '') {
            return `* Father's Occupation is required`;
        }
        return '';
    };

    const handleMotherOccupChange = (value) => {
        setMotherOccupation(value);
        setMotherOccupationError(validateMotherOccupation(value))
    }

    const validateMotherOccupation = (value) => {
        if (value === '') {
            return `* Mother's Occupation is required`;
        }
        return '';
    };

    const handleClassChange = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setIndexx(val1);
        setClassNo(val2);
        setClassNoError(validateClass(val2))
    }

    const validateClass = (value) => {
        if (value === '') {
            return '* Class is required';
        }
        return '';
    };

    const handleSectionChange = (value) => {
        setSection(value);
        setSectionError(validateSection(value))
    }

    const validateSection = (value) => {
        if (value === '') {
            return '* Section is required';
        }
        return '';
    };

    const handleBirthdayChange = (value) => {
        setstudentDOB(value);
        setstudentDOBError(validateBirthday(value))
    }

    const validateBirthday = (value) => {
        if (value === '') {
            return '* Birthday is required';
        }
        return '';
    };

    const handleGenderChange = (value) => {
        setGender(value);
        setGenderError(validateGender(value))
    }

    const validateGender = (value) => {
        if (value === '') {
            return '* Gender is required';
        }
        return '';
    };

    const handleAddressChange = (value) => {
        setStudentAddress(value);
        setStudentAddressError(validateAddress(value))
    }

    const validateAddress = (value) => {
        if (value.trim() === '') {
            return '* Address is required';
        }
        const addressRegex = /^[A-Za-z0-9\s-]+$/;
        if (!addressRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleEmergencyNoChange = (value) => {
        setEmergencyNo(value);
        setEmergencyNoError(validateEmergencyNo(value))
    }

    const validateEmergencyNo = (value) => {
        if (value.trim() === '') {
            return '* Emergency Number is required';
        }
        const PhoneRegex = /^[6-9]\d{9}$/;
        if (!PhoneRegex.test(value)) {
            return '* Invalid characters !!';
        }
        return '';
    };

    const handleStudentImageChange = (value) => {
        setStudentImage(value[0]);
        setStudentImageError(validateStudentImage(value))
    }

    const validateStudentImage = (value) => {
        if (!value) {
            return '* Student Image is required';
        }
        else if (value.size < 10240 || value.size > 204800) { // 1 KB = 1024 bytes
            return '* File size must be between 10 KB to 200 KB';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        const studentNameValidate = validateStudentName(studentName);
        if (studentNameValidate) {
            setStudentNameError(studentNameValidate);
            isValid = false;
        } else {
            setStudentNameError('');
        }

        const bloodGroupValidate = validateBloodGroup(bloodGroup);
        if (bloodGroupValidate) {
            setBloodGroupError(bloodGroupValidate);
            isValid = false;
        } else {
            setBloodGroupError('');
        }

        const fatherNameValidate = validateFatherName(fatherName);
        if (fatherNameValidate) {
            setFatherNameError(fatherNameValidate);
            isValid = false;
        } else {
            setFatherNameError('');
        }

        const motherNameValidate = validateMotherName(motherName);
        if (motherNameValidate) {
            setMotherNameError(motherNameValidate);
            isValid = false;
        } else {
            setMotherNameError('');
        }

        const parentNoValidate = validateParentPhone(parentNo);
        if (parentNoValidate) {
            setParentNoError(parentNoValidate);
            isValid = false;
        } else {
            setParentNoError('');
        }

        const studentPhValidate = validateStudentPhone(studentPh);
        if (studentPhValidate) {
            setStudentPhError(studentPhValidate);
            isValid = false;
        } else {
            setStudentPhError('');
        }

        const studentEmailValidate = validateStudentEmail(studentEmail);
        if (studentEmailValidate) {
            setStudentEmailError(studentEmailValidate);
            isValid = false;
        } else {
            setStudentEmailError('');
        }

        const parentEmailValidate = validateParentEmail(parentEmail);
        if (parentEmailValidate) {
            setParentEmailError(parentEmailValidate);
            isValid = false;
        } else {
            setParentEmailError('');
        }

        const fatherOccupationValidate = validateFatherOccupation(fatherOccupation);
        if (fatherOccupationValidate) {
            setFatherOccupationError(fatherOccupationValidate);
            isValid = false;
        } else {
            setFatherOccupationError('');
        }

        const motherOccupationValidate = validateMotherOccupation(motherOccupation);
        if (motherOccupationValidate) {
            setMotherOccupationError(motherOccupationValidate);
            isValid = false;
        } else {
            setMotherOccupationError('');
        }

        const classNoValidate = validateClass(classNo);
        if (classNoValidate) {
            setClassNoError(classNoValidate);
            isValid = false;
        } else {
            setClassNoError('');
        }

        const sectionValidate = validateSection(section);
        if (sectionValidate) {
            setSectionError(sectionValidate);
            isValid = false;
        } else {
            setSectionError('');
        }

        const studentDOBValidate = validateBirthday(studentDOB);
        if (studentDOBValidate) {
            setstudentDOBError(studentDOBValidate);
            isValid = false;
        } else {
            setstudentDOBError('');
        }

        const genderValidate = validateGender(gender);
        if (genderValidate) {
            setGenderError(genderValidate);
            isValid = false;
        } else {
            setGenderError('');
        }

        const studentAddressValidate = validateAddress(studentAddress);
        if (studentAddressValidate) {
            setStudentAddressError(studentAddressValidate);
            isValid = false;
        } else {
            setStudentAddressError('');
        }

        const emergencyNoValidate = validateEmergencyNo(emergencyNo);
        if (emergencyNoValidate) {
            setEmergencyNoError(emergencyNoValidate);
            isValid = false;
        } else {
            setEmergencyNoError('');
        }

        const studentImageValidate = validateStudentImage(studentImage);
        if (studentImageValidate) {
            setStudentImageError(studentImageValidate);
            isValid = false;
        } else {
            setStudentImageError('');
        }

        return isValid;
    }

    const AddNewStudent = async () => {
        if(validateFields()){
            try {
                const formData = new FormData();
                formData.append("studentName", studentName);
                formData.append("bloodGroup", bloodGroup);
                formData.append("fatherName", fatherName);
                formData.append("motherName", motherName);
                formData.append("parentNo", parentNo);
                formData.append("studentEmail", studentEmail);
                formData.append("parentEmail", parentEmail);
                formData.append("fatherOccupation", fatherOccupation);
                formData.append("motherOccupation", motherOccupation);
                formData.append("classNo", classNo);
                formData.append("section", section);
                formData.append("studentDOB", studentDOB);
                formData.append("gender", gender);
                formData.append("studentAddress", studentAddress);
                formData.append("emergencyNo", emergencyNo);
                formData.append("studentPh", studentPh);
                formData.append("studentImage", studentImage);

                var response = await addNewStudentApi(formData);
                console.log(response, 'res')
                if (response?.status === 200) {
                    console.log(response?.status, '200')
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setTimeout(() => {
                            navigate('/allStudent');
                        }, 700);
                    }
                    else {
                        console.log('fail')
                    }
                } else {
                    toast.error(response?.error);
                }
            } catch (error) {
                console.error('Error during update:', error);
            }
        }
        else {
            toast.error('Please Validate All Fields Correctly')
        }
    }



    return (
        <>
            <Container className='hideScrollBar p-3'>
            {
                loaderState && (
                    <DataLoader />
                )
            }
                <div className="container-fluid">
                    <form className="row g-3 h-100 overflow-scroll">
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Name*</label>
                            <input type="text" className={`form-control font14 ${studentNameError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Name" onChange={(e) => handleStudentNameChange(e.target.value)} />
                            <span className='text-danger'>{studentNameError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Blood Group*</label>
                            <select className={`form-select font14 ${bloodGroupError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleBloodGroupChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                <option value='AB+'>AB+</option>
                                <option value='A+'>A+</option>
                                <option value='B+'>B+</option>
                                <option value='O+'>O+</option>
                            </select>
                            <span className='text-danger'>{bloodGroupError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Father Name*</label>
                            <input type="text" className={`form-control font14 ${fatherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Father Name" onChange={(e) => handleFatherNameChange(e.target.value)} />
                            <span className='text-danger'>{fatherNameError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Mother Name*</label>
                            <input type="text" className={`form-control font14 ${motherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Mother Name" onChange={(e) => handleMotherNameChange(e.target.value)} />
                            <span className='text-danger'>{motherNameError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Parent Contact Details*</label>
                            <input type="text" className={`form-control font14 ${parentNoError ? 'border-1 border-danger' : ''}`} maxLength="10" id="validationDefault01" placeholder="Enter Parent Contact Number" onChange={(e) => handleParentPhoneChange(e.target.value)} />
                            <span className='text-danger'>{parentNoError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Student Contact Details*</label>
                            <input type="text" className={`form-control font14 ${studentPhError ? 'border-1 border-danger' : ''}`} maxLength="10" id="validationDefault01" placeholder="Enter Parent Contact Number" onChange={(e) => handleStudentPhoneChange(e.target.value)} />
                            <span className='text-danger'>{studentPhError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Student Email*</label>
                            <input type="text" className={`form-control font14 ${studentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Student Email" onChange={(e) => handleStudentEmailChange(e.target.value)} />
                            <span className='text-danger'>{studentEmailError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Parent Email*</label>
                            <input type="text" className={`form-control font14 ${parentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Parent Email" onChange={(e) => handleParentEmailChange(e.target.value)} />
                            <span className='text-danger'>{parentEmailError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Father Occupation*</label>
                            <select className={`form-select font14 ${fatherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleFatherOccupChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                <option value='Private'>Private</option>                                
                                <option value='Service Man'>Service Man</option>
                                <option value='Government'>Government</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Bussiness Man'>Bussiness Man</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            <span className='text-danger'>{fatherOccupationError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Mother Occupation*</label>
                            <select className={`form-select font14 ${motherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleMotherOccupChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                <option value='House Wife'>House Wife</option>
                                <option value='Government'>Government</option>
                                <option value='Working'>Working</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            <span className='text-danger'>{motherOccupationError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Class*</label>
                            <select className={`form-select font14 ${classNoError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleClassChange}>
                                <option >--- Choose ---</option>
                                {allClassData?.map((option, index) => (
                                    <option key={option.classId} value={`${index}, ${option?.classNo}`}>
                                        {option.classNo}
                                    </option>
                                ))}
                            </select>
                            <span className='text-danger'>{classNoError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Section*</label>
                            <select className={`form-select font14 ${sectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleSectionChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                {allClassData[Indexx]?.section.map((option) => (
                                    <option key={option.classSecId} value={option?.sectionName}>
                                        {option.sectionName}
                                    </option>
                                ))}
                            </select>
                            <span className='text-danger'>{sectionError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Birthday*</label>
                            <input type="date" className={`form-control font14  ${studentDOBError ? 'border-1 border-danger' : ''} `} id="validationDefault02" onChange={(e) => handleBirthdayChange(e.target.value)} />
                            <span className='text-danger'>{studentDOBError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Gender*</label>
                            <select className={`form-select font14 ${genderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleGenderChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <span className='text-danger'>{genderError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Address*</label>
                            <input type="text" className={`form-control font14  ${studentAddressError ? 'border-1 border-danger' : ''} `} id="validationDefault01" placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
                            <span className='text-danger'>{studentAddressError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Emergency Contact Details*</label>
                            <input type="text" className={`form-control font14  ${emergencyNoError ? 'border-1 border-danger' : ''} `} maxLength="10" id="validationDefault02" placeholder="Enter School Info" onChange={(e) => handleEmergencyNoChange(e.target.value)} />
                            <span className='text-danger'>{emergencyNoError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Photo*</label>
                            <input type="file" className={`form-control font14  ${studentImageError ? 'border-1 border-danger' : ''} `} id="validationDefault02" placeholder="" onChange={(e) => handleStudentImageChange(e.target.files)}  accept='.jpg, .png, .jpeg' />
                            <span className='text-danger'>{studentImageError}</span>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Fee Master*</label>
                            <select className={`form-select font14 ${sectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleSectionChange(e.target.value)}>
                                <option >--- Choose ---</option>
                                {FeeMasterData.map((option) => (
                                    <option key={option.feeGroup} value={option?.feeGroup}>
                                        {option.feeGroup.split('_').join(' ')}
                                    </option>
                                ))}
                            </select>
                            <span className='text-danger'>{sectionError}</span>
                        </div>
                    </form>
                    <div className="row p-5">
                        <div className="col-md-6 col-sm-6 col-6 text-end">
                            <button className='btn AddBtnn font16 text-white' onClick={AddNewStudent}>+ Add Student</button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6 text-start">
                            <button className='btn CancelBtnn font16'>Cancel</button>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default SingleStudentAdmission









// import React, { useState, useEffect } from 'react'
// import styled from 'styled-components'
// import { addNewStudentApi, getAllClassApi, getAllSectionApi, getAllSectionByClassApi } from '../../Utils/Apis'
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const Container = styled.div`
//     overflow: scroll;

//     .hideScrollBar::-webkit-scrollbar {
//         display: none !important;
//     }

//     .form-control::placeholder, .form-control, .form-select{
//         color: var(--greyState)
//     }

//     .form-control, .form-select{
//         border-radius: 5px !important;
//         box-shadow: none !important;
//         border: 1px solid var(--fontControlBorder);
//     }

//     .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
//         border: 2px solid var(--BtnBorder);
//         background-color: var(--breadCrumActiveTextColor)
//     }

//     .CancelBtnn, .CancelBtnn:active{
//         border: 2px solid var(--BtnBorder);
//     }
// `;


// const SingleStudentAdmission = () => {

//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');
//     // Variable States
//     const [studentName, setStudentName] = useState('')
//     const [bloodGroup, setBloodGroup] = useState('')
//     const [fatherName, setFatherName] = useState('')
//     const [motherName, setMotherName] = useState('')
//     const [parentNo, setParentNo] = useState('')
//     const [studentEmail, setStudentEmail] = useState('')
//     const [parentEmail, setParentEmail] = useState('')
//     const [fatherOccupation, setFatherOccupation] = useState('')
//     const [motherOccupation, setMotherOccupation] = useState('')
//     const [classNo, setClassNo] = useState('')
//     const [section, setSection] = useState('')
//     const [studentDOB, setstudentDOB] = useState('')
//     const [gender, setGender] = useState('')
//     const [studentAddress, setStudentAddress] = useState('')
//     const [emergencyNo, setEmergencyNo] = useState('')
//     const [studentPh, setStudentPh] = useState('')
//     const [studentImage, setStudentImage] = useState('')
//     // Error States
//     const [studentNameError, setStudentNameError] = useState('')
//     const [bloodGroupError, setBloodGroupError] = useState('')
//     const [fatherNameError, setFatherNameError] = useState('')
//     const [motherNameError, setMotherNameError] = useState('')
//     const [parentNoError, setParentNoError] = useState('')
//     const [studentEmailError, setStudentEmailError] = useState('')
//     const [parentEmailError, setParentEmailError] = useState('')
//     const [fatherOccupationError, setFatherOccupationError] = useState('')
//     const [motherOccupationError, setMotherOccupationError] = useState('')
//     const [classNoError, setClassNoError] = useState('')
//     const [sectionError, setSectionError] = useState('')
//     const [studentDOBError, setstudentDOBError] = useState('')
//     const [genderError, setGenderError] = useState('')
//     const [studentAddressError, setStudentAddressError] = useState('')
//     const [emergencyNoError, setEmergencyNoError] = useState('')
//     const [studentPhError, setStudentPhError] = useState('')
//     const [studentImageError, setStudentImageError] = useState('')
//     //Handle Data States
//     const [Indexx, setIndexx] = useState();
//     const [allClassData, setAllClassData] = useState([]);

//     //UseEffect Call
//     useEffect(() => {
//         getAllClassData();
//     }, [token])

//     // All API Functions
//     const getAllClassData = async () => {
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                     toast.success(response?.data?.message);
//                 }
//             }
//             else {
//                 toast.error(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const AddNewStudent = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("studentName", studentName);
//             formData.append("bloodGroup", bloodGroup);
//             formData.append("fatherName", fatherName);
//             formData.append("motherName", motherName);
//             formData.append("parentNo", parentNo);
//             formData.append("studentEmail", studentEmail);
//             formData.append("parentEmail", parentEmail);
//             formData.append("fatherOccupation", fatherOccupation);
//             formData.append("motherOccupation", motherOccupation);
//             formData.append("classNo", classNo);
//             formData.append("section", section);
//             formData.append("studentPass", studentPass);
//             formData.append("studentDOB", studentDOB);
//             formData.append("gender", gender);
//             formData.append("studentAddress", studentAddress);
//             formData.append("emergencyNo", emergencyNo);
//             formData.append("studentPh", studentPh);
//             formData.append("studentImage", studentImage);

//             var response = await addNewStudentApi(formData);
//             console.log(response, 'res')
//             if (response?.status === 200) {
//                 console.log(response?.status, '200')
//                 if (response?.data?.status === 'success') {
//                     toast.success(response?.data?.message)
//                     setTimeout(() => {
//                         navigate('/allStudent');
//                     }, 700);
//                 }
//             }
//             else {
//                 toast.error(response?.data?.message);
//             }
//         }
//         catch (error) {

//         }
//     }

//     const handleStudentNameChange = (value) => {
//         setStudentName(value);
//         setStudentNameError(validateName(value))
//     }

//     const handleBloodGroupChange = (value) => {
//         setBloodGroup(value);
//         setBloodGroupError('')
//     }

//     const handleFatherNameChange = (value) => {
//         setFatherName(value);
//         setFatherNameError(validateName(value))
//     }

//     const handleMotherNameChange = (value) => {
//         setMotherName(value);
//         setMotherNameError(validateName(value))
//     }

//     const handleParentPhoneChange = (value) => {
//         setParentNo(value);
//         setParentNoError(validatePhone(value))
//     }

//     const handleStudentPhoneChange = (value) => {
//         setStudentPh(value);
//         setStudentPhError(validatePhone(value))
//     }

//     const handleStudentEmailChange = (value) => {
//         setStudentEmail(value);
//         setStudentEmailError(validateEmail(value))
//     }

//     const handleParentEmailChange = (value) => {
//         setParentEmail(value);
//         setParentEmailError(validateEmail(value))
//     }

//     const handleFatherOccupChange = (value) => {
//         setFatherOccupation(value);
//         setFatherOccupationError('')
//     }

//     const handleMotherOccupChange = (value) => {
//         setMotherOccupation(value);
//         setMotherOccupationError('')
//     }

//     const handleSectionChange = (value) => {
//         setSection(value);
//         setSectionError('')
//     }


//     const handleBirthdayChange = (value) => {
//         setstudentDOB(value);
//         setstudentDOBError('')
//     }

//     const handleGenderChange = (value) => {
//         setGender(value);
//         setGenderError('')
//     }

//     const handleAddressChange = (value) => {
//         setStudentAddress(value);
//         setStudentAddressError(validateTextFields(value))
//     }

//     const handleEmergencyNoChange = (value) => {
//         setEmergencyNo(value);
//         setEmergencyNoError(validatePhone(value))
//     }

//     const handleStudentImageChange = (value) => {
//         setStudentImage(value[0]);
//         setStudentImageError('')
//     }

//     const nameRegex = /^[A-Za-z\s]+$/;
//     const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//     const PhoneRegex = /^[6-9]\d{9}$/;
//     const textAlphaRegex = /^[A-Za-z0-9\s]+$/;
//     const PasswordRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;

//     const validateName = (value) => {
//         if (!value.trim()) {
//             return '*Name is required';
//         } else if (!nameRegex.test(value)) {
//             return 'Invalid characters !!';
//         }
//         return '';
//     };

//     const validateEmail = (value) => {
//         if (!value.trim()) {
//             return '*Email is required';
//         } else if (!emailRegex.test(value)) {
//             return 'Invalid email format !!';
//         }
//         return '';
//     };

//     const validatePhone = (value) => {
//         if (!value.trim()) {
//             return '*Phone is required';
//         } else if (!PhoneRegex.test(value)) {
//             return 'Invalid phone format !!';
//         }
//         return '';
//     };

//     const validateTextFields = (value) => {
//         if (!value.trim()) {
//             return '*This Field is required';
//         } else if (!textAlphaRegex.test(value)) {
//             return 'Invalid characters in name !!';
//         }
//         return '';
//     };

//     const validateFields = () => {
//         let isValid = true;

//         if (!studentName) {
//             setStudentNameError('* Student Name is required');
//             isValid = false;
//         } else if (!nameRegex.test(studentName)) {
//             return 'Invalid characters !!';
//         } else {
//             setStudentNameError('');
//         }

//         if (!studentAddress) {
//             setStudentAddressError('* Student Address is required');
//             isValid = false;
//         } else if (!textAlphaRegex.test(studentAddress)) {
//             return 'Invalid characters in name !!';
//         } else {
//             setStudentAddressError('');
//         }

//         if (!bloodGroup) {
//             setBloodGroupError('* Blood Group is required');
//             isValid = false;
//         } else {
//             setBloodGroupError('');
//         }

//         if (!fatherName) {
//             setFatherNameError('* Father Name ID is required');
//             isValid = false;
//         } else if (!nameRegex.test(fatherName)) {
//             return 'Invalid characters !!';
//         } else {
//             setFatherNameError('');
//         }

//         if (!motherName) {
//             setMotherNameError('* Mother Name is required');
//             isValid = false;
//         } else if (!nameRegex.test(motherName)) {
//             return 'Invalid characters !!';
//         } else {
//             setMotherNameError('');
//         }

//         if (!parentNo) {
//             setParentNoError('* Parents Contact is required');
//             isValid = false;
//         } else if (!PhoneRegex.test(parentNo)) {
//             return 'Invalid Password format !!';
//         } else {
//             setParentNoError('');
//         }

//         if (!studentEmail) {
//             setStudentEmailError('* Student Email is required');
//             isValid = false;
//         } else if (!emailRegex.test(studentEmail)) {
//             return 'Invalid email format !!';
//         } else {
//             setStudentEmailError('');
//         }

//         if (!parentEmail) {
//             setParentEmailError('* Parents Email is required');
//             isValid = false;
//         } else if (!emailRegex.test(parentEmail)) {
//             return 'Invalid email format !!';
//         } else {
//             setParentEmailError('');
//         }

//         if (!fatherOccupation) {
//             setFatherOccupationError('* Father Occupation is required');
//             isValid = false;
//         } else {
//             setFatherOccupationError('');
//         }

//         if (!motherOccupation) {
//             setMotherOccupationError('* Mother Occupation is required');
//             isValid = false;
//         } else {
//             setMotherOccupationError('');
//         }

//         if (!classNo) {
//             setClassNoError('* Class No is required');
//             isValid = false;
//         } else {
//             setClassNoError('');
//         }

//         if (!section) {
//             setSectionError('* Section is required');
//             isValid = false;
//         } else {
//             setSectionError('');
//         }

//         if (!studentDOB) {
//             setstudentDOBError('* Student DOB is required');
//             isValid = false;
//         } else {
//             setstudentDOBError('');
//         }

//         if (!gender) {
//             setGenderError('* Gender is required');
//             isValid = false;
//         } else {
//             setGenderError('');
//         }

//         if (!emergencyNo) {
//             setEmergencyNoError('* Emergenecy No. is required');
//             isValid = false;
//         } else if (!PhoneRegex.test(emergencyNo)) {
//             return 'Invalid Phone No format !!';
//         } else {
//             setEmergencyNoError('');
//         }

//         if (!studentImage) {
//             setStudentImageError('* Student Image is required');
//             isValid = false;
//         } else {
//             setStudentImageError('');
//         }

//         return isValid;
//     };

//     //handle class and section unction
//     const handleChange = (e) => {
//         const value = e.target.value;
//         const [val1, val2] = value.split(',');
//         setIndexx(val1);
//         setClassNo(val2);
//     }

//     return (
//         <>
//             <Container className='hideScrollBar p-3'>
//                 <div className="container-fluid">
//                     <form className="row g-3 h-100 overflow-scroll">
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Name*</label>
//                             <input type="text" className={`form-control font14 ${studentNameError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Name" onChange={(e) => handleStudentNameChange(e.target.value)} />
//                             <span className='text-danger'>{studentNameError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Blood Group*</label>
//                             <select className={`form-select font14 ${bloodGroupError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleBloodGroupChange(e.target.value)}>
//                                 <option >--- Choose ---</option>
//                                 <option value='AB+'>AB+</option>
//                                 <option value='A+'>A+</option>
//                                 <option value='B+'>B+</option>
//                                 <option value='O+'>O+</option>
//                             </select>
//                             <span className='text-danger'>{bloodGroupError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Father Name*</label>
//                             <input type="text" className={`form-control font14 ${fatherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Father Name" onChange={(e) => handleFatherNameChange(e.target.value)} />
//                             <span className='text-danger'>{fatherNameError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Mother Name*</label>
//                             <input type="text" className={`form-control font14 ${motherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Mother Name" onChange={(e) => handleMotherNameChange(e.target.value)} />
//                             <span className='text-danger'>{motherNameError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Parent Contact Details*</label>
//                             <input type="text" className={`form-control font14 ${parentNoError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Parent Contact Number" onChange={(e) => handleParentPhoneChange(e.target.value)} />
//                             <span className='text-danger'>{parentNoError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Student Contact Details*</label>
//                             <input type="text" className={`form-control font14 ${studentPhError ? 'border-1 border-danger' : ''}`} id="validationDefault01" placeholder="Enter Parent Contact Number" onChange={(e) => handleStudentPhoneChange(e.target.value)} />
//                             <span className='text-danger'>{studentPhError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Student Email*</label>
//                             <input type="text" className={`form-control font14 ${studentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Student Email" onChange={(e) => handleStudentEmailChange(e.target.value)} />
//                             <span className='text-danger'>{studentEmailError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Parent Email*</label>
//                             <input type="text" className={`form-control font14 ${parentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Enter Parent Email" onChange={(e) => handleParentEmailChange(e.target.value)} />
//                             <span className='text-danger'>{parentEmailError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Father Occupation*</label>
//                             <select className={`form-select font14 ${fatherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleFatherOccupChange(e.target.value)}>
//                                 <option >--- Choose ---</option>
//                                 <option value='Private'>Private</option>
//                                 <option value='Government'>Government</option>
//                             </select>
//                             <span className='text-danger'>{fatherOccupationError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Mother Occupation*</label>
//                             <select className={`form-select font14 ${motherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleMotherOccupChange(e.target.value)}>
//                                 <option >--- Choose ---</option>
//                                 <option value='House Wife'>House Wife</option>
//                                 <option value='Working'>Working</option>
//                             </select>
//                             <span className='text-danger'>{motherOccupationError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Class*</label>
//                             <select className={`form-select font14 ${classNoError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleChange}>
//                                 <option >--- Choose ---</option>
//                                 {allClassData?.map((option, index) => (
//                                     <option key={option.classId} value={`${index}, ${option?.classNo}`}>
//                                         {option.classNo}
//                                     </option>
//                                 ))}
//                             </select>
//                             <span className='text-danger'>{classNoError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Section*</label>
//                             <select className={`form-select font14 ${sectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleSectionChange(e.target.value)}>
//                                 <option >--- Choose ---</option>
//                                 {allClassData[Indexx]?.section.map((option) => (
//                                     <option key={option.classSecId} value={option?.sectionName}>
//                                         {option.sectionName}
//                                     </option>
//                                 ))}
//                             </select>
//                             <span className='text-danger'>{sectionError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Birthday*</label>
//                             <input type="date" className={`form-control font14  ${studentDOBError ? 'border-1 border-danger' : ''} `} id="validationDefault02" onChange={(e) => handleBirthdayChange(e.target.value)} />
//                             <span className='text-danger'>{studentDOBError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Gender*</label>
//                             <select className={`form-select font14 ${genderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleGenderChange(e.target.value)}>
//                                 <option >--- Choose ---</option>
//                                 <option value='Male'>Male</option>
//                                 <option value='Female'>Female</option>
//                             </select>
//                             <span className='text-danger'>{genderError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault01" className="form-label font14">Address*</label>
//                             <input type="text" className={`form-control font14  ${studentAddressError ? 'border-1 border-danger' : ''} `} id="validationDefault01" placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
//                             <span className='text-danger'>{studentAddressError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Emergency Contact Details*</label>
//                             <input type="text" className={`form-control font14  ${emergencyNoError ? 'border-1 border-danger' : ''} `} id="validationDefault02" placeholder="Enter School Info" onChange={(e) => handleEmergencyNoChange(e.target.value)} />
//                             <span className='text-danger'>{emergencyNoError}</span>
//                         </div>
//                         <div className="col-md-6 col-sm-12 col-12">
//                             <label htmlFor="validationDefault02" className="form-label font14">Photo*</label>
//                             <input type="file" className={`form-control font14  ${studentImageError ? 'border-1 border-danger' : ''} `} id="validationDefault02" placeholder="" onChange={(e) => handleStudentImageChange(e.target.files)} />
//                             <span className='text-danger'>{studentImageError}</span>
//                         </div>
//                     </form>
//                     <div className="row p-5">
//                         <div className="col-md-6 col-sm-6 col-6 text-end">
//                             <button className='btn AddBtnn font16 text-white' onClick={AddNewStudent}>+ Add Student</button>
//                         </div>
//                         <div className="col-md-6 col-sm-6 col-6 text-start">
//                             <button className='btn CancelBtnn font16'>Cancel</button>
//                         </div>
//                     </div>
//                     <Toaster />
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default SingleStudentAdmission



