import { externnalLinks, routeNames } from "@/config/routes";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const companyRoutes = [
  {
    href: routeNames.aggregator,
    label: "About",
  },
  {
    href: routeNames.farm,
    label: "Sustainability",
  },
  {
    href: routeNames.play,
    label: "Contact sales",
  },
  {
    href: routeNames.dust,
    label: "Security",
  },
  {
    href: routeNames.defi,
    label: "Terms of Use",
  },
];

const productsRoutes = [
  {
    href: routeNames.aggregator,
    label: "Buy crypto",
  },
  {
    href: routeNames.aggregator,
    label: "Swap Aggregator",
  },
  {
    href: routeNames.farm,
    label: "Farm",
  },
  {
    href: routeNames.play,
    label: "Play",
  },
  {
    href: routeNames.dust,
    label: "Dust",
  },
  {
    href: routeNames.defi,
    label: "Defi",
  },
];

const resourcesRoutes = [
  {
    href: routeNames.blog,
    label: "Blog",
    isExternal: true,
  },
  {
    href: routeNames.docs,
    label: "Docs",
    isExternal: true,
  },
  {
    href: externnalLinks.github,
    label: "Github",
    isExternal: true,
  },
];

const Footer = () => {
  return (
    <footer className="pt-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-20 ">
          <div className="text-center ">
            <Link href={routeNames.home}>
              <div className="flex items-center space-x-5">
                <Image
                  src={"/images/logo-v2-white.png"}
                  alt="Logo"
                  width={180}
                  height={50}
                  className="hidden dark:block"
                />
                <Image
                  src={"/images/logo-v2-black.png"}
                  alt="Logo"
                  width={180}
                  height={50}
                  className="block dark:hidden"
                />
              </div>
            </Link>
          </div>
          <p className="text-blue-800 font-semibold flex items-center justify-center ">
            <Dot size={60} className="inline-block mr-[-20px]" /> All systems
            normal.
          </p>
        </div>

        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* @ts-ignore */}
            <LinksSections title="Company" routes={companyRoutes} />
            {/* @ts-ignore */}
            <LinksSections title="Producs" routes={productsRoutes} />
            <LinksSections title="Resources" routes={resourcesRoutes} />
            <div>
              <div className="font-bold mb-5">Follow us</div>
              <div className="flex space-x-5">
                <Link
                  href={externnalLinks.twitter}
                  className=" hover:text-primary transition duration-300"
                  target="_blank"
                  rel="noreferrer"
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
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      ></path>
                    </g>
                  </svg>
                </Link>
                <Link
                  href={externnalLinks.telegram}
                  className=" hover:text-primary transition duration-300"
                  target="_blank"
                  rel="noreferrer"
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
                      fill="currentColor"
                    />
                  </svg>
                </Link>

                {/* Github */}
                <Link
                  href={externnalLinks.github}
                  className=" hover:text-primary transition duration-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    height="32"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="32"
                    data-view-component="true"
                  >
                    <path
                      fill="currentColor"
                      d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface LinksSectionsProps {
  title: string;
  routes: {
    href: string;
    label: string;
    isExternal: boolean;
  }[];
}

const LinksSections = ({ title, routes }: LinksSectionsProps) => {
  return (
    <div>
      <div className="font-bold mb-5">{title}</div>
      <div className="flex flex-col gap-2 text-muted-foreground">
        {routes.map((route) => {
          return (
            <LinkItem
              key={route.href}
              href={route.href}
              isExternal={route.isExternal}
              label={route.label}
            />
          );
        })}
      </div>
    </div>
  );
};

const LinkItem = ({
  href,
  label,
  isExternal,
}: {
  href: string;
  label: string;
  isExternal?: boolean;
}) => {
  const isExternalProps = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Link className="hover:text-primary" href={href} {...isExternalProps}>
      <span className="border-b pb-[2px]">{label}</span>
    </Link>
  );
};
