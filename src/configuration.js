




const amplify_config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-3",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "eu-west-3",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-3_ubk2zdmQB",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "3c17ngclpsq2auhjt0rh1t6idf",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: "code", // 'code' | 'link'

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    /*cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        domain: ".devenir-devops.com",
        // OPTIONAL - Cookie path
        path: "/",
        // OPTIONAL - Cookie expiration in days
        expires: 365,
        // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //sameSite: "strict" | "lax",
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        secure: false,
      },
      */

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_SRP_AUTH",

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: { myCustomKey: "myCustomValue" },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "connect.devenir-devops.com",
      scope: ["email", "openid"],
      redirectSignIn: "https://devenir-devops.com/authenticated",
      redirectSignOut: "https://devenir-devops.com/",
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
};

export { amplify_config };
