import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { getAssignmentByIdDataApi, getDownloadAssignmentDataApi } from '../../Utils/Apis';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`
    height: 92vh;

    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .tableBgColor {
        background-color: var(--bgColordiv);
    }

    .evenTableRow {
        background-color: var(--bgEvenColordiv);
    }

    .pointer {
        cursor: pointer;
    }
`;

const OpenAssignment = () => {

    let { id } = useParams();
    const token = localStorage.getItem('token');
    const [loaderState, setloaderState] = useState(false);
    const [allAssignmentData, setAllAssignmentData] = useState('');

    useEffect(() => {
        if (token) {
            getAssignmentById();
        }
    }, [token]);

    const getAssignmentById = async () => {
        try {
            const response = await getAssignmentByIdDataApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllAssignmentData(response?.data?.Assignment);
            } else {
                console.log(response?.data?.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const downloadFileFunction = (blob, filename) => {
        const url = window.URL.createObjectURL(blob); 
        //creates a temporary URL that points to the Blob object. This URL can be used as a link to access the file data.
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        //releases the memory used by the temporary URL. This is important to prevent memory leaks, 
        //as the URL was only needed for the duration of the file download process.
    };

    const downloadAssignment = async () => {
        try {
            setloaderState(true);
            const data = {
                "responseType": "blob"
            };
            const response = await getDownloadAssignmentDataApi(id, data);
            if (response?.status === 200) {
                const pdfData = response?.data;
                downloadFileFunction(pdfData, 'Assignment.pdf');
                toast.success('Assignment Downloaded Successfully');
                setloaderState(false);
            } else {
                toast.error('Failed to download the assignment.');
            }
        } catch (error) {
            toast.error('An error occurred while downloading the assignment-', error);
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
                <div className="container-fluid">
                    <div className="row pt-3 ps-3">
                        <div className="col-lg-3 col-md-8 col-sm-12 flex-frow-1 p-0">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><Link to="/" className='bredcrumText text-decoration-none'>Home</Link></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page"><Link className='bredcrumActiveText text-decoration-none' to='/assignment'>Assignment</Link></li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Assignments - Board Test</p>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-12"></div>
                    </div>
                    <div className="row pt-3 ps-3 pb-3">
                        <div className="bg-white rounded-2 p-3">
                            <div className="tableBgColor p-4">
                                <div className="row">
                                    <h3>Assignment Details</h3>
                                </div>
                                <div className="row mt-2 mt-lg-0">
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Start Date</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.startDate}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>End Date</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.endDate}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Total Marks:</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.totalMarks}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2 mt-lg-0 evenTableRow">
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Title</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.title}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Section</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.sectionName}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Class</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.classNo}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-sm-2 mt-lg-0">
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Create by</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.createdBy}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Subject</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.subjectName}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Total Students</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.totalSubmissions}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2 mt-lg-0 evenTableRow">
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Assignment File</h3></div>
                                            <div className="col-6">
                                                <p className='font14 align-self-start m-0'>
                                                    <Icon icon="bxs:file-pdf" width="1.3em" height="1.6em" style={{ color: 'red' }} />
                                                    <span className='ms-1 pointer align-self-center' onClick={downloadAssignment}>Download</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Status</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.status === 1 ? 'Active' : 'Inactive'}</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row p-3">
                                            <div className="col-6 greyText"><h3>Score</h3></div>
                                            <div className="col-6"><h3>{allAssignmentData?.score}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row mt-2 mt-lg-0">
                                    <div className="col-md-12 d-flex justify-content-end mt-4">
                                        <Link className='text-decoration-none'>
                                            <div className="saveBtn pointer font14" style={{ width: 'fit-content' }}>
                                                Publish Result
                                            </div>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </Container>
        </>
    );
};

export default OpenAssignment;















// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useParams } from 'react-router-dom';
// import { getAssignmentByIdDataApi, getDownloadAssignmentDataApi } from '../../Utils/Apis';
// import { Icon } from '@iconify/react';
// import toast, { Toaster } from 'react-hot-toast';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Configure the path to the worker script
// // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


// const Container = styled.div`
//     height: 92vh;

//     .mainBreadCrum {
//         --bs-breadcrumb-divider: '>' !important;
//     }

//     .bredcrumText {
//         color: var(--breadCrumTextColor);
//     }

