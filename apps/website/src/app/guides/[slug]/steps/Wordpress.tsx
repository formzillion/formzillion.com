import Image from "next/image";

import dashboard from "public/guides/wordpress-dashboard.png";
import wordpressPage from "public/guides/wordpress-page.png";
import customHtml from "public/guides/custom-html.png";
import wpContactForm from "public/guides/wp-contact-form.png";
import thankYou from "public/guides/default-thank-you.png";

export default function WordPress() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          WordPress
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        WordPress is a widely-used content management system that simplifies
        website creation and management, offering a user-friendly interface and
        a vast ecosystem of plugins and themes.
      </h2>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your WordPress project and connecting it to Formzillion for
        submission handling.
      </p>
      <p className="heading">How to create a WordPress Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>WordPress Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your WordPress
        form.
      </p>
      <h4>Step 2 — Create WordPress page for your Contact Form</h4>
      <p className="para">
        Once you have completed the setup of your{" "}
        <a href="https://wordpress.com/" target="_blank" rel="noreferrer">
          WordPress site
        </a>
        , you will see below screen:
      </p>
      <div className="flex justify-center my-6">
        <Image src={dashboard} alt="dashboard" className="object-contain" />
      </div>
      <h4>
        Follow the simple steps for adding an HTML form code on a WordPress
        page:
      </h4>
      <ol>
        <li>
          {`Sign in to your WordPress dashboard, navigate to the "Pages" section, and click on "Add New" to create a new page.`}
          <div className="flex justify-center my-6">
            <Image
              src={wordpressPage}
              alt="wordpressPage"
              className="object-contain"
            />
          </div>
        </li>
        <li>
          Select a Blank Page, Add a Custom HTML Section and setup your
          WordPress form.
          <div className="flex justify-center my-6">
            <Image
              src={customHtml}
              alt="customHtml"
              className="object-contain"
            />
          </div>
        </li>
        <li>
          Add your contact form in your WordPress page.
          <div className="flex justify-center my-6">
            <Image
              src={wpContactForm}
              alt="wpContactForm"
              className="object-contain"
            />
          </div>
        </li>
      </ol>
      <h4>Step 3 — Publishing Your Website and Testing the Form</h4>
      <ol className="my-8">
        <li>
          Publish your WordPress website to make the changes live. Ensure that
          all modifications, including the newly added contact form, are
          included in the published version.
        </li>
        <li>
          Visit the specific page on your website where the contact form is
          located.
        </li>
        <li>
          Kindly fill out the form with test data, submit the form to verify its
          proper functionality.
        </li>
      </ol>
      <p className="para">
        And there you have it! Once you fill out and submit the form, you will
        be able to view the default submission thank you page.
      </p>
      <div className="flex justify-center mt-6">
        <Image src={thankYou} alt="Thank you" className="object-contain" />
      </div>
      <p className="para text-center mt-6">
        Congratulations! Your Wordpress site now has the contact form powered by
        Formzillion!
      </p>
    </>
  );
}
