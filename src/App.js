import { useEffect, useState, useCallback, useMemo } from "react";
import { Input, Typography, Layout } from "antd";
import debounce from "lodash.debounce";
import axios from "axios";
import Slider from "./components/Carousal";
import "./App.css";

const { Search } = Input;
const { Title } = Typography;
const { Header } = Layout;
const { Content } = Layout;

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [configuration, setConfiguration] = useState([]);
  const [searchData, setSearchData] = useState([]);

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
  }, []);

  const onSearch = useCallback(async (value) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${value}`
      );
      setSearchData(res.data.results);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const onChange = (event) => {
    onSearch(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
            onChange={debounce(onChange, 500)}
            type="text"
            style={{
              float: "right",
              width: "33%",
              marginTop: "10px",
            }}
            placeholder="Search for a movie , tv show"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Header>
        <Content>
          <Title level={3}>Movies : Now Playing</Title>
          <Slider
            data={data}
            configuration={configuration}
            isError={isError}
            isLoading={isLoading}
            searchData={searchData}
          />
        </Content>
      </Layout>
    </>
  );
}

export default App;
