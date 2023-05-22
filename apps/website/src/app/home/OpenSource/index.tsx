import Image from "next/image";
import React from "react";

import slackIcon from "public/brands/slackIcon.png";
import githubIcon from "public/brands/githubIcon.png";
import starIcon from "public/brands/starIcon.png";

interface OpenSourceProps{
  starCount: number;
  contributorCount: number;
}

export default function OpenSource(props: OpenSourceProps) {
  const {starCount, contributorCount} = props;

  const cardData = [
    {
      count: contributorCount,
      title: "Contributors",
      buttonTitle: "Explore Github",
      url: "https://github.com/formzillion/formzillion.com",
      image: githubIcon,
    },
    {
      count: "20+",
      title: "Community Members",
      buttonTitle: "Join our slack ",
      url: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
      image: slackIcon,
    },
    {
      count: starCount,
      title: "GitHub Stars",
      buttonTitle: "Browse on github",
      url: "https://github.com/formzillion/formzillion.com/stargazers",
      image: starIcon,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl my-10 mt-20 md:mt-40">
      <div className="flex flex-col justify-center items-center w-full text-center space-y-5 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
          Join our{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            open source{" "}
          </span>
          community
        </h1>
        <p className="text-base lg:text-xl px-4 lg:px-0">
          Join us in creating the most extensive Formzillion community on the
          internet. <br /> Explore{" "}
          <a
            href="https://github.com/orgs/formzillion/projects/1"
            className="text-orange-400 underline"
          >
            our Roadmap
          </a>{" "}
          and share your thoughts by leaving comments!
        </p>
      </div>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10 text-white px-6 lg:px-3 space-y-4 sm:space-y-0">
        {cardData.map((card: any, index: number) => (
          <div
            key={index}
            className="p-4 border rounded border-gray-500 text-center space-y-4 hover-border"
          >
            <div className="space-y-4 bg-black px-4 py-8 rounded relative z-10 flex flex-col justify-center items-center">
              <Image
                src={card.image}
                alt="logos"
                className="h-20 w-20 bg-white rounded-full p-0.5"
              />
              <h4 className="text-5xl">{card.count}</h4>
              <p className="text-gray-300 text-lg">{card.title}</p>
              <div className="pt-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}
