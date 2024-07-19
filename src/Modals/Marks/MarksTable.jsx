import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { AddUpdateMarksApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    
    .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyBorder);
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }
    
    .creamBg{
        border: 1px dashed var(--tableTopHeadingBorder);
        background-color: var(--tableTopHeadingBg);
    }

    .creamBgtext{
        color: var(--tableTopHeadText);
    }

    .tableHeading{
        background-color: var(--tableheadingbg) !important;
    }

    .heightOfTable{
        height: 37vh ;
        overflow: scroll;
    }

    .heightOfTable::-webkit-scrollbar {
        display: none;
    }


`;

const MarksTable = ({ marksData, className, sectionName, subjectName, sessionSelect, examCategorySelect }) => {

    const [Marks, setMarks] = useState('');
    const [Comments, setComments] = useState('');
    const [ExamCategory, setExamCategory] = useState('');
    const [ClassId, setClassId] = useState('');
    const [SectionId, setSectionId] = useState('');
    const [SubjectId, setSubjectId] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [SessionName, setSessionName] = useState('');


    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Pagination     , pageNo, pageSize

    useEffect(() => {
        setMarksUpdateData(marksData)
    }, [marksData, pageNo])

    const [MarksUpdateData, setMarksUpdateData] = useState([{
        gainMarks: '',
        comments: ''
    }])



    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    const handleCheckboxChange = async (i, e) => {
        const value = [...MarksUpdateData];
        value[i][e.target.name] = e.target.value;
        setMarksUpdateData(value);
    };


    const SaveOrUpdateMarksData = async (markId, examCategory, classId, sectionId, subjectId, studentId, sessionName) => {
        setExamCategory(examCategory);
        setClassId(classId);
        setSectionId(sectionId);
        setSubjectId(subjectId);
        setStudentId(studentId);
        setSessionName(sessionName);
        try {
            console.log('first')
            const formData = new FormData();
            formData.append('markId', markId)
            formData.append('categoryName', examCategory)
            formData.append('classId', classId)
            formData.append('sectionId', sectionId)
            formData.append('subjectId', subjectId)
            formData.append('studentId', studentId)
            formData.append('sessionName', sessionName)
            formData.append('marks', Marks)
            formData.append('comments', Comments)

            console.log('2nd')
            var response = await AddUpdateMarksApi(formData);
            console.log(response, '3rd')
            if (response?.status === 200) {
                console.log('4th')
                if (response?.data?.status === 'success') {
                    console.log(response, 'res after success');
                    toast.success(response?.data?.msg)
                }
            }
        }
        catch {

        }
    }


    return (
        <>
            <Container>
                <div className="container-fluid pt-3">
                    <div className="row creamBg p-3 mb-4">
                        <div className="col-md-2 col-sm-1 col-12"></div>
                        <div className="col-md-8 col-sm-10 col-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-12 p-0">
                                            <span className='creamBgtext font14'>Exam </span><span className='text-black font14'>- {examCategorySelect}</span>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-12 p-0">
                                            <span className='creamBgtext font14'>Class </span><span className='text-black font14'>- {className}</span>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-12 p-0">
                                            <span className='creamBgtext font14'>Section </span><span className='text-black font14'>- {sectionName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-12 p-0">
                                            <span className='creamBgtext font14'>Subject </span><span className='text-black font14'>- {subjectName}</span>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-12 p-0">
                                            <span className='creamBgtext font14'>Session </span><span className='text-black font14'>- {sessionSelect}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-1 col-12"></div>
                    </div>
                    <div className="overflow-scroll">
                        <table className="table align-middle table-striped">
                            <thead>
                                <tr>
                                    <th className='tableHeading text-center'><span className='font16'>#</span></th>
                                    <th className='tableHeading '><span className='font16'>Student Name</span></th>
                                    <th className='tableHeading '><span className='font16'>Mark</span></th>
                                    <th className='tableHeading '><span className='font16'>Grade Point</span></th>
                                    <th className='tableHeading '><span className='font16'>Comment</span></th>
                                    <th className='tableHeading text-center'><span className='font16'>Action</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                                {MarksUpdateData.map((item, index) => (
                                    <tr>
                                        <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                        <td className='greyText'>
                                            <span className='font14 align-self-center' name={item?.studentName}>{item?.studentName}</span>
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.gainMarks} name='gainMarks' onChange={(e) => { setMarks(e.target.value), handleCheckboxChange(index, e) }} />
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.gradePoints} name={item?.gradePoints} disabled />
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.comments} name='comments' onChange={(e) => { setComments(e.target.value), handleCheckboxChange(index, e) }} />
                                        </td>
                                        <td className='text-center'>
                                            <button className='btn CorrectSignButtons'><Icon icon="charm:circle-tick" width="1.5em" height="1.5em" style={{ color: 'white' }} onClick={() => { SaveOrUpdateMarksData(item?.markId, item?.examCategory, item?.classId, item?.sectionId, item?.subjectId, item?.studentId, item?.sessionName) }} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex">
                            <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                            <div className="ms-auto">
                                <ReactPaginate
                                    previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                    nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                    breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                    onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                />
                            </div>
                        </div>

                    </div>
                    {/* <div className="heightOfTable">
                        
                    </div> */}
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default MarksTable