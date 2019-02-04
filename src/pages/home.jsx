import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, setToken, toogleHover } from '../actions';
import { addFavorite } from '../actions/trackActions';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';

import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Slide from '@material-ui/core/Slide';

import Dialog from '@material-ui/core/Dialog';
import { _GridItemAlbum } from '../components/gridItemAlbum';
import { _GridItemArtist } from '../components/gridItemArtist';

import Artist from './artist'
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


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    Transition = (props) => {
        return <Slide direction="up" {...props} />;
    }

    _hoverOn = (e, t) => {
        this.props.toogleHover(e, t)
    }
    _hoverOff = (e, t) => {
        this.props.toogleHover(e, t)
    }   
    

    render() {
        const { classes, playing, artists, albums, tracks, user } = this.props;

        return (
            <Paper className={classes.root}>
                <GridList spacing={30} cellHeight={190} cols={4}>
                    {artists && artists.length > 0 ?
                        <GridListTile key="Subheader_Artistis" cols={4} style={{ height: 'auto' }}>
                            <ListSubheader component="div"><Typography variant="h4" color="primary">Artists</Typography></ListSubheader>
                        </GridListTile> : null
                    }
                    {artists && artists
                        .map((item, index) => {
                            if (item.childs)
                                return (
                                    <GridListTile
                                        key={index}
                                        cols={2}
                                        rows={2}
                                        className={classes.nomargin}>
                                        <GridList
                                            spacing={30} cellHeight={160}
                                            className={classes.nomargin}>
                                            {item.childs && item.childs
                                                .map((child, child_index) => {
                                                    return _GridItemArtist(classes, child, child_index, true)
                                                })}
                                        </GridList>
                                    </GridListTile>)
                            return _GridItemArtist(classes, item, index, false)
                        })
                    }
                    {albums && albums.length > 0 ?
                        <GridListTile key="Subheader_Albums" cols={4} style={{ height: 'auto' }}>
                            <ListSubheader component="div"><Typography variant="h4" color="primary">Albums</Typography></ListSubheader>
                        </GridListTile> : null
                    }
                    {albums && albums
                        .map((item, index) => {
                            if (item.childs)
                                return (
                                    <GridListTile
                                        key={index}
                                        cols={2}
                                        rows={2}
                                        className={classes.nomargin}>
                                        <GridList
                                            spacing={30} cellHeight={160}
                                            className={classes.nomargin}>
                                            {item.childs && item.childs
                                                .map((child, child_index) => {
                                                    return _GridItemAlbum(classes, child, child_index, true)
                                                })}
                                        </GridList>
                                    </GridListTile>)
                            return _GridItemAlbum(classes, item, index, false)

                        })
                    }
                </GridList>
                {tracks && tracks.length > 0 ?
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
                                {tracks.map((row, index) => (
                                    <TableRow key={`track_${index}`}>
                                        <TableCell component="th" scope="row">
                                            <Button onClick={() => this.props.addFavorite(user.id, row)}> Add this </Button>
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
                <Dialog
                    fullScreen
                    open={false}
                    onClose={this.handleClose}
                    TransitionComponent={this.Transition}
                >
                    <Artist />
                </Dialog>
            </Paper >
        )
    }
}
const mapStateToProps = store => ({
    playing: store.playerState.playing,
    error: store.playerState.error,
    artists: store.playerState.artists,
    albums: store.playerState.albums,
    tracks: store.playerState.tracks,
    user: store.authState.user,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, setToken, toogleHover, addFavorite }, dispatch);

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home)));