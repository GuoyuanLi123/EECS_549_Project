import { Layout } from "antd";
import "./App.css";
import HomePageSearchBar from "./components/HomePageSearchBar";
import Background from "./polskie-podcasty-biznesowe-scaled.jpeg";

const { Content } = Layout;

function App() {
  return (
    <Layout
      style={{
        backgroundImage: `url(${Background})`,
        backgroundBlendMode: "lighten",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backgroundSize: "contain",
        height: "100vh",
      }}
    >
      <Content
        style={{
          padding: "100px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        <HomePageSearchBar />
      </Content>
    </Layout>
  );
}

export default App;
