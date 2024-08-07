

import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getAllClassApi, getAllSectionByClassApi, getStudentDataByIdApi, getStudentDataApi, deleteStudentApi, updateStudentApi } from '../../Utils/Apis';
import ViewStudentDetails from '../../Modals/Student/ViewStudentDetails';
import EditStudentDetails from '../../Modals/Student/EditStudentDetails';
import DataLoader from '../../Layouts/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
  height: 90vh;
  overflow : scroll;

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
  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState)
  }

  .form-control, .form-select{
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .formdltcheck:checked, .formdltcheck:focus{
    background-color: #B50000;
    border-color: #B50000;
    box-shadow: none !important;
  }

  .formEditSpecFeatcheck:checked, .formEditSpecFeatcheck:focus{
    background-color: #00A67E;
    border-color: #00A67E;
    box-shadow: none !important;
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

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .ExportBtns{
    border-radius: 3px;
    border: 1.5px solid var(--fontControlBorder);
  }

  .contbtn{
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

`;


const AllStudents = () => {

  const token = localStorage.getItem('token');

  const [abc, setAbc] = useState('');

  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [studentData, setStudentData] = useState([]);

  const [searchBySection, setSearchBySection] = useState('')
  const [searchByKey, setSearchByKey] = useState('')

  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);

  const [DeleteWarning, setDeleteWarning] = useState(true);

  const [refreshPage, setRefreshPage] = useState(false);
  const [refreshDelete, setRefreshDelete] = useState(false);
  const [refreshUpdate, setRefreshUpdate] = useState(false);
  const [studentIdData, setStudentIdData] = useState('');


  const [ClassIndex, setClassIndex] = useState('');
  const [ClassIdValue, setClassIdValue] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [deleteStudentIdData, setDeleteStudentIdData] = useState(false);
  const [studentGetId, setStudentGetId] = useState('');

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pagination

  useEffect(() => {
    getAllStudentData();
    getAllClassData();
  }, [token, ClassIdValue, searchBySection, refreshDelete, refreshUpdate, refreshPage, pageNo]);


  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllStudentData = async () => {
    try {
      setloaderState(true);
      const page = 2;
      const pageS = 5;
      var response = await getStudentDataApi(ClassIdValue, searchBySection, searchByKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setTimeout(() => {
            setloaderState(false);
          }, 100);
          setStudentData(response?.data?.students);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);
          toast.success(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };




  const getAllClassData = async () => {
    try {
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllClassData(response?.data?.classes);
          toast.success(response?.data?.message);
        }
      }
      else {
        toast.error(response?.data?.message);
      }
    }
    catch {

    }
  }

  const PageRefreshOnDelete = () => {
    setDeleteWarning(!DeleteWarning);
    setRefreshDelete(!refreshDelete);
  }


  const handleChange = (e) => {
    const value = e.target.value;
    const [val1, val2] = value.split(',');
    setClassIndex(val1);
    setClassIdValue(val2);
  }

  const DeleteStudentIdData = async (id) => {
    if (isChecked) {
      try {
        var response = await deleteStudentApi(id);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.message)
          }
        }
        else {
          toast.error(response?.error);
        }
      }
      catch (error) {
      }
    }
  }

  return (
    <Container>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xl-3 col-md-8 col-sm-12 flex-frow-1 ps-0">
            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Admissions</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Students</li>
              </ol>
            </nav>
            <p className='font16 ps-0 fontWeight500'>Students List</p>
          </div>
          <div className="col-xl-9 col-md-12 col-sm-12 pe-0">
            <div className="row gap-sm-0 gap-3 justify-content-sm-none justify-content-between">
              <div className="col-md-4 col-sm-4 col-5 text-end ps-0 align-self-center">
                <div className="d-flex">
                  <small className='greyText font14 me-3 align-self-center'>Class</small>
                  <select className='form-select font14' aria-label="Default select example" onChange={handleChange}>
                    <option value=''>--- Choose ---</option>
                    {allClassData?.map((option, index) => (
                      <option key={option.classId} value={`${index}, ${option?.classNo}`}>
                        {option.classNo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-5 text-end ps-0 align-self-center">
                <div className="d-flex">
                  <small className='greyText font14 me-3 align-self-center'>Section</small>
                  <select className='form-select font14' aria-label="Default select example" onChange={(e) => setSearchBySection(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    {allClassData[ClassIndex]?.section?.map(option => (
                      <option key={option.classSecId} value={option.sectionName}>
                        {option.sectionName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-12">
                <form className="d-flex" role="search">
                  <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                  <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllStudentData}>Search</span></button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="overflow-scroll cardradius bg-white p-3">
            <table className="table align-middle table-striped">
              <thead>
                <tr>
                  <th><h2>#</h2></th>
                  <th><h2>Student Id</h2></th>
                  <th><h2>Name</h2></th>
                  <th><h2>Parents Name</h2></th>
                  <th><h2>Address</h2></th>
                  <th><h2>Phone</h2></th>
                  <th><h2>Email</h2></th>
                  <th><h2>Action</h2></th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((item, index) => (
                  <tr key={item.id} className='my-bg-color align-middle'>
                    <th className='greyText'><h3>{index + 1}</h3></th>
                    <td className='greyText'><h3>{item.studentId}</h3></td>
                    <td className='greyText'><h3>{item.studentName}</h3></td>
                    <td className='greyText'><h3>{item.fatherName}</h3></td>
                    <td className='greyText'><h3>{item.address}</h3></td>
                    <td className='greyText'><h3>{item.studentPhone}</h3></td>
                    <td className='greyText'><h3>{item.studentEmail}</h3></td>
                    <td>
                      <div className="dropdown dropdownbtn">
                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span>Action</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => setStudentGetId(item.studentId)}>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#view_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => setStudentGetId(item.studentId)}>
                              View Details
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteStudentIdData(item.studentId)}>
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
        </div>
      </div>

      <Toaster />


      {/* ***********************************************************************************************************************************************************************************/}
      {/* ***********************************************************************************************************************************************************************************/}



      <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header border-bottom border-2 p-1">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Student Edit</h2>
        </div>
        <div className="offcanvas-body p-0">
          <EditStudentDetails studentGetId={studentGetId} onReload={getAllStudentData} abc={setAbc} />
        </div>
      </div>



      {/* ***********************************************************************************************************************************************************************************/}
      {/* ***********************************************************************************************************************************************************************************/}



      <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="view_staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header modalHighborder p-1">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">View Profile</h2>
        </div>
        <div className="offcanvas-body p-0 modalLightBorder">
          <ViewStudentDetails studentGetId={studentGetId} />
        </div>
      </div>



      {/* ***********************************************************************************************************************************************************************************/}
      {/* ***********************************************************************************************************************************************************************************/}




      <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header ps-0 modalHighborder p-1">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <span className="offcanvas-title" id="staticBackdropLabel">Student List</span>
        </div>
        <div className="offcanvas-body p-0">
          <div>
            {DeleteWarning
              ?
              <>
                <div className=''>
                  <p className='modalLightBorder p-2'>Student List</p>
                  <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                  <p className='text-center warningHeading'>Are you Sure?</p>
                  <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                  <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                  <p className='text-center p-3'>
                    <button className='btn deleteButtons text-white' onClick={() => DeleteStudentIdData(deleteStudentIdData)}>Delete</button>
                    <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                  </p>
                </div>
              </>
              :
              <>
                <div >
                  <p className='border-bottom p-3'>Student List</p>
                  <div className="">
                    <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                    <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                      <p className='warningHeading'>Successful Deleted</p>
                      <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                    </div>
                    <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnDelete}>Continue</button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>



      {/* ***********************************************************************************************************************************************************************************/}
      {/* ***********************************************************************************************************************************************************************************/}



    </Container>
  )
}

export default AllStudents




