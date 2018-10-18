import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Accessibility from '@material-ui/icons/Accessibility';
import Home from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// CSS
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    item: {
        paddingLeft: theme.spacing.unit * 10,
    },
});

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedList: null,
            open: false
        };
    }

    handleListItemClick = (event, index, libelle) => {
        this.setState({ selectedIndex: index });
        this.props.menuSelected(libelle, event);
    }

    handleCollapse = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <ListItem
                    button
                    selected={this.state.selectedList === 0}
                    onClick={event => this.handleListItemClick(event, 0, 'Home')}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText inset primary="Home" />
                </ListItem>
                <ListItem button onClick={this.handleCollapse}>
                    <ListItemIcon>
                        <Accessibility />
                    </ListItemIcon>
                    <ListItemText inset primary="Admin" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            className={classes.item}
                            button
                            selected={this.state.selectedList === 1}
                            onClick={event => this.handleListItemClick(event, 1, 'Users')}>
                            Users
                        </ListItem>
                        <ListItem
                            className={classes.item}
                            button
                            selected={this.state.selectedList === 2}
                            onClick={event => this.handleListItemClick(event, 2, 'Roles')}>
                            Roles
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
}

SideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);
