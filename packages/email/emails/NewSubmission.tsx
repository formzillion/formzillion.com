import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { imageUrl } from "./components/Logo";
import { buttonLink, container, main } from "./components/styles";

interface INewSubmissionProps {
  dashboardUrl: string;
  formOwnerName: string;
  formValues: object;
  date: string;
  formName: string;
}

export default function NewSubmission({
  dashboardUrl = "https://dev-app.formzillion.com/hive/chsdasojdwanasi1",
  formOwnerName = "Sandeep",
  formValues = { email: "john@example.com" },
  date = "April 26, 2023 11:04 AM",
  formName = "Customer Feedback",
}: INewSubmissionProps) {
  return (
    <Html>
      <Head />
      <Preview>New Form Submission</Preview>
      <Body style={body}>
        <Container style={{ ...container, padding: "45px 45px 20px 45px" }}>
          <Img
            src={imageUrl}
            width="150"
            height="30"
            alt="Formzillion"
            style={logo}
          />
          <Text style={h2}>You have a new submission!</Text>
          <Text style={paragraph}>Hi {formOwnerName},</Text>
          <Text style={paragraph}>
            We received a new submission on your {formName} at {date}. Here are
            the details
          </Text>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Field</th>
                <th style={th}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formValues).map(([field, value]) => (
                <tr>
                  <td style={td}>{field}</td>
                  <td style={td}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Section style={btnContainer}>
            <Button pX={12} pY={12} style={buttonLink} href={dashboardUrl}>
              View Submission
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>© 2023 Formzillion</Text>
        </Container>
      </Body>
    </Html>
  );
}

const logo = {
  margin: "0 auto",
};

const body = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  border: "1px solid #ccc",
};

const td = {
  padding: "10px",
  border: "1px solid #ccc",
};

const th = {
  padding: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  fontWeight: "bold",
  textAlign: "left" as const,
};

const h2 = {
  marginTop: "20px",
  marginBottom: "20px",
  border: "1px",
  fontSize: "22px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  width: "fit-content",
  margin: "0 auto",
  color: "#8898aa",
  fontSize: "12px",
};
