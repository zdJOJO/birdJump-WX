/**
 * Created by Administrator on 2017/01/09 0009.
 */


export const port = 'http://fund.mahayanamedia.com';

//cookie
import cookie from 'react-cookie';
export const token = cookie.load('token');


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