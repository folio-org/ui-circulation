import {
  ADD_TOKEN,
  REMOVE_TOKEN,
  RESET_TOKENS,
  SETUP_SECTION,
  TOGGLE_LOOP,
} from './actionTypes';

const tokensReducer = (state, { type, payload }) => {
  switch (type) {
    case SETUP_SECTION:
      return {
        ...state,
        [payload.section]: {
          tokens: [],
          isLoopSelected: false,
          tag: payload.tag,
        },
      };
    case ADD_TOKEN:
      return {
        ...state,
        [payload.section]: {
          ...state[payload.section],
          tokens: [...state[payload.section].tokens, payload.token],
        },
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        [payload.section]: {
          ...state[payload.section],
          tokens: state[payload.section].tokens.filter((token) => token !== payload.token),
        },
      };
    case TOGGLE_LOOP:
      return {
        ...state,
        [payload.section]: {
          ...state[payload.section],
          isLoopSelected: payload.isLoopSelected,
        },
      };
    case RESET_TOKENS:
      return {};
    default:
      return state;
  }
};

export default tokensReducer;
