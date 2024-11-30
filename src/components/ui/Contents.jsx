"use client";
import { Layout } from "antd";
import Header from "./Header";

const { Content } = Layout;

const Contents = ({ children }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Header />

      <div
        style={{
          padding: "10px",
          maxWidth: "1200px", 
          margin: "0 auto", 
          width: "100%", 
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Contents;
