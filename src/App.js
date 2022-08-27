import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import { listener } from "./utils";
import { words } from "./words";

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";

import { Hub } from "aws-amplify";
import { I18n } from "aws-amplify";
import { amplify_config } from "./configuration";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import colors from "tailwindcss/colors";


import Navbar from "./navbar";

Hub.listen("auth", listener);
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
        <Link to="/authenticated/b">A</Link>
      </nav>
    </>
  );
}

function B() {
  return (
    <>
      <nav>
        <Link to="/authenticated/a">B</Link>
      </nav>
    </>
  );
}

function Application() {
  const getUser = () => {
    Auth.currentSession()
      .then((data) => console.log(data.idToken.payload.email))
      .catch((err) => console.log(err));
  };

  return (
    <Authenticator
      loginMechanisms={["email"]}
      socialProviders={["google"]}
      variation="modal"
    >
      {({ signOut, user }) => (
        <>
          {user && (
            <>
              <button className="btn btn-primary" onClick={() => getUser()}>
                Get user
              </button>

            </>
          )}

          <Outlet />
          <nav>
            <Link to="/authenticated/a">Application A</Link>
          </nav>
        </>
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
      <Navbar/>
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-20 lg:pt-24">
        <div className="w-full lg:w-1/5 lg:px-6 text-xl text-grey-darkest leading-normal">
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
