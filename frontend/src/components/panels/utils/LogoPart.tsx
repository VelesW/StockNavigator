import React from "react";
import TestProfilePicture from "../../../photos/download.png"; // Adjust path if necessary

const LogoPart = () => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={TestProfilePicture}
        alt="Test Profile"
        className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
      />
      <p className="text-xl text-white font-semibold">
        Piotr Trojan
      </p>
    </div>
  );
};

export default LogoPart;
