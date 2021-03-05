/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectPosts,
  makeSelectLoading,
  makeSelectError,
  makeSelectUsers,
  makeSelectIsSearching,
  makeSelectSearchedPosts,
} from './selectors';
import { fetchPosts, fetchUsers } from './actions';
import reducer from './reducer';
import saga from './saga';
import PostComponent from 'components/PostItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from 'antd';

const key = 'home';
const limit = 15;

export function HomePage({
  onFetchUsers,
  onFetchPosts,
  posts,
  users,
  loading,
  searchedPosts,
  isSearching,
}) {
  const [curPage, updatePage] = useState(1);
  const [curPosts, updatePosts] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onFetchPosts();
    onFetchUsers();
  }, []);

  useEffect(() => {
    updatePage(1);
    updatePosts([]);
    if (isSearching) {
      setPostsData(searchedPosts);
    } else {
      setPostsData(posts);
    }
  }, [searchedPosts, posts]);

  useEffect(() => {
    if (Array.isArray(postsData)) {
      updatePosts(postsData.slice(0, limit));
    }
  }, [postsData]);

  useEffect(() => {
    if (
      typeof curPage === 'number' &&
      curPage !== 1 &&
      Array.isArray(postsData)
    ) {
      const updatedPosts = [
        ...curPosts,
        ...postsData.slice((curPage - 1) * limit, limit * curPage),
      ];

      updatePosts(updatedPosts);
    }
  }, [curPage]);

  const _renderPosts = () => {
    return curPosts.map(post => {
      return <PostComponent post={post} users={users} />;
    });
  };

  return (
    <div className="container">
      {Array.isArray(postsData) && postsData.length ? (
        <InfiniteScroll
          dataLength={curPosts.length}
          hasMore={curPosts.length < postsData.length}
          next={() => updatePage(curPage + 1)}
          loader={
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {_renderPosts()}
        </InfiniteScroll>
      ) : !loading ? (
        <div className="">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      ) : null}
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  searchedPosts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onFetchPosts: PropTypes.func,
  onFetchUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  users: makeSelectUsers(),
  searchedPosts: makeSelectSearchedPosts(),
  loading: makeSelectLoading(),
  isSearching: makeSelectIsSearching(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchPosts: evt => {
      dispatch(fetchPosts());
    },
    onFetchUsers: evt => {
      dispatch(fetchUsers());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
