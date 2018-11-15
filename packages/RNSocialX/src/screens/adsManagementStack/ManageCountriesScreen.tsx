/*
 *	TODO:
 *	1. onFetchCountries: Countries List should come from the backend (it would be nice to have a list with name of the country and flag)
 *	2. onSaveCountries: should save the checkedCountriesList to the backend, along with the Ad Object.
 */

import * as React from 'react';

import { INavigationProps } from '../../types';
import { ManageCountriesScreenView } from './ManageCountriesScreen.view';

import {
	IWithManageCountriesEnhancedActions,
	IWithManageCountriesEnhancedData,
	WithManageCountries,
} from '../../enhancers/screens';

type IManageCountriesScreenProps = INavigationProps &
	IWithManageCountriesEnhancedActions &
	IWithManageCountriesEnhancedData;

interface IManageCountriesScreenState {
	countriesList: object[];
	searchValue: string;
	selectedCheckList: string[];
}

class Screen extends React.Component<IManageCountriesScreenProps, IManageCountriesScreenState> {
	public state = {
		countriesList: [
			{
				name: '',
			},
		],
		searchValue: '',
		selectedCheckList: [] as string[],
	};

	constructor(props: IManageCountriesScreenProps) {
		super(props);

		this.onFetchCountries();
	}

	public render() {
		const { navigation, getText } = this.props;
		const { countriesList, selectedCheckList, searchValue } = this.state;

		return (
			<ManageCountriesScreenView
				onGoBack={() => this.onGoBackHandler(navigation)}
				getText={getText}
				countriesList={countriesList}
				autoFocus={true}
				searchValue={searchValue}
				onCountryInputChange={this.onCountryInputChange}
				onCheckedCountry={this.onCheckedCountry}
				selectedCheckList={selectedCheckList}
				onSaveCountriesList={this.onSaveSelectedCountriesHandler}
			/>
		);
	}

	private onGoBackHandler = (navigation: any) => {
		navigation.goBack(null);
	};

	private onFetchCountries = async () => {
		const countries = await fetch('https://restcountries.eu/rest/v2/all?fields=name')
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
			});

		this.setState({ countriesList: countries });
	};

	private onCountryInputChange = (value: string) => {
		this.setState({ searchValue: value });
	};

	private onCheckedCountry = (value: string) => {
		const { selectedCheckList } = this.state;

		const newList = selectedCheckList;

		if (newList.includes(value)) {
			newList.splice(newList.indexOf(value), 1);
		} else {
			newList.push(value);
		}

		this.setState({ selectedCheckList: newList });
	};

	private onSaveSelectedCountriesHandler = () => {
		this.props.onSaveCountries(this.state.selectedCheckList);
	};
}

export const ManageCountriesScreen = (navProps: INavigationProps) => (
	<WithManageCountries>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithManageCountries>
);
