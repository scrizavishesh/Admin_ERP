import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getAllClassApi, getCollectedStudentsFeeApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

  .blueText{
    color: var(--blueTextColor);
  }

  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState)
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
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

  .form-select{
    color: var(--greyState);
    box-shadow: none;
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

  .greyText{
    color: var(--greyTextColor) !important;
  }
    
`;

const CollectFees = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('')
  const [searchButton, setSearchButton] = useState(false)

  const [allCollectFeesData, setAllCollectFeesData] = useState([]);
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);

  const [classId, setClassId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pagination

  const cancelSearch = () => {

  }

  useEffect(() => {
    getAllClassData();
    if(pageNo){
      getAllCollectFeesData();
    }
  }, [token, pageNo])


  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllCollectFeesData = async () => {
    try {
      setloaderState(true);
      var response = await getCollectedStudentsFeeApi(classId, sectionId);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setSearchButton(true);
          setloaderState(false);
          setAllCollectFeesData(response?.data?.feePaid);
          toast.success(response?.data?.message)
        }
        else {
          setSearchButton(false);
        }
      }
      else {
        setSearchButton(false);
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      setSearchButton(false);
      console.log(error)
    }
  }

  const getAllClassData = async () => {
    try {
      setloaderState(true);
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          setAllClassData(response?.data?.classes);
        }
        else{
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch {

    }
  }

  const handleClassChange = (val) => {
    const classIdVal = parseInt(val);
    setClassId(classIdVal);
    const selectedClass = allClassData.find(c => c.classId === classIdVal);

    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
    } else {
      setAllSectionData([]);
    }
  };

  return (
    <>
      <Container>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid p-4">
          <div className="row pb-3 gap-xl-0 gap-3">
            <div className="col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
              <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                  <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Collect Fees</li>
                </ol>
              </nav>
              <p className='font14 ps-0 fontWeight500'>Collect Fees List</p>
            </div>
            <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12 pe-0">
              <div className="row gap-sm-0 gap-3">

                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                      <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                        <span className='font14 textVerticalCenter'>
                          <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                          <span className='ms-1'>Export to CSV</span>
                        </span>
                      </Link>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                      <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                        <span className='font14 textVerticalCenter'>
                          <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                          <span className='ms-1'>Export to PDF</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                  <div className="row gap-md-0 gap-sm-3">
                    <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                      <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={()=> getAllCollectFeesData()}>Search</span></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="bg-white rounded-2 p-4">
              <form className="row g-3">
                <div className="col-md-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                  <select className="form-select font14" aria-label="Default select example" onChange={(e) => handleClassChange(e.target.value)}>
                    <option >--- Choose ---</option>
                    {allClassData?.map(option => (
                      <option key={option.classId} value={option?.classId}>
                        {option.classNo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                  <select className="form-select font14" aria-label="Default select example" onChange={(e) => setSectionId(e.target.value)}>
                    <option >--- Choose ---</option>
                    {allSectionData?.map(option => (
                      <option key={option.classSecId} value={option.classSecId}>
                        {option.sectionName}
                      </option>
                    ))}
                  </select>
                </div>
                <p className='text-center p-3'>
                  <button type='button' className='btn addCategoryButtons text-white' onClick={getAllCollectFeesData}>Search</button>
                  <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                </p>
              </form>
              <div className="row">
                <div className="row overflow-scroll">
                  {searchButton
                    ?
                    <>
                      <table className="table align-middle table-striped">
                        <thead>
                          <tr>
                            <th className=''><span className='font14'>#</span></th>
                            <th><span className='font14'>Class</span></th>
                            <th><span className='font14'>Section</span></th>
                            <th><span className='font14'>Admission No</span></th>
                            <th><span className='font14'>Student Name</span></th>
                            <th><span className='font14'>Father Name</span></th>
                            <th><span className='font14'>Date of Birth</span></th>
                            <th><span className='font14'>Mobile No.</span></th>
                            <th className='text-center'><span className='font14'>Action</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allCollectFeesData.length > 0
                            ?
                            allCollectFeesData.map((item, index) => (
                              <tr key={item.feePaidId} className='align-middle'>
                                <th className='greyText font14'>{index+1}</th>
                                <td className='greyText font14'>{item?.classNo}</td>
                                <td className='greyText font14'>{item?.section}</td>
                                <td className='greyText font14'>{item?.studentId}</td>
                                <td className='blueText'><Link className='blueText text-decoration-none font14' to={`/studentProfilePage/${item.studentId}/`}>{item?.studentName}</Link></td>
                                <td className='greyText font14'>{item?.studentFather}</td>
                                <td className='greyText font14'>{item?.studentDOB}</td>
                                <td className='greyText font14'>{item?.studentPhone}</td>
                                <td className='text-end'>
                                  <button className="btn btn-sm collectFeesButtons" type="button">
                                    <Link className='text-black text-decoration-none' to={`/collectStudentFee/${item.studentId}/`}>Collect Fees</Link>
                                  </button>
                                </td>
                              </tr>
                            ))
                            :
                            <>
                              <p className='p-2 font14 text-danger'>No Data Found !!</p>
                            </>
                          }
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

                    </>
                    :
                    <p className='p-5 text-center'><img src="./images/search.svg" alt="" className='img-fluid' /></p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </Container>
    </>
  )
}

export default CollectFees