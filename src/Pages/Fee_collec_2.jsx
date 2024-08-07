import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height: fit-content;
overflow : scroll;

    .content-div{
       background-color: #f9f9f9;
       padding: 5px ;
    }
    .my-button112233{
      background: #008479;
      color: #fff;
      border-radius: 2px;
      border: 1px solid #008479;
    }
    .my-button11223344:hover{
background-color: #008479;
color: #fff;
    }
  
`;

const Fee_collec_2 = () => {
    return (
        <Container>
            <div className="container-fluid px-0">
                <div className="row  py-4">
                    <div className="col-lg-6 col-md-12 col-sm-12  ">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => handle(e)} aria-label="Default select example">
                                <option selected>--Choose--</option>

                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Subject</label>
                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                <option selected>--Choose--</option>

                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mb-3 mb-2  text-center">
                    <div className='my-button11 '>
                        <button type="button" class="btn btn-outline-success my-button112233 me-1" >Search</button>
                        <button type="button" class="btn btn-outline-success my-button11223344">Cancel</button>
                    </div>
                </div>
             <h2 className='p-2 mb-4' style={{color:"red"}}>Table area by class and section check figma......and it will resolve with api response.</h2>
                <div className="content-div">
                    <div className="row ">
                        <div className="col-10">
                            <div className="row p-1">

                                <div className="col-2 ms-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label heading-14" for="flexCheckDefault">
                                            Hostel Fee
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label heading-14" for="flexCheckDefault">
                                            Tuition Fee
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label heading-14" for="flexCheckDefault">
                                            Transport Fee
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label heading-14" for="flexCheckDefault">
                                            Admission Fee
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label heading-14" for="flexCheckDefault">
                                            Certificate Fee
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>

                <div className="row  py-4">
                    <div className="col-lg-4 col-md- col-sm-12  ">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label heading-16">Fee Amount * </label>
                            <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter Class Room No" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label heading-16">Month </label>
                            <input type="date" class="form-control form-control-sm" onChange={(e) => handleClassNo(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Class Room No" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label  label-text-color heading-14">Is Applicable Discount?</label>
                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                <option selected>--Choose--</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label  label-text-color heading-14">Paid Status</label>
                            <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                <option selected>--Choose--</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label heading-16">Description</label>
                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter Description" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mt-4  text-center">
                    <div className='my-button11 '>
                        <button type="button" class="btn btn-outline-success my-button112233 me-1" >Search</button>
                        <button type="button" class="btn btn-outline-success my-button11223344">Cancel</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Fee_collec_2
