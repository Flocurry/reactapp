import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';

class Input extends Component {

    static propTypes = {
        name: string.isRequired,
        type: string.isRequired,
        faIcon: string.isRequired,
        errors: object.isRequired,
        touched: object.isRequired,
        checkEmpty: bool.isRequired,
        checkLength: bool.isRequired,
        checkPattern: bool.isRequired
    }

    static defaultProps = {
        name: '',
        type: 'text',
        faIcon: '',
        errors: {},
        touched: {},
        checkEmpty: false,
        checkLength: false,
        checkPattern: false
    }

    render() {
        return (
            <div className="form-group row">
                <div className="input-group offset-sm-2 col-sm-8">
                    <div className="input-group-prepend">
                        <div className="input-group-text"><i className={this.props.faIcon}></i></div>
                    </div>
                    <input name={this.props.name} type={this.props.type} className="form-control" placeholder={this.props.name}
                        onChange={(e) => this.props.handleChange(this.props.name, this.props.checkEmpty, this.props.checkLength, this.props.checkPattern, e)} />
                </div>
                <div hidden={!this.props.errors[this.props.name] || !this.props.touched[this.props.name]} className="offset-sm-2 col-sm-8">
                    <div>
                        <div className="alert alert-danger">
                            {this.props.errors[this.props.name]}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Input;