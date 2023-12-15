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
        getPasswords()
    }, [])

    const getPasswords = async ()=>{
        setIsLoading(true)
        const passwords = await props.dataService.getPasswords();
        console.log(passwords)
        setIsLoading(false)

        setPasswordListings(passwords);
    }


    // Deleting a password
    async function deletePassword(passwordId: string, passwordName: string){
        const result = await props.dataService.deletePassword(passwordId);
        if (result.status == "successful") {
            setReservationText(`${passwordName} deleted`);
            getPasswords()

            setTimeout(() => {
                setReservationText(undefined) ;
            }, 2500);
        }  
    }

    // username, password, name, siteUrl
    async function updatePassword(passwordId: string,username: string, password: string, name: string, url: string){

        const cleanresult = await props.dataService.deletePassword(passwordId)
        
        if (cleanresult.status == "successful") {
            console.log("DELETED")
            console.log(username,  password, url, name)

            const result = await props.dataService.createPassword(username, password, name, url);
            if (result.status == "successful") {
                setReservationText(`${name} updated`);
                getPasswords()
    
                setTimeout(() => {
                    setReservationText(undefined) ;
                }, 2500);
            }  

            
        }  

       
    }

    function renderPasswords(){
     
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
                        deletePassword={deletePassword}
                        updatePassword={updatePassword}
                        isDeleting={isDeleting}
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
            if (isLoading) {
                return<p>Fetching...</p>
            }  else {
                return <div>{renderPasswords()}</div>
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