import { Toaster as Sonner } from "sonner";
import "sonner/dist/styles.css";

export const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#181d27] group-[.toaster]:border-[#e9e9eb] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#535861]",
          actionButton:
            "group-[.toast]:bg-[#22a3eb] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#f5f5f6] group-[.toast]:text-[#535861]",
          success:
            "group-[.toaster]:bg-white group-[.toaster]:text-[#069454] group-[.toaster]:border-[#069454]/20",
          error:
            "group-[.toaster]:bg-white group-[.toaster]:text-[#d92c20] group-[.toaster]:border-[#d92c20]/20",
          info:
            "group-[.toaster]:bg-white group-[.toaster]:text-[#22a3eb] group-[.toaster]:border-[#22a3eb]/20",
          warning:
            "group-[.toaster]:bg-white group-[.toaster]:text-[#f59e0b] group-[.toaster]:border-[#f59e0b]/20",
        },
      }}
    />
  );
};
