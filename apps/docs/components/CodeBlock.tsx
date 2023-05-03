import { Sandpack } from "@codesandbox/sandpack-react";

export const CodeBlock: React.FC<{ children: string; stack: boolean }> = ({
  children,
  stack,
  ...props
}) => {
  const sandpackProps = {
    options: { showLineNumbers: true, initMode: "immediate" },
    key: children,
    ...props,
  } as any;

  return <Sandpack {...sandpackProps} />;
};
