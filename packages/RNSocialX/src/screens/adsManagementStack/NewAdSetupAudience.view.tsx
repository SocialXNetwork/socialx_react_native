import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Formik, FormikProps } from 'formik';
import { Button, Segment } from 'native-base';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { IAdSetupAudienceData, IGenderSelect, ITranslatedProps } from '../../types';
import styles, { nativeBaseStyles } from './NewAdSetupAudience.style';

interface INewAdSetupAudienceViewProps extends ITranslatedProps {
	updateAdSetAudience: (values: IAdSetupAudienceData) => void;
	adSetupAudienceFormik: React.RefObject<any>;
	onMultiSliderChange: (isStarting: boolean) => void;
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

const SliderMarkerWithValue: React.SFC<{ currentValue: number }> = ({ currentValue }) => (
	<View style={styles.thumbContainer}>
		<Text>{currentValue}</Text>
	</View>
);

export const NewAdSetupAudienceView: React.SFC<INewAdSetupAudienceViewProps> = ({
	getText,
	updateAdSetAudience,
	adSetupAudienceFormik,
	onMultiSliderChange,
}) => (
	<View style={styles.rootView}>
		<Formik
			ref={adSetupAudienceFormik}
			isInitialValid={true}
			initialValues={{
				selectedGender: IGenderSelect.all,
				ageRange: [20, 80],
			}}
			onSubmit={updateAdSetAudience}
			render={({
				values: { selectedGender, ageRange },
				errors,
				handleBlur,
				handleSubmit,
				isValid,
				setFieldValue,
			}: FormikProps<IAdSetupAudienceData>) => (
				<ScrollView
					style={{ flex: 1 }}
					keyboardShouldPersistTaps={'handled'}
					alwaysBounceVertical={false}
				>
					<Text style={styles.headerText}>
						{getText('new.ad.setup.audience.header.title').toUpperCase()}
					</Text>
					<View style={styles.screenContent}>
						<Text style={styles.sectionLabel}>
							{getText('new.ad.setup.audience.gender.select')}
						</Text>
						<Segment style={nativeBaseStyles.segment}>
							{GENDER_SELECTION_BUTTONS.map((genderButton, index) => (
								<Button
									key={genderButton.value}
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
						<Text style={styles.sectionLabel}>
							{getText('new.ad.setup.audience.age.range.select')}
						</Text>
						<MultiSlider
							values={ageRange}
							min={10}
							max={100}
							step={1}
							onValuesChange={(values: number[]) => setFieldValue('ageRange', values)}
							selectedStyle={styles.ageSelectorTrack}
							containerStyle={styles.ageSelectorContainer}
							customMarker={SliderMarkerWithValue}
							onValuesChangeStart={() => onMultiSliderChange(true)}
							onValuesChangeFinish={() => onMultiSliderChange(false)}
						/>
						<Text style={styles.sectionLabel}>
							{getText('new.ad.setup.audience.countries.select')}
						</Text>
						<Text>{'TBD: figure out best selector here'}</Text>
					</View>
				</ScrollView>
			)}
		/>
	</View>
);
