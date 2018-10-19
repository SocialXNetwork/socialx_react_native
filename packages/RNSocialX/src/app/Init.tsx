import moment from 'moment';
import * as React from 'react';

export default class Init extends React.Component {
	componentDidMount() {
		moment.updateLocale('en', {
			relativeTime: {
				future: 'in %s',
				past: '%s',
				s: '%d s',
				ss: '%d s',
				m: '%d m',
				mm: '%d m',
				h: '%d h',
				hh: '%d h',
				d: '%d d',
				dd: '%d d',
				M: '%d m',
				MM: '%d m',
				y: '%d y',
				yy: '%d y',
			},
		});
	}

	render() {
		return this.props.children;
	}
}
