import * as React from "react";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Container } from "@react-email/container";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Footer } from "./components/Footer";
import {
  anchor,
  bullets,
  footerItalic,
  main,
  container,
  paragraph,
} from "./components/styles";
import { Logo } from "./components/Logo";

export default function WelcomeEmail({ name }: { name?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Power up your workflows</Preview>
      <Section style={main}>
        <Container style={container}>
          <Section
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo />
          </Section>
          <Text style={paragraph}>Hey {name ?? "there"},</Text>
          <Text style={paragraph}>I’m Sandeep, CEO of Formzillion.</Text>
          <Text style={paragraph}>
            Our goal is to give developers like you the ability to effortlessly
            create powerful forms without backend APIs.
          </Text>
          <Text style={paragraph}>
            We recommend{" "}
            <Link style={anchor} href="https://docs.formzillion.com/">
              getting started with one of our templates
            </Link>{" "}
            to get familiar with how Formzillion works, and then moving on to
            create your own workflows.
          </Text>

          <Text style={paragraph}>
            Feel free to reply to me if you have any questions. You can also{" "}
            <Link style={anchor} href="https://cal.com/team/formzillion/call">
              schedule a call
            </Link>{" "}
            , or join our{" "}
            <Link style={anchor} href="https://discord.gg/JtBAxBr2m4">
              Discord server
            </Link>{" "}
            to connect with the community and our team.
          </Text>

          <Text style={paragraph}>We hope you enjoy using Formzillion!</Text>

          <Text style={bullets}>Best,</Text>
          <Text style={bullets}>Sandeep</Text>
          <Text style={paragraph}>CEO, Formzillion</Text>
          <Text style={footerItalic}>
            If you don’t want me to contact you again, please just let me know
            and I’ll update your preferences.
          </Text>
          <Footer />
        </Container>
      </Section>
    </Html>
  );
}
