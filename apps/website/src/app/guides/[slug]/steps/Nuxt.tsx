import CodeBlock from "@/ui/Code";
import Image from "next/image";

import thankYou from "public/guides/default-thank-you.png";
import nuxtjs from "public/guides/nuxtjs-page.png";
import nuxtJsSite from "public/guides/nuxtJsSite.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Nuxt() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Nuxt
        </span>{" "}
        and Formzillion
      </h1>
      <h2>Nuxt.js is a powerful Vue.js framework that allows developers to build server-side rendered and statically generated web applications with ease. It provides out-of-the-box features like automatic routing, code splitting, and server-side rendering, enabling faster and SEO-friendly applications development</h2>

      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your NuxtJS project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Nuxt JS Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>NuxyJS Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your NuxyJs form.
      </p>
      <h4> Step 2 — Create a new Nust JS project</h4>
      <p className="para">
        {`To initiate the project setup, let's follow the instructions provided in
        the Nuxt JS`}
        {" "}
        <a
          href="https://nuxt.com/"
          target="_blank"
          rel="noreferrer"
        >
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <CodeBlock content={"npx create-nuxt-app <project-name>"} />
      <p className="para">
        Navigate to the newly created directory for your website:
      </p>
      <CodeBlock content={`cd <project-name>`} />
      <p className="para">Run the development server:</p>
      <CodeBlock content={`npm install
npm run dev`} />
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:4000. Below observe the sample site displayed on the
        screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={nuxtJsSite}
          alt="nuxtjs site"
          className=" w-[80%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new NuxtJS site. Now, let's
        proceed to learn how to add a contact form into your project.`}
      </p>
      <h4>Step 3 — Create a Contact Form</h4>
      <p className="para">
        {`To integrate the Formzillion form endpoint with your NuxtJS project's contact form, follow these steps:`}
      </p>
      <p>In order to integrate the form endpoint from Formzillion into Nuxt.js, we will create a new file named <span className="bg-highlight">contact.vue</span> in the <span className="bg-highlight">/pages</span> directory of your Nuxt.js application. This file will contain the bellow code to add the form functionality to your Nuxt.js app.</p>
      <CodeBlock content={`<template>
  <div>
    <div class="heading">
      <img src="https://zqpkoahtapmwaejzvraa.supabase.co/storage/v1/object/sign/logo/fz_logo_full.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvL2Z6X2xvZ29fZnVsbC5wbmciLCJpYXQiOjE2ODU3MDEzMzAsImV4cCI6MTcxNzIzNzMzMH0.lvfizvXxffwwkTyXjEjWRbf_OqJ0HOVUPYq3Gcu52gw&t=2023-06-02T10%3A22%3A10.613Z" />
    </div>
    <h1 class="heading">Contact Us</h1>
    <form action="https://dev-app.formzillion.com/f/<FORM_ID>" method="POST">
      <div class="form-group">
        <label for="text" class="lable">Name</label>
        <input type="text" name="name" required />
      </div>
      <div class="form-group">
        <label for="text" class="lable">Email</label>
        <input type="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="text" class="lable">Message</label>
        <textarea id="message" name="message" rows="4" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template> `}
      />
      <p className="para">
        To enhance the appearance of the form, you can apply custom CSS. Add the following code snippet to the bottom of the <span className="bg-highlight">contact.vue</span> file located in <span className="bg-highlight">/pages</span>:
      </p>
      <CodeBlock content={`<style>
  body {
    background: #24292e;
    cursor: pointer;
    font-family: roboto, sans-serif;
    font-size: 14px;
    padding-left: 6px;
    padding-right: 0.5rem;
    white-space: nowrap;
    color: #fff;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto, Oxygen,
      Ubuntu, Cantarell, “Open Sans”, “Helvetica Neue”, sans-serif;
  }

  .form-group {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
  }

  .lable {
    margin-bottom: 5px;
    font-size: 16px;
  }

  form {
    max-width: 320px;
    margin: 32px auto;
  }

  input {
    background: rgba(0, 0, 0, 0.32);
    border: 0;
    padding: 16px;
    border-radius: 6px;
    color: #fff;
    width: 290px;
  }

  input:focus {
    border-color: #20c98b;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(32 201 139 / 25%);
  }

  textarea {
    background: rgba(0, 0, 0, 0.32);
    border: 0;
    padding: 16px;
    border-radius: 6px;
    color: #fff;
    width: 290px;
  }

  textarea:focus {
    border-color: #20c98b;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(32 201 139 / 25%);
  }

  button {
    width: 320px;
    display: inline-block;
    margin-top: 16px;
    border: 0;
    padding: 16px;
    color: white;
    background: orangered;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #72737f;
    opacity: 1;
    /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #72737f;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #72737f;
  }

  .heading {
    text-align: center;
  }

  img {
    width: 30%;
  }
</style>`} />
      <p className="para">
        Now, with the applied styling, the form has an appealing visual design that appears as follows:</p>
      <div className="flex justify-center my-6">
        <Image src={nuxtjs} alt="Thank you" className="object-contain w-[50%]" />
      </div>
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
        Congratulations! Your NuxtJS site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  )
}
