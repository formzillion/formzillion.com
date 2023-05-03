import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Text,
} from "@react-email/components";
import { imageUrl } from "./components/Logo";
import { container, paragraph } from "./components/styles";

interface IAutoResponseEmailProps {
  userFirstname: string;
  formOwnerName: string;
}

export default function AutoResponseEmail({
  userFirstname = "John",
  formOwnerName = "Sandeep",
}: IAutoResponseEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={{ ...container, padding: "45px 45px 20px 45px" }}>
          <Img
            src={imageUrl}
            width="150"
            height="30"
            alt="Formzillion"
            style={logo}
          />
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Thanks for subscribing for the newsletter. We will send you all the
            news updates based on your preferences.
          </Text>
          <Text style={paragraph}>
            Best,
            <br />
            {formOwnerName}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>© 2023 Formzillion</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const logo = {
  margin: "0 auto",
};

const footer = {
  width: "fit-content",
  margin: "0 auto",
  color: "#8898aa",
  fontSize: "12px",
};
