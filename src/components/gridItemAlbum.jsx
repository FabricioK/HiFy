import { _popularity } from './gridItemHelper'
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

export const _GridItemAlbum = (classes, item, index, is_child) => {
    let pop = _popularity(is_child, index, item.popularity);
    return <Grow
        in={true}
        {...({ timeout: 1000 + (100 * index) })}
        key={`albums_${index}`}
        cols={pop.cols || 1}
        rows={pop.rows || 1}>
        <GridListTile
            onMouseEnter={() => this._hoverOn(item, 'albums')}
            onMouseLeave={() => this._hoverOff(item, 'albums')}
            className={item.hover == true ? classes.tileHover : classes.tile}>
            {item.image ?
                <img
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
                title={item.name}
                subtitle={item.artists}
                actionPosition="left"
                className={classes.titleBar}
            />
        </GridListTile>
    </Grow>
}