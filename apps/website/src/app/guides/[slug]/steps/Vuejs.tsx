import React from "react";
import CodeBlock from "@/ui/Code";
import Image from "next/image";

import vuejsSite from "public/guides/vuejsSite.png";
import thankYou from "public/guides/default-thank-you.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Vuejs() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Vue.js
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Vue.js is a JavaScript framework for building dynamic and interactive
        user interfaces with a component-based architecture and reactive data
        binding. It provides developers with an effortless and intuitive
        development experience, enabling the creation of scalable and
        maintainable web applications.
      </h2>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your Vue.js project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Vue.js Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Vue.js Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Vue.js form.
      </p>
      <h4> Step 2 — Create a new VueJS project</h4>
      <p className="para">
        {`To initiate the project setup, let's follow the instructions provided in
        the Vue.js`}{" "}
        <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <CodeBlock content={"npm init vue@latest"} />
      <p className="para">{`To initialize a Vue project, execute the "create-vue" command, which is the official Vue project scaffolding tool. During the setup process, you will be presented with prompts to configure various optional features, including TypeScript and testing support:`}</p>
      <CodeBlock
        content={`1. Project name: … <your-project-name>
2. Add TypeScript? … No / Yes
3. Add JSX Support? … No / Yes
4. Add Vue Router for Single Page Application development? … No / Yes
5. Add Pinia for state management? … No / Yes
6. Add Vitest for Unit testing? … No / Yes
7. Add an End-to-End Testing Solution? … No / Cypress / Playwright
8. Add ESLint for code quality? … No / Yes
9. Add Prettier for code formatting? … No / Yes`}
      />
      <p className="para">
        {`If you're uncertain about an option, you can simply press Enter to choose the default, which is usually "No" for now. After successfully creating the project, refer to the provided instructions to install the necessary dependencies and initiate the development server.`}
      </p>
      <CodeBlock
        content={`cd <your-project-name>
npm install`}
      />
      <p className="para">Run the development server</p>
      <CodeBlock content={`npm run dev`} />
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:3000. Below observe the sample site displayed on the
        screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={vuejsSite}
          alt="vuejs site"
          className=" w-[80%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new Vue.js site. Now, let's
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
        To incorporate a contact form into your Vue.js site, you can either add
        it to the existing <span className="bg-highlight">src/App.vue</span>{" "}
        file.
      </p>
      <iframe
        src="https://codesandbox.io/embed/formzillion-basic-vue-form-ilixsd?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark"
        className="w-full h-[600px] rounded-xl my-8"
        title="Formzillion - Basic Vue form"
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
        Congratulations! Your Vue.js site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  );
}
