import * as React from 'react';

import { IDictionary } from '../../types';

import { IModalOverlay } from '../../store/ui/overlays';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithGenericModalEnhancedData extends IDictionary {
	modal: IModalOverlay;
}

export interface IWithGenericModalEnhancedActions {
	hideModal: () => void;
}

interface IWithGenericModalEnhancedProps {
	data: IWithGenericModalEnhancedData;
	actions: IWithGenericModalEnhancedActions;
}

interface IWithGenericModalProps {
	children(props: IWithGenericModalEnhancedProps): JSX.Element;
}

interface IWithGenericModalState {}

export class WithGenericModal extends React.Component<
	IWithGenericModalProps,
	IWithGenericModalState
> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithOverlays>
						{({ modal, hideModal }) =>
							this.props.children({
								data: {
									modal,
									dictionary,
								},
								actions: {
									hideModal,
								},
							})
						}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
