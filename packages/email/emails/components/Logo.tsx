import React from "react";
import { Img } from "@react-email/img";

export const imageUrl =
  "https://zqpkoahtapmwaejzvraa.supabase.co/storage/v1/object/sign/logo/fz_logo_full.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvL2Z6X2xvZ29fZnVsbC5wbmciLCJpYXQiOjE2ODIwNjMxMzUsImV4cCI6MTcxMzU5OTEzNX0.Y_7vrkFt7phdqCs6ze17_TP5_JBt9aBq7Qc_-8R8BMU&t=2023-04-21T07%3A45%3A34.945Z";

export function Logo() {
  return (
    <>
      <Img src={imageUrl} width="150" height="30" alt="Formzillion" />
    </>
  );
}
