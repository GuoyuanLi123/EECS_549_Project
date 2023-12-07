import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space, Row, message } from "antd";
import logo from "../searchengine.png";

const HomePageSearchBar = () => {
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const onFormFinish = (values) => {
    window.location.href = `search/${values.keyword}/${values.episodeName}/${values.showName}/${values.publisher}`;
  };

  const linkToResultPage = (query) => {
    window.location.href = `search/${query}/null/null/null`;
  };

  const onNormalSearch = (query) => {
    if (query === "") {
      return;
    }
    setLoading(true);

    linkToResultPage(query);
    setLoading(false);
  };

  const onClickAdvanceSearch = () => {
    setAdvanceSearch(!advanceSearch);
  };

  const renderSearchBar = () => {
    if (!advanceSearch) {
      return (
        <>
          <Row align="middle" justify="center" style={{ marginBottom: 20 }}>
            <img
              width={200}
              src={logo}
              style={{ fontSize: 50, marginRight: 5 }}
            />
            <div style={{ fontSize: 50 }}>Podcast Search Engine</div>
          </Row>
          <Row justify="center" style={{ marginBottom: 20 }}>
            <Space direction="horizontal">
              <Input
                placeholder="Please enter keyword"
                style={{ width: 600 }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Button
                type="primary"
                onClick={() => {
                  onNormalSearch(searchTerm);
                }}
              >
                Search
              </Button>
            </Space>
          </Row>
          <Row justify="center">
            <Checkbox onChange={onClickAdvanceSearch}>Advance Search</Checkbox>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row align="middle" justify="center" style={{ marginBottom: 20 }}>
            <img
              width={200}
              src={logo}
              style={{ fontSize: 50, marginRight: 5 }}
            />
            <div style={{ fontSize: 50 }}>Podcast Search Engine</div>
          </Row>
          <Row justify="center" style={{ marginBottom: 20 }}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                advance: advanceSearch,
              }}
              onFinish={onFormFinish}
              onFinishFailed={() => {}}
              autoComplete="off"
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
                wrapperCol={{
                  span: 16,
                }}
              >
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="EpisodeName"
                name="episodeName"
                wrapperCol={{
                  span: 16,
                }}
              >
                <Input style={{ width: 300 }} />
              </Form.Item>

              <Form.Item
                label="ShowName"
                name="showName"
                wrapperCol={{
                  span: 16,
                }}
              >
                <Input style={{ width: 300 }} />
              </Form.Item>

              <Form.Item
                label="Publisher"
                name="publisher"
                wrapperCol={{
                  span: 16,
                }}
              >
                <Input style={{ width: 300 }} />
              </Form.Item>

              <Form.Item
                name="advance"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox onChange={onClickAdvanceSearch}>
                  Advance Search
                </Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </>
      );
    }
  };

  return renderSearchBar();
};

export default HomePageSearchBar;
