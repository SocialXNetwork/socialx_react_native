// TODO: use faker or another lib to randomize values

const getTestAccount = () => ({ is: { pub: 'bleep', alias: 'blahblah' } });
const getTestAccountalt = () => ({ is: { pub: 'bloop', alias: 'blopyblopy' } });

const getProfile = () => ({
	aboutMeText: 'Hello there, I have been here',
	avatar: '123456',
	email: 'a@b.com',
	fullName: 'Neil de Grasse Tyson',
	miningEnabled: true,
	pub: 'bleep',
	username: 'blahblah',
});

const getProfilealt = () => ({
	aboutMeText: 'Hello there, I have been here',
	avatar: '123456',
	email: 'a@b.com',
	fullName: 'Neil de Grasse Tyson',
	miningEnabled: true,
	pub: 'bloop',
	username: 'blopyblopy',
});

const getPost = () => ({
	postText: 'This is a new post',
	location: 'Somewhere',
	// taggedFriends: [],
	// media: [],
	privatePost: false,
});

export default {
	getProfile,
	getTestAccount,
	getPost,
	getProfilealt,
	getTestAccountalt,
};
