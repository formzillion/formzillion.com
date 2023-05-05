import { PageProps } from "@/types/PageProps";
import CodeBlock from "@/ui/Code";

const getFormContent = (formId: any) => {
  const formContent = `
<form action="${process.env.NEXT_PUBLIC_APP_URL}/f/${formId}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Message"
    required=""
  ></textarea>
  <button type="submit">Send</button>
</form>
`;
  return formContent;
};

export default async function Page({ params }: PageProps) {
  const { formId } = params;

  return (
    <div className="space-y-4">
      <div className="dark:text-gray-300 text-sm sm:text-base">
        <p>
          1. Make sure all your form elements have a{" "}
          <strong className="font-bold">name</strong> attribute.
        </p>

        <p>
          {`2. Make sure your form contains a button with the type attribute set to
        "submit".`}
        </p>
        <p> 3. Set your form‘s action attribute the following value:</p>
      </div>
      <CodeBlock
        content={`${process.env.NEXT_PUBLIC_APP_URL}/f/${formId}`}
        lang="html"
      />

      <div className="bg-orange-100 dark:bg-gray-900 dark:text-gray-300 rounded-md px-4 py-3 text-sm sm:text-base">
        Looking more advanced usecases? Check out our
        <a
          href="https://docs.formzillion.com"
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-blue-600 underline"
        >
          documentation website
        </a>
        .
      </div>
      <div>
        <label
          htmlFor="template"
          className="block text-gray-700 dark:text-gray-300 text-sm leading-5 font-semibold select-none"
        >
          Template
        </label>
        <div className="mt-2"></div>
        <select
          id="template"
          name="template"
          className="block w-full pl-3 rounded-md shadow-sm pr-10 py-2 border-gray-300 dark:border-none dark:bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-300 dark:focus:ring-gray-700 transition duration-150 ease-in-out"
        >
          <option value="Contact form">Contact form</option>
          <option value="Survey form">Survey form</option>
          <option value="Emoji satisfaction form">
            Emoji satisfaction form
          </option>
          <option value="Emoji rating form">Emoji rating form</option>
          <option value="Emoji thumbs up/down form">
            Emoji thumbs up/down form
          </option>
        </select>
      </div>
      <CodeBlock content={getFormContent(formId)} lang="html" />
    </div>
  );
}
