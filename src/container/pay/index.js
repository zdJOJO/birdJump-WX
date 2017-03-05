/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';

import {Toast} from 'react-weui';

import './index.css'


const priceArray = [10,50,100,200,500,'其他金额'] ;
class Pay extends Component{

    constructor(props){
        super(props)
        this.state = {
            showLoading: false
        }
    }

    handleClick(price){

        this.setState({
            showLoading: true
        });

        setTimeout(()=>{
            location.hash='#/success'
        },1000)

        if(typeof (price)==='string'){
            console.log('其他金额')
        }else {
            console.log('所选金额：', price)
        }
    }

    render(){
        return(
            <div id="pay" className="panel panel-default">
                <Toast icon="loading" show={this.state.showLoading}>支付中...</Toast>
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

export default Pay;