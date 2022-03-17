import { Component } from 'react';
import { unauthorized } from '../actions';
import withAuthService from './hoc/with-auth-service';
import { connect } from 'react-redux';
import { compose } from '../utils';
import { Navigate } from 'react-router-dom';

interface LogoutProps {
  unauthorize: () => void;
}

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.unauthorize();
  }

  render() {
    return (<Navigate to='/login'/>);
  }
}

// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { authService } = ownProps;
  return {
    unauthorize: () => {
      authService.logout()
        .then((role: string) => dispatch(unauthorized()));
    },
  }
}

export default compose(
  withAuthService(),
  connect(() => ({}), mapDispatchToProps)
)(Logout);
