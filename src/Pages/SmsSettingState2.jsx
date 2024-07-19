import React from 'react'
import styled from 'styled-components'


   
    const Container = styled.div`

    /* .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    } */
    .my-form-check-input:checked {
        background-color: #000;
        border-color: #000;
    }
    .myinputsplace::placeholder{
        font-size: 14px;
    }
  
    .my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
    }
  
    
`;

const SmsSettingState2 = () => {
    return (
        <Container>
        <div>
          <div className="row mt-3 myinputsplace">
            <div className="col-4  heading-14">
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">TwilioSID</label>
            <input type="email" class="form-control myinputsplace" id="exampleFormControlInput1" placeholder="Test_sid_xxxxxxxxx" />
            </div>
            </div>
            <div className="col-4  heading-14">
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Twilio token</label>
            <input type="email" class="form-control myinputsplace" id="exampleFormControlInput1" placeholder="Test_token_xxxxxxxx" />
            </div>
            </div>
            <div className="col-4  heading-14">
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Twilio sender phone number</label>
            <input type="email" class="form-control myinputsplace" id="exampleFormControlInput1" placeholder="Test_number_xxxxxxxxx" />
            </div>
            </div>
          </div>
            <div className="row mb-3 buttons-topss mt-1">
                <div className='my-button11 heading-16'>
                    <button type="button" class="btn btn-outline-success my-button112233">Update</button>
                    <button type="button " class="btn btn-outline-success">Cancel</button>
                </div>
             </div>
        </div>
        </Container>
      )
}


export default SmsSettingState2
