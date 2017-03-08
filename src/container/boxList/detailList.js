/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

import {fetchList} from '../../actions/listAction'
import {setFolderId, setGoodId} from '../../actions/publicAction'
import {wxConfig} from '../../public/wx/wxConfig'

import {Dialog} from 'react-weui'

import './index.css'

class DetailList extends Component{

    constructor(props){
        super(props)
        this.state = {
            status: 0,
            showIOS1: false,
            style1: {
                title: '提示',
                buttons: [
                    {
                        label: '知道了',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            }
        }
    }

    hideDialog(){
        this.setState({
            showIOS1: false,
        });
    }

    componentWillMount(){
        const { fetchList , setGoodId, collectionList} = this.props;

        if(collectionList.length === 0){
            history.back(-1);
        }else {
            fetchList({
                type: 2,
                id: this.props.location.query.folderId
            });

            setGoodId('')
        }

        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 1,
            url: location.href.split('#')[0]
        })
    }

    handleClick(obj,status){
        const { setGoodId,folderId } = this.props;

        if(status === 1){
            this.setState({
                status: 1,
                showIOS1: true
            });
            return
        }
        if(status === 3){
            this.setState({
                status: 3,
                showIOS1: true
            });
            return
        }

        console.log('您选择的众筹商品是:', obj.goodId, obj.goodPrice);
        setGoodId(obj);
        hashHistory.push({
            pathname: '/detail',
            query: {
                folderId: folderId,
                goodId: obj.goodId
            }
        })
    }

    render(){
        const { goodList, number, collectionList } = this.props;
        return(
            <div id="detailList" className="panel panel-default">

                <Dialog type="ios" title={this.state.style1.title}
                        buttons={this.state.style1.buttons}
                        show={this.state.showIOS1}
                >
                    { this.state.status === 1 &&
                        <span>还未开放</span>
                    }
                    { this.state.status === 3 &&
                        <span>已结束</span>
                    }
                </Dialog>


                { collectionList.length > 0 &&
                    <img className="headPic" role="presentation" src={collectionList[number-1].pic} />
                }
                <span className="number">
                    {numberToWord(number)}
                </span>
                <ul>
                    {
                        goodList.map((good,index)=>{
                           return(
                               <li key={index}  onClick={this.handleClick.bind(this,{goodId:good.id, goodPrice: good.price}, good.status)}>
                                  <img role="presentation" src={good.logoPic}/>
                               </li>
                           )
                        })
                    }
                </ul>
            </div>
        )
    }
}


const numberToWord = (num)=>{
    let numStr = '';
    switch (num){
        case 1:
            return numStr='一';
        case 2:
            return numStr='二';
        case 3:
            return numStr='三';
        case 4:
            return numStr='四';
        case 5:
            return numStr='五';
        case 6:
            return numStr='六';
        case 7:
            return numStr='七';
        case 8:
            return numStr='八';
        case 9:
            return numStr='九';
        case 10:
            return numStr='十';
        default:
            return numStr;
    }
}




function mapStateToProps(state) {
    return{
        collectionList: state.listReducer.collectionList,
        goodList:　state.listReducer.goodList,

        folderId: state.publicReducer.folderId,
        number: state.publicReducer.number,
    }
}

export default connect(
    mapStateToProps, {
        fetchList, setFolderId, setGoodId
    }
)(DetailList);