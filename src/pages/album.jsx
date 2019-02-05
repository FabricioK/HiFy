import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { closeArtist } from '../actions/artistActions'
import { addFavorite } from '../actions/trackActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import withStyles from '@material-ui/core/styles/withStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons/faStar';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        margin: 20
    },
};


class Album extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    render() {
        const { classes, closeArtist, album, tracks, user } = this.props;
        return (album == null ? <div></div> :
            <Paper className={classes.flex} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={closeArtist} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {album.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {tracks && tracks.length > 0 ?
                    <div className={classes.tracksArea}>
                        <Typography variant="h4" color="primary">Tracks</Typography>
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
                                {tracks.map((row, index) => (
                                    <TableRow key={`track_${index}`}>
                                        <TableCell component="th" scope="row">
                                            <Button onClick={() => this.props.addFavorite(user.id, row, 'track')}>
                                                <FontAwesomeIcon size="2x" icon={row.favorite ? faStarSolid : faStar} color="#2196f3" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {row.album_images ?
                                                <img
                                                    src={row.album_images}
                                                    alt={row.name}
                                                    width={50}
                                                /> : null}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">
                                                {row.name}
                                            </Typography>
                                            {row.artists_name}
                                        </TableCell>
                                        <TableCell>{row.album_name}</TableCell>
                                        <TableCell align="right">{row.duration_ms}</TableCell>
                                        <TableCell align="right">
                                            <Button target="_blank" href={row.external_urls}>
                                                <FontAwesomeIcon size="2x" icon={faSpotify} color="#1DB954" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    : null}
            </Paper>)

    }
}
const mapStateToProps = store => ({
    user: store.authState.user,
    album: store.albumState.albumModal,
    tracks: store.albumState.tracksModal
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeArtist, addFavorite }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Album));