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
        this.props.search({ token: this.props.token, query: this.state.query, type: 'artist' })
    }

    _updateQuery = (event) => {
        this.setState({ query: event.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.search({ token: this.props.token, query: this.state.query, type: 'artist' })
        }
    }
    render() {
        const { classes, error, token, user } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        {token ?
                            <div className={classes.grow}>
                                <input
                                    name="search"
                                    type="text"
                                    className={classes.grow}
                                    onKeyUp={this._handleKeyPress}
                                    onChange={this._updateQuery}
                                />
                                <Button onClick={this._search} color="inherit">Search</Button>
                                
                            </div> :
                            <a href={`${process.env.auth_api}?response_type=token&client_id=${process.env.client_id}&scope=${encodeURIComponent(process.env.scopes)}&redirect_uri=${encodeURIComponent(process.env.redirect_uri)}`}>
                                <Button color="inherit">Login</Button>
                            </a>

                        } {error}
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
    token: store.authState.token,
    user: store.authState.user,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ search, loadUser }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));