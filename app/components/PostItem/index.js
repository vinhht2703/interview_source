import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeSelectUsers,
  makeSelectComments,
} from 'containers/HomePage/selectors';
import { fetchComments } from 'containers/HomePage/actions';
import { createStructuredSelector } from 'reselect';
import { Comment, Tooltip, List, Tag } from 'antd';
import moment from 'moment';
import './styles.scss';

export function PostItem({ post, users, commentData, onFetchComments }) {
  const [isListOpen, openList] = useState(false);
  const [handledComments, updateComments] = useState([]);
  
  const { body, id, title, userId } = post || {};
  const foundedUser = Array.isArray(users) && users.find(u => u.id === userId);
  const { name } = foundedUser || {};
  const comments = commentData[id];

  useEffect(() => {
    onFetchComments({ id });
  }, []);

  useEffect(() => {
    if (Array.isArray(comments)) updateComments(handleComments(comments));
  }, [comments]);

  const handleComments = raw_comments => {
    if (!Array.isArray(raw_comments)) return [];

    return raw_comments.map(c => {
      const { name, body, id } = c || {};

      return {
        actions: [<span key={`comment-list-reply-to-${id}`}>Reply to</span>],
        author: name,
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{body}</p>,
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(1, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      };
    });
  };

  return (
    <div className="post-item card my-3">
      <div className="card-body">
        <h2 className="card-title text-center px-4">{title}</h2>
        <div className="card-subtitle my-3 text-muted row">
          <div className="col-7">
            <span>Author: {name}</span>
            <br />
            <span>Created at: Sep,20 2018</span>
          </div>
          <div className="col-5">
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
          </div>
        </div>
        <p className="post-body card-text">
          {(body || '').slice(0, 100) + '...'}
        </p>
        <div className="p-2">
          <List
            className="comment-list"
            header={
              <div
                className="comment-header"
                onClick={() => {
                  openList(!isListOpen);
                }}
              >
                {Array.isArray(handledComments) ? handledComments.length : 0}{' '}
                replies
              </div>
            }
            itemLayout="horizontal"
            dataSource={isListOpen ? handledComments : []}
            renderItem={item => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
}

PostItem.propTypes = {
  onFetchComments: PropTypes.func,
  users: PropTypes.array,
  commentData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  commentData: makeSelectComments(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchComments: payload => dispatch(fetchComments(payload)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostItem);
