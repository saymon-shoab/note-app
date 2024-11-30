"use client";
import { Button, Col, message, Row } from "antd";
import loginImage from "../../assets/Fingerprint-rafiki.png";
import Image from "next/image";
import Form from "../Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useRouter } from "next/navigation";
import "./signup.css";
import { singupSchema } from "@/schemas/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const onSubmit = async (data) => {
    const { confirmPassword, ...finalValue } = data;
    finalValue.role = 'user';
    try {
      const checkEmailResponse = await axios.get(
        `https://6749427886802029663051ce.mockapi.io/notesApi/api/v1/user?email=${finalValue.email}`
      );
      if (checkEmailResponse.data.length > 0) {
        message.error("User already exists with this email.");
        return;
      }
  
      // Proceed to create a new user
      const res = await axios.post(
        'https://6749427886802029663051ce.mockapi.io/notesApi/api/v1/user',
        finalValue
      );
      if (res) {
        router.push("/login");
        message.success("Account created successfully");
      }
    } catch (error) {
      console.error(error);
      message.error("Oops, something went wrong...");
    }
  };
  

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image width={500} src={loginImage} alt='login image' />
       
      </Col>

      <Col sm={12} md={6} lg={8}>
  
        <div className="">
          <Form
            className="login-form"
            submitHandler={onSubmit}
            resolver={yupResolver(singupSchema)}
          >
            <div style={{ margin: "15px 0px " }}>
              <FormInput
                name="userName"
                type="text"
                size="large"
                placeholder="User Name"
              />
            </div>
            <div style={{ margin: "15px 0px " }}>
              <FormInput
                name="email"
                type="email"
                size="large"
                placeholder="Email"
              />
            </div>
            <div style={{ margin: "15px 0px " }}>
              <FormInput
                name="password"
                type="password"
                size="large"
                placeholder="Password"
              />
            </div>
            <div style={{ margin: "15px 0px " }}>
              <FormInput
                name="confirmPassword"
                type="password"
                size="large"
                placeholder="Confirm Password"
              />
            </div>
            <div className="forgot-password">
              <a onClick={() => router.push("/login")}>
                already have an account? login
              </a>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-button"
            >
              Sign up
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignupPage;
