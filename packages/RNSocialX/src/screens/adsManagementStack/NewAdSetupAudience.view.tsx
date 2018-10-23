import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { Button, Segment } from 'native-base';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Header, HeaderButton } from '../../components';
import { ITranslatedProps } from '../../types';
import styles, { nativeBaseStyles } from './NewAdSetupAudience.style';

interface INewAdSetupAudienceViewProps extends ITranslatedProps {
	onGoBack: () => void;
}

enum IGenderSelect {
	male = 'male',
	female = 'female',
	all = 'all',
}

interface INewAdSetupAudienceData {
	selectedGender: IGenderSelect;
	ageRange: number[];
}

const GENDER_SELECTION_BUTTONS = [
	{
		label: 'new.ad.setup.audience.gender.male',
		value: IGenderSelect.male,
	},
	{
		label: 'new.ad.setup.audience.gender.female',
		value: IGenderSelect.female,
	},
	{
		label: 'new.ad.setup.audience.gender.all',
		value: IGenderSelect.all,
	},
];

const SliderMarkerWithValue: React.SFC<{ currentValue: number }> = ({
	currentValue,
}) => (
	<View style={styles.thumbContainer}>
		<Text>{currentValue}</Text>
	</View>
);

export const NewAdSetupAudienceView: React.SFC<
	INewAdSetupAudienceViewProps
> = ({ getText, onGoBack }) => (
	<View style={styles.rootView}>
		<Formik
			initialValues={{
				selectedGender: IGenderSelect.all,
				ageRange: [20, 80],
			}}
			validate={({ selectedGender }: INewAdSetupAudienceData) => {
				const errors: FormikErrors<INewAdSetupAudienceData> = {};
				// if (!headline) {
				// 	errors.headline = getText('new.ad.setup.post.headline.required');
				// }
				return errors;
			}}
			onSubmit={(values: INewAdSetupAudienceData) => {
				console.log('onSubmit', values);
			}}
			render={({
				values: { selectedGender, ageRange },
				errors,
				handleBlur,
				handleSubmit,
				isValid,
				setFieldValue,
			}: FormikProps<INewAdSetupAudienceData>) => (
				<React.Fragment>
					<Header
						title={getText('new.ad.setup.audience.screen.title')}
						left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
					/>
					<ScrollView
						style={{ flex: 1 }}
						keyboardShouldPersistTaps={'handled'}
						alwaysBounceVertical={false}
					>
						<Text style={styles.headerText}>
							{getText('new.ad.setup.audience.header.title').toUpperCase()}
						</Text>
						<View style={styles.screenContent}>
							<Text>{getText('new.ad.setup.audience.gender.select')}</Text>
							<Segment style={nativeBaseStyles.segment}>
								{GENDER_SELECTION_BUTTONS.map((genderButton, index) => (
									<Button
										style={[
											selectedGender === genderButton.value
												? nativeBaseStyles.segmentButtonActive
												: nativeBaseStyles.segmentButtonInactive,
										]}
										first={index === 0}
										last={index === GENDER_SELECTION_BUTTONS.length - 1}
										active={selectedGender === genderButton.value}
										onPress={() => {
											setFieldValue('selectedGender', genderButton.value);
										}}
									>
										<Text
											style={
												selectedGender === genderButton.value
													? styles.segmentTitleActive
													: styles.segmentTitleInactive
											}
										>
											{getText(genderButton.label)}
										</Text>
									</Button>
								))}
							</Segment>
							<Text>{getText('new.ad.setup.audience.age.range.select')}</Text>
							<MultiSlider
								values={ageRange}
								min={10}
								max={100}
								step={1}
								onValuesChange={(values: number[]) =>
									setFieldValue('ageRange', values)
								}
								selectedStyle={styles.ageSelectorTrack}
								containerStyle={styles.ageSelectorContainer}
								customMarker={SliderMarkerWithValue}
							/>
						</View>
					</ScrollView>
				</React.Fragment>
			)}
		/>
	</View>
);
