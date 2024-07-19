import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getAllRouteApi, getRouteDataByIdApi, updateRouteDataApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import DeleteRoutePage from '../../Modals/Route/DeleteRoutePage';
import ReactPaginate from 'react-paginate';
// import { CSVLink } from 'react-csv';

const Container = styled.div`

    height: 92vh;

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
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
    
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        line-height: 22px;
        color: var(--greyInputTextColor) !important;
    }

    .textVerticalCenter{
        line-height: 22px;
    }
    
    .form-check-input{
        width: 18px;
        height: 18px;
    }

    .formcontrolinput{
        border-radius: 0px !important;
    }

    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

const AllRoute = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [RouteData, setRouteData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')
    const [EditWarning, setEditWarning] = useState(true);
    const [getRouteIdDataName, setgetRouteIdDataName] = useState('');
    const [getRouteIdDataNameError, setgetRouteIdDataNameError] = useState('');
    const [RouteIDD, setRouteIDD] = useState('')
    const [delRouteIDD, setDelRouteIDD] = useState('')
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getAllRouteData();
    }, [token, currentPage, pageNo])

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getAllRouteData = async () => {
        try {
            setloaderState(true);
            var response = await getAllRouteApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setRouteData(response?.data?.routes);
                    setTotalItems(response?.data?.totalRoutes)
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch { }
    }

    const handleCSVFile = async () => {
        try {
            var response = await getRouteCSVDataApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch { }
    }

    const handleRouteNameChange = (val) => {
        setgetRouteIdDataName(val);
        setgetRouteIdDataNameError(validateRouteName(val))
    }

    const validateRouteName = (name) => {
        if (name.trim() === '') {
            return '* Route Name is required !!';
        }

        const nameRegex = /^[a-zA-Z0-9\s-]+$/;
        if (!nameRegex.test(name)) {
            return '* Invalid Route Name !!';
        }

        return '';
    }

    const getRouteDataById = async (id) => {
        try {
            setRouteIDD(id);
            var response = await getRouteDataByIdApi(id);
            console.log(response, 'route data')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setgetRouteIdDataName(response?.data?.route?.routeName);
                    toast.success(response?.data?.msg)
                }
            }
            else {
                console.log(response?.data?.msg);
            }
        }
        catch {

        }
    }

    const UpdateRouteDataById = async () => {
        const error = validateRouteName(getRouteIdDataName);
        if (error) {
            setgetRouteIdDataNameError(error);
            return;
        }

        setgetRouteIdDataNameError('');

        try {
            console.log('try')
            console.log(getRouteIdDataName)
            const formData = new FormData();
            formData.append("routeName", getRouteIdDataName)

            var response = await updateRouteDataApi(RouteIDD, formData);

            if (response?.status === 200) {
                console.log('200')
                console.log(response)
                if (response.data.status === 'success') {
                    console.log('success')
                    setEditWarning(!EditWarning);
                    toast.success(response?.data?.msg)
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
    };

    const DeleteBtnClicked = (id) => {
        setDelRouteIDD(id)
    }



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
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Route</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Route List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" onClick={handleCSVFile}>
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
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchButtons text-white " type="button"><span className='font14' onClick={getAllRouteData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addRoute'><span className='font14 textVerticalCenter'>+ ADD Route</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3 pe-0">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th><h2>#</h2></th>
                                        <th><h2>Name</h2></th>
                                        <th className='text-end'><h2>Action</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RouteData ?
                                        RouteData.map((item, index) => (
                                            <tr key={item.id} className='my-bg-color align-middle'>
                                                <th className='greyText'><h3>{index + 1}</h3></th>
                                                <td className='greyText'><h3>{item.routeName}</h3></td>
                                                <td className='text-end'>
                                                    <div className="dropdown dropdownbtn">
                                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span>Action</span>
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getRouteDataById(item.routeId)}>
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.routeId)}>
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <div>No Data Found !!</div>
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

                        </div>
                    </div>
                </div>
                <Toaster />


                {/* *********************************************************************************************************************************************************************************************************************** */}
                {/* *********************************************************************************************************************************************************************************************************************** */}


                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header border-bottom border-2 p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="staticBackdropLabel">Route Edit</h2>
                    </div>
                    <div className="offcanvas-body p-0">
                        <div>
                            {EditWarning
                                ?
                                <>
                                    <div>
                                        {/* <p className='modalLightBorder orangeText p-2'>{getRouteIdDataName}</p> */}
                                        <div className="p-3">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputAdd1" className='form-label greyText font14'>Route Name</label>
                                                    <input type="text" className={`form-control p-2 formcontrolinput font14 ${getRouteIdDataNameError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" value={getRouteIdDataName} onChange={(e) => handleRouteNameChange(e.target.value)} />
                                                    <span className='text-danger'>{getRouteIdDataNameError}</span>
                                                </div>
                                            </form>
                                            <p className='text-center p-3'>
                                                <button className='btn addButtons text-white' type='button' onClick={UpdateRouteDataById}>Update Route</button>
                                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllRouteData}>Cancel</button>
                                            </p>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <p className='modalLightBorder p-2 mb-0'>Route List</p>
                                        <div className="mt-3  ">
                                            <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                            <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Updated</p>
                                                <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllRouteData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
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
                        <span className="offcanvas-title" id="staticBackdropLabel">Route</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        <DeleteRoutePage delRouteIDD={delRouteIDD} getAllRouteData={getAllRouteData} />
                    </div>
                </div>
                {/* ***********************************************************************************************************************************************************************************/}
                {/* ***********************************************************************************************************************************************************************************/}




            </Container>
        </>
    )
}

export default AllRoute




