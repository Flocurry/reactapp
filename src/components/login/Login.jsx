import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Components
import FormLogin from './FormLogin';
import FormRegister from '../register/FormRegister';
// CSS
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

class Login extends Component {

    // Login sélectionné par défaut
    state = {
        focusedTab: 0
    }

    handleChange = (event, value) => {
        this.setState({
            focusedTab: value
        });
    };

    render() {
        const classes = this.props.classes;
        const focusedTab = this.state.focusedTab;
        let form;
        if (focusedTab === 0) {
            form = <FormLogin />;
        } else {
            form = <FormRegister />
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Tabs
                            value={this.state.focusedTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            centered
                            fullWidth>
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                        {form}
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Login);