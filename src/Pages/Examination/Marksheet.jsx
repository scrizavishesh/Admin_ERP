import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getAllMarksheetDataAPI, getExamCategoryDataApi } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';

const Container = styled.div`

.modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
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

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;
const Marksheet = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [MarksheetData, setMarksheetData] = useState([]);
    const [SearchBtn, setSearchBtn] = useState(true);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Pagination

    const [indexxx, setIndexxx] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [examCategorySelect, setExamCategorySelect] = useState('');

    const [marksData, setMarksData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);

    useEffect(() => {
        getAllClassData();
        getAllMarksheet();
        getAllExamCategoryData();
    }, [token, pageNo]);



    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getAllClassData = async () => {
        try {
            setSearchBtn(false)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSearchBtn(true)
                    setAllClassData(response?.data?.classes);
                    toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const getAllExamCategoryData = async () => {
        try {
            const search = '';
            var response = await getExamCategoryDataApi(search, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setExamCategoryData(response?.data?.categories);
                    toast.success(response.data.message);
                    // setTotalItems(10)
                }
            }
            else {
                toast.error(response?.data?.msg);
            }
        }
        catch { }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setIndexxx(val1);
        setClassId(val2);
    }


    const getAllMarksheet = async () => {
        try {
            setloaderState(true);
            var response = await getAllMarksheetDataAPI(sectionId, classId, examCategorySelect, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSearchBtn(false)
                    setloaderState(false);
                    setMarksheetData(response?.data?.markSheet);
                    toast.success(response?.data?.msg)
                    setTotalItems(10);
                }
            }
            else {
                toast.error(response?.data?.msg)
            }
        }
        catch (error) {
            console.log('Error During Get Marksheet', error);
        }
    }

    const handleCancel = () => {
        setSearchBtn(true)
    }

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Exam Category</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Marksheet</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Marksheet</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form className="row g-3">
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                        <select className="form-select font14" aria-label="Default select example" onChange={handleChange}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option, index) => (
                                                <option key={option.classId} value={`${index}, ${option?.classId}, ${option.classNo}`}>
                                                    {option.classNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                        <select className="form-select font14" aria-label="Default select example" onChange={(e) => setSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData[indexxx]?.section?.map(option => (
                                                <option key={option.classSecId} value={option?.classSecId} >
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Exam Category</label>
                                        <select className="form-select font14" aria-label="Default select example" onChange={(e) => setExamCategorySelect(e.target.value)}>
                                            <option defaultValue>Select a Exam Category</option>
                                            {ExamCategoryData?.map((option) => (
                                                <option key={option.categoryId} value={option?.examCategoryName}>
                                                    {option.examCategoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button type='button' className='btn updateButtons text-white' onClick={getAllMarksheet}>Search</button>
                                        <button type='button' className='btn cancelButtons ms-3' onClick={handleCancel}>Cancel</button>
                                    </p>
                                </form>
                                <div className="row">
                                    {SearchBtn
                                        ?
                                        <div className="d-flex justify-content-center p-5">
                                            <img src="./images/search.svg" alt="" className='img-fluid' />
                                        </div>
                                        :
                                        <>
                                            <div className='d-flex col-3'>
                                                <select className="form-select font14 " aria-label="Default select example" onChange={(e) => setExamCategorySelect(e.target.value)}>
                                                    <option value='' disabled selected>Select View Mode</option>
                                                    <option value=''>percent</option>
                                                    <option value=''>grade</option>
                                                    <option value=''>percent-grade</option>
                                                </select>
                                            </div>
                                            <div className="overflow-scroll cardradius bg-white p-3">
                                                <table className="table align-middle table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className='font14'>#</th>
                                                            <th className='font14'>Marksheet title</th>
                                                            <th className='font14'>Math</th>
                                                            <th className='font14'>English</th>
                                                            <th className='font14'>Drawing</th>
                                                            <th className='font14'>Hindi</th>
                                                            <th className='font14'>G.Sc</th>
                                                            <th className='font14'>S.Sc</th>
                                                            <th className='font14'>Computer</th>
                                                            <th className='font14'>Biology</th>
                                                            <th className='font14'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {MarksheetData.map((item, index) => (
                                                            <tr key={item.id} className='my-bg-color align-middle'>
                                                                <th className='greyText font14'><h3>{index + 1}</h3></th>
                                                                <td className='greyText font14'><h3>{item.studentName}</h3></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='greyText font14'></td>
                                                                <td className='text-start'>
                                                                    <div className="dropdown dropdownbtn">
                                                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <span>Action</span>
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getDriverDataById(item.driverId)}>
                                                                                    Edit
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.driverId)}>
                                                                                    Delete
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
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
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Marksheet