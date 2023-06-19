import CodeBlock from "@/ui/Code";
import Image from "next/image";

import reactjsSite from "public/guides/reactjsSite.png";
import thankYou from "public/guides/default-thank-you.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function React() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          React
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        React.js is a JavaScript library for building dynamic and interactive
        user interfaces with a component-based architecture, efficient virtual
        DOM, and unidirectional data flow. It enables developers to create
        scalable and maintainable web applications with ease.
      </h2>
      <p className="heading">How to create a React Contact Form</p>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your React.js project and connecting it to Formzillion for submission
        handling.
      </p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>React.js Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your React.js form.
      </p>
      <h4> Step 2 — Create a new ReactJS project</h4>
      <p className="para">
        {`To initiate the project setup, let's follow the instructions provided in
        the React.j`}
        s{" "}
        <a
          href="https://create-react-app.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <CodeBlock content={"npx create-react-app my-app"} />
      <p className="para">
        After the successful installation, a terminal message will appear
        containing instructions on how to access and run your site locally.
        Navigate to the newly created directory for your website:
      </p>
      <CodeBlock content={`cd my-app`} />
      <p className="para">Run the development server</p>
      <CodeBlock content={`npm start`} />
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:3000. Below observe the sample site displayed on the
        screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={reactjsSite}
          alt="reactjs site"
          className=" w-[80%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new React.js site. Now, let's
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
        To incorporate a contact form into your React.js site, you can either
        add it to the existing{" "}
        <span className="bg-highlight">src/index.js</span> file or create a new
        page called <span className="bg-highlight">app/contact.js</span>. Then,
        simply insert the given code block into the chosen file:
      </p>
      <iframe
        src="https://codesandbox.io/embed/green-leaf-usev4d?fontsize=14&hidenavigation=1&theme=dark"
        className="w-full h-[600px] rounded-xl"
        title="green-leaf-usev4d"
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
        Congratulations! Your React.js site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  );
}
