// tslint:disable
import * as Gun from 'gun/gun';
import { IGunInstance } from '../types';

const docMatchesQuery = (query: object) => ([key, doc]: [string, any]) => {
  // If empty query, it matches all docs
  if (!Object.keys(query).length) {
    return doc;
  }
  // If empty object, it does not match any non-empty query
  if (!Object.keys(doc).length) {
    return undefined;
  }
  const checks = Object.entries(query).map(([docKey, wantedValue] : [string, any]) => {
    // If our query value is a reg exp, check if it matches, otherwise require exact match
    if (wantedValue instanceof RegExp) {
      return wantedValue.test(doc[docKey]);
    }
    return doc[docKey] === wantedValue;
  });
  // Chcek that all query parameters check out for the doc
  if (checks.every(v => !!v === true)) {
    return doc;
  };
  return undefined;
};

Gun.chain.find = function(
  query: object = {},
	cb: (data: object | undefined) => IGunInstance,
) {
  this.docLoad((data: any[]) => {
    const filteredData = Object.entries(data)
      .map(docMatchesQuery(query))
      .filter((v) => v);

    return cb(filteredData);
  });
};
