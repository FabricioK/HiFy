import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, setToken, toogleHover } from '../actions'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
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
        borderRadius: '15px 15px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor:'white',
    }
});


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    render() {
        const { classes, user } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <FontAwesomeIcon size="2x" icon={faSpotify} color="#1DB954" />
                    </Avatar>
                        <Button href={`${process.env.auth_api}?response_type=token&client_id=${process.env.client_id}&scope=${encodeURIComponent(process.env.scopes)}&redirect_uri=${encodeURIComponent(process.env.redirect_uri)}`}
                            color="inherit">
                            <Typography component="h1" variant="h5"> Sign in with Spotify  </Typography>
                        </Button>
                   
                </Paper>
            </main>
        );
    }
}
const mapStateToProps = store => ({
    user: store.playerState.user,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, setToken, toogleHover }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));