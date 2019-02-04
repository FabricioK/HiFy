import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { search } from '../actions/artistActions'
import { withRouter } from "react-router";

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

});


class Artist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    _loadArtist = () => {
        const { access_token } = qs.parse(this.props.location.hash);
        if (access_token)
            this.props.search(this.props.user.id);
    }

    _afterDeleteHook = (pk, ob, trans) => {
        trans.on("complete", this._loadArtist);
    }

    componentWillMount() {
        db.tracks.hook('deleting', this._afterDeleteHook)
        this._loadArtist();
    }

    componentWillUnmount() {
        db.tracks.hook('deleting').unsubscribe(this._afterDeleteHook)
    }

    render() {
        const { classes, user, favorite_tracks } = this.props;
        return (
            <Paper className={classes.root}>
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
                                            <Button onClick={() => this.props.unfavorite(row.id)}>
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
    user: store.authState.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ search }, dispatch);

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Artist)));