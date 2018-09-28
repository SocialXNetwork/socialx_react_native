import * as React from 'react';

import BugSnag from './BugSnag';
import ErrorBoundary from './ErrorBoundary';
import Init from './Init';
import Keyboard from './Keyboard';
import Navigation from './Navigation';
import OfflineHandlers from './OfflineHandlers';
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
									<OfflineHandlers>
										<StatusBar />
										<Navigation />
									</OfflineHandlers>
								</Store>
							</Keyboard>
						</Splash>
					</Init>
				</BugSnag>
			</ErrorBoundary>
		);
	}
}
