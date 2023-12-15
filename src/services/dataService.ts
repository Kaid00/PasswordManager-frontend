import { PasswordModel } from "../components/model/passwordModel";
import { AuthService } from "./authService";
import { Amplify, Auth } from "aws-amplify";


const passwordmanagerUrl = "https://1ycgzbeyu7.execute-api.us-east-1.amazonaws.com/prod/" + 'password'

export class DataService {
    private authService: AuthService;
    private token = Auth.currentSession().then(data => console.log(data.getAccessToken().getJwtToken()));  
   

    private awsRegion = 'us-east-1';

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    public async cancelReservation(toolId: string) {
    
        const result = await fetch(passwordmanagerUrl + `?id=${toolId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.getToken()
            },
        });
        const resultJSON = await result.json();
        console.log(resultJSON);

        return resultJSON

    }

    public getToken() {
        var jwt = ""
        Auth.currentSession().then(res=>{
            let accessToken = res.getAccessToken()
            jwt = accessToken.getJwtToken()
        })
        return jwt
        
    }

    // fetching all passwords
    public async getPasswords():Promise<PasswordModel[]> {
        
        const getToolsListingsResult = await fetch(passwordmanagerUrl, {
            method: 'GET',
            headers: {
                'Authorization': this.authService.jwtToken!
            }
        });
        const result = await getToolsListingsResult.json();
        return result.data; 
    }


    public async createPassword(username: string, password: string, name: string, url: string) {
        const body = {} as any;
        body.username = username;
        body.password = password;
        body.name = name;
        body.url = url
     
        const postResult = await fetch(passwordmanagerUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': this.authService.jwtToken!
            }
        });
        const resultJSON = await postResult.json();
        console.log(resultJSON);

        return resultJSON.id
    }

    public async deletePassword(passwordId: string) {
    
        const result = await fetch(passwordmanagerUrl + `?id=${passwordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.authService.jwtToken!
            },
        });
        const resultJSON = await result.json();
        console.log(resultJSON);

        return resultJSON

    }
    
    public isAuthorized(){
        return this.authService.isAuthorized();
    }
}
