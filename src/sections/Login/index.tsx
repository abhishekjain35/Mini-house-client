import React from "react";
import { Card, Layout, Typography } from "antd";
import googleLogo from "./assets/google_logo.jpg";
import { Viewer } from "../../lib/types";
const { Content } = Layout;
const { Text, Title } = Typography;
interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title>
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title>Log in to TinyHouse!</Title>
          <Text>Sign in with Google to start booking available rentals</Text>
        </div>
        <button className="log-in-card__google-button">
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google!
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to google consent form to
          sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};