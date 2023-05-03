import React from "react";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Link } from "@react-email/link";
import { footerLink, footerText } from "./styles";

export function FooterText() {
  return (
    <>
      <Section>
        <Link
          style={footerLink}
          href="https://formzillion.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our blog
        </Link>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          style={footerLink}
          href="https://formzillion.com/legal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Policies
        </Link>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          style={footerLink}
          href="https://formzillion.com/help"
          target="_blank"
          rel="noopener noreferrer"
        >
          Help center
        </Link>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          style={footerLink}
          href="https://formzillion.com/community"
          target="_blank"
          rel="noopener noreferrer"
          data-auth="NotApplicable"
          data-linkindex="6"
        >
          Slack Community
        </Link>
        <Text style={footerText}>
          ©2022 Formzillion, LLC, a Zillionstack company. <br />
          21 Market Street #400, San Francisco, CA 94116 <br />
          <br />
          All rights reserved.
        </Text>
      </Section>
    </>
  );
}
