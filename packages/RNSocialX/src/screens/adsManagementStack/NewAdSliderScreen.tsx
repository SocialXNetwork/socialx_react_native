/*
 *	TODO:
 *	1. estimatedReach should be calculated using a formula
 */

import * as React from 'react';

import { Dimensions, NativeScrollEvent, ScrollView } from 'react-native';
import {
	IWithNewAdSliderEnhancedActions,
	IWithNewAdSliderEnhancedData,
	WithNewAdSlider,
} from '../../enhancers/screens';
import { SCREENS } from '../../environment/consts';
import {
	IAdSetupAudienceData,
	IAdSetupPostData,
	ICreateAdSteps,
	INavigationProps,
} from '../../types';
import { NewAdConfigBudgetScreen } from './NewAdConfigBudgetScreen';
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
	minAgeRange: number;
	maxAgeRange: number;
	estimatedReach: string;
}

class Screen extends React.Component<INewAdSliderScreenProps, INewAdSliderScreenState> {
	public state = {
		stepIndex: 0,
		swipeEnabled: false,
		minAgeRange: 13,
		maxAgeRange: 65,
		estimatedReach: '130 - 650',
	};

	private postData: IAdSetupPostData | null = null;
	private audienceData: IAdSetupAudienceData | null = null;

	private adSetupPostFormik: React.RefObject<IFormikProps> = React.createRef();
	private adSetupAudienceFormik: React.RefObject<IFormikProps> = React.createRef();
	private adSetupBudgetScreenRef: React.RefObject<NewAdConfigBudgetScreen> = React.createRef();
	private scrollViewRef: React.RefObject<ScrollView> = React.createRef();

	public render() {
		const { getText, showOptionsMenu, showConfirmation, navigation } = this.props;
		const { stepIndex, minAgeRange, maxAgeRange, estimatedReach } = this.state;
		return (
			<NewAdSliderScreenView
				getText={getText}
				onGoBack={this.onGoBackHandler}
				onGoToNextStep={this.onGoToNextStepHandler}
				onGoToPreviousStep={this.onGoToPreviousStepHandler}
				sliderStep={SLIDER_STEPS[stepIndex]}
				ref={this.scrollViewRef}
				onMomentumScrollEnd={this.scrollPageChanged}
				isOnFirstSlide={stepIndex === 0}
				isOnLastSlide={stepIndex === SLIDER_STEPS.length - 1}
			>
				<NewAdSetupPostScreen
					showOptionsMenu={showOptionsMenu}
					getText={getText}
					updateAdSetPost={this.updateAdSetPostHandler}
					adSetupPostFormik={this.adSetupPostFormik}
				/>
				<NewAdSetupAudience
					getText={getText}
					adSetupAudienceFormik={this.adSetupAudienceFormik}
					updateAdSetAudience={this.updateAdSetAudienceHandler}
					onMultiSliderChange={this.onMultiSliderChangeHandler}
					onAgeRangeHandler={this.onAgeRangeHandler}
					onManageCountries={() => this.onManageCountriesHandler(navigation)}
					minAgeRange={minAgeRange}
					maxAgeRange={maxAgeRange}
					estimatedReach={estimatedReach}
				/>
				<NewAdConfigBudgetScreen
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

	private onAgeRangeHandler = (values: number[]) => {
		const valuesEstimatedReach = [];
		valuesEstimatedReach.push(values[0] * 10, values[1] * 10);

		const newEstimatedReach = valuesEstimatedReach.join(' - ');

		this.setState({
			minAgeRange: values[0],
			maxAgeRange: values[1],
			estimatedReach: newEstimatedReach,
		});
	};

	private onManageCountriesHandler = (navigation: any) => {
		navigation.navigate(SCREENS.ManageCountries);
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
			confirmButtonLabel: getText('ad.management.budget.modal.confirm.confirm.label'),
			cancelButtonLabel: getText('ad.management.budget.modal.confirm.cancel.label'),
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
			if (SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupPost && adSetupPostFormik) {
				validationPassed = adSetupPostFormik.getFormikComputedProps().isValid;
				adSetupPostFormik.submitForm();
			} else if (
				SLIDER_STEPS[stepIndex] === ICreateAdSteps.SetupAudience &&
				adSetupAudienceFormik
			) {
				validationPassed = adSetupAudienceFormik.getFormikComputedProps().isValid;
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

	private onGoToPreviousStepHandler = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			if (this.scrollViewRef.current) {
				this.scrollViewRef.current.scrollTo({
					x: SCREEN_WIDTH * (stepIndex - 1),
					y: 0,
					animated: true,
				});
			}
		}
	};
}

export const NewAdSliderScreen = (navProps: INavigationProps) => (
	<WithNewAdSlider>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSlider>
);
