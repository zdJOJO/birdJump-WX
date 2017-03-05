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

    handleClick(id){
        const { setGoodId } = this.props;
        console.log('您选择的众筹商品是:', id);
        setGoodId(id);
        location.hash = '#/detail'
    }

    render(){
        const { goodList, number, status } = this.props;
        return(
            <div id="detailList" className="panel panel-default">
                <span className="number">
                    {number<9 ? '0'+number : number}
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
                               <li key={index}  onClick={this.handleClick.bind(this,good.id)}>
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