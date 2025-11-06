import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { App } from "./App";
import { CharacterList } from "./components/CharacterList";
import { CharacterDetails } from "./components/CharacterDetails";

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterList,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$characterId",
  component: CharacterDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, characterRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
