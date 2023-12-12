import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import "../styling.css"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { AuthService } from "../../services/authService";


type LoginProps = {
  authService: AuthService;
  setUserNameCb: (userName: string) => void;
};

export default function LoginComponent({ authService, setUserNameCb }: LoginProps) {
const [userName, setUserName] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [errorMessage, setErrorMessage] = useState<string>("");
const [loginSuccess, setLoginSuccess] = useState<boolean>();
const [isLoading, setIsLoading] = useState<boolean>(false);

const handleSubmit = async (event: SyntheticEvent) => {
  event.preventDefault();
  if (userName && password) {
    setIsLoading(true); // Set loading state while submitting
    try {
      const loginResponse = await authService.login(userName, password);
      const userName2 = authService.getUserName();
      if (userName2) {
        setUserNameCb(userName2);
      }

      if (loginResponse) {
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);

        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginSuccess(false)
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  } else {
    setLoginSuccess(false)
    setErrorMessage("User name and password required!");
  }
};

  function renderLoginResult() {
    if (errorMessage) {
      return <label>{errorMessage}</label>;
    }
  }
  return (
    <div>
     {loginSuccess && <Navigate to="/passwords" replace={true} />}
     <Alert show={ loginSuccess == false } variant="success">
        <Alert.Heading>Password manager</Alert.Heading>
        <p>
          {errorMessage}
        </p>
    </Alert>
    <Form onSubmit={(e) => handleSubmit(e)}>
     <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={userName} onChange={(e) => setUserName(e.target.value)}
        />
      </InputGroup>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" value={isLoading ? "Logging in..." : "Log In"} disabled = {isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
    </Form>
    </div>
  
  );
}
