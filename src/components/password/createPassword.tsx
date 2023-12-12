import { SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DataService } from "../../services/dataService";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type CreateToolProps = {
  dataService: DataService;
  username: String | undefined;
};

type CustomEvent = {
    target: HTMLInputElement
}

export default function CreatePassword(props: CreateToolProps) {
  const [name, setName] = useState<string>("");
  const [siteUrl, setsiteUrl] = useState<string>("");
  const [username, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  let [actionResult, setActionResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (username && password) {
        setIsLoading(true)
        await props.dataService.createPassword(username, password, name, siteUrl)
      setActionResult(`Successfully added: ${name}`);
      setIsLoading(false)

      setUserName('');
      setPassword('');
    } else {
    setIsLoading(false)
      setActionResult('Please provide a username and a password!')
    }

    
  };


  function renderForm(){
    if (!props.dataService.isAuthorized()) {
      return<NavLink to={"/login"}>Please login</NavLink>
    }
   
    function render() {

        if (props.username === "" || props.username === undefined)  {
            return<NavLink to={"/login"}>Please login </NavLink>

        } else {
            return(
            <div>
                {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                {/* <Form.Control type="text" placeholder="Tool name" value={name}  onChange={(e) => setName(e.target.value)}/>
                <Form.Control type="text" placeholder="Location" value={siteUrl}  onChange={(e) => setsiteUrl(e.target.value)}/>
                <Form.Control type="text" placeholder="Location" value={username}  onChange={(e) => setUserName(e.target.value)}/>
                <Form.Control type="text" placeholder="Location" value={password}  onChange={(e) => setPassword(e.target.value)}/>


                <Button variant="primary" type="submit" >
                {isLoading ? "Saving..." : "Submit"}
                </Button>
                </Form> */}

                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="name" value={name}  onChange={(e) => setName(e.target.value)}/>
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Site Url
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="url" value={siteUrl}  onChange={(e) => setsiteUrl(e.target.value)}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Username
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="username" value={username}  onChange={(e) => setUserName(e.target.value)}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                </Col>
                </Form.Group>
            

                <Form.Group >
                <>
                <Button type="submit">Add</Button>
                </>
                
                </Form.Group>
                </Form>

            </div>
            )
        }
    }
 
    return (                   

        render()

      );
  }

  return <div>
        <Alert show={ actionResult != undefined } variant="success">

        <Alert.Heading>Password manager</Alert.Heading>
        <p>
          {actionResult}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => actionResult = undefined } variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    {renderForm()}
  </div>

  
}
