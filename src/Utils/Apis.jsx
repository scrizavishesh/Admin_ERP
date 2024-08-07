import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const forgetTooken = `Bearer ${localStorage.getItem('forgteToken')}`;
// const token = localStorage.getItem('token');

const LocalGirjeshIP= 'http://10.5.51.4:5000';
const Domain= 'http://auth.edu2all.in:5000';

// ******************************************************************************************************
                            // Login  //
// ******************************************************************************************************


export const loginApi = async(data) => {
    var res = await axios.post(`${Domain}/login/all`,data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const logoutApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/login/logout`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ******************************************************************************************************
                            // Forget Password  //
// ******************************************************************************************************


export const getOTPByMailApi = async(mail) => {
    var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const verifyOTPApi = async(OTP) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const setPassApi = async(newpass) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            // Dashboard  //
// ******************************************************************************************************




export const getDashDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getDashData`);

    if (res) {
        return res;
    }else{
       return [];
    }
}



// ******************************************************************************************************
                            // Student  //
// ******************************************************************************************************


export const getStudentDataApi = async(classNo, classSec, searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getAllScClSec?classNo=${classNo}&classSec=${classSec}&searchKey=${searchKey}&page=${pageNo}&size=${size}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}



export const getStudentDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getStudentById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const addNewStudentApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/regStudent`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateStudentApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/updateStudent/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const deleteStudentApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`192.168.20.109:5000/student/deleteByStId/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                            // Assign Student  //
// ******************************************************************************************************

