// TODO: use faker or another lib to randomize values

const getTestAccount = () => ({ is: { pub: 'bleep', alias: 'blahblah' } });

const getProfile = () => ({
	aboutMeText: 'Hello there, I have been here',
	avatar: '123456',
	email: 'a@b.com',
	fullName: 'Neil de Grasse Tyson',
	miningEnabled: true,
	pub: 'bleep',
	username: 'blahblah',
});

const getPost = () => ({
	postText: 'This is a new post',
	location: 'Somewhere',
	taggedFriends: [],
	media: [],
	privatePost: false,
});

export default { getProfile, getTestAccount, getPost };
