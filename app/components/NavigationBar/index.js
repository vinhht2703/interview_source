import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import { searchPosts } from 'containers/HomePage/actions';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import _debounce from 'lodash/debounce';
import { makeSelectLocation } from 'containers/App/selectors';

const { Search } = Input;

function NavigationBar(props) {
  const { onSearchPosts, location } = props || {};
  const { pathname } = location || {};
  const fullName = 'Huynh Tan Vinh';

  const debounceLoadData = useCallback(
    _debounce(keyword => onSearchPosts({ keyword }), 300),
    [],
  );

  function onChange(event) {
    const { value: keyword } = event.target;

    debounceLoadData(keyword);
  }

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <div className="row w-100">
          <div className="col-5 d-flex align-items-center">
            <Link to="/">
              <span className="navbar-brand pl-3">Logo</span>
            </Link>
            {pathname === '/' ? (
              <Search
                className="d-none d-sm-block"
                placeholder="Search posts here..."
                // onSearch={onSearch}
                onChange={onChange}
                allowClear
              />
            ) : null}
          </div>
          <div className="col-2">
            <Link className="d-flex justify-content-center" to="/">
              <h4 className="navbar-text mb-0">Blogs</h4>
            </Link>
          </div>
          <div className="col-5 pr-0">
            <Link className="d-flex justify-content-end row">
              <div className="col-6 pr-0 d-flex justify-content-end">
                <Avatar shape="square" size={'large'} icon={<UserOutlined />} />
              </div>
              <div className="navbar-text text-truncate col-6" title={fullName}>
                {fullName}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

NavigationBar.propTypes = {
  onSearchPosts: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSearchPosts: payload => dispatch(searchPosts(payload)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationBar);
