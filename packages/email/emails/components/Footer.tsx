import React from "react";
import { Hr } from "@react-email/hr";
import { Link } from "@react-email/link";
import { Text } from "@react-email/text";

import { footer, footerAnchor, hr } from "./styles";

export function Footer() {
  return (
    <>
      <Hr style={hr} />
      <Text style={footer}>
        <Link style={footerAnchor} href="https://formzillion.com/">
          Formzillion
        </Link>
        . ©Formzillion, 21 Market Street #400, San Francisco, CA 94116
      </Text>
    </>
  );
}