export const getAssignStudentDataApi = async(searchKey, pageNo, pageSize) => {
    
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllAssignStudent?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const unAssignStudentApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/unAssignStudent`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const assignStudentApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/assignStudent`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Room  //
// ******************************************************************************************************

export const getRoomDataApi = async(searchKey, pageNo, pageSize) => {
    
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/room/getAllRoomBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

// ******************************************************************************************************
                                    // Vehicle  //
// ******************************************************************************************************

export const getVehicleDataApi = async(searchKey, pageNo, pageSize) => {
    
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllVehByScId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const AddNewVehicleApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/addVehicle`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteVehicleApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/vehicle/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



export const getVehicleDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getVehicleById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateVehicleDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/vehicle/updateVehicle/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Driver  //
// ******************************************************************************************************

export const getDriverDataApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getAllDriver?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getDriverCSVDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewDriverApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drivers/addDriver`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getDriverDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getDriverById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateDriverDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drivers/updateDriver/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteDriverApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drivers/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Route  //
// ******************************************************************************************************

export const getAllRouteApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getAllRoutByScId`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewRouteApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/route/addRoute`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getRouteCSVDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getRouteDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateRouteDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/route/updateById/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteRouteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/route/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Drop Point  //
// ******************************************************************************************************


export const addNewDropPointApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drop/addDrop`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getAllDropPointByVehicleApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllDropByVehicle?vehicleNo=${data}`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getAllDropPointApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllSch?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getDropPointCSVDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getDropPointDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateDropPointDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drop/editDrop/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteDropPointApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drop/deleteDrop/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Class  //
// ******************************************************************************************************



export const getAllClassApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/class/getAllClassBySchId`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Section  //
// ******************************************************************************************************



export const getAllSectionApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getAllSecByStudent`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getAllSectionByClassApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getByClassId?classNo=${data}`, );
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Subject  //
// ******************************************************************************************************


export const getAllSubjectApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectBySchId`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getAllSubjectByClassApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                        // Teacher By Subject  //
// ******************************************************************************************************



export const getTeacherBySubjectApi = async(id1,id2) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${id1}&subjectId=${id2}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

// ******************************************************************************************************
                                    // Session  //
// ******************************************************************************************************



export const getAllSessionDataAPI = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getAllSessionBySchId`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const updateSessionDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/editSession/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const activeSessionDataApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/activeSession/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const addNewSessionApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/session/addSession`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getSessionDataByIdAPI = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getSessionById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const updateSessionApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/editSession/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ******************************************************************************************************
                                    // Grade  //
// ******************************************************************************************************

export const getGradeDataApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/getAllCategory?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewGradeApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/grades/addGrade`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getGradeDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateGradeByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/grades/modify${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const deleteGradeApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/grades/delete/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                                    // ExamCategory  //
// ******************************************************************************************************

export const getExamCategoryDataApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_category/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewExamCategoryApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/exam_category/add`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getExamCategoryDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_category/getOne/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateExamCategoryDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/exam_category/modify/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const deleteExamCategoryApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/exam_category/delete/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}





// ******************************************************************************************************
                                    // Marksheet  //
// ******************************************************************************************************

export const getAllMarksheetDataAPI = async(sectionId, classId, categoryName) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/markSheet/search?sectionId=${sectionId}&classId=${classId}&categoryName=${categoryName}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}





// ******************************************************************************************************
                                    // SamplePaper  //
// ******************************************************************************************************

export const getSearhSamplePaperDataApi = async(id1, id2, id3, searchKey, pageNo , pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/search-paper?classId=${id1}&sectionId=${id2}&subjectId=${id3}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getDownloadSamplePaperDataApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/download-sample/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const deleteSamplePaperApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/samplePaper/delete/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addSamplePaperApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/samplePaper/create`, data);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateSamplePaperApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/samplePaper/update/${id}`, data);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Admin Account  //
// ******************************************************************************************************

export const AdminAccountApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/settings/updateAdmin`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getAdminDataAPI = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getAdminById`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getSamplePaperByIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/getById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                        // Assignment  //
// ******************************************************************************************************

export const getSearhAssignmentDataApi = async(id1, id2, id3, pageNo , pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/search-Assignment?classId=${id1}&sectionId=${id2}&subjectId=${id3}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getAssignmentByIdDataApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/getById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getAllSubmissionsByAssignmentIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/getAll/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getDownloadAssignmentDataApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/download-Assignment/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const deleteAssignmentApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/assignment/delete/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



export const addNewAssignmentAPI = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/assignment/create`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const EditNewAssignmentAPI = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/assignment/update/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Marks  //
// ******************************************************************************************************



export const getAllMarksApi = async(classId, sectionId, subjectId, sessionName, examCategory) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/all?classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}&sessionName=${sessionName}&examCategory=${examCategory}`, );
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const AddUpdateMarksApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/marks/assign`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Offline Exam  //
// ******************************************************************************************************



export const getAllOfflineExamApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getSearchOfflineExamApi = async(data ,data2) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/search-exam?classId=${data}&subjectId=${data2}`,);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const deleteOfflineExamApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/exam_details/delete/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getOfflineExamDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/getOne/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewOfflineExamApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/exam_details/register`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateOfflineExamApi = async (id,data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/exam_details/modify/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                                    // Subscription  //
// ******************************************************************************************************


export const getSubscriptionByIdApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subs/getBySchoolId`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateSubscriptionApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/upgradeSubs/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getAllPlansApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan`);
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                                    // School Data  //
// ******************************************************************************************************



export const getSchoolDataByIdAPI = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolByAdmin`, );
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateSchoolDataByIdAPI = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/editById`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                                    // Dashboard Data  //
// ******************************************************************************************************



export const getAllNoticeApi = async(searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?searchKey=${searchKey}`, );
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getAllEventsApi = async(searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?searchKey=${searchKey}`, );
    
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Fee Type  //
// ******************************************************************************************************


export const getAllFeeTypeApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewFeeTypeApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/type/addFeeType`, data );
    if (res) {
        return res;
    FeeType
        return [];
    }
}

export const getFeeTypeByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateFeeTypeByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/type/updateById/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteFeeTypeByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/type/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}




// ******************************************************************************************************
                                    // Fee Group  //
// ******************************************************************************************************


