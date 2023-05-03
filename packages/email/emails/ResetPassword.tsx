import * as React from "react";
import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

import { Footer } from "./components/Footer";
import { LogoText } from "./components/LogoText";
import { Logo } from "./components/Logo";
import { anchor, buttonLink, container, h1, main, text } from "./components/styles";

interface EmailProps {
  userFirstname: string;
  resetPasswordLink: string;
}

export default function ResetPassword({
  userFirstname = "there",
  resetPasswordLink = "https://formzillion.com/reset-password",
}: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Formzillion reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Logo />
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={h1}>Requested to reset the password</Text>
            <Text style={text}>
              We have received a request to set a new password for your
              Formzillion Account. To proceed with the password reset process,
              please click the button below:
            </Text>
            <Button style={buttonLink} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="https://formzillion.com">
                more security tips.
              </Link>
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
