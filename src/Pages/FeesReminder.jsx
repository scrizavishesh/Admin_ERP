import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

  .table th, .table td {
    width: calc(100% / 3);
  }

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

const FeesReminder = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('')

  // Pagination

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pageNo, setPageNo] = useState(1);
  // const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    getAllCollectFeesData();
  }, [token])


  // const handlePageClick = (event) => {
  //   setPageNo(event.selected + 1); // as event start from 0 index
  // };

  const getAllCollectFeesData = async () => { }

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
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fee Reminder</li>
                </ol>
              </nav>
              <p className='font14 ps-0 fontWeight500'>Fee Reminder Details</p>
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
                      <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllCollectFeesData}>Search</span></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="bg-white rounded-2 p-4">
              <div className="row">
                <h3 className='p-0 fw-bold pb-2'>Fees Reminder</h3>
              </div>
              <div className="row overflow-scroll">
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      <th><span className='font14'>Action</span></th>
                      <th><span className='font14'>Reminder Type</span></th>
                      <th><span className='font14'>Days</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='align-middle'>
                      <td className='greyText'><h3>Active</h3></td>
                      <td className='greyText'><h3>Before</h3></td>
                      <td className='greyText'><input type="text" className='form-control' value={2} /></td>
                    </tr>
                    <tr className='align-middle'>
                      <td className='greyText'><h3>Active</h3></td>
                      <td className='greyText'><h3>Before</h3></td>
                      <td className='greyText'><input type="text" className='form-control' value={2} /></td>
                    </tr>
                    <tr className='align-middle'>
                      <td className='greyText'><h3>Active</h3></td>
                      <td className='greyText'><h3>Before</h3></td>
                      <td className='greyText'><input type="text" className='form-control' value={2} /></td>
                    </tr>
                    <tr className='align-middle'>
                      <td className='greyText'><h3>Active</h3></td>
                      <td className='greyText'><h3>Before</h3></td>
                      <td className='greyText'><input type="text" className='form-control' value={2} /></td>
                    </tr>
                  </tbody>
                </table>

                {/* <div className="d-flex">
                  <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                  <div className="ms-auto">
                    <ReactPaginate
                      previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                      nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                      breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                      onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                    />
                  </div>
                </div> */}
              </div>
              <div className="row">
                <p className='text-center p-3'>
                  <button className='btn printButtons font14 text-white me-2'>Save</button>
                  <button className='btn cancelButtons font14'>Cancel</button>
                </p>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </>
  )
}

export default FeesReminder