export const getAllFeeGroupApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewFeeGroupApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/group/addGroup`, data );
    if (res) {
        return res;
    FeeType
        return [];
    }
}

export const getFeeGroupByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateFeeGroupByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/group/updateFeeGroup/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteFeeGroupByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/group/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                                    // Fee Master  //
// ******************************************************************************************************


export const getAllFeeMasterApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewFeeMasterApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/add`, data );
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const addNewFeeApi = async (id,data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/feePay/updateById/${id}`, data );
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeByPaymentIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByPaymentId?paymentId=${id}` );
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeMasterByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getFeeMasterByGroupNameApi = async (groupName) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getByGroupName/${groupName}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateFeeMasterByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/update/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteFeeMasterByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteFeeMasterByGroupNameApi = async (name) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteByGroupName/${name}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Fee Discount  //
// ******************************************************************************************************


export const getAllFeeDiscountApi = async(searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const addNewFeeDiscountApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/discount/add`, data );
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeDiscountByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateFeeDiscountByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/discount/update/${id}`, data );
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const deleteFeeDiscountByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/discount/deleteById/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                                    // Collect Fees  //
// ******************************************************************************************************


export const getCollectedStudentsFeeApi = async(classId, classSectionId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByClassSec?classId=${classId}&classSectionId=${classSectionId}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const getCollectedStudentFeeByIdApi = async(studentId, size, page) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStId/${studentId}?size=${size}&page=${page}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}













//saqib code





// ########################## Human Resources API start ###########################

// post api 
export const PostApi = async(formData) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/role/addRole`,formData)
   
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// GetAll Api 
export const RolePermissionGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/role/getRoleBySch`)
   if(res) {
    return res;
   }
   else{
    return []
   }
}


//  Get All Api of special feature get from addon page in super admin panel
export const SpeFeaGetAllApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/fea/getFeaByRoleId`)
   // const res= await axios.get(`${Domain}/fea/getAllFeatures`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

 // delete Api 

 export const RolePermDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/role/delete/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Get by Id 

export const RolePerGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/role/getByRoleId/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Put Data Api 
export const RolePerPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/role/editById/${id}`,datares)
    // console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }



// ########################## Human Resources API end ########################### 



// ########################## Class API start ########################### 

// post Api 
export const ClassPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/class/addClass`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}

// GetAll Api 
export const ClassGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/class/getAllClassBySchId`)
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}
// delete Api 

export const ClassDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/class/deleteById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}



// Get By id 

export const ClassGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/class/getClassById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Put Data Api 
export const ClassPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/class/updateClassById/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// ########################## Class API end ########################### 


// ########################## Class Room API start ########################### 


// Post Api 

export const ClassRoomPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/room/addRoom`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}

// GetAll Api 
export const ClassRoomGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/room/getAllRoomBySchId`)
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Get By id 

export const ClassRoomGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/room/getRoomById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// delete Api 

export const classRoomDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/room/deleteById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Put Data Api 
export const ClassRoomPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/room/updateRoomById/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Class Room API end ########################### 





// ########################## Section API end ########################### 

// Post Api with Get all Api of class and Get all api of room

export const SectionPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/section/addSecInClass`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}

// NullGetAll Api from room page for room id

export const NullRoomGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/room/getAllNullRoom`)
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Sectionn Get All Api 
export const SectionRoomGetApi = async(searchKey) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/section/getAllSecBySchool?searchKey=${searchKey}`)

   if(res) {
    return res;
   }
   else{
    return []
   }
}


// Sectionn Delete Api 
export const SectionDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/section/deleteSection/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Get By id 

export const SectionGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/section/getBySectionId/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}


// Put Data Api 
export const SectionPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/section/updateSection/${id}`,datares)
    console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }
 

 // Section Get by class Id All Api 

export const SectionRoomByIdGetApi = async(Class) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/section/getByClassId?classId=${Class}`,)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// ########################## Section API end ########################### 





// ########################## Event  API start ########################### 

// Event post Api 
export const EventPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/events/addEvents`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}

// Event Get All Api 

export const EventGetAllApi = async(key) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/events/allEvents?searchKey=${key}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}


// Event Delete Api 
export const EventDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/events/delete/${id}`)   
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}


// Event get by id 
export const EventGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/events/findEvents/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}



// Event Put Data Api 
export const EventPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/events/modify/${id}`,datares)
    console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }
// ########################## Event API end ########################### 





// ########################## Notice API start ########################### 

