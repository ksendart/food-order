import { Action } from '../actions';
import { State } from '../api/interfaces/state';
import adminState from './admin';
import userState from './user';

const reducer = (state: State | undefined, action: Action) => {
  return {
    admin: adminState(state, action),
    user: userState(state, action),
  };
}

export default reducer;
