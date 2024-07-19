import React, { useState } from 'react'
import styled from 'styled-components'
import GradeBookTable from '../../Modals/GradeBook/GradeBookTable';

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
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

`;

const GradeBook = () => {

    const [SearchBtn, setSearchBtn]= useState(false);

    const SearchBtnClicked = () => {
        setSearchBtn(!SearchBtn);
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
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">GradeBook</li>
                            </ol>
                        </nav>
                        <p className='font16 ps-0 fontWeight500'>GradeBook</p>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form class="row g-3">
                                <div class="col-md-6 col-sm-12 col-12">
                                  <label for="inputEmail4" class="form-label font14">Class</label>
                                  <select class="form-select font14" aria-label="Default select example">
                                      <option defaultValue>Select Class</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                  </select>
                                </div>
                                <div class="col-md-6 col-sm-12 col-12">
                                    <label for="inputEmail4" class="form-label font14">Section</label>
                                    <select class="form-select font14" aria-label="Default select example">
                                        <option defaultValue>Select Section</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn addButtons text-white' onClick={() => SearchBtnClicked()}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                                </p>
                            </form>
                            <div className="row">
                                {SearchBtn 
                                    ? 
                                        <GradeBookTable/> 
                                    : 
                                        <>
                                            <div className="d-flex justify-content-center p-5">
                                                <img src="./images/search.svg" alt=""  className='img-fluid'/>
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

export default GradeBook
