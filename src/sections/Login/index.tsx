import React, { useEffect, useRef } from "react";
import { Card, Layout, Spin, Typography } from "antd";
import googleLogo from "./assets/google_logo.jpg";
import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/logIn/__generated__/LogIn";
import { Viewer } from "../../lib/types";
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
    } catch {}
  };

  if(logInLoading){
    return <Content><Spin size="large" tip="Logging you in..." /></Content>
  }
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
