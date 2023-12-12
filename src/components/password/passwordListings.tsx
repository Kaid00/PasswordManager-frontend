import { useState, useEffect } from "react";
import PasswordCard from "./passwords";
import { NavLink } from "react-router-dom";
import { PasswordModel } from "../model/passwordModel";
import Alert from 'react-bootstrap/Alert';
import { DataService } from "../../services/dataService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ToolsProps {
    dataService: DataService;
    username: String | undefined;

}

export default function PasswordListings(props: ToolsProps){

    const [passwordListings, setPasswordListings] = useState<PasswordModel[]>();
    let [reservationText, setReservationText] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);



    useEffect(()=>{
        const getPasswords = async ()=>{
            setIsLoading(true)
            const passwords = await props.dataService.getPasswords();
            console.log(passwords)
            setIsLoading(false)

            setPasswordListings(passwords);
        }
    
        getPasswords()

        // try {
        //     this.user = await Auth.signIn(userName, password) as CognitoUser;
        //     this.jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken()
        console.log("Other: " + props.dataService.getToken())
    }, [])

    // async function deletePassword(id: string, toolName: string, location: string, photoUrl: string){
    //     setIsReserving(true)
    //     const reservationResult = await props.dataService.reserveTool(toolId, toolName, location, photoUrl);
    //     setReservationText(`You reserved ${toolName}`);
    //     setIsReserving(false)

    //     setTimeout(() => {
    //         setReservationText(undefined) ;
    //     }, 2500);
    // }

    function renderTools(){
        // if(!props.dataService.isAuthorized()) {
        //     return<NavLink to={"/login"}>Please login</NavLink>
        // }
        let rows: any[] = [];
        if(passwordListings) {
            for(const password of passwordListings) {
                rows.push(
                    <PasswordCard 
                        key={password.id}
                        id={password.id}
                        name={password.name}
                        username={password.username}
                        password={password.password}
                        url={password.url}
                        // deletePassword={deletePassword}
                        // isDeleting={isDeleting}
                    />
                )
            }
        }
        return rows;
    }

    function render() {

        if (props.username === "" || props.username === undefined)  {
            return<NavLink to={"/login"}>Please login</NavLink>

        } else {
            // logged in
            if (isLoading) {
                return<p>Fetching...</p>
            }  else {
                return <div>{renderTools()}</div>
            }
        }
    }
 
    return (
        <div>
            <Alert show={ reservationText != undefined } variant="success">
            <Alert.Heading>Finder</Alert.Heading>
            <p>
            {reservationText}
            </p>
            <hr />
            </Alert>
              {render()}
       
        </div>
    )        
    

}