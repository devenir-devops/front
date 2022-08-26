import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import { listener } from "./utils";
import { words } from "./words";

import { Authenticator, Button, Flex, View } from "@aws-amplify/ui-react";


import { Hub } from "aws-amplify";
import { I18n } from "aws-amplify";
import { amplify_config } from "./configuration";
import { ThemeProvider } from "@aws-amplify/ui-react";

Hub.listen("auth", listener);
I18n.putVocabularies(words);

Amplify.configure(amplify_config);



function App({ signOut, user }) {
  I18n.setLanguage("fr");

  const getUser = () => {
    Auth.currentSession()
      .then((data) => console.log(data.idToken.payload.email))
      .catch((err) => console.log(err));
  };

  

  return (
    <ThemeProvider>
      <Flex direction="row">
        <Authenticator loginMechanisms={["email"]} socialProviders={["google"]}>
          {({ signOut, user }) => (
            <View
              width="100%"
              backgroundColor={{ base: "orange", large: "yellow" }}
            >
              <Button variation="primary" onClick={() => getUser()}>
                Get user
              </Button>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </View>
          )}
        </Authenticator>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
