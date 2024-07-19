import React from 'react'
import styled from 'styled-components'

const Container= styled.div`

    .BackBtn{
        border-radius: 5px;
        border: 1.5px solid var(--fontControlBorder);
    }


    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }
`;

const AssignStudentDetails = () => {
  return (
    <>
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className='p-3'>
                        <div className="greenBgModal rounded-2 p-3 text-center">
                            <p className='font16 text-white fontWeight700'>Route - Sector 16, Noida</p>
                            <p className='font16 orangeText fontWeight700'>Volvo Bus, UP 38AF 5826</p>
                        </div>
                        <div className='scrollBarHide overflow-auto h-50 mt-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className='greenText font14'>S.No</th>
                                        <th className='greenText font14'>Student Name</th>
                                        <th className='greenText font14 text-end'>Class & Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                    <tr>
                                        <td className='font14'>01.</td>
                                        <td className='font14'>Marah Petersen</td>
                                        <td className='text-end font14'>One, (C)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <button className='btn BackBtn font14'>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
  )
}

export default AssignStudentDetails