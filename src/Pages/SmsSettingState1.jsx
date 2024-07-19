import React from 'react'
import styled from 'styled-components'
const SmsSettingState1 = () => {

   
    const Container = styled.div`

    /* .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    } */
    .my-form-check-input:checked {
        background-color: #000;
        border-color: #000;
    }
    .my-button112233 button{
        background-color: #008479;
        color: #fff;
        font-size: 12px;  
    }
    .my-button112233{
        text-align: center;
    }
    .my-button112233 button:hover{
        background-color: #00a497;
    }
    
`;
  return (
    <Container>
    <div>
        <div className="row mt-5">
           <div className="col-4"></div>
           <div className="col-4">
            <div className="row">
            <div className="col-4">
            <div class="form-check">
            <input class="form-check-input my-form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label class="form-check-label" for="flexRadioDefault1">
            None
            </label>
            </div>
            </div>
            <div className="col-4">
            <div class="form-check">
            <input class="form-check-input my-form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label class="form-check-label" for="flexRadioDefault1">
            Twilio
            </label>
            </div>
            </div>
            <div className="col-4">
            <div class="form-check">
            <input class="form-check-input my-form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label class="form-check-label" for="flexRadioDefault1">
            MSG91
            </label>
            </div>
            </div>
            </div>
           </div>
           <div className="col-4"></div>
        </div>
        <div className="row mb-3 buttons-topss mt-3">
            <div className='my-button112233 heading-16'>
                <button type="button" class="btn btn-outline-success">Save</button>
            </div>
         </div>
    </div>
    </Container>
  )
}

export default SmsSettingState1
