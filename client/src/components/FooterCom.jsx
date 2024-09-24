import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-black">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-tr from-red-600 via-yellow-500
         to-white rounded-lg text-white"
              >
                Turkey
              </span>
              Blog
            </Link>
          </div>
          <div className="grid gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://visitturkey.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cities Of Turkey
                </Footer.Link>
                <Footer.Link
                  href="https://international.arel.edu.tr/a-brief-history-of-turkey-and-istanbul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  History of Turkey
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Top Places" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://visit.istanbul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Istanbul
                </Footer.Link>
                <Footer.Link
                  href="https://www.tripadvisor.com/Attractions-g298006-Activities-Izmir_Izmir_Province_Turkish_Aegean_Coast.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Izmir
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
