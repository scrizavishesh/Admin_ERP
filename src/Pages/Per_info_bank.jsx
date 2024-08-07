import React from 'react'

const Per_info_bank = () => {
    return (
        <>
            <div className="container-fluid">
                <p className='heading-16 mt-3'>Bank Details</p>
                <div className="row px-1 pt-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Title  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">IFSC Code  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Number </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Swift Code</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Name </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Branch </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="" />
                        </div>
                    </div>

                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            <button type="button" class="btn btn-outline-success my-green heading-12" >Update Bio</button>
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Per_info_bank
