import {
  call,
  put,
  spawn,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  FETCH_COMMENTS,
  FETCH_POSTS,
  FETCH_USERS,
  SEARCH_POSTS,
} from './constants';
import {
  fetchPostsSuccess,
  fetchPostsError,
  fetchUsersSuccess,
  fetchUsersError,
  fetchCommentsSuccess,
  fetchCommentsError,
  searchPostsSuccess,
  searchPostsError,
} from './actions';
import {
  makeSelectPosts,
  makeSelectComments,
  makeSelectUsers,
} from './selectors';
import axios from 'axios';
import { unsignedString } from 'utils/string';

export function* getPosts() {
  try {
    const posts = yield select(makeSelectPosts());

    if (Array.isArray(posts) && posts.length) return;

    const requestURL = `https://jsonplaceholder.typicode.com/posts`;
    const res = yield call(axios.get, requestURL);

    if (res && res.data) yield put(fetchPostsSuccess(res.data));
  } catch (err) {
    yield put(fetchPostsError(err));
  }
}

export function* getUsers() {
  try {
    const users = yield select(makeSelectUsers());

    if (Array.isArray(users) && users.length) return;

    const requestURL = `https://jsonplaceholder.typicode.com/users`;
    const res = yield call(axios.get, requestURL);

    if (res && res.data) yield put(fetchUsersSuccess(res.data));
  } catch (err) {
    yield put(fetchUsersError(err));
  }
}

export function* getComments(actions) {
  try {
    const { payload } = actions || {};
    const { id } = payload || {};
    const comments = yield select(makeSelectComments());

    if (comments[id]) {
      return;
    }

    const requestURL = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    const res = yield call(axios.get, requestURL);

    if (res && res.data)
      yield put(fetchCommentsSuccess({ postId: id, comments: res.data }));
  } catch (err) {
    yield put(fetchCommentsError(err));
  }
}

export function* searchPosts(actions) {
  const { payload } = actions || {};
  const { keyword } = payload || {};

  try {
    const posts = yield select(makeSelectPosts());

    if (!keyword || !Array.isArray(posts)) {
      yield put(searchPostsSuccess({ searchedPosts: [], isSearching: false }));
      return;
    }

    const unsignedKeyword = unsignedString(keyword).toLowerCase();

    const searchedPosts = posts.filter(
      p =>
        p &&
        typeof p.title == 'string' &&
        p.title.toLowerCase().includes(unsignedKeyword),
    );

    yield put(searchPostsSuccess({ searchedPosts, isSearching: true }));
  } catch (error) {
    yield put(searchPostsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPosts() {
  yield takeLatest(FETCH_POSTS, getPosts);
}
export function* watchGetUsers() {
  yield takeLatest(FETCH_USERS, getUsers);
}
export function* watchGetComments() {
  yield takeEvery(FETCH_COMMENTS, getComments);
}
export function* watchSearchPosts() {
  yield takeLatest(SEARCH_POSTS, searchPosts);
}

export default function* homeSaga() {
  yield spawn(watchGetPosts);
  yield spawn(watchGetUsers);
  yield spawn(watchGetComments);
  yield spawn(watchSearchPosts);
}
