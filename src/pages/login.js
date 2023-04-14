import React, {useEffect, useState, useCallback } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		
	}, []);

	const submitLogin = useCallback((event) => {
		console.log(username, password)
		event.preventDefault();
	})

  return (
    <Layout>
      <Container>
        <section className="login-page-form">
          <Row>
            <Col xs={6}>
							<form onSubmit={submitLogin}>
								<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
								<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
								<button type="submit" className="btn btn-primary">Login</button>
							</form>
						</Col>
          </Row>
        </section>
      </Container>
    </Layout>
  )
}

export default Login
