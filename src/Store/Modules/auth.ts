/**
 * Defines redux state handling for documents
 */
import { Dispatcher } from "../types";

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */
export interface StateProps {
  authToken: string | undefined;
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  authToken: localStorage.getItem('authToken') || undefined
};

/**
 * Action types
 * ---------------------------------------------------------------------
 */

enum Action {
  AUTH_LOGOUT = "auth/logout",
  AUTH_SET_TOKEN = "auth/set-token",
}

interface ActionProps {
  type: Action;
  payload?: StateProps;
}

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = (
  state: StateProps = initialState,
  action: ActionProps
): StateProps => {
  switch (action.type) {
    case Action.AUTH_LOGOUT: {
      return initialState;
    }
    case Action.AUTH_SET_TOKEN: {
        // console.log('slice',action.payload?.authToken);
        localStorage.setItem('authToken', JSON.stringify(action.payload?.authToken));
      return {
        ...state,
        authToken: action.payload?.authToken,
      };
    }
    default: {
      return state;
    }
  }
};

/**
 * Actions
 * ---------------------------------------------------------------------
 */

/**
 * Reset all properties
 * @param dispatch
 */
export const getToken = (dispatch: Dispatcher<StateProps>): void => {
  dispatch({
    type: Action.AUTH_LOGOUT,
  });
};

/**
 * Refresh session / validity state
 * @param dispatch
 */
export const setToken = (
  dispatch: Dispatcher<StateProps>,
  authToken: StateProps["authToken"]
): void => {
  dispatch({
    type: Action.AUTH_SET_TOKEN,
    payload: {
      authToken,
    },
  });
};
