/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';

import { fetchOrder } from '../../actions/payAciton'
import {GetQueryString } from '../../public/index'
import {wxConfig} from '../../public/wx/wxConfig'

import './index.css'

class WantToCollect extends Component{

    constructor(props){
        super(props);
        const { condiDetail } = this.props;
        this.state = {
            totalPrice: condiDetail.goodsPrice,
            differencePrice: condiDetail.goodsPrice-condiDetail.fundPrice,
            width: condiDetail.fundPrice/condiDetail.goodsPrice*1.6+'rem',
            differenceWith: (1-condiDetail.fundPrice/condiDetail.goodsPrice)*1.6+'rem'
        }
    }

    componentWillMount(){
        const { fetchOrder } = this.props;
        if(window.location.search.indexOf('isShare') > 0 ){
            let openId = GetQueryString('openId');
            let condiId = GetQueryString('condiId');
            cookie.load('openId');
            fetchOrder({
                type: 2,
                condiId: condiId
            })
        }else {
            fetchOrder({
                type: 2,
                condiId: cookie.load('condiId')
            })
        }

        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 2,   
            condiId: cookie.load('condiId')
        })
        
    }


    handleClick(type,obj){
        if(type===1){
            //我想给他赞助
            console.log('我想给他赞助')
            hashHistory.push({
                pathname: '/pay',
                query: obj
            });
        }else {
            //我也想收藏一套
            console.log('我也想收藏一套')
            location.hash='#/list'
        }
    }

    render(){
        const { condiDetail } = this.props;
        const width = condiDetail.fundPrice/condiDetail.goodsPrice*1.6+'rem';
        const differenceWith = (1-condiDetail.fundPrice/condiDetail.goodsPrice)*1.6+'rem';
        return(
            <div id="want" className="panel panel-default">
                { condiDetail.goodsModel &&
                    <div className="content">
                        <img className="headPic" role="presentation" src={condiDetail.headPic} />
                        <img className="good" role="presentation" src={condiDetail.goodsModel.pic} />
                        <div className="slide">
                            <div className="barOne" style={{ width: width}}></div>
                            <div className="barTwo" style={{ width: differenceWith}}></div>
                        </div>
                        <span className="totalPrice">总需{condiDetail.goodsPrice}元</span>
                        <span className="difference">还差{condiDetail.goodsPrice-condiDetail.fundPrice}元</span>
                        <span className="hasSponsorship">已有{condiDetail.userFundModels.length}位好友为TA赞助</span>
                        <ul>
                            {
                                condiDetail.userFundModels.map((friend,index)=>{
                                    return(
                                        <li key={index}>
                                            <div><img role="presentation" src={friend.userModel.headPic} /></div>
                                            <div>{friend.userModel.userName}</div>
                                            <div>
                                                <span>赞助{friend.price}元</span>
                                                <span>{friend.updateTime}分钟前</span>
                                            </div>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                        <button className="sponsorship" onClick={this.handleClick.bind(this,1,{
                             userId: condiDetail.userId,   //发起人的 userId
                             goodsId: condiDetail.goodsId,
                             ipAddress: '220.184.148.248',
                             openId: cookie.load('openId')
                        })}>我想给他赞助</button>
                        <button className="collect" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                        <button className="collect2" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        condiDetail: state.publicReducer.condiDetail
    }
}


export default connect(
    mapStateToProps, {fetchOrder}
)(WantToCollect);