import React, { useState } from 'react'
import styled from 'styled-components'
import Fee_collec_1 from './Fee_collec_1';
import Fee_collec_2 from './Fee_collec_2';
import { Link } from 'react-router-dom';
// import SingleStudentAdmission from './SingleStudentAdmission';
// import ExcelUploadForm from './ExcelUpload';

const Container = styled.div`
height: fit-content;
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

const Fee_collection = () => {
    const [SingleStudent, setSingleStudent] = useState(true);
    const [ExcelUpload, setExcelUpload] = useState(false);
    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row p-4">

                        <div className="breadCrum ps-1">
                            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                <ol className="breadcrumb ">
                                    <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                                    <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Users</li>
                                    <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Admin</Link></li>
                                </ol>
                            </nav>
                        </div>
                        <h5 className=' mb-2 pt-2 ps-1 margin-minus22 heading-14' style={{ marginTop: '-22px' }}>Admin List</h5>


                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <div className="row border-bottom border-2 ">
                                    <div className="col-xxl-6 col-xl-12 col-sm-12 col-12">

                                        <div className="row pb-2 gap-sm-0 gap-3 ">
                                            <div className="col-md-6 col-sm-6 col-12 text-center ps-0">
                                                <span className={`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${SingleStudent ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleStudent(true); setExcelUpload(false) }}>Create Invoice</span>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12 text-center">
                                                <span className={`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${ExcelUpload ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleStudent(false); setExcelUpload(true) }}>Create Bulk Invoice</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    {SingleStudent ? <Fee_collec_1 /> : <Fee_collec_2 />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Fee_collection
