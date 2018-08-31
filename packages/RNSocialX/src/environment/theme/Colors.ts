import hexRgb from 'hex-rgb';

// TODO: transform all RGB color to hex and rgba should use colorWithAlpha
export const Colors = {
	transparent: 'rgba(0,0,0,0)',
	white: '#FFFFFF',
	black: '#000000',
	red: '#FF0000',
	blackWithAlpha: (alpha: number) => {
		return 'rgba(0, 0, 0, ' + alpha + ')';
	},
	pink: '#ff0099',
	background: '#4a5963',
	shuttleGray: '#54646e',
	postText: '#6D7886',
	postFullName: '#1F3149',
	postHour: '#039DE2',
	postButtonColor: '#AAAAAA',
	userAvatarFullName: '#006BFF',
	dustWhite: '#EEEEEE',
	grayText: '#9B9B9B',
	fuchsiaBlue: '#814FBE',
	iron: '#D3D6DA',
	iron2: '#D6D9DE',
	rhino: '#273851',
	mercury: '#E5E5E5',
	tabBarBottomBg: 'rgba(255,255,255,0.8)',
	green: '#43a324',
	geyser: '#D2DAE1',
	cadetBlue: '#A1B5C2',
	silverSand: '#BFC3C8',
	searchFilterButtonSelectedBg: 'rgba(3,157,226,0.06)',
	searchFilterButtonUnselectedText: 'rgba(109,120,134,0.7)',
	pigeonPost: '#A7BAD4',
	activityCardBottomBorder: 'rgba(168,182,200,0.3)',
	midnight: '#000F2B',
	catskillWhite: '#F0F3F8',
	sushi: '#79B933',
	grayNurse05: 'rgba(230,231,230,0.5)',
	grayNurse: '#E6E7E6',
	tundora: '#4A4A4A',
	ceriseRed: '#E0295A',
	chatTextInputBorder: 'rgba(151,151,151,0.5)',
	dustGray: '#979797',
	gallery: '#efefef',
	alabaster: '#F9F9F9',
	monza: '#D0021B',
	blueMarguerite: '#6162C7',
	amethyst: '#9863D3',
	blueGem: '#4813A0',
	wildSand: '#F6F6F6',
};

export const colorWithAlpha = (color: string, alpha: number) => {
	const rgbValue = hexRgb(color);
	return `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${alpha})`;
};
