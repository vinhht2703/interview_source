/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

const makeSelectPosts = () =>
  createSelector(
    selectHome,
    homeState => homeState.posts,
  );

const makeSelectComments = () =>
  createSelector(
    selectHome,
    homeState => homeState.comments,
  );

const makeSelectUsers = () =>
  createSelector(
    selectHome,
    homeState => homeState.users,
  );

const makeSelectSearchedPosts = () =>
  createSelector(
    selectHome,
    homeState => homeState.searchedPosts,
  );

const makeSelectIsSearching = () =>
  createSelector(
    selectHome,
    homeState => homeState.isSearching,
  );

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
  makeSelectUsers,
  makeSelectComments,
  makeSelectSearchedPosts,
  makeSelectIsSearching,
};
