import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { InputSizes, MediaHorizontalScroller, PrimaryTextInput } from '../../components';
import { ITranslatedProps } from '../../types';
import styles, { customStyleProps } from './NewAdSetupPostScreen.style';

interface INewAdSetupPostScreenViewProps extends ITranslatedProps {
	media: string[];
	onAddMedia: () => void;
	updateAdSetPost: (headline: string, description: string) => void;
	adSetupPostFormik: React.RefObject<any>;
}

interface INewNewAdSetupPostScreenViewData {
	headline: string;
	description: string;
}

export const NewAdSetupPostScreenView: React.SFC<INewAdSetupPostScreenViewProps> = ({
	media,
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
			validate={({ headline, description }: INewNewAdSetupPostScreenViewData) => {
				const errors: FormikErrors<INewNewAdSetupPostScreenViewData> = {};
				if (!headline) {
					errors.headline = getText('new.ad.setup.post.headline.required');
				}
				return errors;
			}}
			onSubmit={(values: INewNewAdSetupPostScreenViewData) => {
				updateAdSetPost(values.headline, values.description);
			}}
			render={({
				values: { headline, description },
				errors,
				handleBlur,
				isValid,
				setFieldValue,
			}: FormikProps<INewNewAdSetupPostScreenViewData>) => (
				<ScrollView
					style={{ flex: 1 }}
					keyboardShouldPersistTaps={'handled'}
					alwaysBounceVertical={false}
				>
					<Text style={styles.headerText}>
						{getText('new.ad.setup.post.header.title').toUpperCase()}
					</Text>
					<View style={styles.screenContent}>
						<PrimaryTextInput
							size={InputSizes.Small}
							borderColor={customStyleProps.inputBorderColor}
							borderWidth={customStyleProps.inputBorderWidth}
							placeholder={getText('new.ad.setup.post.header.headline.input.placeholder')}
							value={headline}
							onChangeText={(value: string) => {
								setFieldValue('headline', value);
							}}
						/>
						{errors.headline && <Text style={styles.errorText}>{errors.headline}</Text>}
						<View style={styles.descriptionView}>
							<PrimaryTextInput
								borderColor={customStyleProps.inputBorderColor}
								borderWidth={customStyleProps.inputBorderWidth}
								placeholder={getText('new.ad.setup.post.header.description.input.placeholder')}
								multiline={true}
								value={description}
								onChangeText={(value: string) => {
									setFieldValue('description', value);
								}}
							/>
						</View>
						<View style={styles.addMediaButtonContainer}>
							<TouchableOpacity style={styles.addMediaButton} onPress={onAddMedia}>
								<Icon name={'logo-instagram'} style={styles.photoIcon} />
								<Text style={styles.addMediaText}>
									{getText('new.wall.post.screen.attach.media.button')}
								</Text>
							</TouchableOpacity>
						</View>
						{media.length > 0 && (
							<View style={styles.mediaContainer}>
								<MediaHorizontalScroller mediaURIs={media} getText={getText} />
							</View>
						)}
					</View>
				</ScrollView>
			)}
		/>
	</View>
);
