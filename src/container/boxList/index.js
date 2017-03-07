/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

import {Button, Toast} from '../../../src/index';

import {timestampFormat} from '../../public/index';
import {fetchList} from '../../actions/listAction';
import {setFolderId} from '../../actions/publicAction';

import './index.css'
import {wxConfig} from '../../public/wx/wxConfig'

class BoxList extends Component{

    componentWillMount(){
        const {setFolderId, fetchList} = this.props;
        setFolderId('');
        fetchList({
            type: 1    
        })

        //微信 分享
        wxConfig({
            typeStr: 'share',
            type: 1,
            url: location.href.split('#')[0]
        })
    }

    handleClick(id, num, status){
        const { setFolderId } = this.props;
        console.log('您选择的是:', id);
        setFolderId(id, num, status);
        hashHistory.push({
            pathname: '/detailList',
            query: {
                folderId: id
            }
        })
    }

    render(){
        const { collectionList } = this.props;
        return(
            <div id="boxList" className="panel panel-default">
                <ul>
                    {
                        collectionList.map((collection,index)=>{
                            return(
                                <li key={index} onClick={this.handleClick.bind(this, collection.id, index+1, collection.status)}>
                                    { collection.startTime > new Date().getTime()/1000 &&
                                        <span className="mask"/>
                                    }
                                    <span className="first">掌柜</span>
                                    <img role="presentation" src={collection.pic}/>
                                    <span className="openDate">{timestampFormat(collection.startTime)}</span>
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
        collectionList:　state.listReducer.collectionList
    }
}

export default connect(
    mapStateToProps,
    {
        fetchList, setFolderId
    }
)(BoxList);