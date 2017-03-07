/**
 * Created by Administrator on 2017/01/09 0009.
 */

export const port = 'http://fund.mahayanamedia.com';

//cookie
import cookie from 'react-cookie';
export const token = cookie.load('token');


export const GetQueryString =(name)=>{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  unescape(r[2]);
    return null;
}


//通用函数 时间戳转换成 固定格式
// isAll：true  输出完整格式 年月日时分秒 ; isAll：false  输出完整格式 年月日
export const timestampFormat = (timestamp,type)=> {
    const y = new Date(timestamp*1000).getFullYear();
    const m = new Date(timestamp*1000).getMonth()+1>9?(new Date(timestamp*1000).getMonth()+1):'0'+(new Date(timestamp*1000).getMonth()+1);
    const d = new Date(timestamp*1000).getDate()>9?new Date(timestamp*1000).getDate():'0'+new Date(timestamp*1000).getDate();
    const h = new Date(timestamp*1000).getHours()>9?new Date(timestamp*1000).getHours():'0'+new Date(timestamp*1000).getHours();
    const f = new Date(timestamp*1000).getMinutes()>9?new Date(timestamp*1000).getMinutes():'0'+new Date(timestamp*1000).getMinutes();
    // const s = new Date(timestamp*1000).getSeconds()>9?new Date(timestamp*1000).getSeconds():'0'+new Date(timestamp*1000).getSeconds();
    if(type===1){
        if((h === '00' || h === '23')&&( f === '00' || f === '59')){
            return (y+'.'+m+'.'+d);
        }else {
            return (y+'.'+m+'.'+d+' '+h+':'+f);
        }
    }else if(type===2) {
        return (y+'.'+m+'.'+d);
    }else {
        return (m+'月'+d+'日开箱');
    }
}


//通用函数 多长时间之前
export const timeAgoTransForm = (time) =>{
    let preTime = parseInt(new Date().getTime()/1000 )- time;
    if(preTime<60){
        return parseInt(preTime,10)+"秒前";
    }else if((preTime/60)<60){
        return parseInt(preTime/60,10)+"分钟前";
    }else if((preTime/3600)<24){
        return parseInt(preTime/3600,10)+"小时前";
    }else if((preTime/3600/24)<30){
        return parseInt(preTime/3600/24,10)+"天前";
    }else if((preTime/3600/24/30)<12){
        return parseInt(preTime/3600/24/30,10)+"月前";
    }else{
        return parseInt(preTime/3600/24/365,10)+"年前";
    }
}