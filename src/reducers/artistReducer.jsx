import { ModalActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';


const initialState = {
    error: '',
    artistView: false,
    artistModal: null,
    albumsModal: null
};

export const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ModalActionType.OPEN_ARTIST:

            var result = action.payload;
            var albumsModal = [];
            //ALBUMS
            if (result.albums && result.albums.items) {
                const payload = orderBy(result.albums.items, ['release_date'], ['desc'])
                    .map((album) => {
                        return {
                            artist_id: album.id,
                            name: album.name,
                            image: album.images && album.images.length > 0 ? album.images[0].url : null,
                            hover: false,
                            external_urls: album.external_urls.spotify,
                            artists: album.artists.length > 1 ? 'Various artists' : album.artists[0].name
                        }
                    });
                if (payload.length > 0) {
                    let index = 0;
                    const miniaba = groupBy(payload, () => {
                        index++;
                        return (index > 1 && index < 6)
                    })
                    miniaba.false.splice(1, 0, { childs: miniaba.true });
                    albumsModal = miniaba.false
                }
            }
            return {
                ...state,
                artistView: true,
                artistModal: result.artist,
                albumsModal
            };
        case ModalActionType.CLOSE_ARTIST:
            return {
                ...state,
                artistView: false,
                artistModal: null,
                albumsModal: null
            };
        case ModalActionType.HOVER_ARTIST_ON:
            var t_albums = state.albumsModal;
            var hover_value = true;
            //hover over album

            t_albums = t_albums.map(item => {
                return (item.childs ?
                    {
                        childs: item.childs.map(child => {
                            return child == action.payload.item ? { ...child, hover: hover_value } : child
                        })
                    } :
                    item == action.payload.item ? { ...item, hover: hover_value } : item)
            });
            return {
                ...state,
                albumsModal: t_albums
            }
        case ModalActionType.HOVER_ARTIST_OFF:
            var t_albums = state.albumsModal;
            var hover_value = false;
            //hover over album

            t_albums = t_albums.map(item => {
                return (item.childs ?
                    {
                        childs: item.childs.map(child => {
                            return child == action.payload.item ? { ...child, hover: hover_value } : child
                        })
                    } :
                    item == action.payload.item ? { ...item, hover: hover_value } : item)
            });
            return {
                ...state,
                albumsModal: t_albums
            }        
        default:
            return state;
    }
};