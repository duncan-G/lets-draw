import { fromJS } from 'immutable';

const initalState = fromJS({
  loading: false,
  error: false,
  currentUser: false
});

const appReducer = (state = initalState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;
