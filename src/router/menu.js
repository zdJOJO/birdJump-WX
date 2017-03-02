/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React, { Component } from 'react';
import { IndexLink ,Link } from 'react-router' // 引入Link处理导航跳转


const menu = [
    {
        menuName: '首页',
        path: '/'
    },
    {
        menuName: '活动',
        path: '/activities'
    },
    {
        menuName: '尊享',
        path: '/enjoy'
    },
    {
        menuName: '我的',
        path: '/myInfo'
    }
];

export default class Menu extends Component{
    render(){
        return(
            <nav>
                {
                    menu.map((menu,index)=>{
                        return(
                            menu.path==='/' ?
                                <IndexLink to={menu.path} key={index} activeClassName="active">{menu.menuName}</IndexLink>
                                :
                                <Link to={menu.path} key={index} activeClassName="active">{menu.menuName}</Link>
                        )
                    })
                }
            </nav>
        )
    }
}