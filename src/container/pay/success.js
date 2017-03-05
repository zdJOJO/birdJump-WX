/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';

import './index.css'

class Success extends Component{

    handleClick(){
        console.log(11111111)
        location.hash = '#/want'
    }
    
    render(){
        return(
            <div id="success" className="panel panel-default">
                <button onClick={this.handleClick.bind(this)}>我的认购收藏</button>
            </div>
        )
    }
}

export default Success;