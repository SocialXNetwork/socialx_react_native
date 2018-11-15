import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Formik, FormikProps } from 'formik';
import { Button, Segment } from 'native-base';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Option } from '../../components';
import { IAdSetupAudienceData, IGenderSelect, ITranslatedProps } from '../../types';
import styles, { nativeBaseStyles, SLIDER_LENGTH } from './NewAdSetupAudience.style';

interface INewAdSetupAudienceViewProps extends ITranslatedProps {
	updateAdSetAudience: (values: IAdSetupAudienceData) => void;
	adSetupAudienceFormik: React.RefObject<any>;
	onMultiSliderChange: (isStarting: boolean) => void;
	onAgeRangeHandler: (values: number[]) => void;
	onManageCountries: () => void;
	minAgeRange: number;
	maxAgeRange: number;
	estimatedReach: string;
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

export const NewAdSetupAudienceView: React.SFC<INewAdSetupAudienceViewProps> = ({
	getText,
	updateAdSetAudience,
	adSetupAudienceFormik,
	onMultiSliderChange,
	onAgeRangeHandler,
	minAgeRange,
	maxAgeRange,
	onManageCountries,
	estimatedReach,
}) => (
	<View style={styles.rootView}>
		<Formik
			ref={adSetupAudienceFormik}
			isInitialValid={true}
			initialValues={{
				selectedGender: IGenderSelect.all,
				ageRange: [13, 65],
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
						<View style={styles.ageRangeContainer}>
							<Text style={styles.ageRangeText}>{minAgeRange}</Text>
							<MultiSlider
								values={ageRange}
								min={13}
								max={65}
								step={1}
								sliderLength={SLIDER_LENGTH}
								onValuesChange={(values: number[]) => {
									onAgeRangeHandler(values);
									setFieldValue('ageRange', values);
								}}
								selectedStyle={styles.ageSelectorTrack}
								containerStyle={styles.ageSelectorContainer}
								onValuesChangeStart={() => onMultiSliderChange(true)}
								onValuesChangeFinish={() => onMultiSliderChange(false)}
							/>
							<Text style={styles.ageRangeText}>{maxAgeRange}</Text>
						</View>
						<Text style={styles.sectionLabel}>
							{getText('new.ad.setup.audience.countries.select')}
						</Text>
						<View style={styles.separator} />
						<Option
							type="icon"
							icon="ios-flag"
							text={getText('new.ad.setup.audience.manage.countries')}
							onPress={() => onManageCountries()}
						/>
						<View style={styles.separator} />
					</View>
					<View style={styles.peopleReached}>
						<Text style={styles.peopleReachedText}>
							{getText('new.ad.setup.audience.estimated.reach')}{' '}
						</Text>
						<Text style={styles.peopleReachedText}>{estimatedReach}</Text>
						<Text style={styles.peopleReachedText}>
							{' '}
							{getText('new.ad.setup.audience.estimated.reach.people')}
						</Text>
					</View>
				</ScrollView>
			)}
		/>
	</View>
);
