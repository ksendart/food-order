import { Component } from 'react';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../api/interfaces/state';

interface AuthenticatedProps {
  isAuthorized: boolean;
}

const withAuthentication = () => (Wrapped: Component) => {
  class Authenticated extends Component<AuthenticatedProps> {
    render () {
      const { isAuthorized } = this.props;
       return (
        <div>
          {isAuthorized
            // @ts-ignore
            ? <Wrapped/>
            : <Navigate to={'/login'}/>
          }
        </div>
      )

    }
  }
  const mapStateToProps = (state: State) => ({
    isAuthorized: state.authorization.isAuthorized,
  });
  return connect(mapStateToProps)(Authenticated);
}

export default withAuthentication;
