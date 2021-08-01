import { Carousel, Card, Col, Row, Space, Typography } from "antd";
import Spinner from "./Spinner";
const { Title } = Typography;

const { Meta } = Card;

const Slider = ({ isError, isLoading, data, searchData }) => {
  const base_url = "https://image.tmdb.org/t/p/";
  return (
    <div>
      <Carousel
        focusOnSelect
        dots
        dotPosition={"top"}
        className="center"
        swipeToSlide
        autoplay
        autoplaySpeed={2000}
        slidesToShow={4}
        slidesToScroll={1}
        centerMode={true}
        adaptiveHeight
        infinite
      >
        {isError && <div>Something went wrong ...</div>}
        {isLoading && <Spinner />}
        {searchData.length > 0
          ? searchData.map(
              ({
                id,
                poster_path,
                title,
                overview,
                vote_average,
                release_date,
              }) => (
                <div className="site-card-wrapper" key={id}>
                  <Space>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Card
                          style={{ width: "342px", height: "33%" }}
                          hoverable
                          cover={
                            <img
                              alt="movie or series"
                              src={base_url.concat("w342", poster_path)}
                            />
                          }
                          extra={
                            <Title level={5}>Rating: {vote_average}</Title>
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
                  </Space>
                </div>
              )
            )
          : data.map(
              ({
                id,
                poster_path,
                title,
                overview,
                vote_average,
                release_date,
              }) => (
                <div className="site-card-wrapper" key={id}>
                  <Space>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Card
                          style={{ width: "342px", height: "33%" }}
                          hoverable
                          cover={
                            <img
                              alt="movie or series"
                              src={base_url.concat("w342", poster_path)}
                            />
                          }
                          extra={
                            <Title level={5}>Rating: {vote_average}</Title>
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
                  </Space>
                </div>
              )
            )}
      </Carousel>
    </div>
  );
};

export default Slider;
