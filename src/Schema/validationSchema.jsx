import * as Yup from 'yup';

export const editExamSchema = Yup.object({
    examCategory: Yup.string().required('Please select Exam Category'),
    classId: Yup.number().required('Please select Class Id'),
    subjectId: Yup.number().required('Please select Subject Id'),
    roomNo: Yup.number().required('Please select Room No'),
    examDate: Yup.date().required('Please select Exam Date'),
    StartingTime: Yup.string().required('Please select Start Time'),
    EndingTime: Yup.string().required('Please select End Time'),
    TotalMarks: Yup.string().matches(/^(10|[1-9][0-9]|[1-4][0-9]{2}|500)$/, 'Maximum marks an be 500'|| /^[A-Za-z\s]+$/, 'Invalid Characters').required('Please select Total Marks'),
})
