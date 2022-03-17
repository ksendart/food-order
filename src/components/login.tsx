import { ChangeEvent, Component, FormEvent } from 'react';
import { State } from '../api/interfaces/state';
import {
  authorized,
} from '../actions';
import { connect } from 'react-redux';
import { compose } from '../utils';
import withAuthService from './hoc/with-auth-service';
import { Navigate } from 'react-router-dom';

interface LoginProps {
  login: string;
  password: string;
  isAuthorized: boolean;
  authorize: (login: string, password: string) => void
}

class Login extends Component<LoginProps> {
  state = {
    login: '',
    password: '',
  };

  render() {
    const { authorize, isAuthorized } = this.props;
    if (isAuthorized) {
      return <Navigate to={'/'}/>
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (this.state.login && this.state.password) {
        authorize(this.state.login, this.state.password);
      }
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <label>
            Login
            <input
              name="login"
              type="text"
              value={this.state.login}
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Log In"/>
        </form>
      </div>
    );
    // return ()
  }
}

const mapStateToProps = (state: State) => {
  const { isAuthorized, role } = state.authorization;
  return {
    isAuthorized,
    role,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { authService } = ownProps;
  return {
    authorize: (login: string, password: string) => {
      authService.login(login, password)
        .then((role: string) => dispatch(authorized(login, role)));
    },
  }
}

export default compose(
  withAuthService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
