import React from "react";

const cardData = [
  {
    count: "10+",
    title: "Contributors",
    buttonTitle: "Explore Github",
    url: "https://github.com/formzillion/formzillion.com",
  },
  {
    count: "12+",
    title: "Community Members",
    buttonTitle: "Join our slack ",
    url: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
  },
  {
    count: "10+",
    title: "GitHub Stars",
    buttonTitle: "Browse on github",
    url: "https://github.com/formzillion/formzillion.com/stargazers",
  },
];
export default function OpenSource() {
  return (
    <div className="mx-auto max-w-5xl my-10">
      <div className="flex flex-col justify-center items-center w-full text-center space-y-5 text-white">
        <h1 className="text-5xl">
          Join our{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            open source{" "}
          </span>
          community
        </h1>
        <p className="text-xl">
          Join us in creating the most extensive Formzillion community on the
          internet. <br /> Explore{" "}
          <a href="#" className="text-orange-400 underline">
            our Roadmap
          </a>{" "}
          and share your thoughts by leaving comments!
        </p>
      </div>
      <div className="grid grid-cols-3 place-content-center gap-6 pt-10">
        {cardData.map((card: any, index: number) => (
          <div
            key={index}
            className="px-0 py-6 border rounded border-gray-500 text-center space-y-4 hover-border"
          >
            <h4 className="text-5xl">{card.count}</h4>
            <p className="text-gray-300 text-lg">{card.title}</p>
            <div>
              <a
                href={card.url}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-700 m-2 py-2 px-4 hover:border-gray-500 hover:text-orange-400"
              >
                {card.buttonTitle}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
