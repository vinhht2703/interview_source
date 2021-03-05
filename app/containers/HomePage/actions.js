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

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts,
  };
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    error,
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users,
  };
}

export function fetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
}

export function fetchComments(payload) {
  return {
    payload,
    type: FETCH_COMMENTS,
  };
}

export function fetchCommentsSuccess(payload) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload,
  };
}

export function fetchCommentsError(error) {
  return {
    type: FETCH_COMMENTS_ERROR,
    error,
  };
}

export function searchPosts(payload) {
  return {
    payload,
    type: SEARCH_POSTS,
  };
}

export function searchPostsSuccess(payload) {
  return {
    type: SEARCH_POSTS_SUCCESS,
    payload,
  };
}

export function searchPostsError(error) {
  return {
    type: SEARCH_POSTS_ERROR,
    error,
  };
}
