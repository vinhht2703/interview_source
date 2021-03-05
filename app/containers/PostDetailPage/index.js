import React, { useEffect, useState } from 'react';
import PostComponent from 'components/PostItem';
import { makeSelectPosts } from 'containers/HomePage/selectors';
import { fetchPosts, fetchUsers } from 'containers/HomePage/actions';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import reducer from 'containers/HomePage/reducer';
import saga from 'containers/HomePage/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const key = 'home';

function PostDetail(props) {
  const [curPost, setPost] = useState(null);
  const { match, onFetchPosts, onFetchUsers, posts } = props || {};
  const { params } = match || {};
  const { id } = params || {};

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (typeof onFetchPosts == 'function') onFetchPosts();
    if (typeof onFetchUsers == 'function') onFetchUsers();
  }, []);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const foundedPost = posts.find(p => p.id == id);

      if (foundedPost) setPost(foundedPost);
    }
  }, [posts]);

  return (
    <div className="container">
      <PostComponent post={curPost} type="detail" />
    </div>
  );
}

PostDetail.propTypes = {
  location: PropTypes.object,
  posts: PropTypes.array,
  onFetchPosts: PropTypes.func,
  onFetchUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
