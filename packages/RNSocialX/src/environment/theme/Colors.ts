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
	pinkLace: '#fecdec',
	background: '#4a5963',
	shuttleGray: '#54646e',
	paleSky: '#6D7886',
	cloudBurst: '#1F3149',
	cerulean: '#039DE2',
	postButtonColor: '#AAAAAA',
	blueRibbon: '#006BFF',
	dustWhite: '#EEEEEE',
	manatee: '#8F9095',
	iron: '#D3D6DA',
	iron2: '#D6D9DE',
	rhino: '#273851',
	mercury: '#E5E5E5',
	green: '#43a324',
	geyser: '#D2DAE1',
	cadetBlue: '#A1B5C2',
	silverSand: '#BFC3C8',
	pigeonPost: '#A7BAD4',
	midnight: '#000F2B',
	catskillWhite: '#F0F3F8',
	sushi: '#79B933',
	grayNurse05: 'rgba(230,231,230,0.5)',
	grayNurse: '#E6E7E6',
	tundora: '#4A4A4A',
	ceriseRed: '#E0295A',
	monza: '#D0021B',
	blueMarguerite: '#6162C7',
	amethyst: '#9863D3',
	blueGem: '#4813A0',
	charade: '#2E333D',

	pink: '#FF0099',
	flirt: '#BB0070',
	fuchsiaBlue: '#814FBE',
	gigas: '#603693',
	alabaster: '#F7F7F7',
	wildSand: '#F6F6F6',
	athensGray: '#F4F5F7',
	gallery: '#EFEFEF',
	alto: '#DEDEDE',
	dustyGray: '#9B9B9B',
	dustGray: '#979797',
	gray: '#808080',
};

export const colorWithAlpha = (color: string, alpha: number) => {
	const rgbValue = hexRgb(color);
	return `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${alpha})`;
};

export const colorWithAlphaArray = (color: string, alpha: number) => {
	const rgbValue = hexRgb(color);
	return [rgbValue.red, rgbValue.green, rgbValue.blue, alpha];
};
