/**
 * src/data/stateData.ts
 * Source of truth for US States data.
 */

// 1. Map of Code -> Full Name
export const stateNames = new Map<string, string>([
  ["al", "Alabama"], ["ak", "Alaska"], ["az", "Arizona"], ["ar", "Arkansas"],
  ["ca", "California"], ["co", "Colorado"], ["ct", "Connecticut"], ["de", "Delaware"],
  ["fl", "Florida"], ["ga", "Georgia"], ["hi", "Hawaii"], ["id", "Idaho"],
  ["il", "Illinois"], ["in", "Indiana"], ["ia", "Iowa"], ["ks", "Kansas"],
  ["ky", "Kentucky"], ["la", "Louisiana"], ["me", "Maine"], ["md", "Maryland"],
  ["ma", "Massachusetts"], ["mi", "Michigan"], ["mn", "Minnesota"], ["ms", "Mississippi"],
  ["mo", "Missouri"], ["mt", "Montana"], ["ne", "Nebraska"], ["nv", "Nevada"],
  ["nh", "New Hampshire"], ["nj", "New Jersey"], ["nm", "New Mexico"], ["ny", "New York"],
  ["nc", "North Carolina"], ["nd", "North Dakota"], ["oh", "Ohio"], ["ok", "Oklahoma"],
  ["or", "Oregon"], ["pa", "Pennsylvania"], ["ri", "Rhode Island"], ["sc", "South Carolina"],
  ["sd", "South Dakota"], ["tn", "Tennessee"], ["tx", "Texas"], ["ut", "Utah"],
  ["vt", "Vermont"], ["va", "Virginia"], ["wa", "Washington"], ["wv", "West Virginia"],
  ["wi", "Wisconsin"], ["wy", "Wyoming"]
]);

// 2. Map of Code -> Neighbors (Sets of Codes)
export const stateAdjacencyList = new Map<string, Set<string>>([
  ["al", new Set(["ms", "tn", "ga", "fl"])],
  ["ak", new Set(["ca", "or", "wa", "hi"])],
  ["az", new Set(["ca", "nv", "ut", "co", "nm"])],
  ["ar", new Set(["la", "tx", "ok", "mo", "tn", "ms"])],
  ["ca", new Set(["or", "nv", "az", "ak", "hi"])],
  ["co", new Set(["wy", "ne", "ks", "ok", "nm", "az", "ut"])],
  ["ct", new Set(["ny", "ma", "ri"])],
  ["de", new Set(["md", "pa", "nj"])],
  ["fl", new Set(["al", "ga"])],
  ["ga", new Set(["fl", "al", "tn", "nc", "sc"])],
  ["hi", new Set(["ca", "or", "wa", "ak"])],
  ["id", new Set(["mt", "wy", "ut", "nv", "or", "wa"])],
  ["il", new Set(["in", "ky", "mo", "ia", "wi"])],
  ["in", new Set(["mi", "oh", "ky", "il"])],
  ["ia", new Set(["mn", "wi", "il", "mo", "ne", "sd"])],
  ["ks", new Set(["ne", "mo", "ok", "co"])],
  ["ky", new Set(["in", "oh", "wv", "va", "tn", "mo", "il"])],
  ["la", new Set(["tx", "ar", "ms"])],
  ["me", new Set(["nh"])],
  ["md", new Set(["va", "wv", "pa", "de"])],
  ["ma", new Set(["ri", "ct", "ny", "vt", "nh"])],
  ["mi", new Set(["wi", "in", "oh", "mn"])],
  ["mn", new Set(["wi", "ia", "sd", "nd", "mi"])],
  ["ms", new Set(["la", "ar", "tn", "al"])],
  ["mo", new Set(["ia", "il", "ky", "tn", "ar", "ok", "ks", "ne"])],
  ["mt", new Set(["nd", "sd", "wy", "id"])],
  ["ne", new Set(["sd", "ia", "mo", "ks", "co", "wy"])],
  ["nv", new Set(["id", "ut", "az", "ca", "or"])],
  ["nh", new Set(["vt", "me", "ma"])],
  ["nj", new Set(["de", "pa", "ny"])],
  ["nm", new Set(["az", "ut", "co", "ok", "tx"])],
  ["ny", new Set(["nj", "pa", "vt", "ma", "ct"])],
  ["nc", new Set(["va", "tn", "ga", "sc"])],
  ["nd", new Set(["mn", "mt", "sd"])],
  ["oh", new Set(["pa", "wv", "ky", "in", "mi"])],
  ["ok", new Set(["ks", "mo", "ar", "tx", "nm", "co"])],
  ["or", new Set(["ca", "nv", "id", "wa", "ak", "hi"])],
  ["pa", new Set(["ny", "nj", "de", "md", "wv", "oh"])],
  ["ri", new Set(["ct", "ma"])],
  ["sc", new Set(["ga", "nc"])],
  ["sd", new Set(["nd", "mn", "ia", "ne", "wy", "mt"])],
  ["tn", new Set(["ky", "va", "nc", "ga", "al", "ms", "ar", "mo"])],
  ["tx", new Set(["nm", "ok", "ar", "la"])],
  ["ut", new Set(["id", "wy", "co", "nm", "az", "nv"])],
  ["vt", new Set(["ny", "nh", "ma"])],
  ["va", new Set(["wv", "md", "nc", "tn", "ky"])],
  ["wa", new Set(["id", "or", "ak", "hi"])],
  ["wv", new Set(["oh", "pa", "md", "va", "ky"])],
  ["wi", new Set(["mi", "mn", "ia", "il"])],
  ["wy", new Set(["mt", "sd", "ne", "co", "ut", "id"])],
]);

// Helper: Get a random state name from the full list
export const getRandomStateName = (): string => {
  const allNames = Array.from(stateNames.values());
  return allNames[Math.floor(Math.random() * allNames.length)];
};