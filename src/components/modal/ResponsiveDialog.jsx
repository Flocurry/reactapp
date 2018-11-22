import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ResponsiveDialog extends React.PureComponent {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleYes: PropTypes.func.isRequired
    }

    render() {
        const { open, title, content } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        NO
                        </Button>
                    <Button onClick={this.props.handleYes} color="primary" autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withMobileDialog()(ResponsiveDialog);