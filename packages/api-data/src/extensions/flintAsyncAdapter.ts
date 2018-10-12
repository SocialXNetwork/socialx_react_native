import { Flint, KeyValAdapter } from 'gun-flint';
import { AsyncStorage } from 'react-native';

Flint.register(
	new KeyValAdapter({
		/**
		 * Send data back into Gun. Return as a valid Gun object
		 *
		 * You can do anything you like with the delta for storage purposes,
		 * but you must return to data to gun in the format that Gun recognizes.
		 *
		 * NOTE: the second parameter `field`, if supplied, indicates that a specific node
		 *       field is requested; if empty, then an entire node is requested.
		 *
		 * @param {string}   key     The UUID for the node to retrieve
		 * @param {string}   [field] If supplied, a specific field to retrieve; if not supplied, get full node
		 * @param {callback} done    Callback after retrieval is finished
		 */
		get(key: string, field: string, done: any) {
			console.log('*** reading key', key, 'field', field);
			AsyncStorage.getItem(key || '').then((result: any) => {
				if (!result) {
					done(new Error('no results found'), null);
				} else {
					result = JSON.parse(result);
					if (field) {
						done(null, result[field]);
					} else {
						done(null, result);
					}
				}
			});
			// retrieveData(key, field).then((err, node) => {
			// 	done(err, node);
			// });
		},

		/**
		 * Write data into storage/service from Gun.
		 *
		 * The format of the batch of writes is described above
		 *
		 *
		 * @param {string}   key    The UUID for the node request
		 * @param {array}   batch   Array of objects that contain key:value + metadata
		 * @param {function} done   Call after operation finishes
		 */
		put(batch: any[], done: any) {
			AsyncStorage.multiMerge(batch).then((err: any) => {
				if (err) {
					done(err);
				} else {
					done();
				}
			});
		},
		/**
		 * @param {object}   context   The Gun database context
		 * @param {object}   opt       Any options passed when initializing Gun or calling `gun.opt`
		 */
		opt(context: any, opt: object) {
			// Initialize the adapter; e.g., create database connection
		},
	}),
);
