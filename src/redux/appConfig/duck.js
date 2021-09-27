export const types = {
  APP_CONFIG: {
    INVERT_THEME: 'APP_CONFIG/INVERT_THEME',
    TOGGLE_DRAWER: 'APP_CONFIG/TOGGLE_DRAWER',
    RESET_RIGHT_DRAWER: 'APP_CONFIG/RESET_RIGHT_DRAWER',
    OPEN_RIGHT_DRAWER: 'APP_CONFIG/OPEN_RIGHT_DRAWER',
  },
};

export const actions = {
  invertTheme: () => ({
    type: types.APP_CONFIG.INVERT_THEME,
  }),
  toggleRightDrawer: () => ({
    type: types.APP_CONFIG.TOGGLE_DRAWER,
  }),
  resetRightDrawer: () => ({
    type: types.APP_CONFIG.RESET_RIGHT_DRAWER,
  }),
  openRightDrawer: () => ({
    type: types.APP_CONFIG.OPEN_RIGHT_DRAWER,
  }),
};

const initState = {
  theme: 'dark',
  statusBar: 'light-content',
  rightDrawerAction: '',
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case types.APP_CONFIG.INVERT_THEME:
      if (state.theme === 'light') {
        return {...state, theme: 'dark', statusBar: 'light-content'};
      } else {
        return {...state, theme: 'light', statusBar: 'dark-content'};
      }
    case types.APP_CONFIG.TOGGLE_DRAWER:
      return {...state, rightDrawerAction: 'toggle'};
    case types.APP_CONFIG.OPEN_RIGHT_DRAWER:
      return {...state, rightDrawerAction: 'open'};
    case types.APP_CONFIG.RESET_RIGHT_DRAWER:
      return {...state, rightDrawerAction: ''};
    default:
      return state;
  }
}
