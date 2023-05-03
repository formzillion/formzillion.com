import * as React from "react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

import { Footer } from "./components/Footer";
import { LogoText } from "./components/LogoText";
import { Logo } from "./components/Logo";
import { container, h1, main, text } from "./components/styles";

interface userProps {
  userFirstname: string;
}

export default function RequestAccess({ userFirstname = "there" }: userProps) {
  return (
    <Html>
      <Head />
      <Preview>Request Access for Formzillion</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Logo />
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={h1}>Request Access for Formzillion</Text>
            <Text style={text}>
              Thank you for your request for access to Formzillion. We
              appreciate your interest in our platform, and we are confident
              that you will find it valuable.
            </Text>

            <Text style={text}>
              We have received your request, and our team is currently reviewing
              it. We will get back to you shortly with further instructions on
              how to proceed. If you have any questions or concerns in the
              meantime, please don&apos;t hesitate to reach out to us.
            </Text>

            <Text style={text}>
              Thank you again for your interest in our Formzillion. We
              appreciate your business and look forward to helping you succeed.
            </Text>
            <LogoText />
            <Text style={text}>Team Formzillion</Text>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
}
