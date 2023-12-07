import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, List, message } from "antd";
import { Link } from "react-router-dom";
import { doSearch } from "../util";
import logo from "../searchengine.png";

const { Header, Content } = Layout;
const { Title } = Typography;

const SearchResultsPage = () => {
  const { query, episodeName, showName, publisher } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append(query);
    formData.append(episodeName);
    formData.append(showName);
    formData.append(publisher);

    try {
      let result = await doSearch(formData);
      setSearchResult(result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
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
      >
        <List
          loading={loading}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={searchResult}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default SearchResultsPage;
