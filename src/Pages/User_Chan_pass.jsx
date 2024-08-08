import React from 'react'

const User_Chan_pass = (data) => {

    console.log('data idd from parent in User change password',data)
    
    return (
        <>
            <div className="container-fluid">
                <div className="row px-1 pt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Current password  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="***************" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">New password  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="New Password" />
                        </div>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                      

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Repeat new password</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Repeat New Password" />
                        </div>
                    </div>


                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            <button type="button" class="btn btn-outline-success my-green heading-12" >Change Password</button>
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Chan_pass
