import { Code as BrightCode } from "bright";
import classNames from "classnames";
import { CopyTextButton } from "@/components/CopyTextButton";

import "./codeBlock.css";

export default function CodeBlock({ content, lang = "js" }: any) {
  const Code = BrightCode as any;

  return (
    <div className="relative">
      <Code lang={lang} mode={"dark"} className={"codeBlock"}>
        {content}
      </Code>
      <CopyTextButton
        className={classNames("absolute my-2 mx-2 text-sm", "top-0 right-0")}
        value={content}
        variant="slate"
      />
    </div>
  );
}
