/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  SEARCH_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_ERROR,
} from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  posts: [],
  users: [],
  comments: {},
  isSearching: false,
  searchedPosts: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { payload } = action || {};

    switch (action.type) {
      case FETCH_POSTS:
        draft.loading = true;
        draft.error = false;
        draft.posts = state.posts;
        break;

      case FETCH_POSTS_SUCCESS:
        draft.posts = action.posts;
        draft.loading = false;
        break;

      case FETCH_POSTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case FETCH_USERS:
        draft.users = state.users;
        break;

      case FETCH_USERS_SUCCESS:
        draft.users = action.users;
        break;

      case FETCH_USERS_ERROR:
        draft.error = action.error;
        break;

      case FETCH_COMMENTS:
        draft.comments = state.comments;
        break;

      case FETCH_COMMENTS_SUCCESS:
        const { postId, comments } = payload || {};

        draft.comments = { ...state.comments, [`${postId}`]: comments };

        break;

      case FETCH_COMMENTS_ERROR:
        draft.error = action.error;
        break;

      case SEARCH_POSTS:
        console.log('SEARCH_POSTS');
        draft.loading = true;
        draft.isSearching = true;
        draft.searchedPosts = [];
        break;

      case SEARCH_POSTS_SUCCESS:
        const { isSearching, searchedPosts } = payload || {};

        console.log('SEARCH_POSTS_SUCCESS', searchedPosts, isSearching);

        draft.loading = false;
        draft.isSearching = isSearching;
        draft.searchedPosts = searchedPosts;
        break;

      case SEARCH_POSTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

const persistConfig = {
  key: 'home',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['users', 'posts', 'comments'],
};

export default persistReducer(persistConfig, homeReducer);
