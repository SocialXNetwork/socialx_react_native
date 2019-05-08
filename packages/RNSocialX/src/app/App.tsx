import { Client } from 'bugsnag-react-native';
import * as React from 'react';

import ApolloProvider from './ApolloProvider';
import BugSnag from './BugSnag';
import ErrorBoundary from './ErrorBoundary';
import Init from './Init';
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
				<ApolloProvider>
					<BugSnag>
						{(client: Client | null) => (
							<Init>
								<Splash>
									<PolyfillCrypto />
									<Store bugSnag={client}>
										<React.Fragment>
											<StatusBar />
											<OfflineHandler>
												<Navigation />
											</OfflineHandler>
										</React.Fragment>
									</Store>
								</Splash>
							</Init>
						)}
					</BugSnag>
				</ApolloProvider>
			</ErrorBoundary>
		);
	}
}
