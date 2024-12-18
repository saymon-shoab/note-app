'use client'
import { Button, Col, message, Row } from 'antd'
import loginImage from '../../assets/Fingerprint-rafiki.png'
import Image from 'next/image'
import Form from '../Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import { useRouter } from 'next/navigation'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { loginSechema } from "@/schemas/formSchema";
import { baseUrl } from '@/constants/baseUrl'

const LoginPage = () => {
  const router = useRouter()

  
  const onSubmit = async (data) => {
    const { email, password } = data; 
  
    try {
      const userQueryResponse = await axios.get(
        `${baseUrl}/user?email=${email}`
      );
  
      const user = userQueryResponse?.data[0]; 
  
      if (user.password !== password) {
        message.error("Incorrect password. Please try again.");
        return;
      }
  
      const { password: _, ...userInfo } = user; 
      localStorage.setItem("userinfo", JSON.stringify(userInfo));
  
      router.push("/notes");
      message.success("User logged in successfully");
    } catch (err) {
      console.error(err);
      message.error("Oops! Something went wrong...");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={10}>
        <Image width={500} src={loginImage} alt='login image' />
      </Col>

      <Col sm={12} md={6} lg={8}>
        <h1 style={{ margin: "15px 0px " }} >First Login your account</h1>
        <div>
        <Form
            className="login-form"
            submitHandler={onSubmit}
            resolver={yupResolver(loginSechema)}
          >
            <div style={{ margin: "20px 0" }}>
              <FormInput
                name="email"
                type="email"
                size="large"
                placeholder="User email"
              />
            </div>
            <div style={{ margin: "20px 0" }}>
              <FormInput
                name="password"
                type="password"
                placeholder="password"
                size="large"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <Button
              style={{marginTop:"10px"}}
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-button"
            >
              Log In
            </Button>
            {/* Create Account Button */}
            <Button
              style={{marginTop:"10px"}}
              type="default"
              block
              size="large"
              className="create-account-button"
              onClick={() => router.push("/signup")}
            >
              Create New Account
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default LoginPage
