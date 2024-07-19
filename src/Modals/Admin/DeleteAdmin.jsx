import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container= styled.div`

    .BackBtn{
        border-radius: 5px;
        border: 1.5px solid var(--fontControlBorder);
    }


    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .fitcontent{
        width: fit-content;
    }
`;

const DeleteAdmin = () => {

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        <div className='p-3'>
                            <div className="greenBgModal rounded-2 p-3">
                                <div className="d-flex justify-content-center">
                                    <div className='rounded-circle border p-1 fitcontent'>
                                        <Icon icon="twemoji:person-frowning" width="1.5em" height="1.5em" />
                                    </div>
                                </div>
                                <p className='font16 text-white fontWeight700 pb-1 text-center'>Marah Petersen</p>
                                <p className='font16 text-white fontWeight700 pb-1 text-center'>Route - Sector 16, Noida</p>
                                <div className=' d-flex justify-content-center mt-2'><p className='font16 orangeText fontWeight700 bg-white rounded-2 fitcontent ps-2 pe-2 text-center'>Volvo Bus, UP 38AF 5826</p></div>
                            </div>
                            <div className=''>
                                <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                <p className='text-center warningHeading'>Are you Sure?</p>
                                <p className='text-center greyText warningText pt-2'>You won't able to revert this!</p>
                                <p className='text-center p-3'>
                                    <button className='btn deleteButtons text-white' type='button' onClick={(e) => DeleteBtnClicked()}>Delete</button>
                                    <button className='btn dltcancelButtons ms-3'>Cancel</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default DeleteAdmin