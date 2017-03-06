/**
 * Created by Administrator on 2017/03/05 0005.
 */

import { port } from '../public'
import { wxConfig } from '../public/wx/wxConfig';
import { hex_md5 } from '../public/md5'

import {
    CREATE_ONE_ORDER_SUCESSS, GET_CONDIDETAIL_SUCCESS
} from './actionTypes'



// 生成订单成功
const createOrderSuccess =()=>{
    return{
        type: CREATE_ONE_ORDER_SUCESSS
    }
}

//众筹商品详情获取成功
const getCondiDetailSuccess =(info)=>{
    return{
        type: GET_CONDIDETAIL_SUCCESS,
        info
    }
}


//生成订单 GET
const createOrder =(obj)=>{
    // userId， goodsId， ipAddress， openId， price

    let url = port + "/fund/weixin/getRepay?userId="+obj.data.userId+"&goodsId="+obj.data.goodsId+"&openId="+obj.data.openId+
       "&price="+obj.data.price+"&ipAddress=" + obj.data.ipAddress;
    return dispatch =>{
        return fetch(url)
            .then( res=>{
                return res.json();
            })
            .then( result =>{
                console.log(result);
                if(result.code==='601'){
                    alert(result.message)
                    return
                }
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
                let wxParamObjOne = data;
                wxParamObjOne.typeStr = 'wxPay';

                dispatch(createOrderSuccess());
                if(result){
                    wxConfig(wxParamObjOne);
                }
            })
            .catch( e=>{
                console.log(e)
            })
    }
}



//获取某人发起的众筹商品详情  GET
const getCondiDetail =(obj)=>{
    let url = port + '/fund/goods/funder/' + obj.condiId;
    return dispatch =>{
        return fetch( url )
            .then( res=>{
                return res.json();
            })
            .then( json =>{
                console.log(json);
                dispatch(getCondiDetailSuccess(json.data))
            })
            .catch( e=>{
                console.log(e)
            })
    }
};




/*
* type：
*  1 - 生成订单
*  2 - 获取 某人发起的众筹商品详情
*
* */
export const fetchOrder = (obj) =>{
    return dispatch => {
        switch (obj.type){
            case 1:
                return dispatch(createOrder(obj));
            case 2:
                return dispatch(getCondiDetail(obj));
        }
    }
}