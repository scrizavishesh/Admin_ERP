import React, { useState } from 'react'
import styled from 'styled-components'

const Container= styled.div`
    .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const AddExamCategory = () => {

    const [AddExamCategory, setAddExamCategory]= useState(true);

    const AddBtnClicked = (value) => {
        setAddExamCategory(value)
    }
    
  return (
    <>
        <Container>
            <div className="container-fluid ">
                <div className="row">
                    {AddExamCategory
                        ?
                            <>
                                <form className='p-3'>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label font14">Exam Category</label>
                                        <input type="text" id="exampleInputEmail1" className='form-control font14' placeholder='Enter Exam Title'/>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateCategoryButtons text-white' onClick={() => AddBtnClicked()}>Create Category</button>
                                        <button className='btn cancelButtons ms-3'>Cancel</button>
                                    </p>
                                </form>
                            </>
                        :
                            <>
                                <div>
                                    <div className="mt-3  ">
                                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center p-5">
                                            <p className='warningHeading'>Successful Updated</p>
                                        </div>
                                        <button className='btn contbtn continueButtons text-white'>Continue</button>
                                    </div>
                                </div>
                            </>
                    }
                
                </div>
            </div>
        </Container>
    </>
  )
}

export default AddExamCategory