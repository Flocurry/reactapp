import React, { Component } from 'react';

class FormLogin extends Component {

    render() {
        return (
            <div className="container-fluid bg-light py-3">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form>
                                <fieldset>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input name="username" type="text" className="form-control" placeholder="username" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group offset-sm-2 col-sm-8">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-lock text-info"></i></div>
                                            </div>
                                            <input name="password" type="password" className="form-control" placeholder="password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                            <button type="submit" className="btn btn-secondary-outline btn-lg btn-block">Login</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormLogin;