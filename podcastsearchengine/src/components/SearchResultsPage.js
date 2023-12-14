import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, List, message, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { doSearch, getThumbnail } from "../util";
import logo from "../searchengine.png";

const { Header, Content } = Layout;
const { Title } = Typography;

const sampleData = [
  {
    showName: "showName1",
    showUrl: "https://www.bilibili.com/",
    transcript: "sampleTranscript",
    episodeName: "sampleEpisodeName",
    publisher: "samplePublisher",
  },
];

const SearchResultsPage = () => {
  const [form] = Form.useForm();
  const { query, episodeName, showName, publisher } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onFormFinish = async (values) => {
    if (values.episodeName === "") {
      values.episodeName = "null";
    }
    if (values.showName === "") {
      values.showName = "null";
    }
    if (values.publisher === "") {
      values.publisher = "null";
    }
    window.location.href = `http://localhost:3000/search/${values.keyword}/${values.episodeName}/${values.showName}/${values.publisher}`;
  };



  useEffect(() => {
    let formValue = {
      keyword: query,
      episodeName: episodeName,
      showName: showName,
      publisher: publisher,
    };

    if (formValue.episodeName === "null") {
      formValue.episodeName = "";
    }
    if (formValue.showName === "null") {
      formValue.showName = "";
    }
    if (formValue.publisher === "null") {
      formValue.publisher = "";
    }

    form.setFieldsValue(formValue);
  }, []);

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("query", query);
    formData.append("episodeName", episodeName);
    formData.append("showName", showName);
    formData.append("publisher", publisher);

    doSearch(formData)
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(setLoading(false));
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
        <>
          <Form
            form={form}
            layout="inline"
            loading={loading}
            onFinish={onFormFinish}
          >
            <Form.Item
              label="Keyword"
              name="keyword"
              rules={[
                {
                  required: true,
                  message: "Please enter keyword!",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>
            <Form.Item label="EpisodeName" name="episodeName">
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item label="ShowName" name="showName">
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item label="Publisher" name="publisher">
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
          <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
              showSizeChanger: false,
            }}
            dataSource={searchResult}
            renderItem={(item) => (
              <List.Item key={item.showName}>
                <List.Item.Meta
                  title={<a href={item.episode_url}>{item.episode_name}</a>}
                  description={`From show ${item.show_name} published by ${item.publisher}`}
                />
                {`${item.transcript}...`}
              </List.Item>
            )}
          />
        </>
      </Content>
    </Layout>
  );
};

export default SearchResultsPage;
