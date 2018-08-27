### Todo

Before everything else, discuss the current approach alternatives and select the correct
one by discussing it with Jake so that we all know pros/cons.

Overall, it boils down to selecting a data structure. Graph/relational vs key/value vs document.

Document seems to be the most reasonable choice because joins are client side anyway and can mimic
relational for us.

- [ ] Implement data nodes and repository methods, eg `Comments.findByCommentedId(id: string): Comment[]`
- [ ] Implement a basic dependency injection wrapper for the gun instance
- [ ] Add a basic express gun server as a separate small node app instance
- [ ] Add a basic docker set up for the server deployment
- [ ] Add a validation schema (`yup`?)

```js
const port = process.env.PORT || 8080;
const express = require('express');
const Gun = require('gun');

const app= express();

app.use(Gun.serve);

const server = app.listen(port);

Gun({
  file: 'temporary-gun-storage.json',
  web: server
});

console.log(`Gun is listening at http://localhost:${port}/gun`);
```

---

### Readme

**work in progress, read the last paragraph for the current direction**

Initially considered using https://github.com/sjones6/gun-flint/blob/master/docs/NODE_ADAPTER.MD
to create a direct to json adapter to use in redux but it turns out gun ecosystem
is convoluted with changing apis and ecosystem relying on different versions of
the api.

Then evaluated https://github.com/gundb/gun-level to create a bridge over levelup
to use one of the existing community connectors but then this also entered into
discontinued status with a migration towards an internal implementation of
indexeddb like storage.

Tried an approach similar to https://gist.github.com/devel-pa/e104d518b07dda068b55f9a549112cca
but as also explained on that repo, the conversions between the graph data structure
and the redux immutable tree becomes very costly.

Then evaluated the official `on` (for subscribed data) vs `once` apis, the latter
being preferable due to its potential use as traditional crud-like interface. But this
option turned out to be semi-asyncronous, meaning, it is not guaranteed to run once.

The `on` api is not very preferable either because we don't want to keep subscribing
to many different data since the nature of a social network data backend is mostly
reads, then writes, then updates. It is okay to poll based on user intent.

Finally, came across https://github.com/gundb/synchronous that does some of the heavy
lifting for our desired approach. But we cannot use it directly in the react native
environment, so instead we are going to take cue from its succint approach and compromises
to build a similar implementation ourselves. The original code is 50+ lines so it
should not be too hard to maintain it.
