import * as React from "react";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import { Body } from "@react-email/body";

import { Footer } from "./components/Footer";
import { FooterText } from "./components/FooterText";
import { LogoText } from "./components/LogoText";
import {
  anchor,
  buttonLink,
  container,
  h1,
  main,
  text,
} from "./components/styles";
import { Logo } from "./components/Logo";

interface EmailProps {
  userFirstname: string;
  confirmEmailLink: string;
}

export default function Email({
  userFirstname = "there",
  confirmEmailLink = "https://formzillion.com/",
}: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Logo />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={h1}>Verify your email address</Text>
            <Text style={text}>
              Thanks for registering for an account on Formzillion. Please click
              the button below to verify your email address. You will have full
              access to your Formzillion account after verification.
            </Text>
            <Button style={buttonLink} href={confirmEmailLink}>
              Verify Email
            </Button>
            <Text style={text}>
              If you did not sign up for Formzillion, please ignore this email.
            </Text>
            <Text style={text}>
              Thank you for choosing Formzillion. We look forward to serving
              you! See our Help Center for{" "}
              <Link style={anchor} href="https://formzillion.com">
                more security tips.
              </Link>
            </Text>
            <LogoText />
            <Text style={text}>Team Formzillion</Text>
          </Section>
          <FooterText />
          <Footer />
        </Container>
      </Body>
    </Html>
  );
}
