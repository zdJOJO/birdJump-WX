/**
 * Created by Administrator on 2017/03/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {fetchList} from '../../actions/listAction'
import {setGoodId} from '../../actions/publicAction'

import './index.css'

class DetailList extends Component{

    componentWillMount(){
        const { fetchList, folderId, setGoodId } = this.props;
        if(!folderId) {
            history.back(-1);
        }else {
            fetchList({
                type: 2,
                id: folderId
            });
            setGoodId('')
        }
    }

    handleClick(obj){
        const { setGoodId } = this.props;
        console.log('您选择的众筹商品是:', obj.goodId, obj.goodPrice);
        setGoodId(obj);
        location.hash = '#/detail'
    }

    render(){
        const { goodList, number, status } = this.props;
        return(
            <div id="detailList" className="panel panel-default">
                <span className="number">
                    {numberToWord(number)}
                </span>
                { status > 1 &&
                    <span className="mask">
                        { status === 2 ? '还未开放' : '已结束' }
                    </span>
                }
                <ul>
                    {
                        goodList.map((good,index)=>{
                           return(
                               <li key={index}  onClick={this.handleClick.bind(this,{goodId:good.id, goodPrice: good.price})}>
                                  <img role="presentation" src={good.pic}/>
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
        goodList:　state.listReducer.goodList,

        folderId: state.publicReducer.folderId,
        number: state.publicReducer.number,
        status: state.publicReducer.status
    }
}

export default connect(
    mapStateToProps, {
        fetchList, setGoodId
    }
)(DetailList);