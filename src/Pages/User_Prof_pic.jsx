import React from 'react'

const User_Prof_pic = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 col-md-6 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Profile Picture</label>
                            <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        {/* <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" />
                            <label class="input-group-text" for="inputGroupFile02">Upload</label>
                        </div> */}
                           <div className="row mt-4 buttons-tops">
                            <div className='my-button11 heading-14'>
                                <button type="button" class="btn btn-outline-success my-green heading-12" >Update Picture</button>
                                <button type="button" class="btn btn-outline-success heading-12 ms-1 ">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Prof_pic
