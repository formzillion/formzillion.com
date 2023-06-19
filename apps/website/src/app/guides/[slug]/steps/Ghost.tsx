import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import CodeBlock from "@/ui/Code";
import site from "public/guides/ghost-dashboard.png";
import html from "public/guides/ghost-html.png";
import page from "public/guides/create-page-ghost.png";
import htmlForm from "public/guides/ghost-html-form.png";
import conatctPage from "public/guides/ghost-contact-page.png";
import thankYou from "public/guides/default-thank-you.png";

export default function Ghost() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Ghost
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Ghost is a versatile and user-friendly, open-source CMS built for
        bloggers and content creators, offering a distraction-free writing
        experience and customizable themes. With built-in SEO tools and
        membership features, it allows you to publish, monetize, and share your
        content effortlessly.
      </h2>
      <p className="para">
        Now, let’s explore the process of connecting your Ghost site with
        Formzillion to effortlessly receive form submissions. In this tutorial,
        we will focus on crafting a Contact form featuring essential fields such
        as <b>name</b>, <b>email</b>, and <b>message</b>. However, you have the
        flexibility to create any type of form you desire, whether it’s a
        support form, lead intake form, or subscriber form. Feel free to include
        as many fields as you need to fulfill your specific requirements.
      </p>
      <p className="heading">How to create a Ghost Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Ghost Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Ghost form.
      </p>
      <h4>Step 2 — Create your Ghost contact form</h4>
      <p className="para">
        Sign in to your{" "}
        <a href="https://ghost.org/" target="_blank" rel="noreferrer">
          Ghost{" "}
        </a>
        dashboard or you can create your own Ghost site in local using below
        steps.{" "}
      </p>
      <p className="para">
        <a
          href="https://ghost.org/docs/ghost-cli/"
          target="_blank"
          rel="noreferrer"
        >
          Ghost-CLI
        </a>{" "}
        is a commandline tool to help you get Ghost installed and configured for
        use, quickly and easily. To initiate the project setup, let’s follow the
        instructions provided in the Ghost{" "}
        <a
          href="https://ghost.org/docs/install/local/"
          target="_blank"
          rel="noreferrer"
        >
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <h4>Install Ghost-CLI</h4>
      <CodeBlock content={`npm install ghost-cli@latest -g`} />
      <p className="para">
        Once installed, you can always run{" "}
        <span className="bg-highlight">ghost help</span> to see a list of
        available commands.
      </p>
      <CodeBlock content={`ghost help`} />
      <h4>Install Ghost</h4>
      <p className="para">
        In your terminal, cd into an empty directory and run the install
        command:
      </p>
      <CodeBlock content={`ghost install local`} />
      <p className="para">
        Once the install is finished you’ll be able to access your new site on{" "}
        <span className="bg-highlight">http://localhost:2368</span> and{" "}
        <span className="bg-highlight">http://localhost:2368/ghost</span> to
        access Ghost Admin. It will come with a default Ghost theme. The admin
        will look like below:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={site}
          alt="ghost site"
          className={"w-[80%] object-contain"}
        />
      </div>
      <h4>Step 3 — Creating a custom page template</h4>
      <ol>
        <li>
          In the sidebar select pages & click on New Page.
          <div className="flex justify-center my-6">
            <Image src={page} alt="page" className={"w-[80%] object-contain"} />
          </div>
        </li>
        <li>
          Add Contact Us title to your page and click on{" "}
          <PlusCircleIcon className="h-5 w-5 inline" /> icon to add an HTML code
          <div className="flex justify-center my-6">
            <Image src={html} alt="html" className={"w-[80%] object-contain"} />
          </div>
        </li>
        <li>
          Add Your Form inside the HTML block.
          <div className="flex justify-center my-6">
            <Image
              src={htmlForm}
              alt="htmlform"
              className={"w-[80%] object-contain"}
            />
          </div>
          <p className="para">
            To preview your page, simply click on the{" "}
            <span className="bg-highlight">Preview</span> option located at the
            top right corner. Additionally, you have the flexibility to apply
            your own styling to the form or directly copy the provided code
            below.
          </p>
          <CodeBlock
            content={`<form action="https://app.formzillion.com/f/form_id" method="POST">
  <input type="text" name="name" placeholder="Name" />
  <input type="email" name="email" placeholder="Email" />
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    background-color: #030712;
    margin: auto;
    color: white;
    max-width: 400px;
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    color: white;
    width:70%;
  }

  input {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #6b7280;
    background-color: #030712;
    color: white;
    border-radius:4px;
  }

  textarea {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #6b7280;
    background-color: #030712;
    color: white;
    border-radius:4px;
  }

  button {
    margin: 10px 0px;
    border-radius: 4px;
    padding: 10px;
    background-color: #ea580c;
    color: white;
    border: 0px;
    cursor: pointer;
  }

  button:hover {
    background-color: #c2410c;
  }
</style>`}
          />
        </li>
        <li>
          Now click on <span className="bg-highlight">Publish.</span>
          <h4>Boom. It’s out there. Your page has been published.</h4>
          <div className="flex justify-center my-6">
            <Image
              src={conatctPage}
              alt="contact-page"
              className={"w-[80%] object-contain"}
            />
          </div>
        </li>
      </ol>
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
        Congratulations! Your Ghost site now has the contact form powered by
        Formzillion!
      </p>
    </>
  );
}
