import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, List, message, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { doSearch } from "../util";
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

  const onFormFinish = async (value) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(value.query);
    formData.append(value.episodeName);
    formData.append(value.showName);
    formData.append(value.publisher);

    try {
      let result = await doSearch(formData);
      setSearchResult(result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let formValue = {
      keyword: query,
      episodeName: episodeName,
      showName: showName,
      publisher: publisher,
    };

    if (formValue.episodeName === "undefined") {
      formValue.episodeName = "";
    }
    if (formValue.showName === "undefined") {
      formValue.showName = "";
    }
    if (formValue.publisher === "undefined") {
      formValue.publisher = "";
    }
    form.setFieldsValue(formValue);
  }, []);

  // useEffect(async () => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append(query);
  //   formData.append(episodeName);
  //   formData.append(showName);
  //   formData.append(publisher);

  //   try {
  //     let result = await doSearch(formData);
  //     setSearchResult(result);
  //   } catch (error) {
  //     message.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);
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
              <Input />
            </Form.Item>
            <Form.Item label="EpisodeName" name="episodeName">
              <Input />
            </Form.Item>

            <Form.Item label="ShowName" name="showName">
              <Input />
            </Form.Item>

            <Form.Item label="Publisher" name="publisher">
              <Input />
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
              pageSize: 3,
            }}
            dataSource={sampleData}
            renderItem={(item) => (
              <List.Item
                key={item.showName}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.showUrl}>{item.showName}</a>}
                  description={item.publisher}
                />
                {item.transcript}
              </List.Item>
            )}
          />
        </>
      </Content>
    </Layout>
  );
};

export default SearchResultsPage;
