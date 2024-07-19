import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { getAllPlansApi, getSubscriptionByIdApi, updateSubscriptionApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
      --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }

    .table222>.tableHead{
        --bs-table-bg: var(--tableGreyBackgroundColor) !important;
    }
    
`;

const Subscription = () => {

    const token = localStorage.getItem('token');
    const [updateSubscription, setUpdateSubscription] = useState(false);
    const [getSubscriptionData, setgetSubscriptionData] = useState();
    const [allPlansData, setAllPlansData] = useState([]);
    const [viewFeatureOfPlan, setViewFeatureOfPlan] = useState([]);
    const [packageName, setPackageName] = useState('');

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Pagination


    console.log(viewFeatureOfPlan)

    useEffect(() => {
        getSubscriptionById();
    }, [token, pageNo])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getSubscriptionById = async () => {
        try {
            const searchByKey = ''
            var response = await getSubscriptionByIdApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                setgetSubscriptionData(response?.data)
                toast.success('Subscription Data')
            }
            else {
                console.log(response?.data);
            }
        }
        catch {

        }
    }

    const updateSubscriptionData = async (id) => {
        try {
            var response = await updateSubscriptionApi(id);
            if (response?.status === 200) {
                toast.success('Subscription Data')
            }
            else {
                console.log(response?.data);
            }
        }
        catch {

        }
    }

    const getAllPlans = async () => {
        try {
            var response = await getAllPlansApi();
            if (response?.status === 200) {
                setUpdateSubscription(true);
                setAllPlansData(response?.data?.plans)
                toast.success(response?.data?.message)
            }
            else {
                console.log(response?.data);
            }
        }
        catch {

        }
    }



    return (
        <Container>
            <div className="container-fluid">
                <div className="row p-2 pt-4">
                    <div className="row pb-3">
                        <div className="col-lg-6 col-md-6 col-sm-12 flex-frow-1">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Settings</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Subscription</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Subscription</p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                            {/* <div className="row">
                                <div className="col-md-3 col-sm-6 text-end p-0">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                        <span className='font16 textVerticalCenter'>
                                            <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to CSV</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6 text-center p-0">
                                    <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                        <span className='font16 textVerticalCenter'>
                                            <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                            <span className='ms-1'>Export to PDF</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-sm-6 p-0">
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn searchButtons text-white" type="submit"><span className='font16'>Search</span></button>
                                    </form>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            {updateSubscription
                                ? <>
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className='tableHeading text-center'><span className='font14'>#</span></th>
                                                <th className='tableHeading '><span className='font14'>Package</span></th>
                                                <th className='tableHeading '><span className='font14'>Price <img src="./images/StatusArrow.svg" alt="" /></span></th>
                                                <th className='tableHeading '><span className='font14'>Interval <img src="./images/StatusArrow.svg" alt="" /></span></th>
                                                <th className='tableHeading '><span className='font14'>Period <img src="./images/StatusArrow.svg" alt="" /></span></th>
                                                <th className='tableHeading '><span className='font14'>Student Limit <img src="./images/StatusArrow.svg" alt="" /></span></th>
                                                <th className='tableHeading '><span className='font14'>Feature Details</span></th>
                                                <th className='tableHeading '><span className='font14'>Status <img src="./images/StatusArrow.svg" alt="" /></span></th>
                                                <th className='tableHeading text-center'><span className='font14'></span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allPlansData?.map((item, index) => (
                                                <tr>
                                                    <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start'>{item?.planName}</span>
                                                    </td>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start'>{item?.price}</span>
                                                    </td>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start'>{item?.type}</span>
                                                    </td>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start'>{item?.value}</span>
                                                    </td>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start'>{item?.studentLimit}</span>
                                                    </td>
                                                    <td className='greyText'>
                                                        {item?.usedAddons === null ? '-' : <p className='font14 align-self-start m-0' data-bs-toggle="modal" data-bs-target="#viewSubscriptionFeature" data-bs-backdrop="false">
                                                            <Link className='blueText text-decoration-none' to='' onClick={() => { setViewFeatureOfPlan(item?.usedAddons), setPackageName(item?.planName) }}>View Features</Link>
                                                            <Icon className='ms-2 ' icon="bi:info-circle-fill" width="1.2em" height="1.2em" style={{ color: '#8F8F8F' }} />
                                                        </p>}
                                                    </td>
                                                    <td className='greyText'>
                                                        <span className='font14 align-self-start active'>Active</span>
                                                    </td>
                                                    <td className='text-center'>
                                                        <Link className="btn addButtons text-white" to='/paymentSettings'>
                                                            {/* <span className='font20' onClick={()=>updateSubscriptionData(item.planId)}>Book Now</span> */}
                                                            <span className='font20'>Book Now</span>
                                                        </Link>
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
                                </>

                                :
                                <>
                                    <table className="table table222 align-middle border">
                                        <thead className='tableHead'>
                                            <tr>
                                                <td className='tableHeading'><span className='font14'>Current Plan</span></td>
                                                <td className='tableHeading'></td>
                                                <td className='tableHeading'></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Plan</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.plan}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Valid</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.valid}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Total Students</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.totalStudent}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Subscription Purchase Date</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.purchaseDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Subscription Renew Date</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.renewDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='greyText text-start'>
                                                    <span className='font14'>Amount To Be Charged</span>
                                                </td>
                                                <td className='greyText text-center'>
                                                    <span className='font14'>-</span>
                                                </td>
                                                <td className='greyText text-end'>
                                                    <span className='font14'>{getSubscriptionData?.amount}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className='text-center m-5'><button className="btn ps-0 pe-0 addCategoryButtons text-white" type="button" onClick={getAllPlans}><span className='font14 textVerticalCenter'>Update Subscription</span></button></p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="viewSubscriptionFeature" tabindex="-1" aria-labelledby="viewSubscriptionFeatureLabel" aria-hidden="true" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title font16" id="viewSubscriptionFeatureLabel">Feature Details</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <h2 className='bgHeaderModal p-3 activeTexttt fw-bold'>Package - {packageName}</h2>
                            {viewFeatureOfPlan?.map((item) => (
                                <>
                                    <div className="p-3">
                                        <h2>{item.featureName}</h2>
                                        <h3 className='pt-3 greyText'>{item.feaPermission?.map((item22) => (
                                            item22?.perName
                                        ))}</h3>
                                        {/* <h3 className='pt-3 greyText'>Manage Users, Custom roles, Leave request, Attendance, Payroll</h3> */}
                                    </div>
                                    <hr className='ms-3 me-3 mt-0 mb-0' />
                                </>
                            ))}
                        </div>
                        {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
            </div>




            <Toaster />



        </Container>
    )
}

export default Subscription