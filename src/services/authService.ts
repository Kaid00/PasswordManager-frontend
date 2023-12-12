import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const awsRegion = 'us-east-1';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: awsRegion,
        userPoolId: "us-east-1_K0ZlCx5X0",
        userPoolWebClientId: "3p49nd4hs6fhf7jt6cp9pqa4uh",
        identityPoolId: "us-east-1:3982da1e-618c-4e46-b690-a4ac83c204eb",
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {
    private user: CognitoUser | undefined;
    public jwtToken: string | undefined;

    public async isAuthorized() {
        if (this.user?.authenticateUser) {
            return true;
        }
        return false;
    }

    public async login(userName: string, password: string): Promise<Object | undefined> {
        try {
            this.user = await Auth.signIn(userName, password) as CognitoUser;
            this.jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken()
            console.log('Normal: ' + this.jwtToken)
            return this.user
        } catch (error) {
            console.error(error);
            return undefined
        }

        
     
    }

    public getUserName() {
        return this.user?.getUsername();
    }

   

   
}