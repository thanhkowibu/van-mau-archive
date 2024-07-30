import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

type ToasterProviderProps = {
  children: ReactNode;
};

export const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
}) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
