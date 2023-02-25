const initialState = [0, 0, 0];

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return [
        state[0] + 1,
        state[1],
        state[2]
      ];
    case 'OK':
      return [
        state[0],
        state[1] + 1,
        state[2]
      ];
    case 'BAD':
      return [
        state[0],
        state[1],
        state[2] + 1
      ];
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default reviewReducer;