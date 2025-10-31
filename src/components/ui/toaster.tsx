import { Toaster as Sonner } from "sonner";
import "sonner/dist/styles.css";

export const Toaster = () => {
  return (
    <>
      <style>{`
        [data-sonner-toast] {
          display: flex !important;
          align-items: flex-start !important;
        }
        [data-sonner-toast] [data-icon] {
          order: 0 !important;
          margin-right: 8px !important;
          margin-top: 2px !important;
          flex-shrink: 0 !important;
        }
        [data-sonner-toast] [data-content] {
          order: 1 !important;
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }
        [data-sonner-toast] [data-title] {
          order: 0 !important;
        }
        [data-sonner-toast] [data-description] {
          order: 1 !important;
          margin-top: 4px !important;
        }
        [data-sonner-toast] button[data-button] {
          order: 2 !important;
          margin-top: 8px !important;
          background-color: #f5f5f6 !important;
          color: #535861 !important;
          border: 1px solid #e9e9eb !important;
          padding: 6px 12px !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          transition: all 0.2s !important;
        }
        [data-sonner-toast] button[data-button]:hover {
          background-color: #e9e9eb !important;
          color: #181d27 !important;
        }
        [data-sonner-toast] [data-action] {
          order: 2 !important;
          margin-top: 8px !important;
        }
        [data-sonner-toast] [data-action] button {
          background-color: #f5f5f6 !important;
          color: #535861 !important;
          border: 1px solid #e9e9eb !important;
          padding: 6px 12px !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          transition: all 0.2s !important;
        }
        [data-sonner-toast] [data-action] button:hover {
          background-color: #e9e9eb !important;
          color: #181d27 !important;
        }
      `}</style>
      <Sonner
        position="top-right"
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#181d27] group-[.toaster]:border-[#e9e9eb] group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-[#535861]",
            actionButton:
              "group-[.toast]:bg-[#f5f5f6] group-[.toast]:text-[#535861] group-[.toast]:border group-[.toast]:border-[#e9e9eb] group-[.toast]:hover:bg-[#e9e9eb] group-[.toast]:hover:text-[#181d27]",
            cancelButton:
              "group-[.toast]:bg-[#f5f5f6] group-[.toast]:text-[#535861]",
            closeButton:
              "group-[.toast]:text-[#535861] group-[.toast]:hover:text-[#181d27] group-[.toast]:hover:bg-[#f5f5f6]",
            success:
              "group-[.toaster]:!bg-[#f0fdf4] group-[.toaster]:!border-[#069454] group-[.toaster]:border-2 !text-[#069454] [&_.toast-description]:!text-[#069454]/80",
            error:
              "group-[.toaster]:!bg-[#fef2f2] group-[.toaster]:!border-[#d92c20] group-[.toaster]:border-2 !text-[#d92c20] [&_.toast-description]:!text-[#d92c20]/80",
            info:
              "group-[.toaster]:bg-white group-[.toaster]:text-[#22a3eb] group-[.toaster]:border-[#22a3eb]/20",
            warning:
              "group-[.toaster]:!bg-[#fffbeb] group-[.toaster]:!border-[#ff9d58] group-[.toaster]:border-2 !text-[#ff9d58] [&_.toast-description]:!text-[#ff9d58]/80",
          },
        }}
      />
    </>
  );
};
