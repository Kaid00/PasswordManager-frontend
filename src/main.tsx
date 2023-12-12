import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';


// Amplify.configure({
//   Auth: {
//       mandatorySignIn: true,
//       region: 'us-east-1',
//       userPoolId: "us-east-1_VvKr5Ejoa",
//       userPoolWebClientId: "5h19tqkgr27vl1fahm21ljdt4k",
//       identityPoolId: "us-east-1:e37a470d-f8bb-41f7-a2a2-67cd97a1d23f",
//       authenticationFlowType: 'USER_PASSWORD_AUTH'
//   }
// })

Amplify.configure({
  Auth: {
     
      region: 'us-east-1',
      userPoolId: "us-east-1_K0ZlCx5X0",
      userPoolWebClientId: "3p49nd4hs6fhf7jt6cp9pqa4uh",
      identityPoolId: "us-east-1:3982da1e-618c-4e46-b690-a4ac83c204eb",
      authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
})

// Amplify.configure({
//   Auth: {
//     // Configuration for Amazon Cognito User Pools
//     userPoolId: "us-east-1_VvKr5Ejoa",
//     userPoolWebClientId: '5h19tqkgr27vl1fahm21ljdt4k',
//     region: 'us-east-1',

//     aws_appsync_graphqlEndpoint:
//     'https://2sh7pf5hgbf4bb6e2hm6gt7ahq.appsync-api.us-east-1.amazonaws.com/graphql',
//     aws_appsync_region: 'us-east-1',
//     aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
//   }
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
