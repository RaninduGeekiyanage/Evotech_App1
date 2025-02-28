import { CheckCircle, XCircle, AlertTriangle,Frown } from "lucide-react"; // Import icons
import { toast } from "sonner";

const showToast = (message, type = "success") => {
  const toastStyles = {
    success: "!bg-green-600 !text-white",
    error: "!bg-red-600 !text-white",
    warning: "!bg-orange-400 !text-black",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <Frown className="w-5 h-5 text-white" />,
    warning: <AlertTriangle className="w-5 h-5 text-black" />,
  };

  toast.custom(
    (t) => (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-md ${toastStyles[type]}`}
      >
        {icons[type]} {/* Display the icon */}
        <span>{message}</span>
      </div>
    ),
    {
      duration: 4000,
      position: "top-right",
    }
  );
};

export default showToast;

// import { toast } from "sonner";


// const showToast = (message, type = "success") => {
//   const toastStyles = {
//     success: "!bg-green-500 !text-white",
//     error: "!bg-red-500 !text-white",
//     warning: "!bg-yellow-500 !text-black",
//   };

//   toast[type](message, {
//     duration: 4000,
//     position: "top-right",
//     className: toastStyles[type] || "!bg-gray-500 !text-white", // Default style
//   });
// };

// export default showToast;