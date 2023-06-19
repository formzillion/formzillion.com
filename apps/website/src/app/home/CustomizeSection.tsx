import React from "react";
import Image from "next/image";

import feedback from "public/screenshots/submission-feedback.png";
import akismet from "public/brands/akismet.png";

export default function CustomizeSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center rounded-md p-4 sm:p-8 md:p-12">
      <div className="hidden md:block">
        <Image
          src={feedback}
          alt="Submission feedback"
          aria-label="Submission feedback"
          className="border rounded-md shadow-md"
        />
      </div>
      <div className="max-w-lg p-1 sm:p-2 md:p-4">
        <h3 className="text-2xl text-gray-900 font-semibold mb-3 md:mb-6">
          Customize
        </h3>
        <div className="text-lg text-gray-700">
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>
              <a
                className="link"
                href={`${process.env.NEXT_PUBLIC_DOCS_URL}/customization/redirection.html`}
                target="_blank"
                rel="noreferrer"
              >
                Customize
              </a>
              the redirect url, success page, error page, email template and
              more
            </div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Out-of-the-box modern design</div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>
              Translations: English, Russian, Spanish, Portuguese, French,
              Italian, German and Dutch, with more coming soon
            </div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>
              Spam protection support:{" "}
              <a className="link" href="/features/botpoison/">
                Botpoison
              </a>
              ,{" "}
              <a className="link" href="/features/recaptcha/">
                reCAPTCHA
              </a>
              ,{" "}
              <a className="link" href="/features/hcaptcha/">
                hCaptcha
              </a>
              ,{" "}
              <a className="link" href="/features/turnstile/">
                Turnstile
              </a>{" "}
              &amp; Akismet
            </div>
          </div>
          <div className="hidden md:flex items-center mt-8">
            <div className="text-center">
              <Image
                src="brands/botpoison.svg"
                alt="Botpoison"
                className="rounded w-16 p-2"
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">Botpoison</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src="brands/recaptcha.svg"
                alt="reCAPTCHA"
                className="rounded w-16 p-2"
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">reCAPTCHA</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src="brands/hcaptcha.svg"
                alt="hCaptcha"
                className="rounded w-16 p-2"
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">hCaptcha</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src={akismet}
                alt="Akismet"
                className="rounded w-16 p-2 "
              />
              <div className="text-sm font-semibold">Akismet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
