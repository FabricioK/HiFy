import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Route } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Home from './home';
import Callback from './callback';

const styles = theme => ({
    root: {
        backgroundColor: "#0d83af",
        height: '100%',
        width: '100%',
    },
    pages: {
        backgroundColor: "#0d83af",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        minHeight: '100vh',
        height: '100%',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            News
                            </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.pages}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/callback:access_token?" component={Callback} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    playing: store.playerState.playing,
    error: store.playerState.error,
    list: store.playerState.list,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));