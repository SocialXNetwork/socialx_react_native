import jwt from 'jsonwebtoken';

import { authenticator } from 'otplib';

import { comparePassword, config, hashPass } from '../../shared/logic/sensitiveData';

import { decryptUserId } from '../../shared/logic/currentUser';

import { IResolverMap } from '../../../../types/graphql-utils';

export const resolvers: IResolverMap = {
	Mutation: {
		login: async (_, { email, password }, { User }) => {
			try {
				const current = await User.findOne({ email });
				if (!current) {
					throw new Error('No such user exist');
				}

				const flag = await comparePassword(password, current.password);
				if (!flag) {
					throw new Error('Wrong email/password');
				}

				const token = jwt.sign({ _id: current._id }, config.jwt_secret);
				return { ...current, token };
			} catch (e) {
				throw new Error(e.message);
			}
		},
		register: async (_, { args }, { User, authScope }) => {
			try {
				const currentU = await decryptUserId(authScope);
				if (currentU) {
					throw new Error('User logged in, cannot register');
				}

				const { username, password, email, avatar, bio, phone, pub, epub } = args;

				const emailExists = await User.findOne({ email });
				if (emailExists) {
					throw new Error('Email already in use');
				}

				const usernameExists = await User.findOne({ username });
				if (usernameExists) {
					throw new Error('Username already in use');
				}

				const hash = await hashPass(password);
				await new User({
					username,
					email,
					avatar,
					bio,
					phone,
					identity: { pub, epub },
					password: hash,
				}).save();

				const current = await User.findOne({ email });
				const token = jwt.sign({ _id: current._id }, config.jwt_secret);

				const confirmationSecret = authenticator.generateSecret(16);
				await User.findByIdAndUpdate(current._id, { confirmationSecret });
				return { ...current, token };
			} catch (e) {
				throw new Error(e.message);
			}
		},
	},
};
