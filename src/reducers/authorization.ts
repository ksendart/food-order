import { State } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';

const authorizationState = (state: State | undefined, action: Action) => {
  if (state === undefined) {
    return {
      isAuthorized: true,
      role: 'admin',
      name: 'default admin',
    };
  }
  switch (action.type) {
    case ActionType.AUTHORIZED:
      return {
        isAuthorized: true,
        role: action.payload.role,
        name: action.payload.login,
      };
    case ActionType.UNAUTHORIZED:
      return {
        isAuthorized: false,
        role: 'none',
        name: 'none',
      };
    default:
      return state.authorization;
  }
};

export default authorizationState;
