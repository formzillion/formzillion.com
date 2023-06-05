import CodeBlock from "@/ui/Code";
import Image from "next/image";

import thankYou from "public/guides/default-thank-you.png";
import svelte from "public/guides/svelte-page.png";
import svelteSite from "public/guides/svelteSite.png";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Svelte() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Svelte
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Svelte is a JavaScript framework that enables developers to build
        dynamic and interactive user interfaces with a compiler-based approach.
        It eliminates the need for a virtual DOM and provides scoped CSS for
        component-based styling.
      </h2>

      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your Svelte project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Svelte Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Svelte Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Svelte form.
      </p>
      <h4> Step 2 — Create a new Svelte project</h4>
      <p className="para">
        {`To initiate the project setup, let's follow the instructions provided in
        the Svelte`}{" "}
        <a href="https://svelte.dev/docs" target="_blank" rel="noreferrer">
          Getting Started
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </a>{" "}
        documentation. Open your terminal and execute the following command to
        create a new site:
      </p>
      <CodeBlock content={"npm create svelte@latest <project-name>"} />
      <p className="para">
        Navigate to the newly created directory for your website:
      </p>
      <CodeBlock content={`cd <project-name>`} />
      <p className="para">Run the development server:</p>
      <CodeBlock
        content={`npm install
npm run dev`}
      />
      <p className="para">
        You can now access the site in your browser by visiting
        https://localhost:5173. Below observe the sample site displayed on the
        screen:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={svelteSite}
          alt="svelte site"
          className=" w-[80%] object-contain"
        />
      </div>
      <p className="para">
        {`Great job! You have successfully created a new Svelte site. Now, let's
        proceed to learn how to add a contact form into your project.`}
      </p>
      <h4>Step 3 — Create a Contact Form</h4>
      <p className="para">
        {`To integrate the Formzillion form endpoint with your Svelte project's contact form, follow these steps:`}
      </p>
      <ol>
        <li>
          Within the <span className="bg-highlight">src/routes</span> directory
          of your project, create a new folder called{" "}
          <span className="bg-highlight">contact</span>.
        </li>
        <li>
          Inside the <span className="bg-highlight">contact</span> folder,
          create a <span className="bg-highlight"> +page.svelte</span> file to
          serve as the component defining the{" "}
          <span className="bg-highlight">contact</span> page in your app.
        </li>
        <li>
          Insert the provided code block below into the{" "}
          <span className="bg-highlight">+page.svelte</span> file locaed at{" "}
          <span className="bg-highlight">src/routes/contact/+page.svelte</span>.
        </li>
      </ol>
      <CodeBlock
        content={`<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <header>
    <div class="header">
      <img
        src="https://zqpkoahtapmwaejzvraa.supabase.co/storage/v1/object/sign/logo/fz_logo_full.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvL2Z6X2xvZ29fZnVsbC5wbmciLCJpYXQiOjE2ODU3MDEzMzAsImV4cCI6MTcxNzIzNzMzMH0.lvfizvXxffwwkTyXjEjWRbf_OqJ0HOVUPYq3Gcu52gw&t=2023-06-02T10%3A22%3A10.613Z"
        alt="Formzillion"
      />
    </div>
  </header>

  <h1>Contact Us</h1>

  <form action="https://dev-app.formzillion.com/f/<FORM_ID>" method="POST">
    <label>Name
      <input name="name" type="text" />
    </label>
    <label>Email
      <input name="email" type="email" />
    </label>
    <label>Message
      <textarea id="message" name="message" rows="4" />
    </label>
    <button type="submit">Submit</button>
  </form>
</section> `}
      />
      <p className="para">
        To enhance the appearance of the form, you can apply custom CSS. Add the
        following code snippet to the bottom of the{" "}
        <span className="bg-highlight">+page.svelte</span> file located in{" "}
        <span className="bg-highlight">src/routes/contact/</span>:
      </p>
      <CodeBlock
        content={`<style>
  .header {
    display: flex;
    justify-content: center;
    margin: 40px;
  }

  .header img {
    width: 30%;
    max-width: 64rem;
    margin: 0 auto;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  form {
    max-width: 320px;
    margin: 32px auto;
    display: flex;
    flex-direction: column;
  }
  input {
    background: rgba(200, 194, 194, 0.32);
    border: 1px solid rgba(111, 109, 109, 0.32);
    padding: 16px;
    border-radius: 6px;
    color: #fff;
    width: 290px;
  }
  input:focus {
    border-color: #FF4500;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(225 69 0 / 20%);
  }
  textarea {
    border: 1px solid rgba(111, 109, 109, 0.32);
    background: rgba(200, 194, 194, 0.32);
    padding: 16px;
    border-radius: 6px;
    color: #fff;
    width: 290px;
  }
  textarea:focus {
    border-color: #FF4500;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(225 69 0 / 20%);
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

  h1 {
    margin: 0;
  }

  label {
    font-size: large;
  }
</style>`}
      />
      <p className="para">
        Now, with the applied styling, the form has an appealing visual design
        that appears as follows:
      </p>
      <div className="flex justify-center my-6">
        <Image
          src={svelte}
          alt="Thank you"
          className="object-contain w-[50%]"
        />
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
        Congratulations! Your Svelte site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  );
}
