/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';

import './index.css'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            key: 0,
            classStr: '',
            homeClassName: 'panel panel-default'
        }
    }

    handleClick(key,event){
        console.log(key)
        event.preventDefault();
        this.setState({
            key: key
        });
        if(key === 1){
            this.setState({
                classStr: 'goNext',
                homeClassName: 'panel panel-default page2'
            })
        }else if(key === 2){
            this.setState({
                // classStr: '',
                homeClassName: 'panel panel-default'
            })
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
                        >我要参加</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;