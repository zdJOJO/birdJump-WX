/**
 * Created by Administrator on 2016/12/29 0029.
 */

import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers

import publicReducer from './public'
import listReducer from './list'

export default combineReducers({
    publicReducer,
    listReducer
})