import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Turkey Blog
          </h1>
          <div className="text-md text-blue-500 flex flex-col gap-6">
            <p>
              Welcome to Turkey Blog! This blog was created to share insights
              about places to visit in Istanbul, Izmir, and other cities across
              Turkey.
            </p>

            <p>
              Here, you'll find weekly articles and guides on must-see
              attractions, local culture, and hidden gems in various Turkish
              cities.
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like comments and reply to them as well. We
              believe that a community of travelers can help each other discover
              and explore the beauty of Turkey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
