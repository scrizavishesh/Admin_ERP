import React from 'react'
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

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

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
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

    .greenTextt{
        color: var(--breadCrumActiveTextColor);
    }

`;

const SamplePaperTable = () => {
  return (
    <>
        <Container>
            <div className="container-fluid pt-4">
                <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                            <th className='tableHeading text-center'><span className='font14'>#</span></th>
                            <th className='tableHeading '><span className='font14'>Title</span></th>
                            <th className='tableHeading '><span className='font14'>Class</span></th>
                            <th className='tableHeading '><span className='font14'>Section</span></th>
                            <th className='tableHeading '><span className='font14'>Subject</span></th>
                            <th className='tableHeading '><span className='font14'>Teacher Name</span></th>
                            <th className='tableHeading '><span className='font14'>Sample Paper Details</span></th>
                            <th className='tableHeading text-center'><span className='font14'>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>Board Test</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>4</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>C</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>English</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-start'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em"  style={{color: 'red'}} />
                                        <Link className='ms-2' to=''>Download</Link>
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className="dropdown dropdownbtn">
                                        <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Action</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                Edit
                                            </button>
                                            </li>
                                            <li>
                                            {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                Delete
                                            </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    </>
  )
}

export default SamplePaperTable