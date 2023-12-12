import { SyntheticEvent, useState } from "react";
import { PasswordModel } from "../model/passwordModel";
import './toolComponent.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface passwordCard extends PasswordModel {
  // deletePassword: (toolId: string, toolName: string, location: string, photoUrl: string) => void;
  // isDeleting: Boolean;
}

export default function PasswordCard(props: passwordCard) {
  const [name, setName] = useState<string>(props.name);
  const [siteUrl, setsiteUrl] = useState<string>(props.url);
  const [username, setUserName] = useState<string>(props.username);

  const [password, setPassword] = useState<string>(props.password);

  return (


    // <div className="toolComponent">
    // <Form >
    // <Form.Control type="text" placeholder="name" value={name}  onChange={(e) => setName(e.target.value)}/>
    // <Form.Control type="text" placeholder="url" value={siteUrl}  onChange={(e) => setsiteUrl(e.target.value)}/>
    // <Form.Control type="text" placeholder="username" value={username}  onChange={(e) => setUserName(e.target.value)}/>
    // <Form.Control type="text" placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>



    // {/* <Button variant="primary" type="submit" >
    // {isLoading ? "Saving..." : "Submit"}
    // </Button> */}
    // </Form>
    // </div>
    <div>
      <br />
    <Form>
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
      <Button type="submit">Update</Button>

      <Button type="submit" variant="secondary">Copy</Button>

      <Button type="submit" variant="danger">Delete</Button>

      </>
     
    </Form.Group>
    </Form>
    <br />

    </div>
    
    
  );
}
