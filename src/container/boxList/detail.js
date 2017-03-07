/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';

import {fetchList} from '../../actions/listAction'
import {showError} from '../../actions/publicAction'
import {wxConfig} from '../../public/wx/wxConfig'

import {Dialog, Gallery} from 'react-weui'

import './index.css'

class Detail extends Component{

    constructor(props){
        super(props)
        const {showError} = this.props
        this.state = {
            gallery: false,
            showGallery: false,
            showIOS1: false,
            style1: {
                title: '提示',
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{
                            showError(false)
                        }
                    }
                ]
            },
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '知道了',
                        onClick: ()=>{
                            showError(false)
                        }
                    },
                    {
                        type: 'primary',
                        label: '去看看',
                        onClick: ()=>{
                            showError(false)
                            window.location.href = 'http://fund.mahayanamedia.com/birdJump/#/want?isLook=1&goodId='+this.props.location.query.goodId;
                        }
                    }
                ]
            }
        }
    }

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
        const {goodInfo, isShowError, errorStr} = this.props;
        return(
            <div id="detail" className="panel panel-default">

                <Dialog type="ios" title={this.state.style1.title}
                        buttons={ errorStr==="您已参加该商品的众筹"?this.state.style2.buttons:this.state.style1.buttons}
                        show={isShowError}
                >
                    {errorStr}
                </Dialog>

                <Gallery src={goodInfo.pic} show={this.state.gallery}  onClick={()=>{this.setState({gallery: false})}} />

                <img  role="presentation" src={goodInfo.pic}
                      onClick={()=>{this.setState({gallery: true})}}
                />
                <span className="price">价格:{goodInfo.price}元</span>
                <span className="goodName"> 含: {goodInfo.detail} </span>
                <span className="place"> 经典场景: {goodInfo.place} </span>
                <button onClick={this.handleClick.bind(this)}>我要认购收藏</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        goodInfo:　state.listReducer.goodInfo,

       // goodId: state.publicReducer.goodId,
        goodPrice: state.publicReducer.goodPrice,
        isShowError: state.publicReducer.isShowError,
        errorStr: state.publicReducer.errorStr
    }
}

export default connect(
    mapStateToProps, {fetchList, showError}
)(Detail);