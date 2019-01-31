import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Route from "react-router-dom/Route";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

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
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    searchBar: {
        marginLeft: 10,
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
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const types = ['artist', 'album', 'track'];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            types: ['artist', 'album', 'track']
        }
    }

    componentWillMount() {
        if (this.props.token) {
            this.props.loadUser({ token: this.props.token });
        }
    }

    _search = () => {
        if (this.state.types.length > 0)
            this.props.search({ token: this.props.token, query: this.state.query, type: this.state.types.join(','), limit: 20, offset: 0 })
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
    _getStyles = (name, that) => {
        return {
            fontWeight:
                that.state.types.indexOf(name) === -1
                    ? that.props.theme.typography.fontWeightRegular
                    : that.props.theme.typography.fontWeightMedium,
        };
    }
    render() {
        const { classes, error, token, searching, user } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" >Searching for</Typography>
                        <FormControl className={classes.formControl}>
                            <Select
                                multiple
                                value={this.state.types}
                                onChange={this._handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {types.map(name => (
                                    <MenuItem key={name} value={name} style={this._getStyles(name, this)}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h6" >with name containing </Typography>
                        {token ?
                            <Paper className={classes.searchBar} elevation={1}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search ..."
                                    name="search"
                                    type="text"
                                    className={classes.searchBar}
                                    onKeyUp={this._handleKeyPress}
                                    onChange={this._updateQuery}
                                />
                                <IconButton className={classes.iconButton} onClick={this._search} aria-label="Search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                            : <span className={classes.grow} />}
                        {token ?
                            null
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

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App));