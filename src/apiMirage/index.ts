import {
  createServer,
  Model,
  JSONAPISerializer,
  belongsTo,
  hasMany,
  Factory,
} from "miragejs";

import faker from "faker";

let server = createServer({
  models: {
    simulation: Model,
    configuration: Model,
  },
});
