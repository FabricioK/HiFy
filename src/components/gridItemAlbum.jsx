import { _popularity } from './gridItemHelper'
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons/faStar';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

export const _GridItemAlbum = (classes, item, index, is_child, _hoverOn, _hoverOff, _openDialog,_addFavorite,user_id) => {
    let pop = _popularity(is_child, index, item.popularity);
    return <Grow
        in={true}
        {...({ timeout: 1000 + (100 * index) })}
        key={`albums_${index}`}
        cols={pop.cols || 1}
        rows={pop.rows || 1}>
        <GridListTile
            onMouseEnter={() => _hoverOn(item, 'albums')}
            onMouseLeave={() => _hoverOff(item, 'albums')}
            className={item.hover == true ? classes.tileHover : classes.tile}>
            {item.image ?
                <img
                    onClick={() => _openDialog(item.album_id)}
                    src={item.image}
                    alt={item.name}
                /> : null}

            <GridListTileBar
                className={classes.nomargin}
                titlePosition="top"
                title={
                    <Collapse in={item.hover == true} className={classes.nomargin}>
                        <Paper className={classes.nomargin}>
                            <ListSubheader className={classes.flex} component="div">
                                <Button onClick={() => _addFavorite(user_id, item, 'albums')}>
                                    <FontAwesomeIcon size="2x" icon={item.favorite ? faStarSolid : faStar} color="#2196f3" />
                                </Button>
                                <Button target="_blank" href={item.external_urls}>
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
                onClick={() => _openDialog(item.album_id)}
                title={item.name}
                subtitle={item.artists}
                actionPosition="left"
                className={classes.titleBar}
            />
        </GridListTile>
    </Grow>
}