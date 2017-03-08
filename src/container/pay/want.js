/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';

import { fetchOrder } from '../../actions/payAciton'
import { showError,showDone } from '../../actions/publicAction'
import {GetQueryString, timeAgoTransForm } from '../../public/index'

import {Dialog, Popup} from 'react-weui'

import './index.css'
import done from '../../img/done.png'
import code from '../../img/code.png'

class WantToCollect extends Component{

    constructor(props){
        super(props)
        const {showError} = this.props
        this.state = {
            showIOS1: false,
            style1: {
                title: '提示',
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{showError(false)}
                    }
                ]
            }
        }
    }

    componentWillMount(){
        const { fetchOrder } = this.props;

        if(window.location.search.indexOf('isShare') > 0 ){    //分享获取详情
            let openId = GetQueryString('openId');
            let condiId = GetQueryString('condiId');
            let selfUserId = GetQueryString('userId');
            cookie.save('openId', openId);
            cookie.save('userId', selfUserId);
            fetchOrder({
                type: 2,
                condiId: condiId
            })
        }else if(this.props.location.query.isLook==='1'){
            // 获取condiId
            fetchOrder({
                type: 3,
                userId: cookie.load('userId'),
                goodsId:  this.props.location.query.goodId
            })
        }else {
            // 自己form表单提交之后， 获取 condiId 获取详情
            fetchOrder({
                type: 2,
                condiId: cookie.load('condiId')
            })
        }

    }


    handleClick(type,obj){
        if(type===1){
            if(obj.diffrencePrice <=0){
                return
            }
            //我想给他赞助
            console.log('我想给他赞助');
            hashHistory.push({
                pathname: '/pay',
                query: obj
            });
        }else {
            //我也想收藏一套
            console.log('我也想收藏一套');
            location.hash='#/list'
        }
    }

    render(){
        const { condiDetail, isShowError, errorStr, isShowDone,showDone } = this.props;
        let width = condiDetail.fundPrice/condiDetail.goodsPrice*1.6+'rem';
        let differenceWith = (1-condiDetail.fundPrice/condiDetail.goodsPrice)*1.6+'rem';
        if(1-condiDetail.fundPrice/condiDetail.goodsPrice <= 0){
            width = '1.6rem';
            differenceWith = 0 + 'rem';
        }
        return(
            <div id="want" className="panel panel-default">

                <Dialog type="ios" title={this.state.style1.title}
                        buttons={this.state.style1.buttons}
                        show={isShowError}
                >
                    {errorStr}
                </Dialog>


                { isShowDone &&
                    <div id="success" className="panel panel-default">
                        <button onClick={()=>{showDone(false)}}>我的认购收藏</button>
                    </div>
                }


                { condiDetail.goodsModel &&
                    <div className="content">
                        <img className="headPic" role="presentation" src={condiDetail.headPic} />
                        <img className="good" role="presentation" src={condiDetail.goodsModel.pic} />
                        { (condiDetail.goodsPrice-condiDetail.fundPrice<=0 && condiDetail.status===1) &&
                            <img className="success" role="presentation" src={done} />
                        }
                        { (condiDetail.goodsPrice-condiDetail.fundPrice<=0 && condiDetail.status===0) &&
                            <span className="unSuccess">很遗憾,慢了一步</span>
                        }
                        <div className="slide">
                            <div className="barOne" style={{ width: width}}></div>
                            <div className="barTwo" style={{ width: differenceWith}}></div>
                        </div>
                        <span className="totalPrice">总需{condiDetail.goodsPrice}元</span>
                        <span className="difference">
                            {
                                (condiDetail.goodsPrice-condiDetail.fundPrice<=0) ? '已完成'
                                    : '还差'+(condiDetail.goodsPrice-condiDetail.fundPrice).toFixed(2)+'元'
                            }
                        </span>
                        <span className="hasSponsorship">已有{condiDetail.userFundModels.length}位好友为TA赞助</span>
                        <ul>
                            {
                                condiDetail.userFundModels.map((friend,index)=>{
                                    return(
                                        <li key={index}>
                                            <div><img role="presentation" src={friend.userModel.headPic} /></div>
                                            <div>{friend.userModel.userName}</div>
                                            <div>
                                                <span>赞助{friend.price}元</span><br/>
                                                <span>{timeAgoTransForm(friend.updateTime)}</span>
                                            </div>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                        <button className="sponsorship" onClick={this.handleClick.bind(this,1,{
                             userId: condiDetail.userId,   //发起人的 userId
                             goodsId: condiDetail.goodsId,
                             ipAddress: window.returnCitySN.cip,
                             openId: cookie.load('openId'),
                             diffrencePrice: condiDetail.goodsPrice-condiDetail.fundPrice
                        })}>我想给他赞助</button>
                        <button className="collect" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                        <button className="collect2" onClick={this.handleClick.bind(this,2)}>我也想收藏一套</button>
                        <img  className="code" src={code} role="presentation" />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        condiDetail: state.publicReducer.condiDetail,

        isShowDone: state.publicReducer.isShowDone,
        isShowError: state.publicReducer.isShowError,
        errorStr: state.publicReducer.errorStr,

        goodId: state.publicReducer.goodId
    }
}


export default connect(
    mapStateToProps, {fetchOrder, showError, showDone}
)(WantToCollect);