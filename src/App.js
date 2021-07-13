import { useState } from "react";
import { Input, Typography, Layout } from "antd";
import Slider from "./components/Carousal";
import "./App.css";
import { Content } from "antd/lib/layout/layout";

const { Search } = Input;
const { Title } = Typography;
const { Header } = Layout;

function App() {
  const [search, setSearch] = useState("Search for a movie , tv show");
  return (
    <>
      <Layout>
        {" "}
        <Header>
          <Title
            style={{
              float: "left",
              width: "33%",
              textAlign: "center",
              marginTop: "10px",
            }}
            type="danger"
          >
            FLIX
          </Title>
          <Search
            style={{
              float: "right",
              width: "33%",
              marginTop: "10px",
            }}
            placeholder={search || "Search for a movie , tv show"}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => alert(value)}
          />
        </Header>
        <Content>
          <Slider />
        </Content>
      </Layout>
    </>
  );
}

export default App;
