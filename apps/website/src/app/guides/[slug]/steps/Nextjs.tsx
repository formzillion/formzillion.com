import CodeBlock from "@/ui/Code";
import Image from "next/image";
import React from "react";

import nextjsSite from "public/guides/nextjs-localhost.png";
import thankYou from "public/guides/default-thank-you.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Nextjs() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Next.js
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Next.js is a powerful framework for building server-rendered React
        applications with seamless routing and server-side rendering
        capabilities.
      </h2>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your Next.js project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Next.js Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Next.js Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Next.js form.
      </p>
      <h4> Step 2 — Create a new NextJS project</h4>
      <p className="para">
        To initiate the project setup, let’s follow the instructions provided in
        the Next.js
        <a
          href="https://nextjs.org/docs/getting-started/installation"
          target="_blank"
          rel="noreferrer"
        >
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <CodeBlock content={"npx create-next-app@latest"} />
      <p className="para">{`On installation, you'll see the following prompts:`}</p>
      <CodeBlock
        content={`1. What is your project named? my-app
2. Would you like to use TypeScript with this project? No / Yes
3. Would you like to use ESLint with this project? No / Yes
4. Would you like to use Tailwind CSS with this project? No / Yes
5. Would you like to use "src/" directory with this project? No / Yes
6. Use App Router (recommended)? No / Yes
7. Would you like to customize the default import alias? No / Yes`}
      />
      <p className="para">
        After the successful installation, a terminal message will appear
        containing instructions on how to access and run your site locally.
        Navigate to the newly created directory for your website:
      </p>
      <CodeBlock content={`cd your-folder-name`} />
      <p className="para">Run the development server</p>
      <CodeBlock content={`npm run dev`} />
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:3000. Below observe the sample site displayed on the
        screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={nextjsSite}
          alt="nextjs site"
          className=" w-[80%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new Next.js site. Now, let's
        proceed to learn how to add a contact form into your project.`}
      </p>
      <h4>Step 3 — Create a Contact Form</h4>
      <CodeBlock
        content={`<form action="https://app.formzillion.com/f/{form_id}">
  <input type="text" name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Your Email">
  <input type="text" name="message" placeholder="Your Message">
  <button type="submit">Send</button>
</form>`}
      />
      <p className="para">
        To incorporate a contact form into your Next.js site, you can either add
        it to the existing <span className="bg-highlight">app/pages.tsx</span>{" "}
        file or create a new page called{" "}
        <span className="bg-highlight">app/contact/page.tsx</span>. Then, simply
        insert the given code block into the chosen file:
      </p>
      <iframe
        className="w-full my-10 h-[600px] rounded-xl scroll-m-1 overflow-scroll max-h-screen scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-md scrollbar-h-[1px] scrollbar-thumb-gray-700"
        src="https://codesandbox.io/p/sandbox/formzillion-nextjs-demo-pzkc3m?embed=1"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
      <p className="para">
        To successfully submit your form to Formzillion, ensure that you include
        the <span className="bg-highlight">{`'FORM_ID'`}</span> in the provided
        form code. This <span className="bg-highlight">{`'FORM_ID'`}</span>{" "}
        should correspond to the ID assigned to your specific Formzillion form.
      </p>
      <p className="para">
        And there you have it! Once you fill out and submit the form, you will
        be able to view the default submission thank you page.
      </p>
      <div className="flex justify-center mt-6">
        <Image src={thankYou} alt="Thank you" className="object-contain" />
      </div>
      <p className="para text-center mt-6">
        Congratulations! Your Next.js site now has the contact form powered by
        Formzillion!
      </p>
    </>
  );
}
