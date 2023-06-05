import CodeBlock from "@/ui/Code";
import Image from "next/image";

import thankYou from "public/guides/default-thank-you.png";
import eleventySite from "public/guides/eleventySite.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function eleventy() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          11ty
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Eleventy is a JavaScript static site generator that transforms templates and content files into static HTML pages. It supports various templating languages, offers flexible setup options, and focuses on content-centric development. It generates performant static sites with extensibility through its plugin system.
      </h2>

      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your 11ty project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a 11ty Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>11ty Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your 11ty form.
      </p>
      <h4> Step 2 — Create a new 11ty project</h4>
      <p className="para">
        {`To initiate the project setup, let's follow the instructions provided in
        the 11ty`}
        {" "}
        <a
          href="https://www.11ty.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation.
      </p>
      <p className="para">
        Eleventy is a straightforward static site generator that automatically converts files with recognized extensions into corresponding .html files. To create a contact page, simply add a <span className="bg-highlight">contact.html</span> file in the root directory, containing the desired HTML content give below. Eleventy will handle the transformation process, generating a contact.html file with the appropriate output.
      </p>
      <CodeBlock content={`<div class="heading">
  <img src="https://zqpkoahtapmwaejzvraa.supabase.co/storage/v1/object/sign/logo/fz_logo_full.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvL2Z6X2xvZ29fZnVsbC5wbmciLCJpYXQiOjE2ODU3MDEzMzAsImV4cCI6MTcxNzIzNzMzMH0.lvfizvXxffwwkTyXjEjWRbf_OqJ0HOVUPYq3Gcu52gw&t=2023-06-02T10%3A22%3A10.613Z"/>
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
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`} />
      <p className="para">
        {`To successfully submit your form to Formzillion, ensure that you include
        the 'FORM_ID' in the provided form code. This 'FORM_ID' should
        correspond to the ID assigned to your specific Formzillion form.`}
      </p>
      <p className="para">
        {`Once you have added the form code, you can now proceed to add the
        necessary styling to your project. You can either add the CSS code
        directly to the HTML file`}
      </p>
      <CodeBlock content={`<style>
  body {
    background: #24292e;
    cursor: pointer;
    margin:100px;
    font-family: roboto, sans-serif;
    font-size: 14px;
    padding-left: 6px;
    padding-right: 0.5rem;
    white-space: nowrap;
    color: #fff;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto,
      Oxygen, Ubuntu, Cantarell, “Open Sans”, “Helvetica Neue”, sans-serif;
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
      <p className="para">To install 11ty and generate the files, please open your terminal and enter the following command:</p>
      <CodeBlock content={`npx @11ty/eleventy`} />
      <p className="para">To start the server and run your application, you can execute the following command in the terminal:</p>
      <CodeBlock content={`npx @11ty/eleventy --serve`} />
      
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:8080.Below observe the sample site displayed on the screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={eleventySite}
          alt="11ty site"
          className=" w-[60%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new 11ty site. Now, let's
        proceed to learn how to add a contact form into your project.`}
      </p>
      <p className="para">
        And there you have it! Once you fill out and submit the form, you will
        be able to view the default submission thank you page.
      </p>
      <div className="flex justify-center mt-6">
        <Image src={thankYou} alt="Thank you" className="object-contain" />
      </div>
      <p className="para text-center mt-6">
        Congratulations! Your 11ty site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  )
}