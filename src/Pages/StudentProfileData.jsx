import React, { useEffect, useState } from 'react'
import { getStudentDataByIdApi } from '../Utils/Apis';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    
`;

const StudentProfileData = ({StudentId}) => {

    const id = StudentId;

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [admissionNo, setAdmissionNo] = useState('')
    const [admissionDate, setAdmissionDate] = useState('')
    const [category, setCategory] = useState('')
    const [religion, setReligion] = useState('')
    const [caste, setCaste] = useState('')
    const [medicalHistory, setMedicalHistory] = useState('')
    const [note, setNote] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [fatherPhone, setFatherPhone] = useState('')
    const [motherPhone, setMotherPhone] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [studentName, setStudentName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [parentNo, setParentNo] = useState('')
    const [studentEmail, setStudentEmail] = useState('')
    const [parentEmail, setParentEmail] = useState('')
    const [fatherOccupation, setFatherOccupation] = useState('')
    const [motherOccupation, setMotherOccupation] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [section, setSection] = useState('')
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentDOB, setstudentDOB] = useState()
    const [gender, setGender] = useState('')
    const [studentAddress, setStudentAddress] = useState('')
    const [emergencyNo, setEmergencyNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')

    useEffect(() => {
        getStudentDataById();
    }, [token,StudentId])

    const getStudentDataById = async () => {
        try {
            setloaderState(true);
            console.log(id)
            var response = await getStudentDataByIdApi(id);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentName(response?.data?.student?.studentName);
                    setStudentId(response?.data?.student?.studentId);
                    setBloodGroup(response?.data?.student?.bloodGroup);
                    setFatherName(response?.data?.student?.fatherName);
                    setMotherName(response?.data?.student?.motherName);
                    setParentNo(response?.data?.student?.parentNo);
                    setStudentEmail(response?.data?.student?.studentEmail);
                    setParentEmail(response?.data?.student?.parentEmail);
                    setFatherOccupation(response?.data?.student?.fatherOccupation);
                    setMotherOccupation(response?.data?.student?.motherOccupation);
                    setClassNo(response?.data?.student?.classNo);
                    setSection(response?.data?.student?.classSection);
                    setstudentDOB(response?.data?.student?.dateOfBirth);
                    setGender(response?.data?.student?.studentGender);
                    setStudentAddress(response?.data?.student?.address);
                    setEmergencyNo(response?.data?.student?.emergencyNo);
                    setStudentPh(response?.data?.student?.studentPhone);
                    setCurrentAddress(response?.data?.student?.address);
                    setStudentImage(response?.data?.student?.studentImage);
                    toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 col-12">
                        <div className="row border cardradius2 p-2 mb-3">
                            <form>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Admission Date:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={admissionDate} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Date of Birth:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentDOB} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Category:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={category} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Mobile Number:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentPh} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Caste:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={caste} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Religion:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={religion} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Email:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentEmail} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Medical History:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={medicalHistory} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Note:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={note} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row border cardradius2 p-2 mb-3">
                            <h2 className='darkgreentext pt-2 pb-2 p-1'>Address</h2>
                            <form>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Current Address:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={currentAddress} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Permanent Address:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={currentAddress} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row border cardradius2 p-2 mb-3">
                            <h2 className='darkgreentext pt-2 pb-2 p-1'>Parent Guardian Detail</h2>
                            <form>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Father Name:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={fatherName} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Father Phone:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={fatherPhone} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Father Occupation:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={fatherOccupation} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Mother Name:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={motherName} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Mother Phone:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={motherPhone} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Mother Occupation:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={motherOccupation} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row border cardradius2 p-2 mb-3">
                            <h2 className='darkgreentext pt-2 pb-2 p-1'>Miscellaneous Details</h2>
                            <form>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Blood Group:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={bloodGroup} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Height:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={height} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label greyText font14 p-1">Weight:</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={weight} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </Container>
    )
}

export default StudentProfileData