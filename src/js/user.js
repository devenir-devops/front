import { createContext, useContext, useReducer } from "react";

const initialState = {
  logged: false,
  cognitoFetched: false,
  mongoFetched: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_COGNITO":
      return {
        ...state,
        logged: true,
        username: action.data.username,
        keyPrefix: action.data.keyPrefix,
        idToken: action.data.signInUserSession['idToken']['jwtToken'],
        cognitoFetched: true
      };
    case "LOGIN_MONGO":
      return {
        ...state,
        mongoFetched: true,
        first_login: action.data.first_login,
        last_login: action.data.last_login,
        email: action.data.email,
        is_subscribed_to_newsletter: action.data.is_subscribed_to_newsletter
      }
    default:
      return state;
  }
};

export const UserContext = createContext();
export const UserConsumer = UserContext.Consumer;
export const UserConsumerHook = () => useContext(UserContext);

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);


