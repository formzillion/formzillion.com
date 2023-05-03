import React from "react";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";

import { logoText } from "./styles";

const baseUrl = "https://formzillion.com";

export function LogoText() {
  return (
    <>
      <Text style={logoText}>
        <Img
          src={`${baseUrl}/favicon.ico`}
          width="20"
          height="20"
          alt="Formzillion"
        />
        Happy forms!
      </Text>
    </>
  );
}
