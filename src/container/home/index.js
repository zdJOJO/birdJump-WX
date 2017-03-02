/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';

import Menu from '../../router/menu';

import './index.css'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            key: 0,
            classStr: ''
        }
    }

    handleClick(key){
        if(key === 1){
            this.setState({
                classStr: 'goNext'
            })
        }else if(key === 2){
            // this.setState({
            //     classStr: ''
            // })
        }
    }

    render(){
        return(
            <div id="home" className="panel panel-default">
                <div id="card" className={this.state.classStr}>
                    <div className="panelOne">
                        <button
                            onClick={this.handleClick.bind(this, 1)}
                        >点击进入</button>
                    </div>
                    <div className="panelTwo"></div>
                </div>
            </div>
        )
    }
}

export default Home;