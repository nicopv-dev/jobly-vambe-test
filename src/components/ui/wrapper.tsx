import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
