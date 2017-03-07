/**
 * Created by Administrator on 2017/03/05 0005.
 */
import cookie from 'react-cookie';
import {port} from '../public/index'

import {
    GET_COLLECTIONLIST_SUCCESS, GET_GOODLIST_SUCCESS,
    GET_GOODDETAIL_SEUCCESS, POST_INFO_SUCCESS,
    CREATE_ONE_FUND
} from './actionTypes'

import {showError} from './publicAction'



// 集合列表获取成功
const getCollectionListSuccess= (list)=>{
    return{
        type: GET_COLLECTIONLIST_SUCCESS,
        list
    }
};

//众筹列表获取成功
const getGoodListSuccess= (list)=>{
    return{
        type: GET_GOODLIST_SUCCESS,
        list
    }
};

//获取 详情成功
const getGoodDetailSuccess = (info)=>{
    return{
        type: GET_GOODDETAIL_SEUCCESS,
        info
    }
};

//信息提交成功
const postInfoSuccess = (isPostSuccess)=>{
    return{
        type: POST_INFO_SUCCESS,
        isPostSuccess
    }
};

//创建、发起一个众筹成功
const createOneFundSuccess =()=>{
    return{
        type: CREATE_ONE_FUND,
    }
}



// 列表获取 GET
const  getList =(obj)=>{
    let url = obj.type===1 ? port + '/fund/goodsFolder?currentPage=1&size=100'
        : port + '/fund/goodsFolder/goods/'+obj.id+ '?currentPage=1&size=100' ;
    return dispatch =>{
        return fetch( url )
            .then( res=>{
                return res.json();
            })
            .then( json=>{
                if(obj.type===1){
                    dispatch(getCollectionListSuccess(json.data.list))
                }else {
                    dispatch(getGoodListSuccess(json.data.list))
                }
            })
            .catch( e =>{
                console.log(e)
            })
    }
};


// 获取详情 GET
const  getGoodDetail =(obj)=>{
    let url = port + '/fund/goods/'+obj.id;
    return dispatch =>{
        return fetch( url )
            .then( res=>{
                return res.json();
            })
            .then( json=>{
                dispatch(getGoodDetailSuccess(json.data))
            })
            .catch( e =>{
                console.log(e)
            })
    }
};


//提交信息 POST
const postInfo =(obj)=>{
    let url =  port +　'/fund/user/update';
    let data = obj.data;
    return dispatch =>{
        return fetch( url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res=>{
            return res.json()
        }).then( json =>{
            if(json.code === '202'){
                console.log(json)
                cookie.save('openId', json.data.openId);
                dispatch(postInfoSuccess(true));
                //location.hash='#/want';
                window.location.href = 'http://fund.mahayanamedia.com/birdJump/#/want?isLook=1&goodId='+obj.goodId;
            }else {
                alert(json)
            }
        }).catch(e =>{
            console.log(e)
        })
    }
};


//发起一个众筹 POST
const createOneFund =(obj)=>{
    let url =  port + '/fund/user/fund/create';
    let data = {
        userId: obj.userId,
        goodsId: obj.goodId,
        goodsPrice: obj.goodPrice
    };

    return dispatch =>{
        return fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res=>{
            return res.json()
        }).then( json =>{
            console.log(json.code)
            if(json.code === '201'){
                dispatch(createOneFundSuccess());
                cookie.save('condiId', json.data.id);
                location.hash='#/inputInfo?goodId='+obj.goodId;
            }else{
                dispatch(showError(true, json.message))
            }
        }).catch(e =>{
            console.log(e)
        })
    }
};



/*
*  type:
*  1 - 获取集合列表
*  2 - 获取众筹列表
*  3 - 获取详情
*  4 - 提交信息
*  5 - 发起一个众筹
* */
export const fetchList = (obj)=>{
    return dispatch=>{
        switch (obj.type){
            case 1:
                return dispatch(getList(obj));
            case 2:
                return dispatch(getList(obj));
            case 3:
                return dispatch(getGoodDetail(obj));
            case 4:
                return dispatch(postInfo(obj));
            case 5:
                return dispatch(createOneFund(obj));
            default:
                return false
        }
    }
}