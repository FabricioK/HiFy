import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { listFavorites } from '../actions'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    
});


class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    componentWillMount() {
        if(this.props.user)
            this.props.listFavorites(this.props.user.id);
    }
    render() {
        const { classes, user ,favorite_tracks } = this.props;
        return (
            <Paper className={classes.paper}>
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
                                            <Button onClick={() => this.props.addFavorite(user.id, row)}>
                                                Add this
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
    favorite_tracks: store.playerState.favorite_tracks,
    user: store.authState.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ listFavorites}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favorites));