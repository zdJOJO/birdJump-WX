/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';

import {fetchList} from '../../actions/listAction'
import {wxConfig} from '../../public/wx/wxConfig'

import './index.css'

class Detail extends Component{

    componentWillMount(){
        const { fetchList } = this.props;
        fetchList({
            type: 3,
            id: this.props.location.query.goodId
        });

        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 1,
            url: location.href.split('#')[0]
        })
    }

    handleClick() {
        console.log('购买');
        const { fetchList, goodPrice } = this.props;
        fetchList({
            type: 5,
            userId: cookie.load('userId'),
            goodId: this.props.location.query.goodId,
            goodPrice: goodPrice
        })
    }

    render(){
        const {goodInfo} = this.props;
        return(
            <div id="detail" className="panel panel-default">
                <img  role="presentation" src={goodInfo.pic}/>
                <span className="price">价格:{goodInfo.price}元</span>
                <span className="goodName"> 细节信息: {goodInfo.detail} </span>
                <button onClick={this.handleClick.bind(this)}>我要认购收藏</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        goodInfo:　state.listReducer.goodInfo,

       // goodId: state.publicReducer.goodId,
        goodPrice: state.publicReducer.goodPrice
    }
}

export default connect(
    mapStateToProps, {fetchList}
)(Detail);