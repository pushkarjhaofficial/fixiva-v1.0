// Re-export all named exports from subfolders
export * from "./auth";
export * from "./context";
export * from "./data";
export * from "./socket";
export * from "./ui";
export * from "./utils";

// Import namespaces for default export
import * as auth from "./auth";
import * as context from "./context";
import * as data from "./data";
import * as socket from "./socket";
import * as ui from "./ui";
import * as utils from "./utils";

// Compose a default export object that includes all named exports
const Hooks = {
  ...auth,
  ...context,
  ...data,
  ...socket,
  ...ui,
  ...utils,
};

export default Hooks;
