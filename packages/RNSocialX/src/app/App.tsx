import * as React from 'react';

import BugSnag from './BugSnag';
import ErrorBoundary from './ErrorBoundary';
import Init from './Init';
import Keyboard from './Keyboard';
import Navigation from './Navigation';
import Splash from './Splash';
import StatusBar from './StatusBar';
import Store from './Store';

export default class App extends React.Component<{}> {
	public render() {
		return (
			<ErrorBoundary>
				<BugSnag>
					<Init>
						<Splash>
							<Keyboard>
								<Store>
									<StatusBar />
									<Navigation />
								</Store>
							</Keyboard>
						</Splash>
					</Init>
				</BugSnag>
			</ErrorBoundary>
		);
	}
}