// Event post Api 
export const NoticePostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/notice/addNotice`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}


// Event Get All Api 

export const NoticeGetAllApi = async(key) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/notice/allNotice?searchKey=${key}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Notice Delete Api 
export const NoticeDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/notice/delete/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Notice get by id 
export const NoticeGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/notice/findNotice/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Notice Put Data Api 
export const NoticePutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/notice/modify/${id}`,datares)
    console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }
// ########################## Notice API end ########################### 





// ########################## Holiday API start ########################### 

// Holiday post Api 
export const HolidayPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/holiday/addHoliday`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Holiday Get All Api 
export const HolidayGetAllApi = async(key) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/holiday/all?searchKey=${key}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Holiday Delete Api 
export const HolidayDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/holiday/delete/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Holiday get by id 
export const HolidayGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/holiday/find/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}


// Holiday Put Data Api 
export const HolidayPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/holiday/modify/${id}`,datares)
    console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }
// ########################## Holiday API end ########################### 






// ########################## Staff  API start ########################### 


// Staff  post Api 
export const StaffPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/otherStaff/addStaff`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }
   
}


// Teacher  Get All Api 
export const TeacherGetAllApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${id}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}


// Staff Delete Api 
export const StaffDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/otherStaff/deleteStaff/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Staff Get by user Id 

export const StaffGetById = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/otherStaff/getUser/${id}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}
// staff Put Data Api 
export const StaffPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/otherStaff/editStaff/${id}`,datares)
    // console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }

// ########################## Staff API end ########################### 







// ########################## Book manager list API start ########################### 

//  post Api 
export const BookManagerPostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/books/add`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }  
}

// Library  Get All Api 
export const BookManagerGetAllApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/books/allBooks`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

//  Delete Api 
export const BookManagerDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/books/delete/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
//  Get by user Id 

export const BookmanGetById = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/books/getBook/${id}`)
// console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// Book Manager Put Data Api 
export const BookManPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
    const res2= await axios.put(`${Domain}/books/modifyBook/${id}`,datares)
    // console.log('my-response-get-by-id', res2)
 
    if(res2) {
     return res2;
    }
    else{
     return []
    }
 }
// ########################## Book manager list API end ########################### 


// ########################## Book issue report API start ########################### 

//  post Api 
export const BookIssuePostApi = async(datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.post(`${Domain}/transaction/issue-book`,datares)
   if(res) {
    return res;
   }
   else{
    return []
   }  
}
 
//   Get All Api 
export const bookIssueGetAllApi = async(startDate,endDate) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/transaction/book-transactions?startDate=${startDate}&endDate=${endDate}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const IssueBookDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/transaction/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 
export const IssueBookGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/transaction/getOne/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

// Book Issue Put Data Api 
export const IssueBookPutApi = async(id,PuData) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/transaction/update/${id}`,PuData)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Book issue report API end ########################### 





// ########################## Student apsi start  ########################### 


// Student  Get All Api 
export const studentGetAllApi = async(searchKey,classNo,sectionName) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/student/getAllScClSec?searchKey=${searchKey}&classNo=${classNo}&classSec=${sectionName}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


// ########################## Student apsi  end ########################### 


// ########################## Online Course API start ########################### 

//  post Api 
export const OnlinePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/courses/add`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// Get All Api 
export const OnlineCourseGetAllApi = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/courses/getAllCourses`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
//  Delete Api 
export const OnlineDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/courses/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 
export const OnlineGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/courses/getCourses/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const OnlinePutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/courses/update/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Online Course API end ########################### 




// ########################## Human resources Leave API start ########################### 

//  post Api 
export const LeavePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/leaveType/create`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}


// Get All Api 
export const LeaveGetAllApi = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/leaveType/getAll`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const LeaveDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/leaveType/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 
export const LeaveGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/leaveType/get/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const LeavePutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/leaveType/edit/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}



// -----------------------------------------
// Assign leave Apis 

//  post Api 
export const AssignLeavePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/leaveUser/add`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
// Get All Api 
export const AssignLeaveGetAllApi = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/leaveUser/getUsers`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
// Delete api
export const LeaveAssignDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/leaveUser/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}
// Delete leave type api
export const LeaveAssignDeleteTypeApi = async(id, roleId) =>{
   // console.log('my leave type in apis page',datares)
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/leaveUser/deleteLeaveType/${id}?leaveType=${roleId}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}


