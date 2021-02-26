import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../../api/likes'

function* addLike(action) {
  console.log('saga-addLike-parameter: ', action);
  // yield call(api.post, action.payload)
  // yield put({type:"ADD_LIKE_SUCCEEDED", payload: action.payload});  
  
  try{
    yield call(api.post, action.payload)
    yield put({type:"ADD_LIKE_SUCCEEDED", payload: action.payload});  
  } catch (error) {
    yield put({type:"SHOW_ALERT", msg:"mtnList.json파일 likes에 이미 존재합니다"});  
  }  
}

function* fetchLikes(action) {
  console.log('saga-fetchLikes-parameter: ', action);
  const result = yield call(api.list);
  console.log(result.data);
  yield put({ type: 'FETCH_LIKES_SUCCEEDED', payload: result.data })
}

function* removeLike(action) {
  console.log('saga-removeLike-parameter: ', action);
  yield call(api.delete, action.payload.id)
  yield put({ type: 'REMOVE_LIKE_SUCCEEDED', payload: action.payload })
}

function* likeSaga() {
  yield takeEvery("ADD_LIKE", addLike)
  yield takeLatest("FETCH_LIKES", fetchLikes);
  yield takeEvery("REMOVE_LIKE", removeLike);
}

export default likeSaga