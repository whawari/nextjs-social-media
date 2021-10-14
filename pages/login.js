import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import { loginUser } from "../utils/authUser";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import cookie from "js-cookie";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await loginUser(user, setErrorMessage, setFormLoading);
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    document.title = "Welcome Back";

    const userEmail = cookie.get("userEmail");
    if (userEmail) {
      setUser((previousState) => ({ ...previousState, email: userEmail }));
    }
  }, []);

  return (
    <>
      <HeaderMessage />

      <Form
        loading={formLoading}
        error={errorMessage !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />

        <Segment>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            required
          />

          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => {
                setShowPassword(!showPassword);
              },
            }}
            iconPosition="left"
            required
          />

          <Divider hidden />

          <Button
            icon="signup"
            content="Login"
            type="submit"
            color="teal"
            disabled={submitDisabled}
          />
        </Segment>
      </Form>

      <FooterMessage />
    </>
  );
};

export default Login;
