import { Component } from 'react';
import { DayMenuList, MenuList } from './menu';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from '../utils';
import withAuthentication from './hoc/with-authentication';
import { connect } from 'react-redux';
import { State } from '../api/interfaces/state';
import { Link } from '@mui/material';

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
        <div className='link-list'><Link component={RouterLink} to="/logout">Log Out</Link></div>
        { role === 'admin' ?
          (<div className='link-list'>
              <Link component={RouterLink} to="/addPlate">Add plate to Menu</Link>
              <Link component={RouterLink} to="/orders">Open Orders</Link>
          </div>) : <Link component={RouterLink} to="/order">Open Order</Link> }
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
