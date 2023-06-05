import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import CodeBlock from "@/ui/Code";
import "./steps.css";
import gatsbySite from "public/guides/gatsby-localhost.png";
import thankYou from "public/guides/default-thank-you.png";

export default function Gatsby() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Gatsby
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Gatsby is a modern web development framework that enables the creation
        of fast, optimized, and content-rich websites.
      </h2>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your Gatsby project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Gatsby Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Gatsby Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Gatsby form.
      </p>
      <h4> Step 2 — Get your Gatsby form ready for your website</h4>
      <p className="para">
        It is a basic contact form with name, email address and message fields:
      </p>
      <CodeBlock
        content={`<form action="https://app.formzillion.com/f/{form_id}">
  <input type="text" name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Your Email">
  <input type="text" name="message" placeholder="Your Message">
  <button type="submit">Send</button>
</form>`}
      />
      <h4>Step 3 — Create a new Gatsby site</h4>
      <p className="para">
        The Gatsby command line interface (CLI) is the main tool you use to
        initialize, build and develop Gatsby sites.{" "}
        <a
          href="https://www.gatsbyjs.com/docs/reference/gatsby-cli/"
          target="_blank"
          rel="noreferrer"
        >
          Know more <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>
      </p>
      <p className="para">
        Open your terminal and enter the following command to initiate the
        creation of your Gatsby site.
      </p>
      <CodeBlock content={"npm install -g gatsby-cli"} />
      <p className="para">Create a new site.</p>
      <CodeBlock content={"gatsby new my-gatsby-site"} />
      <p className="para">
        Navigate to the site folder by changing directories, and execute the
        following command:
      </p>
      <CodeBlock content={"gatsby develop"} />
      <p className="text-gray-300">
        You can now access the site in your browser by visiting{" "}
        <span className="underline">https://localhost:8000.</span> Below observe
        the sample site displayed on the screen:
      </p>
      <div className="flex justify-center mt-6">
        <Image
          src={gatsbySite}
          alt="gatsby site"
          className=" w-[80%] object-contain"
        />
      </div>
      <h4>Step 4 — Create a Contact Form</h4>
      <p className="para">
        To incorporate a contact form into your Gatsby site, you can either add
        it to the existing <span className="bg-highlight">src/pages/index.js</span> file or create a new file
        called <span className="bg-highlight">contact.js</span> within the <span className="bg-highlight">src/pages</span> directory. Then,
        simply insert the given code block into the chosen file
      </p>
      <iframe
        className="w-full my-10 h-[600px] rounded-xl scroll-m-1 overflow-scroll max-h-screen scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-md scrollbar-h-[1px] scrollbar-thumb-gray-700"
        src="https://codesandbox.io/p/sandbox/formzillion-gatsby-demo-m2f05n?file=%2Fsrc%2Fpages%2Findex.js%3A6%2C32"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
      <p className="para">
        {`To successfully submit your form to Formzillion, ensure that you include
        the 'FORM_ID' in the provided form code. This 'FORM_ID' should
        correspond to the ID assigned to your specific Formzillion form.`}
      </p>
      <p className="para">
        And there you have it! Once you fill out and submit the form, you will
        be able to view the default submission thank you page.
      </p>
      <div className="flex justify-center mt-6">
        <Image src={thankYou} alt="Thank you" className="object-contain" />
      </div>
      <p className="para text-center mt-6">
        Congratulations! Your Gatsby site now has the contact form powered by
        Formzillion!
      </p>
    </>
  );
}
