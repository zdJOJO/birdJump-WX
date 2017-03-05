/**
 * Created by Administrator on 2017/03/02 0002.
 */


import {
    BEGIN_FETCH, FALL_FETCH, SHOW_SUCCESS, SHOW_ERROR,
    SET_FOLDERID, SET_GOODID
} from '../actions/actionTypes';

const initalState = {
    isShowSuccess: false,   // 成功 true-显示
    isShowError: false,   //  错误  true-显示

    folderId: '',   //所选的 集合 id
    goodId: '',  //所选的 众筹商品 id
    number: 0,  //第几弹
    status: 0,  // 1-正常 2-未开放  3-已结束
}


export default function publicReducer(state=initalState, action) {
    switch (action.type){
        case BEGIN_FETCH:
            return{
                ...state
            };
        case FALL_FETCH:
            return{
                ...state,
                isShowError: action.isShowError
            };
        case SHOW_SUCCESS:
            return{
                ...state,
                isShowSuccess: action.isShowSuccess
            };
        case SHOW_ERROR:
            return{
                ...state,
                isShowError: action.isShowError
            };
        case SET_FOLDERID:
            return{
                ...state,
                folderId: action.id,
                number:　action.num,
                status: action.status
            };
        case SET_GOODID:
            return{
                ...state,
                goodId: action.goodId
            }
        default:
            return state
    }
}