import React from 'react';
import Image from "next/image";

import formElement from 'public/guides/webflow-forms-element.png'
import formSetting from 'public/guides/webflow-forms-setting.png'
import thankYou from "public/guides/default-thank-you.png";


export default function Webflow() {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl my-3 font-normal">
        Building forms with{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Webflow
        </span>{" "}
        and Formzillion
      </h1>
      <h2>
        Webflow is an intuitive visual web design platform that allows users to
        create professional and responsive websites without coding knowledge.
      </h2>
      <p className="para">
        This guide will demonstrate the quick process of adding a contact form
        to your Webflow project and connecting it to Formzillion for submission
        handling.
      </p>
      <p className="heading">How to create a Webflow Contact Form</p>
      <h4>Step 1 — Create new form endpoint on Formzillion</h4>
      <p className="para">
        Sign in to your Formzillion account and create a new form with name{" "}
        <b>Webflow Contact Form</b> or a similar identifier. Formzillion will
        assign a unique form ID specifically for identifying your Webflow form.
      </p>
      <h4>Step 2 — Setting up your Webflow Website</h4>
      <ol>
        <li>
          Open your website in <a href="https://webflow.com/?utm_source=google&utm_medium=search&utm_campaign=general-paid-branded&utm_term=keyword-targeting&utm_content=branded-ads&utm_source=google&utm_medium=search&utm_campaign=Google-Search-Brand-Tier3-SS&utm_term=kwd-11668981_webflow_e_649953696920___ss_paid-bb&gclid=CjwKCAjwvdajBhBEEiwAeMh1UydukT9N7ukiydwe_XlFSnEvuedS8KwLro8OCGHu6kakSkfLIdE9uRoCM4oQAvD_BwE"
            target="_blank"
            rel="noreferrer">Webflow </a> or the Webflow Designer.
        </li>
        <li>
          {` Click on the "Add Elements" tab located in the top left corner.`}
        </li>
        <li>
          {`Scroll down to the "Forms" section.`}
        </li>
        <li>
          {`Drag and drop the "Form Block" onto the desired page.`}
          <div className="flex justify-center mt-5">
            <Image src={formElement} alt="Thank you" className="object-contain" />
          </div>
        </li>
      </ol>
      <h4>Step 3 — Configuring the Form Endpoint</h4>
      <ol>
        <li>
          {`Select the newly added "Form" element.`}
        </li>
        <li>
          Click on {`"Element Settings"`} to access the form settings.
        </li>
        <li>
          {`In the "Action" field, enter the form endpoint URL where form submissions will be sent. Make sure to set the method to "POST".`}
          <div className="flex justify-center my-6">
            <Image src={formSetting} alt="Thank you" className="object-contain" />
          </div>
        </li>
        <li>
          If needed, customize other form settings.
        </li>
      </ol>
      <h4>Step 4 — Publishing Your Website and Testing the Form</h4>
      <ol className='my-8'>
        <li>
          {`Publish your Webflow website by clicking on the "Publish your site" and choosing the domain.`}
        </li>
        <li>
          Navigate to the page with the form and submit a test submission.
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
        Congratulations! Your Webflow site now has the contact form powered by
        Formzillion!
      </p>
    </div>
  )
}
