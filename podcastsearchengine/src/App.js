import { Layout } from "antd";
import "./App.css";
import HomePageSearchBar from "./component/HomePageSearchBar";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
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
