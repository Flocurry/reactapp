import React, { Component } from 'react';

class RadioBtn extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: 'Homme'
        }
    }

    handleOptionChange(fieldName, e) {
        this.setState({
            selectedOption: e.target.value
        });
        this.props.onChangeSexe(fieldName, e.target.value);
    }

    render() {
        return (
            <div className="form-group row">
                <div className="offset-sm-2 col-sm-8">
                    <label>
                        <input type="radio" value="Homme"
                            checked={this.state.selectedOption === 'Homme'}
                            onChange={(e) => this.handleOptionChange('sexe', e)} />
                        Homme
                    </label>
                    <label>
                        <input id='radioFemme' type="radio" value="Femme"
                            checked={this.state.selectedOption === 'Femme'}
                            onChange={(e) => this.handleOptionChange('sexe', e)} />
                        Femme
                    </label>
                </div>
            </div>
        );
    }
}

export default RadioBtn;