//  Get by user Id 
export const AssignLeaveGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/leaveUser/getById/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


// -----------------------------------------
// leave status 

//  post Api 
export const LeaveStatusPostApi = async(id, datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/leave/acknowledge/${id}`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// Get All Api 
export const LeaveStatusGetAllApi = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/leave/new-applied`)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


// ########################## Human resources Leave API end ########################### 




// ########################## Subject API start ########################### 

//  post Api 
export const SubjectPostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/subject/addSubject`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// subject Get All Api 
export const SubjectGetAllApi = async(key, classIdForSearch) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getAllSubjectBySchId?searchKey=${key}&classNo=${classIdForSearch}`, )
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const SubjectDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/subject/deleteById/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 
export const SubjectGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getSubjectById/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


//  Put Data Api 
export const SubjectPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/subject/updateSubById/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Subject API end ########################### 




// ########################## Department API start ########################### 
//  post Api 
export const DepartmentPostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/departments/add`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// Department Get All Api 
export const DepartmentGetAllApi = async(key) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/departments/all?searchKey=${key}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const DepartmentDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/departments/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 
export const DepartmentGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/departments/getById/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const DepartmentPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/departments/modify/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Search by class id 

// Department Get All Api 
export const DepartmentSearchGetAllApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
// ########################## Department API end ########################### 



// ########################## Syllabus API Start ########################### 

//  post Api 
export const SyllabusPostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/syllabus/addSyllabus`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// this section api use for section by class id for section 
export const SyllabusSectionGetAllApi = async(classId) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/section/getByClassId?classId=${classId}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

// Get subject by class id in syllabus 
export const SubjectByClassIdInSyllabusGetAllApi = async(classId) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getAllSubByClassId/${classId}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


// Get all api syllabus 
export const SyllabusGetAllApi = async(key,classId,sectionId) =>{
   axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/syllabus/getAllSyllabus`)
  const res= await axios.get(`${Domain}/syllabus/getByClassSection?searchKey=${key}&classId=${classId}&classSecId=${sectionId}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const SyllabusDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/syllabus/deleteById/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

//  Get by user Id 

export const SyllbusGetById = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/syllabus/getSyllabusById/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const SyllabusPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/syllabus/updateById/${id}`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Download file apis 
export const SyllabusFileDownloadGetAllApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/syllabus/downloadSyllabus/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

// ########################## Syllabus API end ########################### 




// ########################## Academics API start ########################### 

// Class Routine 


// Get all teacher by sybject id api syllabus 
export const AllTeacherBySubjectId = async(classId,subjectId) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  post Api 
export const ClassRoitinePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
  const res= await axios.post(`${Domain}/routine/addRoutine`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
// get all api 
export const ClassRoutineGetAll = async(classNo,sectionName) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${sectionName}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

// get all api by search class and section 
export const ClassRoutineBySearchGetAll = async(classNo, section) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${section}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}




// Assign Subject and teacher start

//  post Api 
export const AssignTeaSubPostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/subject/setSubjectTeacher`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

// subject and teacher Get all api  
export const AssignGetAllApi = async(classId,subjectId) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
//  Delete Api 
export const AssignDeleteDeleteApi = async(subjectIdForDelete, staffIdForDelete) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/subject/removeSubjectTeacher?subjectId=${subjectIdForDelete}&teacherId=${staffIdForDelete}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

// Assign Subject and teacher end

// ########################## Academics API end ########################### 



// ########################## Daily attendace API start ########################### 

export const DailyAttendancehGetAll = async(sectionId, date) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/attendance/search-date?sectionId=${sectionId}&date=${date}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  post Api 
export const DailyAttendancePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/attendance/create`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
//  Put Data Api 
export const MyDailyAttendancePutApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/attendance/update`,datares)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

export const DailyAttendancehGetAllBymonth = async(sectionId2,month,year,search) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/attendance/search-month?sectionId=${sectionId2}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
// ########################## Daily attendace API end ########################### 

