// tslint:disable
import * as Gun from 'gun/gun';
import { IGunInstance } from '../types';

const docMatchesQuery = (query: object) => ([key, doc]: [string, any]) => {
  if (!doc) {
    return undefined;
  }
  // If empty query, it matches all docs
  if (!query || !Object.keys(query).length) {
    return doc;
  }
  // If empty object, it does not match any non-empty query
  if (!doc || !Object.keys(doc).length) {
    return undefined;
  }
  const checks = Object.entries(query).map(([docKey, wantedValue] : [string, any]) => {
    // If our query value is a reg exp, check if it matches, otherwise require exact match
    if (wantedValue instanceof RegExp) {
      return wantedValue.test(doc[docKey]);
    }
    return doc[docKey] === wantedValue;
  });
  // Check that all query parameters check out for the doc
  if (checks.every(v => !!v === true)) {
    return doc;
  };
  return undefined;
};

const searchQ = (data: any, term: string) => {
  if (!data) {
    return undefined;
  }
  const t = term.toLowerCase();
  const profiles = Object.entries(data).map(([key, value]) => value);
    const res = profiles.filter((profile: any | undefined) => {
        if (!profile || !Object.keys(profile).length) {
            return false;
        } else {
            return ~profile.alias.toLowerCase().search(term) || ~profile.fullName.toLowerCase().search(term);
        }
    });

    return res;
}

// from general to profiles specific
Gun.chain.find = function(
  term: string,
	cb: (data: any) => void,
) {
  this.once((d: any) => {
    if (!d) {
      return cb(undefined);
    }
    if (!term) {
      return cb(undefined);
    }
    if (term.length < 3) {
      return cb(undefined);
    }
    let tries = 0;

    const querySearch = () => {
      this.open((data: any) => {
        const res = searchQ(data, term.toLowerCase());
        if (!res || res.length === 0) {
          tries += 1;
          if (tries > 2) {
            return cb([]);
          }
          return querySearch();
        }
        return cb(res);
      }, {off: 1, wait: 100});
    
    }
    querySearch();
  }, { wait: 500 });
  // this.docLoad((data: any[]) => {
  //   const filteredData = Object.entries(data)
  //     .map(docMatchesQuery(query))
  //     .filter((v) => v);

  //   return cb(filteredData);
  // });
};

const byCommonFriends = function(a: any, b: any) {
  return a.commonFriends - b.commonFriends;
}

const countCommonFriends = (friendsArray: any[]) => ([key, doc]: [string, any]) => {
  if (!doc) {
    return undefined;
  }
  if (!doc.friends || !Object.keys(doc.friends)) {
    return {
      ...doc,
      commonFriends: 0,
    }
  }
  const commonFriends = Object.keys(doc.friends).reduce((acc, alias) => acc + Number(friendsArray.includes(alias) ? 1 : 0), 0);

  return {
    ...doc,
    commonFriends
  };
}

Gun.chain.findFriendsSuggestions = function(
  username: string,
  friendsArray: any[],
	cb: (data: object | undefined) => IGunInstance,
) {
  if (!friendsArray || !friendsArray.length) {
    return cb([]);
  }
  const currentFriendsAliases = friendsArray.map(f => f.alias);
  this.docLoad((data: any[]) => {
    // for each profile, go throw each and count number of shared friends
    const profilesSortedByCommonFriends = Object.entries(data)
      .map(countCommonFriends(currentFriendsAliases))
      .filter(f => f && f.alias && f.alias !== username)
      .sort(byCommonFriends)
      .reverse();
    console.log('*** profilesSortedByCommonFriends', profilesSortedByCommonFriends);
    return cb(profilesSortedByCommonFriends);
  });
};
