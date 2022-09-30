import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import { words } from "./words";

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";

import { I18n, Hub } from "aws-amplify";
import { amplify_config } from "./configuration";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import colors from "tailwindcss/colors";

import Navbar from "./navbar";

import { UserConsumerHook, UserProvider } from "./js/user";
import { axios_instance } from "./js/api";
import React, { useEffect } from "react";

import { Logger } from "aws-amplify";
const logger = new Logger("General-Logger", "INFO");

I18n.putVocabularies(words);

Amplify.configure(amplify_config);

function Home() {
  return (
    <>
      <nav>
        <Link to="/authenticated">Application</Link>
      </nav>
    </>
  );
}

function NoMatch() {
  return (
    <>
      <h1>Oops, No match</h1>
    </>
  );
}

function A() {
  return (
    <>
      <nav>
        <Link to="/authenticated/b">This is application A</Link>
      </nav>
    </>
  );
}

function B() {
  return (
    <>
      <nav>
        <Link to="/authenticated/a">This is application B</Link>
      </nav>
    </>
  );
}

function Application() {
  const [userState, dispatch] = UserConsumerHook();
  const [user, setUser] = React.useState(null);
  const [isFetchingUserFromAuth, setIsFetchingUserFromAuth] =
    React.useState(false);
  const [isFetchingUserFromMongo, setIsFetchingUserFromMongo] =
    React.useState(false);
  useEffect(() => {
    const onAuthEvent = (payload) => {
      dispatch({ type: payload.event, data: payload.data });
    };
    if (!user && !isFetchingUserFromAuth) {
      setIsFetchingUserFromAuth(true);
      Auth.currentAuthenticatedUser()
        .then((user) => {
          setUser(user);
          dispatch({ type: "LOGIN_COGNITO", data: user });
        })
        .catch((error) => {
          logger.error(error);
        }).finally(() => {
          setIsFetchingUserFromAuth(false);
        });
    }
    if (
      userState.logged &&
      userState.cognitoFetched &&
      !userState.mongoFetched &&
      !isFetchingUserFromMongo
    ) {
      setIsFetchingUserFromMongo(true);
      Auth.currentAuthenticatedUser().then((user) => {
        axios_instance
          .get("/api/users/me", {
            headers: {
              Authorization: "Bearer " + userState.idToken,
            },
          })
          .then((response) => {
            dispatch({ type: "LOGIN_MONGO", data: response.data });
          })
          .catch((error) => {
            logger.error(error);
          })
          .finally(() => {
            setIsFetchingUserFromMongo(false);
          });
      });
    }

    Hub.listen("auth", (data) => {
      const { payload } = data;
      onAuthEvent(payload);
    });
  }, [
    dispatch,
    userState,
    user,
    isFetchingUserFromAuth,
    isFetchingUserFromMongo,
  ]);

  const getUser = () => {
    Auth.currentSession()
      .then((data) => {
        dispatch({ type: "LOGIN", data: data });
        console.log(data.idToken.payload.email);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Authenticator
      loginMechanisms={["email"]}
      socialProviders={["google"]}
      variation="modal"
    >
      {({ signOut, user }) => (
        <UserProvider>
          {user && (
            <>
              <button className="btn btn-primary" onClick={() => getUser()}>
                Get user
              </button>
            </>
          )}
          <Outlet />
        </UserProvider>
      )}
    </Authenticator>
  );
}

function App() {
  I18n.setLanguage("fr");

  const theme = {
    name: "Auth customized theme",
    tokens: {
      colors: {
        background: {
          primary: {
            value: colors.gray[100],
          },
          secondary: {
            value: colors.gray[200],
          },
        },
        font: {
          interactive: {
            value: colors.black[900],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: colors.teal[800],
              },
            },
            _hover: {
              color: {
                value: colors.teal[900],
              },
            },
            _active: {
              color: {
                value: colors.teal[800],
              },
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-20 lg:pt-24">
        <div className="w-full text-xl text-grey-darkest w-full">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />

            <Route path="/authenticated" element={<Application />}>
              <Route index element={<A />} />
              <Route path="a" element={<A />} />
              <Route path="b" element={<B />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
