import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { InputSizes, MediaHorizontalScroller, PrimaryTextInput } from '../';
import { ITranslatedProps } from '../../types';
import styles, { customStyleProps } from './AdSetupPost.style';

interface IAdSetupPostProps extends ITranslatedProps {
	mediaObjects: string[];
	onAddMedia: () => void;
	updateAdSetPost: (headline: string, description: string) => void;
	adSetupPostFormik: React.RefObject<any>;
}

interface INewAdSetupPostData {
	headline: string;
	description: string;
}

export const AdSetupPost: React.SFC<IAdSetupPostProps> = ({
	mediaObjects,
	getText,
	onAddMedia,
	updateAdSetPost,
	adSetupPostFormik,
}) => (
	<View style={styles.rootView}>
		<Formik
			ref={adSetupPostFormik}
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
				updateAdSetPost(values.headline, values.description);
			}}
			render={({
				values: { headline, description },
				errors,
				handleBlur,
				handleSubmit,
				isValid,
				setFieldValue,
			}: FormikProps<INewAdSetupPostData>) => (
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
			)}
		/>
	</View>
);
