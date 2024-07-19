import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components';

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

const PromotionTable = () => {
  return (
    <>
        <Container>
            <div className="container-fluid pt-4">
                <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                            <th className='tableHeading text-center'><span className='font16'>#</span></th>
                            <th className='tableHeading '><span className='font16'>Student Id</span></th>
                            <th className='tableHeading '><span className='font16'>Student Name</span></th>
                            <th className='tableHeading '><span className='font16'>Class</span></th>
                            <th className='tableHeading '><span className='font16'>Section</span></th>
                            <th className='tableHeading '><span className='font16'>Status</span></th>
                            <th className='tableHeading text-center'><span className='font16'>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='text-center greyText'><span className='font14'>1.</span></th>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                                    <span className='font14 align-self-center'>PQ6985364</span>
                                </td>
                                <td className='greyText d-flex'>
                                    <div className='rounded-circle border p-1'><Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" /></div>
                                    <span className='font14 align-self-center ms-2'>John Doe</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>Two</span>
                                </td>
                                <td className='greyText'>
                                    <span className='font14 align-self-center'>A</span>
                                </td>
                                <td className='greenTextt'>
                                    <span className='font14 align-self-center'>Active</span>
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
                {/* <div className="heightOfTable">
                    
                </div> */}
            </div>
        </Container>
    </>
  )
}

export default PromotionTable