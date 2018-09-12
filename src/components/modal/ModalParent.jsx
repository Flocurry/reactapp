import React from 'react';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';

class ModalParent extends React.Component {

    render() {
        return (
            <Modal visible={this.props.show} onClickBackdrop={() => this.props.onClose()}>
                <div className="modal-header">
                    <h5 className="modal-title">{this.props.title}</h5>
                </div>
                <div className="modal-body">
                    <p>Enemy vessel approaching!</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => this.props.onClose()}>
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.onFirePhasers}>
                        Save
                    </button>
                </div>
            </Modal>
        );
    }
}

ModalParent.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool
};

export default ModalParent;