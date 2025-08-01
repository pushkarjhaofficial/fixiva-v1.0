// src/components/index.js

// re‑export every folder’s named exports
export * from "./admin";
export * from "./ai";
export * from "./analytics";
export * from "./booking";
export * from "./chat";
export * from "./misc";
export * from "./modals";
export * from "./shared";
export * from "./vendor";
export * from "./wallet";

// now build a default export object by pulling in each namespace
import * as admin      from "./admin";
import * as ai         from "./ai";
import * as analytics  from "./analytics";
import * as booking    from "./booking";
import * as chat       from "./chat";
import * as misc       from "./misc";
import * as modals     from "./modals";
import * as shared     from "./shared";
import * as vendor     from "./vendor";
import * as wallet     from "./wallet";

const Components = {
  ...admin,
  ...ai,
  ...analytics,
  ...booking,
  ...chat,
  ...misc,
  ...modals,
  ...shared,
  ...vendor,
  ...wallet,
};

export default Components;
