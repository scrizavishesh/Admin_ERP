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

const GradeBookTable = () => {
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
                            <th className='tableHeading '><span className='font16'>Grade View Mode</span></th>
                            <th className='tableHeading '><span className='font16'>Action</span></th>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select View Mode</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </td>
                                <td className=''>
                                    <button className='btn addButtons text-white'> Update</button>
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

export default GradeBookTable