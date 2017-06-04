import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  fetchLandInfo, 
} from './../../actions/dashboard';
import './dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    fetchLandInfo: PropTypes.func,
  }

  componentDidMount() {
    // this.props.fetchLandInfo();
  }

  render() {
    // const { dashboard: { data } } = this.props;

    return (
      <div className="dashboard-wrap" >
        <h1>Hello Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { landInfo } = state;
  return {
    landInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  // bindActionCreators(ActionCreators, dispatch)
  return {
    fetchLandInfo: (params) => dispatch(fetchLandInfo(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
