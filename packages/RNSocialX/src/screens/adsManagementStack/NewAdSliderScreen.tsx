import * as React from 'react';

import { Dimensions, NativeScrollEvent, ScrollView } from 'react-native';
import {
	IWithNewAdSliderEnhancedActions,
	IWithNewAdSliderEnhancedData,
	WithNewAdSlider,
} from '../../enhancers/screens';
import {
	IAdSetupAudienceData,
	IAdSetupPostData,
	ICreateAdSteps,
	INavigationProps,
} from '../../types';
import { AdsManagementConfigBudgetScreen } from './AdsManagementConfigBudgetScreen';
import { NewAdSetupAudience } from './NewAdSetupAudience';
import { NewAdSetupPostScreen } from './NewAdSetupPostScreen';
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
	swipeEnabled: boolean;
}

class Screen extends React.Component<
	INewAdSliderScreenProps,
	INewAdSliderScreenState
> {
	public state = {
		stepIndex: 0,
		swipeEnabled: false,
	};

	private postData: IAdSetupPostData | null = null;
	private audienceData: IAdSetupAudienceData | null = null;

	private adSetupPostFormik: React.RefObject<IFormikProps> = React.createRef();
	private adSetupAudienceFormik: React.RefObject<
		IFormikProps
	> = React.createRef();
	private adSetupBudgetScreenRef: React.RefObject<
		AdsManagementConfigBudgetScreen
	> = React.createRef();
	private scrollViewRef: React.RefObject<ScrollView> = React.createRef();

	public render() {
		const { getText, showDotsMenuModal, showConfirmation } = this.props;
		const { stepIndex, swipeEnabled } = this.state;
		return (
			<NewAdSliderScreenView
				getText={getText}
				onGoBack={this.onGoBackHandler}
				onGoToNextStep={this.onGoToNextStepHandler}
				sliderStep={SLIDER_STEPS[stepIndex]}
				ref={this.scrollViewRef}
				canGoBack={swipeEnabled}
				onMomentumScrollEnd={this.scrollPageChanged}
				isOnLastSlide={stepIndex === SLIDER_STEPS.length - 1}
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
					onMultiSliderChange={this.onMultiSliderChangeHandler}
				/>
				<AdsManagementConfigBudgetScreen
					getText={getText}
					showConfirmation={showConfirmation}
					ref={this.adSetupBudgetScreenRef}
				/>
			</NewAdSliderScreenView>
		);
	}

	private onMultiSliderChangeHandler = (isStarting: boolean) => {
		this.setState({
			swipeEnabled: !isStarting,
		});
	};

	private scrollPageChanged = (event: { nativeEvent: NativeScrollEvent }) => {
		const { stepIndex } = this.state;
		const scrollXOffset = event.nativeEvent.contentOffset.x;
		if (scrollXOffset !== stepIndex * SCREEN_WIDTH) {
			const newStepIndex = Math.round(scrollXOffset / SCREEN_WIDTH);
			this.setState({
				stepIndex: newStepIndex,
				swipeEnabled: newStepIndex > 0,
			});
		}
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private updateAdSetPostHandler = (postData: IAdSetupPostData) => {
		console.log('updateAdSetPostHandler', postData);
		this.postData = postData;
	};

	private updateAdSetAudienceHandler = (audienceData: IAdSetupAudienceData) => {
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
		const { createAd } = this.props;
		const budgetData = this.adSetupBudgetScreenRef.current!.getAdBudgetData();
		createAd(this.postData!, this.audienceData!, budgetData);
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
				this.scrollViewRef.current.scrollTo({
					x: SCREEN_WIDTH * (stepIndex + 1),
					y: 0,
					animated: true,
				});
			}
		} else {
			this.confirmAdCreationHandler();
		}
	};
}

export const NewAdSliderScreen = (navProps: INavigationProps) => (
	<WithNewAdSlider>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSlider>
);
