import React, { useState } from 'react'
import styled from 'styled-components'
import SingleStudentAdmission from './SingleStudentAdmission';
import ExcelUploadForm from './ExcelUpload';

const Container= styled.div`
    overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
    }

`;

const AdmissionForm = () => {

    const [SingleStudent, setSingleStudent]= useState(true);
    const [ExcelUpload, setExcelUpload]= useState(false);

  return (
    <>
        <Container>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="row pb-3">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item" aria-current="page"><a href="/" className='bredcrumText text-decoration-none'>Admissions</a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Admission Form</li>
                            </ol>
                        </nav>
                        <p className='font16 ps-0 fontWeight500'>Admission Form</p>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <div className="row border-bottom border-2 ">
                                <div className="col-xxl-6 col-xl-12 col-sm-12 col-12">
                                    <div className="row pb-2 gap-sm-0 gap-3">
                                        <div className="col-md-6 col-sm-6 col-12 text-center">
                                            <span className={`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${SingleStudent ? 'ActiveState' : 'InActiveState'}`} onClick={()=> {setSingleStudent(true); setExcelUpload(false)}}>Single Student Admission</span>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-12 text-center">
                                            <span className={`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${ExcelUpload ? 'ActiveState' : 'InActiveState'}`} onClick={()=> {setSingleStudent(false); setExcelUpload(true)}}>Excel Upload</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {SingleStudent ? <SingleStudentAdmission/> : <ExcelUploadForm/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
  )
}

export default AdmissionForm