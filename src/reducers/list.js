/**
 * Created by Administrator on 2017/03/05 0005.
 */

import {
    GET_COLLECTIONLIST_SUCCESS,GET_GOODLIST_SUCCESS,
    GET_GOODDETAIL_SEUCCESS, POST_INFO_SUCCESS
} from '../actions/actionTypes';

const initalState = {
    collectionList: [],
    goodList: [],
    goodInfo: {},
    isPostSuccess: false
}


export default function listReducer(state=initalState, action) {
    switch (action.type){
        case GET_COLLECTIONLIST_SUCCESS:
            return{
                ...state,
                collectionList: action.list
            };
        case GET_GOODLIST_SUCCESS:
            return{
                ...state,
                goodList: action.list
            };
        case GET_GOODDETAIL_SEUCCESS:
            return{
                ...state,
                goodInfo: action.info
            };
        case POST_INFO_SUCCESS:
            return{
                ...state,
                isPostSuccess: action.isPostSuccess
            }
            return state;
        default:
            return state
    }
}