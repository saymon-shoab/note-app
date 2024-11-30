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
    const { confirmPassword, ...userDetails } = data;
    userDetails.role = "user";

    try {
  
      const createUserResponse = await axios.post(
        "https://6749427886802029663051ce.mockapi.io/notesApi/api/v1/user",
        userDetails
      );
      if (createUserResponse) {
        message.success("Account created successfully!");
        router.push("/login"); // Redirect to the login page
      }
    } catch (error) {
      console.error("Error during user registration:", error);
  
      if (error.response && error.response.status === 500) {
        message.error("Server error. Please try again later.");
      } else {
        message.error("Something went wrong. Please check your inputs.");
      }
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
            className="login-forim"
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
