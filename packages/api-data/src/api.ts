import * as Gun from 'gun/gun';

// temp and should be removed (just for offline testing on node)
// import 'gun/lib/store';

import 'gun/nts';
import 'gun/sea';

import './extensions/docload';
import './extensions/encrypt';

export const time = () => new Date(Gun.state());

export const gun: GunInstance = new Gun({
	peers: ['http://localhost:1337/gun'],
});

export const account = gun.user();
