import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Col, Row, Layout, Typography } from "antd";
import { LISTINGS } from "../../lib/graphql/queries";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { useScrollToTop } from "../../lib/hooks";
import { displayErrorMessage } from "../../lib/utils";
import { HomeHero, HomeListings, HomeListingsSkeleton } from "./components";
import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";
import { Alert } from "antd";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

interface IProps {
  isBannerVisible: boolean;
  setIsBannerVisible: (isBannerVisible: boolean) => void;
}

export const Home = ({
  isBannerVisible,
  setIsBannerVisible,
  history,
}: IProps & RouteComponentProps) => {
  const { loading, data } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  useScrollToTop();

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      history.push(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const renderListingsSection = () => {
    if (loading) {
      return <HomeListingsSkeleton />;
    }

    if (data) {
      return (
        <HomeListings
          title="Premium Listings"
          listings={data.listings.result}
        />
      );
    }

    return null;
  };

  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      {isBannerVisible ? (
        <Alert
          message={
            <span>
              Please note that the listings and photos are mock data, so listings for only few cities are available like los angeles, toronto, dubai, london etc. You can always add listings for your favourite city &#128513;.
              Visit the{" "}
              <a
                href="https://github.com/abhishekjain35/Mini-house-client"
                target="_blank"
              >
                github
              </a>{" "}
              repo for more info.
            </span>
          }
          type="info"
          showIcon
          className="error-banner"
          closable
          onClose={() => setIsBannerVisible(false)}
        />
      ) : null}
      <HomeHero onSearch={onSearch} />
      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
        <Link
          to="/listings/united%20states"
          className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
        >
          Popular listings in the United States
        </Link>
      </div>
      {renderListingsSection()}
      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20francisco">
              <div className="home__listings-img-cover">
                <img
                  src={sanFransiscoImage}
                  alt="San Fransisco"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/mexico">
              <div className="home__listings-img-cover">
                <img
                  src={cancunImage}
                  alt="Cancún"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
