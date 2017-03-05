/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';

import './index.css'
import head from '../../img/headPic.png'

const friendsArray = [1,2];

class WantToCollect extends Component{

    constructor(props){
        super(props)
        this.state = {
            totalPrice: 1300,
            differencePrice: 500,
            width: 500/1300*1.6+'rem',
            differenceWith: (1-500/1300)*1.6+'rem'
        }
    }

    handleClick(type){
        if(type===1){
            //我想给他赞助
            console.log('我想给他赞助')
            location.hash='#/pay'
        }else {
            //我也想收藏一套
            console.log('我也想收藏一套')
            location.hash='#/list'
        }
    }

    render(){
        return(
            <div id="want" className="panel panel-default">
                <div className="content">
                    <img className="headPic" role="presentation" src={head} />
                    <img className="good" role="presentation" src={head} />
                    <div className="slide">
                        <div className="barOne" style={{ width: this.state.differenceWith}}></div>
                        <div className="barTwo" style={{ width: this.state.width}}></div>
                    </div>
                    <span className="totalPrice">总需{this.state.totalPrice}元</span>
                    <span className="difference">还差{this.state.differencePrice}元</span>
                    <span className="hasSponsorship">已有100位好友为TA赞助</span>
                    <ul>
                        {
                            friendsArray.map((friend,index)=>{
                                return(
                                    <li key={index}>
                                        <div><img role="presentation" src={head} /></div>
                                        <div>张学友</div>
                                        <div>
                                            <span>赞助1000元</span>
                                            <span>4分钟前</span>
                                        </div>
                                    </li>
                                )
                            })

                        }
                    </ul>
                    <button className="sponsorship" onClick={this.handleClick.bind(this,1)}>我想给他赞助</button>
                    <button className="collect" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                    <button className="collect2" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                </div>
            </div>
        )
    }
}

export default WantToCollect;