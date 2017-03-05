/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {fetchList} from '../../actions/listAction'

import { Dialog } from 'react-weui';

import './index.css'

class InputInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            isSelectMale: false,
            isSelectFemale: false,
            classStrMale: 'male',
            classStrFemale: 'female',
            sexValue: 0   // 0-未选择  1-男  2-女
        }
    }


    handleClick(){
        console.log('提交')
        const { fetchList, isPostSuccess } = this.props;
        fetchList({
            type: 4,
            data: {
                name: '',
                sexValue: '',
                age: "",
                phone: '',
                address: ''
            }
        });
        if(isPostSuccess){
            location.hash='#/want'
        }
    }

    handleSelect(type, isSelect){
        if(type===1){
            if(isSelect){
                this.setState({
                    isSelectMale: true,
                    classStrMale: 'male select',
                    sexValue: 1,

                    isSelectFemale: false,
                    classStrFemale: 'female'
                })
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
                    classStrMale: 'male'
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


    render(){
        return(
            <div id="inputInfo" className="panel panel-default">
                <i className={this.state.classStrMale}
                   onClick={this.handleSelect.bind(this, 1,!this.state.isSelectMale)}
                />
                <i className={this.state.classStrFemale}
                   onClick={this.handleSelect.bind(this, 2,!this.state.isSelectFemale)}
                />

                <input type="text" className="name" />
                <input type="number" className="age"/>
                <input type="tel" className="phone"/>
                <textarea className="address"/>
                <button onClick={this.handleClick.bind(this)}>提交</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isPostSuccess: state.listReducer.isPostSuccess
    }
}

export default connect(
    mapStateToProps, {fetchList}
)(InputInfo);