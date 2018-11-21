/**
 * Created by RyanX on 2018/11/16.
 */

import React, { Component } from 'react';


class NewClassPage extends Component {

    render() {
        return (
            <div className="NewClassPage">
                <div className="title">Add new class</div>
                <div className="content">
                    <div className="accordions">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Class Information
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">



                                        <form>
                                            <div className="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>





                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Assignment Categories
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body">


                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input" />
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" aria-label="Text input with checkbox" />
                                        </div>
                                    
                                    
                                    
                                    
                                    
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="btn btn-primary save-button">SAVE</button>
                        <button type="cancel" className="btn btn-light cancel-button">CANCEL</button>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default NewClassPage;