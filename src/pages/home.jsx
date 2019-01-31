import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, setToken, toogleHover } from '../actions'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons/faPepperHot';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons/faUserNinja';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faSmile } from '@fortawesome/free-solid-svg-icons/faSmile';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

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
    }
});


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    _hoverOn = (e) => {
        this.props.toogleHover(e)
    }
    _hoverOff = (e) => {
        this.props.toogleHover(e)
    }
    _popularity(is_child, index, pop) {
        let tag = {
            text: "HOT", icon: <FontAwesomeIcon icon={faPepperHot} />
        };;
        if (pop >= 60 && pop <= 79)
            tag = { text: 'Cool', icon: <FontAwesomeIcon icon={faHeart} /> };
        if (pop >= 30 && pop <= 59)
            tag = { text: 'Regular', icon: <FontAwesomeIcon icon={faSmile} /> };
        if (pop <= 30)
            tag = { text: 'Underground', icon: <FontAwesomeIcon icon={faUserNinja} /> };

        return (index == 0 && !is_child) ?
            { cols: 2, rows: 2, tag } : { cols: 1, rows: 1, tag }
    }

    _GridItem = (classes, item, index, is_child) => {
        let pop = this._popularity(is_child, index, item.popularity);
        return <Grow
            in={true}
            {...({ timeout: 1000 + (100 * index) })}
            key={index}
            cols={pop.cols || 1}
            rows={pop.rows || 1}>
            <GridListTile
                onMouseEnter={() => this._hoverOn(item)}
                onMouseLeave={() => this._hoverOff(item)}
                className={item.hover == true ? classes.tileHover : classes.tile}>
                {item.images[0] ?
                    <img
                        src={item.images[0].url}
                        alt={item.name}
                    /> : null}

                <GridListTileBar
                    className={classes.nomargin}
                    titlePosition="top"
                    title={
                        <Collapse in={item.hover == true} className={classes.nomargin}>
                            <Paper className={classes.nomargin}>
                                <ListSubheader className={classes.flex} component="div">
                                    <div>
                                        {pop.tag.text}  {pop.tag.icon}
                                    </div>
                                    <Button target="_blank" href={item.external_urls.spotify}>
                                        <FontAwesomeIcon size="2x" icon={faSpotify} color="#1DB954" />
                                    </Button>
                                </ListSubheader>
                            </Paper>
                        </Collapse>
                    }
                    actionPosition="left"
                    className={classes.titleBarTop}
                />
                <GridListTileBar
                    title={item.name}
                    subtitle={item.genres.join(', ')}
                    actionPosition="left"
                    className={classes.titleBar}
                />
            </GridListTile>
        </Grow>
    }

    render() {
        const { classes, playing, artists } = this.props;
        return (
            <Paper className={classes.root}>
                <GridList spacing={30} cellHeight={190} cols={4}>
                    {artists && artists.length > 0?
                        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
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
                                                    return this._GridItem(classes, child, child_index, true)
                                                })}
                                        </GridList>
                                    </GridListTile>)
                            return (
                                this._GridItem(classes, item, index, false)
                            )
                        })
                    }
                </GridList>
            </Paper >
        )
    }
}
const mapStateToProps = store => ({
    playing: store.playerState.playing,
    error: store.playerState.error,
    artists: store.playerState.artists,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, setToken, toogleHover }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));