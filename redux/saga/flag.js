import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../../api/flag'

function* addFlag(action) {
    console.log('saga-addFlag-parameter: ', action);
    // yield call(api.post, action.payload)
    // yield put({ type: "ADD_FLAG_SUCCEEDED", payload: action.payload });
    
    try{
      yield call(api.post, action.payload)
      yield put({type:"ADD_FLAG_SUCCEEDED", payload: action.payload});  
    } catch (error) {
      yield put({type:"SHOW_ALERT", msg:"mtnList.json파일 flag에 이미 존재합니다"});  
    }  
    // yield put({type:"SHOW_ALERT", msg:error.message});  
}

function* fetchFlags(action) {
    console.log('saga-fetchFlags-parameter: ', action);
    const result = yield call(api.list);
    console.log(result.data);
    yield put({ type: 'FETCH_FLAGS_SUCCEEDED', payload: result.data })
}

function* removeFlag(action) {
    console.log('saga-removeFlag-parameter: ', action);
    yield call(api.delete, action.payload.id)
    yield put({ type: 'REMOVE_FLAG_SUCCEEDED', payload: action.payload })
}

function* flagSaga() {
    yield takeEvery("ADD_FLAG", addFlag)
    yield takeLatest("FETCH_FLAGS", fetchFlags);
    yield takeEvery("REMOVE_FLAG", removeFlag);
}

export default flagSaga