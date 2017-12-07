import dva from 'dva';

export default {
  namespace: 'indexpage',
  state: {
    "loading":true
  },
  reducers: {
    'change'(state, action) {
      return state.loading;
    }
  },
};