import { Button } from "flowbite-react";
import React from "react";

export default function CallAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn about more Turkey?</h2>
        <p className="text-gray-500 py-2">Check out this website.</p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://goturkiye.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Travel Guide Turkey
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://www.planetware.com/wpimages/2021/06/turkey-travel-guide-inspirational-ideas-planning-trip-to-turkey-oludeniz-lagoon.jpg" />
      </div>
    </div>
  );
}
