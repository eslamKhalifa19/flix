import { Carousel, Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";

const { Meta } = Card;

const Slider = () => {
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
    <div style={{ margin: 24 }}>
      <Carousel
        focusOnSelect
        dots
        dotPosition={"top"}
        className="center"
        swipeToSlide
        autoplay
        autoplaySpeed={2000}
        slidesToShow={5}
        slidesToScroll={1}
        centerMode={true}
        adaptiveHeight
        infinite
        arrows
        prevArrow={<CaretLeftFilled />}
        nextArrow={<CaretRightFilled />}
      >
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          data.map(({ id, poster_path, title, overview }) => (
            <div className="site-card-wrapper" key={id}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    style={{ width: "360px" }}
                    hoverable
                    cover={
                      <img
                        alt="movie or series"
                        src={configuration.concat("w342", poster_path)}
                      />
                    }
                  >
                    <Meta
                      className="fit-text"
                      title={title}
                      description={overview}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default Slider;
