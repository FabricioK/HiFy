import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import without from 'lodash/without';

const initialState = {
    playing: false,
    searching: false,
    list: [],
    error: ''
};
export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.PLAY:
            const { playing } = state;
            return {
                ...state,
                playing: !playing
            };
        case ActionType.SEARCH_STARTED:
            return {
                ...state,
                searching: true,
                error: '',
                list: []
            };
        case ActionType.SEARCH_SUCCESS:
            const payload = orderBy(action.payload, ['popularity', 'images'], ['desc'])
            let index = 0;
            const miniaba = groupBy(payload, () => {
                index++;
                return (index > 1 && index < 6)
            })
            miniaba.false.splice(1, 0, { childs: miniaba.true });
            console.log(miniaba.false);
            return {
                ...state,
                searching: false,
                list: miniaba.false
            };
        case ActionType.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                error: action.payload
            };
        case ActionType.HOVER:
            const list = state.list.map(item => {
                return (item.childs ?
                    {
                        childs: item.childs.map(child => {
                            return child == action.payload ? { ...child, hover: !child.hover } : child
                        })
                    } :
                    item == action.payload ? { ...item, hover: !item.hover } : item)
            });
            console.log(list);
            return {
                ...state,
                list: list
            }
        default:
            return state;
    }
};