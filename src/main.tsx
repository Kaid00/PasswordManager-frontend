import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';


Amplify.configure({
  Auth: {
     
      region: 'us-east-1',
      userPoolId: "us-east-1_K0ZlCx5X0",
      userPoolWebClientId: "3p49nd4hs6fhf7jt6cp9pqa4uh",
      identityPoolId: "us-east-1:3982da1e-618c-4e46-b690-a4ac83c204eb",
      authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
