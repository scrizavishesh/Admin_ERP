import React from 'react'

const Per_Info_Bio = () => {
  return (
   <>
   <div className="container-fluid">
   <div className="row px-3 mt-4 ">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            
            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Bio </label>

            <form class="form-floating">
              <input type="email" class="form-control" id="floatingInputValue" placeholder="" />
            </form>

              <div class="mb-3 mt-2">
              <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Role Description</label>
              <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                <option value="" >Morning Shift</option>
                {/* {
                        classData.map(item =>
                          <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                        )
                      } */}
              </select>
            </div>
            <div className="row mt-2 buttons-tops">
          <div className='my-button11 heading-14'>
            <button type="button" class="btn btn-outline-success my-green heading-12" >Update Bio</button>
            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
          </div>
        </div>
          </div>
       
        </div>
   </div>
   </>
  )
}

export default Per_Info_Bio
