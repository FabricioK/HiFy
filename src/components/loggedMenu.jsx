import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';


const _getStyles = (name, that) => {
    return {
        fontWeight:
            that.state.types.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left'
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const types = ['artist', 'album', 'track'];
const options = ['Favorites', 'Logout']

export const _loggedMenu = (classes, user, anchorEl, state_types, _handleChange, _handleClick, _handleKeyPress, _updateQuery, _search, _handleClose) => {
    const open = Boolean(anchorEl);
    return (
        <Toolbar className={classes.toolbar}>
            <div className={classes.flex2}>
                <Typography variant="h6" className={classes.typography} >Searching for</Typography>
                <FormControl className={classes.formControl}>
                    <Select
                        multiple
                        value={state_types}
                        onChange={_handleChange}
                        input={<Input id="select-multiple-chip" />}
                        MenuProps={MenuProps}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}>
                        {types.map(name => (
                            <MenuItem key={name} value={name}>
                                {state_types.indexOf(name) === -1
                                    ? <FontAwesomeIcon icon={faSquare} /> : <FontAwesomeIcon icon={faCheckSquare} />
                                }&nbsp;{name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="h6" className={classes.typography}>with name containing </Typography>

                <Paper className={classes.searchBar} elevation={1}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search ..."
                        name="search"
                        type="text"
                        className={classes.searchBar}
                        onKeyUp={_handleKeyPress}
                        onChange={_updateQuery}
                    />
                    <IconButton className={classes.iconButton} onClick={_search} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div className={classes.flex}>
                {user.images ?
                    <div className={classes.flex}><Avatar alt={user.display_name} src={user.images[0].url} className={classes.avatar} />
                        <Typography variant="subtitle1" className={classes.typography}>{user.display_name}</Typography>
                    </div> : null}
                <IconButton
                    className={classes.typography}
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={_handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Popper open={open} anchorEl={anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="long-menu"
                            style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={_handleClose}>
                                    <MenuList>
                                        {options.map(option => (
                                            <MenuItem key={option} onClick={(e) => _handleClose(e, option)}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Toolbar>
    )
}