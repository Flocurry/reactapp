import React, { Component } from 'react';

class UploadFile extends Component {
    render() {
        return (
            <div className="form-group row">
                <div className="offset-sm-2 col-sm-8">
                    <div className="custom-file" id="customFile" lang="es">
                        <div className="input-group">
                            <input id='fileInput' type="file" accept="image/png" className="form-control"
                                onChange={(e) => this.props.change(this.props.name, e)} />
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-danger"
                                    onClick={this.props.delete} >
                                    <em className="fa fa-trash"></em>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default UploadFile;