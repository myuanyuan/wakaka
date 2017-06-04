import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Icon, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import PropTypes from 'prop-types';
import Login from './../../components/Login/Login';
import { 
  fetchUser,
  fetchFeatures
} from './../../actions/user';
import MenuMap from './../../utils/menuMap';

const SubMenu = Menu.SubMenu;

import './app.css';

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
    fetchFeatures: PropTypes.func,
    features: PropTypes.object,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUser();
    this.props.fetchFeatures();
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
    console.log('this.props===>',this.props);
    // const menus = this.props.features.data;
    const menus = [
      { name: '导航1', path: '/'},
      { name: '导航2', path: '/nav2'},
      { name: 'Dashboard', path: '/dashboard'}
    ];

    const menuItems = menus.map((menu, index) =>
      <Menu.Item key={ index }>
        <Link to={menu.path}>
          <Icon type="pie-chart" />
          { menu.name }
        </Link>
      </Menu.Item>
    );

    return (
      <div>
        <Layout>
          <Header>
            <div className="logo2"/>
            <Menu
               theme="dark"
               mode="horizontal"
               defaultSelectedKeys={['0']}
               style={{ lineHeight: '64px' }}
            >
              { menuItems }
            </Menu>
          </Header>
          <Content style={{ height: document.body.clientHeight - 64 }} >
            {this.props.children}
          </Content>
        </Layout>
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  const { user, features } = state;
  return {
    user,
    features
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (params) => dispatch(fetchUser(params)),
    fetchFeatures: (params) => dispatch(fetchFeatures(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);