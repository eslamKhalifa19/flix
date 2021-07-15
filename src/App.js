import { useEffect, useState } from "react";
import { Input, Typography, Layout } from "antd";
import Slider from "./components/Carousal";
import "./App.css";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const { Search } = Input;
const { Title } = Typography;
const { Header } = Layout;

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [configuration, setConfiguration] = useState([]);

  useEffect(() => {
    const fetchConfiguration = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios(
          `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setConfiguration(res.data.images.base_url);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchConfiguration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setData(res.data.results);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            value={query}
            style={{
              float: "right",
              width: "33%",
              marginTop: "10px",
            }}
            placeholder={"Search for a movie , tv show"}
            onChange={(event) => setQuery(event.target.value)}
            allowClear
            enterButton="Search"
            size="large"
            // onSearch={() => setSearch(query)}
          />
        </Header>
        <Content>
          <Title level={3}>Movies : Now Playing</Title>
          <Slider
            data={data}
            configuration={configuration}
            isError={isError}
            isLoading={isLoading}
          />
        </Content>
      </Layout>
    </>
  );
}

export default App;
