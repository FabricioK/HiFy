import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { closeArtist, addFavorite, toogleHoverON, toogleHoverOFF } from '../actions/artistActions'
import { openArtist } from '../actions/artistActions'
import { openAlbum } from '../actions/albumActions'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import withStyles from '@material-ui/core/styles/withStyles';

import { _GridItemAlbum } from '../components/gridItemAlbum';
import { _GridItemArtist } from '../components/gridItemArtist';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};


class Artist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    _hoverOn = (e, t) => {
        this.props.toogleHoverON(e, t)
    }
    _hoverOff = (e, t) => {
        this.props.toogleHoverOFF(e, t)
    }

    _openDialog = (id) => {
        this.props.openArtist({ id, token: this.props.token ,user_id : this.props.user.id })
    }

    _openDialogAlbum = (id) => {
        this.props.openAlbum({ id, token: this.props.token,user_id : this.props.user.id  })
    }

    render() {
        const { classes, closeArtist, artist, albums,user,token } = this.props;

        return (artist == null ? <div></div> :
            <Paper className={classes.flex} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={closeArtist} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {artist.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <GridList spacing={30} cellHeight={190} cols={4}>
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
                                                    return _GridItemAlbum(classes, child, child_index, true, this._hoverOn, this._hoverOff, this._openDialogAlbum,this.props.addFavorite,user.id)
                                                })}
                                        </GridList>
                                    </GridListTile>)
                            return _GridItemAlbum(classes, item, index, false, this._hoverOn, this._hoverOff, this._openDialogAlbum,this.props.addFavorite,user.id)

                        })
                    }
                </GridList>
            </Paper>)

    }
}
const mapStateToProps = store => ({
    user: store.authState.user,
    artist: store.artistState.artistModal,
    albums: store.artistState.albumsModal,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeArtist, addFavorite, toogleHoverON, toogleHoverOFF, addFavorite, openArtist, openAlbum  }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Artist));