// ########################## Assign Class teacher APIs start ########################### 

// get all api by search class and section 
export const GeyAllTeacherLightWeightGetAll = async(classNo, section) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/otherStaff/getAllStaff-light`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  post Api 
export const AssignClassTreachPostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/section/assignClassTeacher`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
//  assign get all api
export const AssignClassTeacherGetAllApi = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/section/section-classTeacher-getAll`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}


//  Delete Api 
export const AssignDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/section/removeClassTeacher/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}
// Get by id
export const AssignClassTeacherGetByIdAllApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/section/sectionClassTeacherGetById/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const AssignClassTeacherPutApi = async(section, teacher) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/section/editClassTeacher?sectionId=${section}&staffId=${teacher}`)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Assign Class teacher APIs end ########################### 





// ########################## StaffAttendance APIs start ########################### 

export const StaffAttendanceGetAllApi = async(date,roleid) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/staffAttendance/search-date?roleId=${roleid}&date=${date}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
//  post Api 
export const TakeAttendancePostApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/staffAttendance/create`,datares)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
//  Put Data Api 
export const SatffAttendancePutApi = async(data) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/staffAttendance/update`, data)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

export const AttendanceGetAllBymonth = async(roleid,month,year,search) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/staffAttendance/search-month?roleId=${roleid}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
// ########################## StaffAttendance APIs end ########################### 




// ########################## Income category APIs start ########################### 

//  post Api 
export const IncomeCategoryPostApi = async(formData) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/account-category/create`,formData)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}


//  Income get all api
export const IncomeCategorygetAllApi = async(income) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/account-category/getAllByType?type=${income}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const IncomeCategoryDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/account-category/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}
// Get by id
export const IncomeCategoryGetByIdApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/account-category/getOne/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const IncomeCategoryPutApi = async(id,formData) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/account-category/modify/${id}`,formData)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// ########################## Income category APIs end ########################### 





// ########################## Expense category APIs start ########################### 
//  post Api 
export const ExpenseCategoryPostApi = async(formData) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/account-category/create`,formData)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}

//  Expense get all api
export const ExpenseCategorygetAllApi = async(expense) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/account-category/getAllByType?type=${expense}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const ExpenseCategoryDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/account-category/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}
// Get by id
export const ExpenseCategoryGetByIdApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/account-category/getOne/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const ExpenseCategoryPutApi = async(id,formData) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/account-category/modify/${id}`,formData)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// ########################## Expense category APIs end ########################### 


// ########################## Income APIs end ########################### 

//  post Api 
export const IncomePostApi = async(formData) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/income-expense/addTransaction`,formData)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
//  income get all api
export const IncomeAllApi = async(income ,startDate,endDate,categoryId) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/income-expense/getAllByType?type=${income}`)
//   ,startDate,endDate,categoryId
//   &categoryId=${categoryId}&startDate=${startDate}&endDate=${endDate}
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
//  Delete Api 
export const IncomeDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/income-expense/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

// Get by id
export const IncomeGetByIdApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/income-expense/getOne/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}
//  Put Data Api 
export const incomePutApi = async(id,formData) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/income-expense/modify/${id}`,formData)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }

}


// ########################## Income APIs end ########################### 




// ########################## Expense APIs start ########################### 

//  post Api 
export const ExpensePostApi = async(formData) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.post(`${Domain}/income-expense/addTransaction`,formData)
  if(res) {
   return res;
  }
  else{
   return []
  }  
}
//  income get all api
export const ExpenseAllApi = async(expense) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/income-expense/getAllByType?type=${expense}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Delete Api 
export const ExpenseDeleteApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.delete(`${Domain}/income-expense/delete/${id}`)
  if(res2) {
   return res2;
  }
  else{
   return []
  }
}

// Get by id
export const ExpenseGetByIdApi = async(id) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res= await axios.get(`${Domain}/income-expense/getOne/${id}`)
// console.log('my-response', res)
  if(res) {
   return res;
  }
  else{
   return []
  }
}

//  Put Data Api 
export const ExpensePutApi = async(id,formData) =>{
   
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/income-expense/modify/${id}`,formData)
   // console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }

}
// ########################## Expense APIs end ########################### 


