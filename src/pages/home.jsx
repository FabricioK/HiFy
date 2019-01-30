import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, setToken, toogleHover } from '../actions'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
    root: {
        backgroundColor: '#d6d6d6',
        width: '80vw',
        marginTop: '30vh',
        minHeight: '70vh',
        height: '100%',
        padding: theme.spacing.unit * 2,
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
    },
    tile: {
    },
    tileHover: {
        padding: '0px !important'
    },
    icon: {
        color: 'white',
    },
    nomargin: {
        margin: '0px !important'
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
    _popularity(index, pop) {
        if (index == 0)
            return { cols: 2, rows: 2 };
        if (pop >= 80)
            return { cols: 1, rows: 1 };
        if (pop >= 60 && pop <= 79)
            return { cols: 1, rows: 1 };
        if (pop >= 30 && pop <= 59)
            return { cols: 1, rows: 1 };
        if (pop <= 30)
            return { cols: 1, rows: 1 };
    }

    _GridItem = (classes, item, index, is_child) => {
        let pop = is_child ? { cols: 1, rows: 1 } : this._popularity(index, item.popularity);
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
                        titlePosition="top"
                        actionIcon={
                            <IconButton className={classes.icon}>
                                <StarBorderIcon />
                            </IconButton>
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
        const { classes, playing, list } = this.props;
        return (
            <Paper className={classes.root}>
                <GridList spacing={30} cellHeight={190} cols={4}>
                    {list && list
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
    list: store.playerState.list,
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, setToken, toogleHover }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));