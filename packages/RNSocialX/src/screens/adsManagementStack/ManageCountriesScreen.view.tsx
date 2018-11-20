import { CheckBox } from 'native-base';
import * as React from 'react';
import { Image, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
	Header,
	HeaderButton,
	InputSizes,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './ManageCountriesScreen.style';

interface IManageCountriesScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	countriesList: any;
	autoFocus: boolean;
	searchValue: string;
	onCountryInputChange: (value: string) => void;
	onSaveCountriesList: () => void;
	onCheckedCountry: (value: string) => void;
	selectedCheckList: string[];
}

export const ManageCountriesScreenView: React.SFC<IManageCountriesScreenViewProps> = ({
	onGoBack,
	getText,
	countriesList,
	autoFocus,
	searchValue,
	onCountryInputChange,
	onSaveCountriesList,
	onCheckedCountry,
	selectedCheckList,
}) => {
	const filteredCountries = countriesList.filter(
		(e: any) => e.name.toLowerCase().indexOf(searchValue) !== -1,
	);

	return (
		<View style={{ flex: 1 }}>
			{
				<Header
					title={getText('ad.manage.countries.title')}
					left={<HeaderButton iconName="ios-close" onPress={onGoBack} />}
					right={
						<HeaderButton
							iconName="ios-checkmark"
							onPress={() => {
								onSaveCountriesList();
							}}
						/>
					}
				/>
			}
			<View style={styles.container}>
				<View style={styles.marginBetweenTitleAndInput} />
				<PrimaryTextInput
					icon="ios-search"
					borderWidth={0}
					size={InputSizes.Normal}
					value={searchValue}
					placeholder={getText('ad.manage.countries.input.placeholder')}
					autoFocus={autoFocus}
					onChangeText={onCountryInputChange}
					returnKeyType={TRKeyboardKeys.send}
					onSubmitPressed={Keyboard.dismiss}
					blurOnSubmit={true}
				/>
				<View style={styles.textContainer}>
					<Text style={styles.allCountriesText}>
						{getText('ad.manage.countries.all.countries').toUpperCase()}
					</Text>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.listContainer}>
						{filteredCountries.map((e: any) => (
							<TouchableOpacity
								key={e.name}
								style={styles.listItem}
								onPress={() => {
									onCheckedCountry(e.name);
								}}
							>
								<Text style={styles.countryText}>{e.name}</Text>
								<CheckBox
									checked={selectedCheckList.includes(e.name) ? true : false}
									color={defaultStyles.checkboxColor}
									style={styles.checkbox}
									onPress={() => {
										onCheckedCountry(e.name);
									}}
								/>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};
