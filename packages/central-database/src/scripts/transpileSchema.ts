import * as fs from 'fs';
import * as path from 'path';

import { gqlSchema } from '../util/genSchema';

const gqlDistDir = path.join(__dirname, '../../dist/database/modules/schema.gql');
fs.writeFile(gqlDistDir, gqlSchema(), (err) => {
	console.log(err);
});
