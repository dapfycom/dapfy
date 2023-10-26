import { routeNames } from "@/config/routes";

export const getWebUrl = (path: string = ""): string => {
  return `${window.location.origin + path}`;
};

export const isActiveRoute = (routeName: string, location: string) => {
  if (routeName === "/") {
    return location === routeName || location === routeNames.swapLp;
  }
  return location.includes(routeName);
};

export function checkNestedRoute(passedRoute: string): boolean {
  const currentRoute = window.location.pathname;
  if (passedRoute === currentRoute) return false;
  return currentRoute.startsWith(passedRoute);
}

export function isPathOrSubpath(currentPath: string, paths: string[]): boolean {
  return paths.some((path) => currentPath.startsWith(path));
}

export function getBasePath(url: string): string {
  const parts = url.split("/");
  return `/${parts[parts.length - 1]}`;
}
