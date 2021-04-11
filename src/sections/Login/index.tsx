import React, { useEffect, useRef } from "react";
import { Card, Layout, Spin, Typography } from "antd";
import googleLogo from "./assets/google_logo.jpg";
import { ErrorBanner } from "../../lib/components";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/logIn/__generated__/LogIn";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../lib/utils";
import { Viewer } from "../../lib/types";
import { Redirect } from "react-router";

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  let client = useApolloClient();

  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
      }
      displaySuccessNotification("You've successfully logged in!");
    },
  });

  const loginRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      loginRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage(
        "Sorry! we can't log you in at the moment. Please try again later."
      );
    }
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const loginErrorBannerComponent = logInError ? (
    <ErrorBanner description="Sorry! we can't log you in at the moment. Please try again later." />
  ) : null;

  return (
    <Content className="log-in">
      {loginErrorBannerComponent}
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
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
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
