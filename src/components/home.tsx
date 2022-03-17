import { Component } from 'react';
import { DayMenuList, MenuList } from './menu';
import { Link } from 'react-router-dom';
import { compose } from '../utils';
import withAuthentication from './hoc/with-authentication';
import { connect } from 'react-redux';
import { State } from '../api/interfaces/state';

interface HomeProps {
  name: string,
  role: string,
}

class Home extends Component<HomeProps> {
  day = 0;

  render() {
    const { name, role } = this.props;
    return (
      <div>
        <h2>Menu for {name}, your role is {role}</h2>
        <Link to="/logout">Log Out</Link>
        <br/>
        <Link to="/order">Open Order</Link>
        { role === 'admin' ? <MenuList/> : <DayMenuList/> }
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  const { isAuthorized, role, name } = state.authorization;
  return {
    isAuthorized,
    role,
    name,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default compose(
  withAuthentication(),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
