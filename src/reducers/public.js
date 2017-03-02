/**
 * Created by Administrator on 2017/03/02 0002.
 */


import {
    BEGIN_FETCH, FALL_FETCH, SHOW_SUCCESS, SHOW_ERROR
} from '../actions/actionTypes';

const initalState = {
    isShowSuccess: false,   // 成功 true-显示
    isShowError: false   //  错误  true-显示
}


export default function publicReducer(state=initalState, action) {
    switch (action.type){
        case BEGIN_FETCH:
            return{
                ...state
            }
        case FALL_FETCH:
            return{
                ...state,
                isShowError: action.isShowError
            }
        case SHOW_SUCCESS:
            return{
                ...state,
                isShowSuccess: action.isShowSuccess
            }
        case SHOW_ERROR:
            return{
                ...state,
                isShowError: action.isShowError
            }
        default:
            return state
    }
}