//     .bredcrumActiveText {
//         color: var(--breadCrumActiveTextColor);
//     }

//     .tableBgColor {
//         background-color: var(--bgColordiv);
//     }

//     .evenTableRow {
//         background-color: var(--bgEvenColordiv);
//     }

//     .pointer {
//         cursor: pointer;
//     }
// `;

// const OpenAssignment = () => {

//     let { id } = useParams();
//     const token = localStorage.getItem('token');

//     const [allAssignmentData, setAllAssignmentData] = useState('');
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (token) {
//             getAssignmentById();
//         }
//     }, [token]);

//     const getAssignmentById = async () => {
//         try {
//             const response = await getAssignmentByIdDataApi(id);
//             if (response?.status === 200 && response?.data?.status === 'success') {
//                 setAllAssignmentData(response?.data?.Assignment);
//             } else {
//                 console.log(response?.data?.message);
//             }
//         } catch (e) {

//         }
//     };

//     const downloadAssignment = async () => {
//         setLoading(true);
//         try {
//             const response = await getDownloadAssignmentDataApi(id, { responseType: 'blob' });

//             if (response?.status === 200) {
//                 const url = URL.createObjectURL(response.data);
//                 setPdfUrl(url);
//                 toast.success('Assignment Downloaded');
//             } else {
//                 console.log(response?.data?.message);
//             }
//         } catch (e) {
//             console.log(e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Container>
//                 <div className="container-fluid">
//                     <div className="row pt-3 ps-3">
//                         <div className="col-lg-3 col-md-8 col-sm-12 flex-frow-1 p-0">
//                             <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//                                 <ol className="breadcrumb mb-1">
//                                     <li className="breadcrumb-item"><Link to="/" className='bredcrumText text-decoration-none'>Home</Link></li>
//                                     <li className="breadcrumb-item active bredcrumActiveText" aria-current="page"><Link className='bredcrumActiveText text-decoration-none' to='/assignment'>Assignment</Link></li>
//                                 </ol>
//                             </nav>
//                             <p className='font14 ps-0 fontWeight500'>Assignments - Board Test</p>
//                         </div>
//                         <div className="col-lg-9 col-md-8 col-sm-12"></div>
//                     </div>
//                     <div className="row pt-3 ps-3 pb-3">
//                         <div className="bg-white rounded-2 p-3">
//                             <div className="tableBgColor p-4">
//                                 <div className="row">
//                                     <h3>Assignment Details</h3>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Start Date</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.startDate}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>End Date</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.endDate}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Total Marks:</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.totalMarks}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0 evenTableRow">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Title</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.title}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Section</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.sectionName}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Class</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.classNo}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-sm-2 mt-lg-0">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Create by</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.createdBy}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Subject</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.subjectName}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Total Students</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.totalSubmissions}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0 evenTableRow">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Assignment File</h3></div>
//                                             <div className="col-6">
//                                                 <p className='font14 align-self-start m-0'>
//                                                     <Icon icon="bxs:file-pdf" width="1.3em" height="1.6em" style={{ color: 'red' }} />
//                                                     <span className='ms-1 pointer align-self-center' onClick={downloadAssignment}>
//                                                         {loading ? 'Downloading...' : 'Download'}
//                                                     </span>
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Status</h3></div>
//                                             <div className="col-6"><h3 className={`${allAssignmentData?.status === 'ACTIVE' && 'activeText'} ${allAssignmentData?.status === 'DRAFT' && 'draftText'} ${allAssignmentData?.status === 'ARCHIVE' && 'archiveText'}`}>{allAssignmentData?.status}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {pdfUrl && (
//                                     <div className="row mt-4">
//                                         <div className="col-md-12">
//                                             <Document
//                                                 file={pdfUrl}
//                                                 onLoadError={(error) => console.error('Error loading PDF:', error)}
//                                             >
//                                                 <Page pageNumber={1} />
//                                             </Document>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <Toaster />
//                 </div>
//             </Container>
//         </>
//     );
// }

// export default OpenAssignment;




























// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useParams } from 'react-router-dom';
// import { getAssignmentByIdDataApi, getDownloadAssignmentDataApi } from '../../Utils/Apis';
// import { Icon } from '@iconify/react';
// import toast, { Toaster } from 'react-hot-toast';

// const Container = styled.div`
//     height: 92vh;

//     .mainBreadCrum {
//         --bs-breadcrumb-divider: '>' !important;
//     }

//     .bredcrumText {
//         color: var(--breadCrumTextColor);
//     }

//     .bredcrumActiveText {
//         color: var(--breadCrumActiveTextColor);
//     }

//     .tableBgColor {
//         background-color: var(--bgColordiv);
//     }

//     .evenTableRow {
//         background-color: var(--bgEvenColordiv);
//     }

//     .pointer {
//         cursor: pointer;
//     }
// `;

// const OpenAssignment = () => {

//     let { id } = useParams();
//     const token = localStorage.getItem('token');

//     const [allAssignmentData, setAllAssignmentData] = useState('');

//     useEffect(() => {
//         if (token) {
//             getAssignmentById();
//         }
//     }, [token]);

//     const getAssignmentById = async () => {
//         try {
//             const response = await getAssignmentByIdDataApi(id);
//             if (response?.status === 200 && response?.data?.status === 'success') {
//                 setAllAssignmentData(response?.data?.Assignment);
//             } else {
//                 console.log(response?.data?.message);
//             }
//         } catch (e) {

//         }
//     };

//     const downloadFileFunction = (blob, filename) => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//     };

//     const downloadAssignment = async () => {
//         try {
//             const data = {
//                 "responseType": "blob"
//             }
//             const idd = 35;
//             const response = await getDownloadAssignmentDataApi(idd, data);
//             console.log(response)
//             downloadFileFunction(response.data, 'Assignment.pdf');

//             if (response?.status === 200) {
//                 const pdfData = response?.data;
//                 setPdfBase64(pdfData);
//                 toast.success('Assignment Downloaded');
//             } else {
//                 console.log(response?.data?.message);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };


//     return (
//         <>
//             <Container>
//                 <div className="container-fluid">
//                     <div className="row pt-3 ps-3">
//                         <div className="col-lg-3 col-md-8 col-sm-12 flex-frow-1 p-0">
//                             <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//                                 <ol className="breadcrumb mb-1">
//                                     <li className="breadcrumb-item"><Link to="/" className='bredcrumText text-decoration-none'>Home</Link></li>
//                                     <li className="breadcrumb-item active bredcrumActiveText" aria-current="page"><Link className='bredcrumActiveText text-decoration-none' to='/assignment'>Assignment</Link></li>
//                                 </ol>
//                             </nav>
//                             <p className='font14 ps-0 fontWeight500'>Assignments - Board Test</p>
//                         </div>
//                         <div className="col-lg-9 col-md-8 col-sm-12"></div>
//                     </div>
//                     <div className="row pt-3 ps-3 pb-3">
//                         <div className="bg-white rounded-2 p-3">
//                             <div className="tableBgColor p-4">
//                                 <div className="row">
//                                     <h3>Assignment Details</h3>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Start Date</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.startDate}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>End Date</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.endDate}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Total Marks:</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.totalMarks}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0 evenTableRow">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Title</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.title}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Section</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.sectionName}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Class</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.classNo}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-sm-2 mt-lg-0">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Create by</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.createdBy}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Subject</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.subjectName}</h3></div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Total Students</h3></div>
//                                             <div className="col-6"><h3>{allAssignmentData?.totalSubmissions}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-2 mt-lg-0 evenTableRow">
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Assignment File</h3></div>
//                                             <div className="col-6">
//                                                 <p className='font14 align-self-start m-0'>
//                                                     <Icon icon="bxs:file-pdf" width="1.3em" height="1.6em" style={{ color: 'red' }} />
//                                                     <span className='ms-1 pointer align-self-center' onClick={downloadAssignment}>Download</span>
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="row p-3">
//                                             <div className="col-6 greyText"><h3>Status</h3></div>
//                                             <div className="col-6"><h3 className={`${allAssignmentData?.status === 'ACTIVE' && 'activeText'} ${allAssignmentData?.status === 'DRAFT' && 'draftText'} ${allAssignmentData?.status === 'ARCHIVE' && 'archiveText'}`}>{allAssignmentData?.status}</h3></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Toaster />
//                 </div>
//             </Container>
//         </>
//     );
// }

// export default OpenAssignment;
