import { useEffect, useState } from "react";
import { Layout, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../searchengine.png";

const { Header, Content } = Layout;
const { Title } = Typography;

const SearchResultsPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to={"/"}>
            <Title
              level={2}
              style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
            >
              <img
                style={{ marginRight: 5, marginBottom: 5 }}
                width={50}
                src={logo}
              />
              Podcast Search Engine
            </Title>
          </Link>
        </div>
      </Header>
      <Content
        style={{
          padding: "50px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      ></Content>
    </Layout>
  );
};

export default SearchResultsPage;
