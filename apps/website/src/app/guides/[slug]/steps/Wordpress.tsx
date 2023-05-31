import React from "react";
import Image from "next/image";

import dashboard from "public/guides/wordpress-dashboard.png";
import wordpressPage from "public/guides/wordpress-page.png";
import contactPage from "public/guides/contact-page.png";
import customHtml from "public/guides/custom-html.png";
import wpContactForm from "public/guides/wp-contact-form.png";

export default function WordPress() {
  return (
    <>
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
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>WordPress Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your WordPress
        form.
      </p>
      <h4>Step 2 — Create WordPress page to your Contact Form</h4>
      <p className="para">
        Once you have completed the setup of your WordPress site, you will see
        below screen:
      </p>
      <div className="flex justify-center my-6">
        <Image src={dashboard} alt="dashboard" className="object-contain" />
      </div>
      <h4>
        Follow the simple steps for adding an HTML form code on a WordPress
        page:
      </h4>
      <ol className="list-decimal list-inside">
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
          Pick a pre-defined contact us layout or you can select blank page.
          <div className="flex justify-center my-6">
            <Image
              src={contactPage}
              alt="contactPage"
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
    </>
  );
}
