import * as Gun from 'gun/gun';

Gun.chain.erase = function(dataKey: string, cb?: any) {
	this.put({ [dataKey]: null }, () => {
		this.put({ [dataKey]: {} }, cb);
	});
	return this;
};
