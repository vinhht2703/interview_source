/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_POSTS = 'interview/Home/FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'interview/Home/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'interview/Home/FETCH_POSTS_ERROR';
export const FETCH_USERS = 'interview/Home/FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'interview/Home/FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'interview/Home/FETCH_USERS_ERROR';
export const FETCH_COMMENTS = 'interview/Home/FETCH_COMMENTS,';
export const FETCH_COMMENTS_SUCCESS = 'interview/Home/FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_ERROR = 'interview/Home/FETCH_COMMENTS_ERROR';
export const SEARCH_POSTS = 'interview/Home/SEARCH_POSTS';
export const SEARCH_POSTS_SUCCESS = 'interview/Home/SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_ERROR = 'interview/Home/SEARCH_POSTS_ERROR';
