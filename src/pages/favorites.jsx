import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { listFavorites, unfavorite } from '../actions/trackActions'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';

import db from '../db';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        backgroundColor: '#f6f6f6',
        width: '80vw',
        marginTop: '20vh',
        minHeight: '70vh',
        height: '100%',
        padding: theme.spacing.unit * 2,
        borderRadius: '15px 15px 0 0'
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleBarTop: {
        background: 'none'
    },
    tile: {

    },
    tileHover: {
        cursor: 'pointer',
        boxShadow: '5px 5px 1px grey',
        padding: '0px !important'
    },
    icon: {
        color: 'white',
    },
    nomargin: {
        margin: '0px !important'
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    grow: {
        flexGrow: 1,
        width: '100%'
    }, tracksArea: {
        marginTop: 20
    }
});



class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    _loadList = () => {
        if (this.props.user)
            this.props.listFavorites(this.props.user.id);
    }

    _afterDeleteHook = (pk, ob, trans) => {
        trans.on("complete", this._loadList);
    }

    componentWillMount() {
        db.tracks.hook('deleting', this._afterDeleteHook);
        db.artists.hook('deleting', this._afterDeleteHook);
        db.albums.hook('deleting', this._afterDeleteHook);
        this._loadList();
    }
    componentWillUnmount() {
        db.tracks.hook('deleting').unsubscribe(this._afterDeleteHook);
        db.artists.hook('deleting').unsubscribe(this._afterDeleteHook);
        db.albums.hook('deleting').unsubscribe(this._afterDeleteHook);
    }
    _convertMS(millisec) {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }

    render() {
        const { classes, user, favorite_tracks, favorite_artists, favorite_albums } = this.props;
        return (
            <Paper className={classes.root}>
                {favorite_artists && favorite_artists.length > 0 ?
                    <div className={classes.tracksArea}>
                        <Typography variant="h4" color="primary">Artists</Typography>
                        <Table className={classes.grow}>
                            <TableHead>
                                <TableRow>
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell >Artist</TableCell>
                                    <TableCell >Album</TableCell>
                                    <TableCell >Duration</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorite_artists.map((row, index) => (
                                    <TableRow key={`track_${index}`}>
                                        <TableCell>
                                            <Button onClick={() => this.props.unfavorite(row.id, 'artist')}>Remove</Button>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.image ?
                                                <img
                                                    src={row.image}
                                                    alt={row.name}
                                                    width={50}
                                                /> : null}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{row.name}</Typography>
                                        </TableCell>
                                        <TableCell>{row.album}</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    : null}
                {favorite_albums && favorite_albums.length > 0 ?
                    <div className={classes.tracksArea}>
                        <Typography variant="h4" color="primary">Albums</Typography>
                        <Table className={classes.grow}>
                            <TableHead>
                                <TableRow>
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell >Track</TableCell>
                                    <TableCell >Album</TableCell>
                                    <TableCell >Duration</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorite_albums.map((row, index) => (
                                    <TableRow key={`track_${index}`}>
                                        <TableCell>
                                            <Button onClick={() => this.props.unfavorite(row.id, 'album')}>Remove</Button>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.image ?
                                                <img
                                                    src={row.image}
                                                    alt={row.name}
                                                    width={50}
                                                /> : null}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{row.name}</Typography>
                                        </TableCell>
                                        <TableCell>{row.album}</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    : null}
                {favorite_tracks && favorite_tracks.length > 0 ?
                    <div className={classes.tracksArea}>
                        <Typography variant="h4" color="primary">Tracks</Typography>
                        <Table className={classes.grow}>
                            <TableHead>
                                <TableRow>
                                    <TableCell ></TableCell>
                                    <TableCell >Track</TableCell>
                                    <TableCell >Album</TableCell>
                                    <TableCell >Duration</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorite_tracks.map((row, index) => (
                                    <TableRow key={`track_${index}`}>
                                        <TableCell component="th" scope="row">
                                            {row.album && row.album.images[0] ?
                                                <img
                                                    src={row.album.images[0].url}
                                                    alt={row.name}
                                                    width={50}
                                                /> : null}
                                            <Button onClick={() => this.props.unfavorite(row.id, 'track')}>
                                                Remove
                                                </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{row.name}</Typography>
                                        </TableCell>
                                        <TableCell>{row.album}</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    : null}
            </Paper>
        );
    }
}

const mapStateToProps = store => ({
    favorite_artists: store.trackState.favorite_artists,
    favorite_albums: store.trackState.favorite_albums,
    favorite_tracks: store.trackState.favorite_tracks,
    user: store.authState.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ listFavorites, unfavorite }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favorites));