import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Route from "react-router-dom/Route";
import withRouter from "react-router-dom/withRouter";


import { Redirect } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';

import LinearProgress from '@material-ui/core/LinearProgress';
import { search, loadUser, logoff } from '../actions'

import Home from './home';
import Callback from './callback';
import Login from './login';
import Favorites from './favorites';

import { _loggedMenu } from '../components/loggedMenu';

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
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#2196f3"
    },
    searchBar: {
        marginLeft: 10,
        minWidth: 150,
        display: 'flex'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
    },
    chip: {
        margin: theme.spacing.unit / 4,
        color: "#2196f3",
        backgroundColor: 'white'
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    flex2: {
        flexGrow: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    flex: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    typography: {
        color: 'white !important',
    }
});


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            types: ['artist'],
            anchorEl: null,
        }
    }

    componentWillMount() {
        if (this.props.token) {
            this.props.loadUser({ token: this.props.token });
        }
    }

    _handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    _handleClose = (e, option) => {
        this.setState({ anchorEl: null });
        if ('Logout' === option)
            this.props.logoff();
        if ('Favorites' === option)
            this.props.history.push({
                pathname: '/favorites'
            });
    };

    _search = () => {
        if (this.state.types.length > 0)
            this.props.search({ token: this.props.token,user_id :this.props.user.id , query: this.state.query, type: this.state.types.join(','), limit: 20, offset: 0 });
        this.props.history.push({
            pathname: '/'
        });
    }

    _updateQuery = (event) => {
        this.setState({ query: event.target.value })
    }
    _handleChange = event => {
        this.setState({ types: event.target.value });
    };
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this._search()
        }
    }

    render() {
        const { classes, error, searching, user } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute">
                    {user ?
                        _loggedMenu(classes, user, this.state.anchorEl, this.state.types, this._handleChange, this._handleClick, this._handleKeyPress, this._updateQuery, this._search, this._handleClose) : null}
                    <div className={classes.grow}>
                        {searching ? <LinearProgress /> : null}
                    </div>
                </AppBar>
                <div className={classes.pages}>
                    <Route exact path="/" render={() => (user ? (<Home />) : (<Login />))} />
                    <Route exact path="/favorites" render={() => (user ? (<Favorites />) : (<Login />))} />
                    <Route exact path="/callback:access_token?" render={() => (user ? (<Redirect to="/" />) : (<Callback />))} />
                </div>
            </div >
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
    bindActionCreators({ search, loadUser, logoff }, dispatch);

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App)));