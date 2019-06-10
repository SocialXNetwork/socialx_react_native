import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';

import { config } from 'dotenv';
config();

import { genSchema } from '../util/genSchema';

const typescriptTypes = generateNamespace('IGraphqlTypes', genSchema());
fs.writeFile(path.join(__dirname, '../../../RNSocialX/src/schema.d.ts'), typescriptTypes, (err) => {
	console.log(err);
});

fs.writeFile(path.join(__dirname, '../../schema.d.ts'), typescriptTypes, (err) => {
	console.log(err);
});
