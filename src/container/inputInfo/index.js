/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie'

import {fetchList} from '../../actions/listAction'
import {showError} from '../../actions/publicAction'
import {wxConfig} from '../../public/wx/wxConfig'

import { Dialog } from 'react-weui';

import './index.css'

class InputInfo extends Component{

    constructor(props){
        super(props);
        const { showError } = this.props;
        this.state = {
            isSelectMale: false,
            isSelectFemale: false,
            classStrMale: 'male',
            classStrFemale: 'female',
            sexValue: 0,   // 0-未选择  1-男  2-女
            data:{
                name: '',
                age: 0,
                phone: 0,
                address: ''
            },
            style1: {
                buttons: [
                    {
                        label: 'Ok',
                        onClick: ()=>{showError(false)}
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

    handleSelect(type, isSelect){
        if(type===1){
            if(isSelect){
                this.setState({
                    isSelectMale: true,
                    classStrMale: 'male select',
                    sexValue: 1,

                    isSelectFemale: false,
                    classStrFemale: 'female',
                });
            }else {
                this.setState({
                    isSelectMale: false,
                    classStrMale: 'male',
                    sexValue: 0,

                    isSelectFemale: false,
                    classStrFemale: 'female'
                })
            }
        }else {
            if(isSelect){
                this.setState({
                    isSelectFemale: true,
                    classStrFemale: 'female select',
                    sexValue: 2,

                    isSelectMale: false,
                    classStrMale: 'male',
                })
            }else {
                this.setState({
                    isSelectFemale: false,
                    classStrFemale: 'female',
                    sexValue: 0,

                    isSelectMale: false,
                    classStrMale: 'male'
                })
            }
        }
    }

    handleChange(type,event){
        if(type === 1){
            this.setState({
                data:{
                    ...this.state.data,
                    name: event.target.value
                }
            })
        }else if(type === 2){
            this.setState({
                data:{
                    ...this.state.data,
                    age: event.target.value
                }
            })
        }else if(type === 3){
            this.setState({
                data:{
                    ...this.state.data,
                    phone: event.target.value
                }
            })
        }else if(type === 4){
            this.setState({
                data:{
                    ...this.state.data,
                    address: event.target.value
                }
            })
        }else {

        }
    }

    handleSubmit(){
        const { fetchList, showError } = this.props;
        let data = {
            userId: cookie.load('userId'),
            name: this.state.data.name,
            gender: this.state.sexValue,
            age: this.state.data.age,
            phone: this.state.data.phone,
            address: this.state.data.address
        }
        if(!data.name || data.gender===0 ||  !data.age || !data.phone || !data.address){
            console.log('请正确填写信息');
            showError(true);
            return
        }
        fetchList({
            type: 4,
            data: data,
            goodId:  this.props.location.query.goodId
        });
    }

    render(){
        const { isShowError } = this.props;
        return(
            <div id="inputInfo" className="panel panel-default">

                <Dialog type="ios"
                        title='提示'
                        buttons={this.state.style1.buttons}
                        show={isShowError}
                >请正确填写信息</Dialog>

                <i className={this.state.classStrMale}
                   onClick={this.handleSelect.bind(this, 1,!this.state.isSelectMale)}
                />
                <i className={this.state.classStrFemale}
                   onClick={this.handleSelect.bind(this, 2,!this.state.isSelectFemale)}
                />

                <input type="text" className="name" onChange={this.handleChange.bind(this, 1)}/>
                <input type="number" className="age" onChange={this.handleChange.bind(this, 2)}/>
                <input type="tel" className="phone"  onChange={this.handleChange.bind(this, 3)}/>
                <textarea className="address"  onChange={this.handleChange.bind(this, 4)}/>
                <button onClick={this.handleSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isPostSuccess: state.listReducer.isPostSuccess,

        isShowError: state.publicReducer.isShowError
    }
}

export default connect(
    mapStateToProps, {
        fetchList, showError
    }
)(InputInfo);