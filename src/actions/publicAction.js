/**
 * Created by Administrator on 2017/03/05 0005.
 */

import {hex_md5} from '../public/md5'
import {port} from '../public/index'
import { wxConfig } from '../public/wx/wxConfig';


import {
    BEGIN_FETCH, FALL_FETCH, SHOW_SUCCESS, SHOW_ERROR,
    SET_FOLDERID, SET_GOODID,
    GET_WX_PARAM_SUCCESS
} from './actionTypes'


// 显示 错误提示
export const showError = (isShowError)=>{
    return{
        type: SHOW_ERROR,
        isShowError
    }
}



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
export const setGoodId =(obj)=>{
    let goodId = obj.goodId;
    let goodPrice = obj.goodPrice;
    return{
        type: SET_GOODID,
        goodId,
        goodPrice
    }
};


//微信 参数请求成功
const  requestWxParamSuccess=(data)=>{
    return{
        type: GET_WX_PARAM_SUCCESS,
        data
    }
}

const requestWxParam =(obj)=>{
    // userId， goodsId， ipAddress， openId， price
    //let url = port + "/card/weixin/getRepay?goodsId="+goodsId + "&openId=" + openId + "&type=1&ipAddress=" + ip ;
    return dispatch =>{
        return fetch( '' )
            .then( res=>{
                return res.json()
            })
            .then( result =>{
                if(result){
                    let appid =  String(result.appId);
                    let nonceStr = String(result.nonceStr);
                    let packageStr = String(result.package);
                    let timeStamp = String(new Date().getTime());
                    let stringA = "appId=" + appid + "&nonceStr=" + nonceStr + "&package=" + packageStr + "&signType=MD5&timeStamp=" + timeStamp ;
                    let stringSignTemp = stringA + "&key=29798840529798840529798840529798";
                    let paySign = hex_md5(stringSignTemp).toUpperCase();   //全部大写
                    let data = {
                        appid: appid,
                        nonceStr: nonceStr,
                        package: packageStr,
                        timeStamp: timeStamp,
                        paySign: paySign
                    };
                    dispatch(requestWxParamSuccess(data));
                    let wxParamObjOne = data;
                    wxParamObjOne.typeStr = 'wxPay';
                    wxConfig(wxParamObjOne);


                    // 分享
                    // let wxParamObjTwo = data;
                    // wxParamObjTwo.typeStr = 'share';
                    // wxConfig(wxParamObjTwo);
                }else {
                    alert('支付失败,重新请求')
                }
            })
            .catch( e=>{
                console.log(e)
            })
    }
};




//微信支付 参数请求
export const fetchWx =(obj)=>{
    return dispatch =>{
        return dispatch(requestWxParam(obj))
    }
}
