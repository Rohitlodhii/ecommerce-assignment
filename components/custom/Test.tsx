
import { useState } from "react";

const Sheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to open the sheet */}
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Sheet
      </button>

      {/* Overlay (optional) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sheet Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 
        transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-lg font-bold">Sheet Content</h2>
        <p>This is a sliding sheet without Framer Motion.</p>
      </div>
    </div>
  );
};

export default Sheet;
