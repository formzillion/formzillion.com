import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Formzillion",
  description:
    "Familiarize yourself with Formzillion's terms and conditions to ensure proper use of our headless form management solution. Stay informed and make the most of our streamlined and automated system.",
  keywords:
    "Formzillion, Terms and Conditions, Guidelines, Headless Form Management, Streamlined Forms, Automated Forms, Managing API Requests, Ensuring Compliance, Payment, Refunds, Upgrading, Downgrading Terms, Intellectul Property Right",
  alternates: {
    canonical: "https://formzillion.com/terms",
  },
};
export default function page() {
  return (
    <>
      <section className="border-b border-gray-800 py-28 bg-gray-900/20">
        <h1 className="text-5xl mb-5 text-white text-center">
          Formzillion Terms & Conditions
        </h1>
      </section>
      <div className="lg:max-w-5xl xl:max-w-6xl px-10 sm:max-w-xl md:max-w-2xl sm:px-0 mx-auto py-10 text-sm text-gray-400">
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">1. General Information</h2>
          In order to access and use the Service, you must agree to and abide by
          these Terms. These Terms are applicable to all individuals, including
          visitors, users, and others who access or utilize the Service. They
          serve as a valuable resource for understanding the functionality of
          our Products and Services, encompassing aspects such as data
          collection, billing procedures, customer interactions, and other
          pertinent information. We recommend referring back to these Terms
          whenever you have inquiries about our Products and Services or seek
          clarity on operational processes. We trust that you will have a
          pleasant experience with Formzillion.
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">2. Accounts</h2>
          To register an account with us, it is necessary to provide a valid
          email address and ensure that all other information submitted during
          the signup process is accurate, complete, and up-to-date. Failing to
          meet these requirements violates our Terms and may lead to immediate
          termination of your account on our Service.
          <ul className="list-disc space-y-3 p-5">
            <li>
              To utilize this Site and Service, it is required that you are at
              least 13 years of age or older.
            </li>
            <li>
              {`To participate, you must be a human. Registration by automated
            accounts, known as "bots," is strictly prohibited. Any accounts
            found to be bots will be promptly deleted.`}
            </li>
            <li>
              As the user, it is your responsibility to ensure the security of
              your password used to access the Service. You are accountable for
              all activities and actions carried out under your password,
              regardless of whether it is used on our Service or a third-party
              service. It is important to note that Formzillion cannot be held
              liable for any loss or damage resulting from your failure to
              fulfill this security obligation.
            </li>
            <li>
              As the account holder, you bear full responsibility for all
              content posted and activities carried out under your account.
            </li>
            <li>
              By using this platform, you acknowledge and agree to maintain the
              confidentiality of your password and refrain from sharing it with
              any external parties. In the event of any security breach or
              unauthorized access to your account, it is your responsibility to
              promptly notify us.
            </li>
            <li>
              You are prohibited from engaging in any illegal or unauthorized
              activities when using the Service. It is strictly forbidden to
              violate any laws in your jurisdiction, including copyright laws,
              while using the Service.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">
            3. Account contested by 2 or more parties
          </h2>
          In the case of an account being contested by 2 or more parties,
          Formzillion will determine whom to grant ownership of the account to in
          the following way:
          <ul className="list-disc space-y-3 p-5">
            <li>
              <b>Ownership of a PREMIUM account: </b>The ownership of a PREMIUM
              account will be bestowed upon the party that has made the most
              recent payment in the account, unless it can be proven otherwise.
            </li>
            <li>
              <b> Ownership of a FREE account: </b>The party that initially
              registered for the account will be given ownership of the account
              at no cost, unless evidence suggests otherwise.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">
            4. Managing API Requests and Ensuring Compliance
          </h2>
          <p className="mb-4">
            {`Formzillion reserves the right to grant API keys and impose restrictions
        on the number of API calls you can make, as deemed necessary for
        maintaining service stability. Should you exceed these limits,
        Formzillion may throttle your activity or revoke your access to the
        Formzillion APIs entirely. By using the APIs, you agree to comply with
        these limitations and refrain from any attempts to bypass them.
        Formzillion retains the authority to suspend or terminate your access to
        the Developer's Tools without prior notice if it determines that you
        have violated the terms of this Agreement or the Terms of Service.`}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">
            5. Payment, Refunds, Upgrading And Downgrading Terms
          </h2>
          <p className="mb-3">
            We reserve the right to charge fees for our services. You will be
            required to pay these fees, along with any outstanding amounts, as
            specified in the specific terms and conditions for the chosen
            service or package.
          </p>

          <p className="mb-3">
            All paid plans must provide a valid credit card. Free accounts are
            not required to submit credit card details. If you upgrade from the
            free plan to a paid plan, you will be billed immediately. The
            Service is billed monthly in advance and is non-refundable. No
            refunds or credits will be given for partial months of service,
            refunds for plan upgrades or downgrades, or unused months with an
            active account. To ensure fairness to all users, no exceptions will
            be made.
          </p>

          <p className="mb-3">
            All fees exclude any taxes, levies, or duties imposed by taxing
            authorities, and you are responsible for paying all such taxes,
            levies, or duties, except for United States (federal or state)
            taxes.
          </p>

          <p className="mb-3">
            If you upgrade or downgrade your plan, your provided credit card
            will be automatically charged the new rate in your next billing
            cycle. Downgrading your Service may result in the loss of content,
            features, or capacity in your account. Formzillion does not accept
            any liability for such loss.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">
            6. Cancellation Or Termiation
          </h2>
          <p className="mb-3">
            You can deactivate and delete your Formzillion Account by requesting
            it while logged into the Service. If you terminate your Formzillion
            Account, you may still have limited access to certain parts of the
            Service, but you will lose access to specific features and Content
            that are only available to Formzillion Account holders.
          </p>

          <p className="mb-3">
            Formzillion also reserves the right to terminate your use of the
            Site and/or Services at any time, with or without cause. If we
            terminate your Account, we will notify you via email to your
            registered email account. Your obligation to pay any outstanding
            charges and fees accrued until the termination date will remain even
            after the termination of this Agreement. Once the Subscription Term
            expires or termination occurs, your Subscription Plan will be
            immediately terminated, and you may utilize the free version of the
            Service.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">
            7. Copyright And Intellectul Property Right
          </h2>
          <p className="mb-3">
            We acknowledge that the material and information you provide to
            Formzillion are your own and we do not claim any rights over them.
            Your profile and materials will always belong to you.
          </p>

          <p className="mb-3">
            {` The Service's look and feel, which includes the design and layout, is
          copyrighted and owned by Formzillion, © 2019. All rights reserved. The
          trademarks, including the name and logos of Formzillion, are also
          owned by Formzillion and cannot be used without our permission.`}
          </p>
          <p className="mb-3">
            The Products and Services offered by Formzillion, including all
            content provided on our user interfaces or delivered to members,
            such as source code (HTML/CSS, Javascript), data compilations,
            software, visual design elements, and concepts, are the property of
            Formzillion. These intellectual properties are protected by
            international copyright, trade secret, and other intellectual
            property laws and treaties.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">7. Third Party Services</h2>
          <p className="mb-3">
            Our website and services may contain links to external websites,
            materials, or content created by third parties that are not owned or
            controlled by Formzillion. Formzillion has no control over, and
            assumes no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>

          <p className="mb-3">
            You acknowledge and agree that Formzillion is not liable for any
            damages or losses, directly or indirectly, caused or alleged to be
            caused by or in connection with the use of or reliance on any such
            content, goods, or services available on or through any such
            websites or services. Your use of any linked materials is at your
            own risk. Formzillion reserves the right, at its sole discretion, to
            discontinue linking to any other materials at any time and for any
            reason. We strongly recommend that you read the terms and conditions
            and privacy policies of any third-party websites or services that
            you visit.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-white">8. Disclaimer</h2>
          <p className="mb-3">
            {`THE MATERIALS PROVIDED ON THE FORMZILLION SITE AND SERVICES ARE
          OFFERED "AS IS." BY USING THE SITE, YOU ACKNOWLEDGE THAT YOU ASSUME
          FULL RESPONSIBILITY AND ANY ASSOCIATED RISKS. TO THE MAXIMUM EXTENT
          PERMITTED BY LAW, FORMZILLION, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
          AGENTS DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, REGARDING
          THE SERVICE AND YOUR USAGE OF IT. FORMZILLION DOES NOT GUARANTEE OR
          MAKE REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE CONTENT
          ON THIS SITE OR ANY LINKED SITES, AND IT ASSUMES NO LIABILITY FOR ANY
          ERRORS, MISTAKES, OR INACCURACIES IN THE CONTENT. FURTHERMORE,
          FORMZILLION IS NOT RESPONSIBLE FOR ANY PERSONAL INJURY, PROPERTY
          DAMAGE, UNAUTHORIZED ACCESS TO OR USE OF SECURE SERVERS, TRANSMISSION
          INTERRUPTIONS, OR ANY BUGS, VIRUSES, OR SIMILAR HARMFUL ELEMENTS
          TRANSMITTED THROUGH THE SERVICE BY THIRD PARTIES. ADDITIONALLY,
          FORMZILLION DOES NOT WARRANT, ENDORSE, OR GUARANTEE ANY PRODUCTS OR
          SERVICES ADVERTISED OR OFFERED BY THIRD PARTIES THROUGH THE SERVICE.
          ANY TRANSACTIONS BETWEEN YOU AND THIRD-PARTY PROVIDERS ARE SOLELY YOUR
          RESPONSIBILITY, AND FORMZILLION WILL NOT BE INVOLVED OR LIABLE IN ANY
          WAY. IT IS IMPORTANT TO EXERCISE CAUTION AND USE YOUR BEST JUDGMENT
          WHEN PURCHASING PRODUCTS OR SERVICES THROUGH ANY MEDIUM OR
          ENVIRONMENT. BY ACKNOWLEDGING THIS AGREEMENT, YOU AFFIRM THAT YOU HAVE
          READ, UNDERSTOOD, AND AGREED TO BE BOUND BY ITS TERMS.`}
          </p>
        </div>
      </div>
    </>
  );
}
