import React from "react";
import CodeBlock from "@/ui/Code";
interface IProps {
  slug: string;
}
const examples = [
  {
    lang: "nextjs",
    code: `import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState({
    name: "",
    email: ""
  });
  
  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch("https://formzillion.com/f/{form-id}", {
      method: "POST",
      body: formData
    }).then(() => setQuery({ name: "", email: "", message: "" }));
  };
  return (
    <div className="App">
      <h1>NextJS form using Formzillion</h1>
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="form-control"
            value={query.name}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="form-control"
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            required
            placeholder="Message"
            className="form-control"
            value={query.message}
            onChange={handleParam()}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`,
  },
  {
    lang: "gatsby",
    code: `
import React, { useState }  from "react"
import axios from "axios";
import { Link } from "gatsby"
import Layout from "../components/layout"
export default function MyForm () {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });
    if (ok) {
      form.reset();
    }
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://formzillion.com/f/{unique-endpoint-generated-on-step-1}",
      data: new FormData(form)
    })
      .then(res => {
        handleServerResponse(true, "Thanks!", form);
      })
      .catch(res => {
        handleServerResponse(false, res.response.data.error, form);
      });
  };
  return (
    <Layout>
      <div>
          <div className="col-md-8 mt-5">
              <h3>Formzillion Gatsby Form Example</h3>
              <form onSubmit={handleOnSubmit}>
                <input type="email" name="email" placeholder="Your Email">
                <input type="text" name="name" placeholder="Your Name">
                <input type="text" name="message" placeholder="Your Message">
                <button type="submit">Send</button>
              </form>
          </div>
      </div>  
    </Layout>
  );
};`,
  },
  {
    lang: "react",
    code: `import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState({
    name: "",
    email: ""
  });
  
  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch("https://formzillion.com/f/{form-id}", {
      method: "POST",
      body: formData
    }).then(() => setQuery({ name: "", email: "", message: "" }));
  };
  return (
    <div className="App">
      <h1>NextJS form using Formzillion</h1>
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="form-control"
            value={query.name}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="form-control"
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            required
            placeholder="Message"
            className="form-control"
            value={query.message}
            onChange={handleParam()}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`,
  },
];
export default function Example({ slug }: IProps) {
  const dynamicContent = examples.find((example) => example.lang === slug);
  if (!dynamicContent) {
    return <></>;
  }
  return (
    <div className="max-w-5xl mx-auto my-16">
      <h1 className="text-4xl mb-10 text-center">Example to help you!</h1>
      <CodeBlock content={dynamicContent.code} lang="js" />
    </div>
  );
}
