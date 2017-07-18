export const register = 'graphiql';

export const initialState = {
  gqlTheme: 'dracula',
  gqlThemePaper: false,
  sidebarQueryContent: 'history'
};

export class ChangeSidebarQueryContent {
  action (contentType) {
    return { type: 'ChangeSidebarQueryContent', payload: contentType };
  }

  reducer (state, action) {
    return { ...state, sidebarQueryContent: action.payload };
  }
}
