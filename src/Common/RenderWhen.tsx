import React from "react";

type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

const RenderWhen = ({
  limit = 1,
  isTrue = true,
  children,
}: WhenProps): JSX.Element => {
  const list: React.ReactNode[] = [];
  if (isTrue !== true) {
    return <></>;
  }
  React.Children.map(children, (child: any) => {
    const { isTrue: isChildTrue } = child?.props || {};
    if (isChildTrue === true && list.length < limit!) {
      list.push(child);
    }
  });
  return <>{list}</>;
};

interface IfProps {
  children: React.ReactNode;
  isTrue: boolean;
  fallback?: React.ReactNode;
}

RenderWhen.If = ({ children, isTrue, fallback }: IfProps) => {
  if (isTrue) {
    return <>{children}</>;
  }
  if (fallback) {
    return <>{fallback}</>;
  }
  return <></>;
};
export default RenderWhen;
