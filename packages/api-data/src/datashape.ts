const database = {
	'~@account1': {
		'~publicKey': {
			alias: 'account1',
			pub: 'publicKey1',
			epub: 'ePublicKey1',
		},
		_: {
			'#': '~publicKey1',
		},
	},
	'~@account2': {
		'~publicKey': {
			alias: 'account2',
			pub: 'publicKey2',
			epub: 'ePublicKey2',
		},
		_: {
			'#': '~publicKey2',
		},
	},
	'~@account3': {
		'~publicKey': {
			alias: 'account3',
			pub: 'publicKey3',
			epub: 'ePublicKey3',
		},
		_: {
			'#': '~publicKey3',
		},
	},
	'~publicKey1': {
		alias: 'account1',
		pub: 'publicKey1',
		epub: 'ePublicKey1',
		_: {
			'#': '~publicKey1',
		},
	},
	'~publicKey2': {
		alias: 'account2',
		pub: 'publicKey2',
		epub: 'ePublicKey2',
		_: {
			'#': '~publicKey2',
		},
	},
	'~publicKey3': {
		alias: 'account3',
		pub: 'publicKey3',
		epub: 'ePublicKey3',
		_: {
			'#': '~publicKey3',
		},
	},
	profiles: {
		account1: {
			aboutMeText: 'about me',
			miningEnabled: false,
			fullName: 'account1 name',
			email: 'account1@account.com',
			avatar: 'avatar hash',
			pub: 'publicKey',
			friends: {
				friend1: {
					username: 'account2',
					timestamp: 1234,
					relation: 'PENDING',
					_: {
						'#': 'friend1 Soul',
					},
				},
				friend2: {
					username: 'account3',
					timestamp: 1254,
					relation: 'MUTUAL',
					_: {
						'#': 'friend2 Soul',
					},
				},
			},
			_: {
				'#': 'account1 Soul',
			},
		},
		account2: {
			aboutMeText: 'about me',
			miningEnabled: false,
			fullName: 'account2 name',
			email: 'account2@account.com',
			avatar: 'avatar hash',
			pub: 'publicKey2',
			friends: {
				friend1: {
					username: 'account1',
					timestamp: 1234,
					relation: 'PENDING',
					_: {
						'#': 'friend1 Soul',
					},
				},
			},
			_: {
				'#': 'account2 Soul',
			},
		},
		account3: {
			aboutMeText: 'about me',
			miningEnabled: false,
			fullName: 'account3 name',
			email: 'account3@account.com',
			avatar: 'avatar hash',
			pub: 'publicKey3',
			friends: {
				friend1: {
					username: 'account1',
					timestamp: 1254,
					relation: 'MUTUAL',
					_: {
						'#': 'friend1 Soul',
					},
				},
			},
			_: {
				'#': 'account3 Soul',
			},
		},
		_: {
			'#': 'profiles Soul',
		},
	},
	posts: {
		'2018': {
			'5': {
				'25': {
					public: {
						'post#423': {
							postText: 'brand new gif',
							location: 'netherlands',
							taggedFriends: [
								{
									fullName: 'michael',
								},
								{
									fullName: 'Mike',
								},
							],
							media: [
								{
									hash: '#hash',
									type: {
										key: 'gif',
										name: 'Video',
										category: 'nature',
									},
								},
							],
							governanceVersion: false,
							owner: {
								alias: 'account1',
								pub: 'publicKey',
							},
							timestamp: 1234,
							likes: {
								'like#1': {
									timestamp: 1534,
									owner: {
										alias: 'account2',
										pub: 'publicKey2',
									},
								},
							},
							comments: {
								'comment#1': {
									text: 'interesting post..',
									timestamp: 534,
									owner: {
										alias: 'account3',
										pub: 'publicKey3',
									},
									likes: {
										'like#14': {
											timestamp: 345,
											owner: {
												alias: 'account2',
												pub: 'publicKey2',
											},
										},
									},
								},
							},
						},
					},
				},
				'26': {
					private: {
						account2: {
							'post#15356': {
								postText: 'this video',
								location: 'germany',
								taggedFriends: [
									{
										fullName: 'steins veiner',
									},
								],
								media: [
									{
										hash: '#hash',
										type: {
											key: 'jpeg',
											name: 'Photo',
											category: 'politics',
										},
									},
								],
								governanceVersion: false,
								owner: {
									alias: 'account2',
									pub: 'publicKey',
								},
								timestamp: 1234,
								likes: {
									'like#534': {
										timestamp: 15332,
										owner: {
											alias: 'account3',
											pub: 'publicKey3',
										},
									},
								},
								comments: {
									_: {
										'#': 'Soul',
									},
								},
							},
						},
					},
				},
			},
			'6': {
				'12': {
					public: {
						'post#6934': {
							postText: 'this vid',
							location: 'france',
							taggedFriends: [
								{
									fullName: 'michael',
								},
							],
							media: [
								{
									hash: '#hash',
									type: {
										key: 'mp4',
										name: 'Video',
										category: 'funny',
									},
								},
							],
							governanceVersion: false,
							owner: {
								alias: 'account1',
								pub: 'publicKey',
							},
							timestamp: 1234,
							likes: {
								_: {
									'#': 'likes Soul',
								},
							},
							comments: {
								'comment#2': {
									text: 'intersting..',
									timestamp: 534,
									owner: {
										alias: 'account1',
										pub: 'publicKey1',
									},
									likes: {
										_: {
											'#': 'likes Soul',
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
	postMetasByUser: {
		account1: {
			'postMeta#434': {
				postPath: 'posts/2018/5/25/post#423',
				timestamp: 1234,
				owner: {
					alias: 'account1',
					pub: 'publicKey1',
					_: {
						'#': 'Soul',
					},
				},
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		account2: {
			'postMeta#14313': {
				postPath: 'posts/2018/5/26/private/account2/post#15356',
				timestamp: 1234,
				owner: {
					alias: 'account2',
					pub: 'publickKey2',
					_: {
						'#': 'Soul',
					},
				},
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		account3: {
			'postMeta#53425': {
				postPath: 'posts/2018/6/12/public/post#6934',
				timestamp: 1234,
				owner: {
					alias: 'account3',
					pub: 'publicKey3',
					_: {
						'#': 'Soul',
					},
				},
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		_: {
			'#': 'Soul',
		},
	},
	postMetaById: {
		'post#423': {
			postPath: 'posts/2018/5/25/post#423',
			privatePost: false,
			owner: {
				alias: 'account1',
				pub: 'publickKey1',
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		'post#15356': {
			postPath: 'posts/2018/5/25/post#15356',
			privatePost: false,
			owner: {
				alias: 'account2',
				pub: 'publickKey2',
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		'post#6934': {
			postPath: 'posts/2018/6/12/public/post#6934',
			privatePost: true,
			owner: {
				alias: 'account3',
				pub: 'publicKey3',
				_: {
					'#': 'Soul',
				},
			},
			_: {
				'#': 'Soul',
			},
		},
		_: {
			'#': 'Soul',
		},
	},
	commentMetaById: {
		'comment#1': {
			owner: {
				alias: 'account3',
				pub: 'publicKey3',
				_: {
					'#': 'Soul',
				},
			},
			postPath: 'posts/2018/5/25/post#15356',
			timestamp: 143,
			commentId: 'comment#1',
			_: {
				'#': 'Soul',
			},
		},
		'comment#2': {
			owner: {
				alias: 'account1',
				pub: 'publicKey1',
				_: {
					'#': 'Soul',
				},
			},
			postPath: 'posts/2018/6/12/post#6934',
			timestamp: 143,
			commentId: 'comment#2',
			_: {
				'#': 'Soul',
			},
		},
		_: {
			'#': 'Soul',
		},
	},
	notifications: {
		account1: {
			'notification#1': {
				type: 'RECENT_COMMENT',
				from: {
					alias: 'account3',
					pub: 'publicKey3',
				},
				metaData: {
					postId: 'post#423',
					commentId: 'comment#1',
					_: {
						'#': 'Soul',
					},
				},
				timestamp: 1234,
			},
		},
		account2: {
			'notification#5': {
				type: 'FRIEND_REQUEST',
				from: {
					alias: 'account1',
					pub: 'publicKey1',
				},
				metaData: {
					_: {
						'#': 'Soul',
					},
				},
				timestamp: 1234,
			},
		},
	},
};
