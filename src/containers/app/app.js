import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import Login from './../../components/Login/Login';
import { 
  fetchUser,
} from './../../actions/user';
import MenuMap from './../../utils/menuMap';

const SubMenu = Menu.SubMenu;

import './app.css';

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUser();
  }

  componentWillMount() {
    this.setState({
      openKeys: MenuMap[location.pathname] && MenuMap[location.pathname].parents
    })
  }

  renderUserInfo(user) {
    return (
      <div className="user-info-wrap">
        { user.username }
        <a className="logout-button" href={ user.logout_url }>退出</a>
      </div>
    );
  }

  state = {
    current: (MenuMap[location.pathname] && MenuMap[location.pathname].value) || '1',
    openKeys: [1],
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  };

  getAncestorKeys = (key) => {
    const map = {};
    return map[key] || [];
  };

  render() {
    const user = this.props.user.data;

    return (
      <div className="ant-layout-aside" style={{ height: document.body.clientHeight }}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"/>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}

            openKeys={this.state.openKeys}
            selectedKeys={[this.state.current]}
            onOpenChange={this.onOpenChange}
            onClick={this.handleClick}
          >
            <SubMenu key="sub1" title={<span><Icon type="appstore" />业务中心</span>}>
              <Menu.Item key="1">
                <Link to={'/'}>
                  <Icon type="pie-chart" />
                  仪表盘
                </Link>
              </Menu.Item>
              
            </SubMenu>
          </Menu>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
            { user.username ? this.renderUserInfo(user) : <Login/> }
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content" style={{ maxHeight: (document.body.clientHeight - 64)}}>
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer" style={{ display: 'none' }}>
            ReactKit
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (params) => dispatch(fetchUser(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);