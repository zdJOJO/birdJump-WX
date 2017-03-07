/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {Dialog, Input} from 'react-weui';

import { fetchOrder } from '../../actions/payAciton'
import {wxConfig} from '../../public/wx/wxConfig'

import './index.css'


const priceArray = [10,50,100,200,500,'其他金额'] ;
class Pay extends Component{

    constructor(props){
        super(props);
        const { fetchOrder } = this.props;
        this.state = {
            showInput: false,
            price: 0,
            style2: {
                title: '金额(单位:元)',
                buttons: [
                    {
                        type: 'default',
                        label: 'Cancel',
                        onClick: this.hideDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: 'Ok',
                        onClick: ()=>{
                            if(!this.state.price) return
                            fetchOrder({
                                type: 1,
                                data: {
                                    userId: this.props.location.query.userId,   //发起人的 userId
                                    goodsId: this.props.location.query.goodsId,
                                    ipAddress: this.props.location.query.ipAddress,
                                    openId: this.props.location.query.openId,
                                    price: parseFloat(this.state.price)
                                }
                            })
                        }
                    }
                ]
            }
        }
    }

    componentWillMount(){
        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 1,
            url: location.href.split('#')[0]
        })
    }

    hideDialog(){
        this.setState({
            showInput: false
        });
    }

    handleChange(event){
        this.setState({
            price: event.target.value
        });
    }

    handleClick(price){
        const { fetchOrder } = this.props;
        if(typeof (price)==='string'){
            console.log('其他金额')
            this.setState({
                showInput: true
            })
        }else {
            console.log('所选金额：', price)
            fetchOrder({
                type: 1,
                data: {
                    userId: this.props.location.query.userId,   //发起人的 userId
                    goodsId: this.props.location.query.goodsId,
                    ipAddress: this.props.location.query.ipAddress,
                    openId: this.props.location.query.openId,
                    price: price
                }
            })
        }
    }

    render(){
        return(
            <div id="pay" className="panel panel-default">
                <Dialog type="ios"
                        title={this.state.style2.title}
                        buttons={this.state.style2.buttons}
                        show={this.state.showInput}
                >
                    <Input type="number"
                           placeholder="请输入众筹金额"
                           onChange={this.handleChange.bind(this)}
                    />
                </Dialog>
                <ul className="price">
                    {
                        priceArray.map((price,index)=>{
                            return(
                                <li key={index} onClick={this.handleClick.bind(this, price)}>
                                    {price}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return{
        
    }
}

export default connect(
    mapStateToProps,{ fetchOrder }
)(Pay);