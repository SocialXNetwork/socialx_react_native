import * as React from 'react';
import { View } from 'react-native';

import BugSnag from './BugSnag';
import ErrorBoundary from './ErrorBoundary';
import Init from './Init';
import Keyboard from './Keyboard';
import Navigation from './Navigation';
import OfflineHandler from './OfflineHandler';
import Splash from './Splash';
import StatusBar from './StatusBar';
import Store from './Store';

import 'react-native-get-random-values';
import PolyfillCrypto from './PolyfillCrypto';

export default class App extends React.Component<{}> {
	public render() {
		return (
			<ErrorBoundary>
				<BugSnag>
					{(bugsnag: any) => (
						<Init>
							<Splash>
								<Keyboard>
									<PolyfillCrypto />
									<Store bugsnag={bugsnag}>
										<React.Fragment>
											<StatusBar />
											<OfflineHandler>
												<Navigation />
											</OfflineHandler>
										</React.Fragment>
									</Store>
								</Keyboard>
							</Splash>
						</Init>
					)}
				</BugSnag>
			</ErrorBoundary>
		);
	}
}
