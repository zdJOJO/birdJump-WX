/**
 * Created by Administrator on 2017/03/02 0002.
 */


import {
    BEGIN_FETCH, FALL_FETCH, SHOW_SUCCESS, SHOW_ERROR,
    SET_FOLDERID, SET_GOODID,
    GET_WX_PARAM_SUCCESS,
    GET_CONDIDETAIL_SUCCESS
} from '../actions/actionTypes';

const initalState = {
    isShowSuccess: false,   // 成功 true-显示
    isShowError: false,   //  错误  true-显示

    folderId: '',   //所选的 集合 id
    goodId: '',  //所选的 众筹商品 id
    goodPrice: '',  // //所选的 众筹商品 价格
    number: 0,  //第几弹
    status: 0,  // 集合status:   1-正常  2-未开放  3-已结束
    goodStatus: 0, // 众筹商品 status：  1-未开放  2-正常  3-已结束

    wxParam:{
        appId : '',          //公众号名称，由商户传入
        timeStamp: 0,         //时间戳，自1970年以来的秒数
        nonceStr : '',    //随机串
        package : '',
        signType : "MD5",         //微信签名方式：
        paySign : ''      //微信签名
    },

    condiDetail: {}  //// 某人发起的众筹商品详情
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
                goodId: action.goodId,
                goodPrice: action.goodPrice
            };
        case GET_WX_PARAM_SUCCESS:
            return{
                ...state,
                wxParam:{
                    ...state.wxParam,
                    appId : action.data.appId,
                    timeStamp: action.data.timeStamp,
                    nonceStr : action.data.nonceStr,
                    package : action.data.package,
                    paySign : action.data.paySign
                }
            };
        case GET_CONDIDETAIL_SUCCESS:
            return{
                ...state,
                condiDetail: action.info
            }
        default:
            return state
    }
}