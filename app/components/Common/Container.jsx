import { cn } from "@/app/helper/cn";




export default function Container({ children, className }) {
  return <div className={cn("mx-auto max-w-[1750px] px-1 sm:px-2 md:px-6 ", className)}>{children}</div>;
}