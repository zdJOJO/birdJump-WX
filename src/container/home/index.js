/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import cookie from 'react-cookie';
import './index.css'
import {wxConfig} from '../../public/wx/wxConfig'
import {GetQueryString} from '../../public/index'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            key: 0,
            classStr: '',
            homeClassName: 'panel panel-default'
        }
    }

    componentWillMount(){
        if(window.location.href.indexOf('?') > 0){
            let userId =  GetQueryString('userId');
            if(userId){
                cookie.save('userId', userId);
            }
        }

        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 1,
            url: location.href.split('#')[0]
        })
    }

    handleClick(key,event){
        event.preventDefault();
        if(key === 1){
            this.setState({
                classStr: 'goNext',
                homeClassName: 'panel panel-default'
            })
        }else if(key === 2){
            this.setState({
                homeClassName: 'panel panel-default page2',
                key: 3,
                classStr: '',
            })
        }else {
            location.hash='#/list'
        }
    }

    render(){
        return(
            <div id="home" className={this.state.homeClassName}>
                <div id="card" className={this.state.classStr}>
                    <div className="panelOne">
                        <button
                            onClick={this.handleClick.bind(this, 1)}
                        >点击进入</button>
                    </div>
                    <div className="panelTwo">
                        <button
                            onClick={this.handleClick.bind(this, 2)}
                        >继续</button>
                    </div>
                    { this.state.key === 3 &&
                        <div className="panelThree">
                            <button
                                onClick={this.handleClick.bind(this, 3)}
                            >我要参加</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Home;