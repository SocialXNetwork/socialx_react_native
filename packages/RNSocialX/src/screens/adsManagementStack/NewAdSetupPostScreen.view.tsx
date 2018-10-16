import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
	CreateAdSteps,
	Header,
	HeaderButton,
	InputSizes,
	MediaHorizontalScroller,
	PrimaryTextInput,
} from '../../components';
import { ITranslatedProps } from '../../types';
import styles, { customStyleProps } from './NewAdSetupPostScreen.style';

interface INewAdSetupPostScreenViewProps extends ITranslatedProps {
	mediaObjects: string[];
	onGoBack: () => void;
	onAddMedia: () => void;
	onNavigateToAudienceSection: (headline: string, description: string) => void;
}

interface INewAdSetupPostData {
	headline: string;
	description: string;
}

export const NewAdSetupPostScreenView: React.SFC<
	INewAdSetupPostScreenViewProps
> = ({
	mediaObjects,
	getText,
	onGoBack,
	onAddMedia,
	onNavigateToAudienceSection,
}) => (
	<View style={styles.rootView}>
		<Formik
			initialValues={{
				headline: '',
				description: '',
			}}
			validate={({ headline, description }: INewAdSetupPostData) => {
				const errors: FormikErrors<INewAdSetupPostData> = {};
				if (!headline) {
					errors.headline = getText('new.ad.setup.post.headline.required');
				}
				return errors;
			}}
			onSubmit={(values: INewAdSetupPostData) => {
				onNavigateToAudienceSection(values.headline, values.description);
			}}
			render={({
				values: { headline, description },
				errors,
				handleBlur,
				handleSubmit,
				isValid,
				setFieldValue,
			}: FormikProps<INewAdSetupPostData>) => (
				<React.Fragment>
					<Header
						title={getText('new.ad.setup.post.screen.title')}
						left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
					/>
					<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
						<Text style={styles.headerText}>
							{getText('new.ad.setup.post.header.title').toUpperCase()}
						</Text>
						<View style={styles.screenContent}>
							<PrimaryTextInput
								size={InputSizes.Small}
								borderColor={customStyleProps.inputBorderColor}
								borderWidth={customStyleProps.inputBorderWidth}
								placeholder={getText(
									'new.ad.setup.post.header.headline.input.placeholder',
								)}
								value={headline}
								onChangeText={(value: string) => {
									setFieldValue('headline', value);
								}}
							/>
							{errors.headline && (
								<Text style={styles.errorText}>{errors.headline}</Text>
							)}
							<View style={styles.descriptionView}>
								<PrimaryTextInput
									borderColor={customStyleProps.inputBorderColor}
									borderWidth={customStyleProps.inputBorderWidth}
									placeholder={getText(
										'new.ad.setup.post.header.description.input.placeholder',
									)}
									multiline={true}
									value={description}
									onChangeText={(value: string) => {
										setFieldValue('description', value);
									}}
								/>
							</View>
							<View style={styles.addMediaButtonContainer}>
								<TouchableOpacity
									style={styles.addMediaButton}
									onPress={onAddMedia}
								>
									<Icon name={'logo-instagram'} style={styles.photoIcon} />
									<Text style={styles.addMediaText}>
										{getText('new.wall.post.screen.attach.media.button')}
									</Text>
								</TouchableOpacity>
							</View>
							{mediaObjects.length > 0 && (
								<View style={styles.mediaContainer}>
									<MediaHorizontalScroller
										mediaURIs={mediaObjects}
										getText={getText}
									/>
								</View>
							)}
						</View>
					</ScrollView>
					<CreateAdSteps currentStep={'post'} onGoToNextStep={handleSubmit} />
				</React.Fragment>
			)}
		/>
	</View>
);
