/**
 * Created by Administrator on 2017/03/05 0005.
 */

import {port} from '../public/index'

import {
    BEGIN_FETCH, FALL_FETCH, SHOW_SUCCESS, SHOW_ERROR,
    SET_FOLDERID, SET_GOODID
} from './actionTypes'


//设置 FOLDERID
export const setFolderId =(id, num, status)=>{
    return{
        type: SET_FOLDERID,
        id,
        num,
        status
    }
};


//设置 GOODID
export const setGoodId =(goodId)=>{
    return{
        type: SET_GOODID,
        goodId
    }
};