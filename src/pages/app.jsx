import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Route from "react-router-dom/Route";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import { search, loadUser } from '../actions'

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

    componentWillMount() {
        if (this.props.token) {
            this.props.loadUser({ token: this.props.token });
        }
    }

    _search = () => {
        this.props.search({ token: this.props.token, query: this.state.query, type: 'artist', limit: 9, offset: 0 })
    }

    _updateQuery = (event) => {
        this.setState({ query: event.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.search({ token: this.props.token, query: this.state.query, type: 'artist', limit: 9, offset: 0 })
        }
    }
    render() {
        const { classes, error, token, searching, user } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        {token ?
                            <input
                                name="search"
                                type="text"
                                className={classes.grow}
                                onKeyUp={this._handleKeyPress}
                                onChange={this._updateQuery}
                            /> : <span className={classes.grow} />}
                        {token ?
                            <Button onClick={this._search} color="inherit">Search</Button>
                            :
                            <Button
                                href={`${process.env.auth_api}?response_type=token&client_id=${process.env.client_id}&scope=${encodeURIComponent(process.env.scopes)}&redirect_uri=${encodeURIComponent(process.env.redirect_uri)}`}
                                color="inherit">Login</Button>


                        } {error}
                    </Toolbar>
                    <div className={classes.grow}>
                        {searching ?
                            <LinearProgress />
                            : null}
                    </div>
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
    searching: store.playerState.searching,
    token: store.authState.token,
    user: store.authState.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ search, loadUser }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));