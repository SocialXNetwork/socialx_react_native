import * as React from 'react';

import { Dimensions, ScrollView } from 'react-native';
import {
	IWithNewAdSliderEnhancedActions,
	IWithNewAdSliderEnhancedData,
	WithNewAdSlider,
} from '../../enhancers/screens';
import { ICreateAdSteps, INavigationProps } from '../../types';
import { AdsManagementConfigBudgetScreen } from './AdsManagementConfigBudgetScreen';
import { NewAdSetupAudience } from './NewAdSetupAudience';
import { INewAdSetupAudienceData } from './NewAdSetupAudience.view';
import { IAdSetupPostData, NewAdSetupPostScreen } from './NewAdSetupPostScreen';
import { NewAdSliderScreenView } from './NewAdSliderScreen.view';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SLIDER_STEPS = [
	ICreateAdSteps.SetupPost,
	ICreateAdSteps.SetupAudience,
	ICreateAdSteps.SetupBudget,
];

interface IFormikProps {
	getFormikComputedProps: () => {
		isValid: boolean;
	};
	submitForm: () => void;
}

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

	private postData: IAdSetupPostData | null = null;
	private audienceData: INewAdSetupAudienceData | null = null;

	private adSetupPostFormik: React.RefObject<IFormikProps> = React.createRef();
	private adSetupAudienceFormik: React.RefObject<
		IFormikProps
	> = React.createRef();
	private scrollViewRef: React.RefObject<ScrollView> = React.createRef();

	public render() {
		const { getText, showDotsMenuModal, showConfirmation } = this.props;
		const { stepIndex } = this.state;
		return (
			<NewAdSliderScreenView
				getText={getText}
				onGoBack={this.onGoBackHandler}
				onGoToNextStep={this.onGoToNextStepHandler}
				sliderStep={SLIDER_STEPS[stepIndex]}
				ref={this.scrollViewRef}
			>
				<NewAdSetupPostScreen
					showDotsMenuModal={showDotsMenuModal}
					getText={getText}
					updateAdSetPost={this.updateAdSetPostHandler}
					adSetupPostFormik={this.adSetupPostFormik}
				/>
				<NewAdSetupAudience
					getText={getText}
					adSetupAudienceFormik={this.adSetupAudienceFormik}
					updateAdSetAudience={this.updateAdSetAudienceHandler}
				/>
				<AdsManagementConfigBudgetScreen
					getText={getText}
					showConfirmation={showConfirmation}
					/* TODO: create ref here to read the data! */
				/>
			</NewAdSliderScreenView>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private updateAdSetPostHandler = (postData: IAdSetupPostData) => {
		console.log('updateAdSetPostHandler', postData);
		this.postData = postData;
	};

	private updateAdSetAudienceHandler = (
		audienceData: INewAdSetupAudienceData,
	) => {
		console.log('updateAdSetAudienceHandler', audienceData);
		this.audienceData = audienceData;
	};

	private confirmAdCreationHandler = () => {
		const { getText } = this.props;

		this.props.showConfirmation({
			title: getText('ad.management.budget.modal.confirm.title'),
			message: getText('ad.management.budget.modal.confirm.message'),
			confirmButtonLabel: getText(
				'ad.management.budget.modal.confirm.confirm.label',
			),
			cancelButtonLabel: getText(
				'ad.management.budget.modal.confirm.cancel.label',
			),
			confirmHandler: this.adCreationConfirmedHandler,
		});
	};

	private adCreationConfirmedHandler = () => {
		console.log('adCreationConfirmedHandler');
	};

	private onGoToNextStepHandler = () => {
		const { stepIndex } = this.state;
		if (stepIndex < SLIDER_STEPS.length - 1) {
			let validationPassed = true;
			const adSetupPostFormik = this.adSetupPostFormik.current;
			const adSetupAudienceFormik = this.adSetupAudienceFormik.current;
			if (
				SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupPost &&
				adSetupPostFormik
			) {
				validationPassed = adSetupPostFormik.getFormikComputedProps().isValid;
				adSetupPostFormik.submitForm();
			} else if (
				SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupAudience &&
				adSetupAudienceFormik
			) {
				validationPassed = adSetupAudienceFormik.getFormikComputedProps()
					.isValid;
				adSetupAudienceFormik.submitForm();
			}
			if (validationPassed && this.scrollViewRef.current) {
				this.setState({ stepIndex: stepIndex + 1 });
				this.scrollViewRef.current.scrollTo({
					x: SCREEN_WIDTH * (stepIndex + 1),
					y: 0,
					animated: true,
				});
			}
		} else {
			console.log('Handle finish action');
			this.confirmAdCreationHandler();
		}
	};
}

export const NewAdSliderScreen = (navProps: INavigationProps) => (
	<WithNewAdSlider>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSlider>
);
