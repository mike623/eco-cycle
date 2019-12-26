const _ = require("lodash");
const data = require("../screens/waste.json");

let types = _.flatMap(data, i => i.waste_type.split(","));
types = _.union(types)
  .filter(Boolean)
  .filter(i => i !== "Others")
  .sort();

let regions = _.map(data, "district_id")
  .filter(Boolean)
  .sort();
  regions = _.union(regions)
console.log({ types, regions });
