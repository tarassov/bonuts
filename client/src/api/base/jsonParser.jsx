import pluralize from "pluralize";

export function parse(json) {
  let data = json.data;
  //  console.log({data:json.data})

  let included = json.included;
  if (data === undefined) {
    return {};
  }
  let parsedData = parseData(data);
  if (included !== undefined) {
    let includedData = parseData(included);
    parsedData = { ...parsedData, included: { ...includedData } };
  }
  let parsed = {
    unauthorized: json.unauthorized,
    errorText: json.errorText,
    error: json.error,
    errorCode: json.errorCode,
    headers: json.headers,
    ...parsedData,
  };

  //console.log({jsonParsed:{...parsed}})

  return parsed;
}
function parseData(data) {
  let result = {};
  if (Array.isArray(data)) {
    data.forEach(function (element) {
      let arrayName = pluralize.plural(element.type);
      if (result[arrayName] === undefined) result[arrayName] = [];
      result[arrayName].push(parseElement(element));
    });
  } else if (data === null || data === undefined) {
    return {};
  } else {
    result[data.type] = {};
    result[data.type] = parseElement(data);
  }

  return result;
}
function parseElement(element) {
  if (element === undefined) return {};

  let res = {
    id: element.id,
    ...element.attributes,
  };

  if (element.relationships !== undefined) {
    let keys = Object.keys(element.relationships);
    keys.forEach(function (key) {
      res = {
        ...res,
        ...parseData(element.relationships[key].data),
      };
    });
  }

  return res;
}
