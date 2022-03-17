import { Action } from '../actions';
import { State } from '../api/interfaces/state';
import adminState from './admin';
import userState from './user';
import authorizationState from './authorization';

const reducer = (state: State | undefined, action: Action) => {
  return {
    admin: adminState(state, action),
    user: userState(state, action),
    authorization: authorizationState(state, action),
  };
}

export default reducer;
