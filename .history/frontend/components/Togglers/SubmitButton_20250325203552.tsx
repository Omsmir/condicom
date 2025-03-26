import Image from "next/image";

import { Button } from "../ui/button";

interface ButtonProps {
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  onclick?:() => void
  innerText?:string
  disabled?:boolean
}

const SubmitButton = ({ isLoading, className, children,onclick,innerText,disabled }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={disabled ?? isLoading}
      className={className ?? "shad-primary-btn w-full"}
      onClick={onclick}
    >
      { isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          {innerText || "Loading..."}
        </div>
      ) : disabled ? }
    </Button>
  );
};

export default SubmitButton;
