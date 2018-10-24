import * as React from 'react';

import {
	IWithNewAdSliderEnhancedActions,
	IWithNewAdSliderEnhancedData,
	WithNewAdSlider,
} from '../../enhancers/screens';
import { ICreateAdSteps, INavigationProps } from '../../types';
import { NewAdSetupPostScreen } from './NewAdSetupPostScreen';
import { NewAdSliderScreenView } from './NewAdSliderScreen.view';

const SLIDER_STEPS = [
	ICreateAdSteps.SetupPost,
	ICreateAdSteps.SetupAudience,
	ICreateAdSteps.SetupBudget,
];

type INewAdSliderScreenProps = INavigationProps &
	IWithNewAdSliderEnhancedData &
	IWithNewAdSliderEnhancedActions;

interface INewAdSliderScreenState {
	stepIndex: number;
}

class Screen extends React.Component<
	INewAdSliderScreenProps,
	INewAdSliderScreenState
> {
	public state = {
		stepIndex: 0,
	};

	private adSetupPostFormik = React.createRef();
	private adSetupAudienceFormik = React.createRef();

	public render() {
		const { getText, showDotsMenuModal } = this.props;
		const { stepIndex } = this.state;
		return (
			<NewAdSliderScreenView
				getText={getText}
				onGoBack={this.onGoBackHandler}
				onGoToNextStep={this.onGoToNextStepHandler}
				sliderStep={SLIDER_STEPS[stepIndex]}
			>
				<NewAdSetupPostScreen
					showDotsMenuModal={showDotsMenuModal}
					getText={getText}
					updateAdSetPost={this.updateAdSetPostHandler}
					adSetupPostFormik={this.adSetupPostFormik}
				/>
			</NewAdSliderScreenView>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private updateAdSetPostHandler = (...args: any) => {
		console.log('TODO: updateAdSetPost', args);
	};

	private onGoToNextStepHandler = () => {
		const { stepIndex } = this.state;
		if (stepIndex < SLIDER_STEPS.length - 1) {
			let validationPassed = true;
			const adSetupPostFormik = this.adSetupPostFormik.current;
			if (
				SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupPost &&
				adSetupPostFormik
			) {
				// @ts-ignore
				validationPassed = adSetupPostFormik.getFormikComputedProps().isValid;
				// @ts-ignore
				adSetupPostFormik.submitForm();
			} else if (SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupPost) {
				// TODO
			} else if (SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupBudget) {
				// TODO
			}
			if (validationPassed) {
				this.setState({ stepIndex: stepIndex + 1 });
			}
		} else {
			console.log('Handle finish action');
		}
	};
}

export const NewAdSliderScreen = (navProps: INavigationProps) => (
	<WithNewAdSlider>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSlider>
);
