import { Dot } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-12 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-10 md:flex-row flex-col">
          <div className="flex items-center mb-10 md:mb-0 justify-center">
            <h6 className="text-primary text-3xl md:text-4xl">xBeskar</h6>
          </div>

          <div className="text-center md:ml-auto">
            <h6 className="text-white text-md lg:text-lg mb-6">
              Redes Sociales
            </h6>
            <div className="flex justify-center space-x-5">
              <Link
                href="https://x.com/xBeskar"
                className="text-white hover:text-primary transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <g>
                    <path
                      fill="white"
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    ></path>
                  </g>
                </svg>
              </Link>
              <Link
                href="https://t.me/BeskarX"
                className="text-white hover:text-primary transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.5914 0.0395918C21.9293 0.284844 0.898886 8.65108 0.749936 8.72847C-0.12748 9.18423 -0.25237 9.84491 0.46738 10.2233C0.577396 10.2811 1.9371 10.738 3.48891 11.2386L6.3104 12.1487L12.7156 7.99298C16.2384 5.70735 19.2101 3.80707 19.3192 3.77012C19.5859 3.67987 19.7731 3.73129 19.7731 3.89484C19.7731 3.99348 18.6882 5.0307 14.7499 8.69728C11.9871 11.2694 9.65186 13.4451 9.56047 13.532L9.3944 13.69L9.20777 16.4598C9.10512 17.9833 9.02135 19.2841 9.02156 19.3507C9.02198 19.4515 9.05032 19.4715 9.19165 19.4705C9.54962 19.4681 9.77576 19.2862 11.2923 17.7808L12.7883 16.2959L13.058 16.4987C13.2064 16.6103 14.455 17.5583 15.8328 18.6053C17.2106 19.6523 18.4356 20.5541 18.555 20.6092C18.8261 20.7344 19.1848 20.7874 19.4345 20.7391C19.7058 20.6866 20.0433 20.3225 20.1866 19.9276C20.2493 19.7549 21.1331 15.566 22.1505 10.6187C23.5564 3.78319 24.0004 1.53563 24 1.25666C23.9995 0.864146 23.8527 0.441677 23.6537 0.25962C23.4228 0.0483586 22.8744 -0.0652322 22.5914 0.0395918Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10 text-center">
          <p className="text-gray-700 text-md md:text-lg max-w-xs md:max-w-prose mx-auto">
            xBeskar © {new Date().getFullYear()}. Todos los derechos reservados.
          </p>
          <p className="text-blue-800 font-semibold flex items-center w-full justify-center mb-[-30px]">
            <Dot size={60} className="inline-block mr-[-20px]" /> All systems
            normal.
          </p>
        </div>

        <div className="mb-10">
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgb(224, 225, 226) 49.52%, rgba(224, 225, 226, 0) 100%)",
            }}
            className="w-3/5 h-0.5  mx-auto"
          ></div>
        </div>

        <p className="text-center mb-5">Build 0xA</p>
      </div>
    </footer>
  );
};

export default Footer;
