import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {
	AccountCurrencyData,
	PrimaryButton,
	SocialXAccountCurrencyItem,
	SocialXAccountTitleCard,
} from '../../components';
import {ITranslatedProps} from '../../types';
import styles, {borderColor} from './SocialXAccountScreen.style';

export interface ISocialXAccountScreenViewProps extends ITranslatedProps {
	myCoins: number;
	myContribution: number;
	returnPercentage: number;
	myDigitalCoins: AccountCurrencyData[];
	sendHandler: () => void;
	receiveHandler: () => void;
}

export class SocialXAccountScreenView extends Component<ISocialXAccountScreenViewProps, any> {
	public render() {
		const {getText} = this.props;

		return (
			<ScrollView style={styles.container} alwaysBounceVertical={false}>
				<SocialXAccountTitleCard
					myCoins={this.props.myCoins}
					myContribution={this.props.myContribution}
					returnPercentage={this.props.returnPercentage}
					getText={this.props.getText}
				/>
				<Text style={styles.accountTitle}>{getText('socialx.account.screen.account')}</Text>
				{this.props.myDigitalCoins.map((coin, index) => (
					<SocialXAccountCurrencyItem key={index} {...coin} />
				))}
				<View style={styles.bottomContainer}>
					<View style={styles.buttonContainer}>
						// @ts-ignore
						<PrimaryButton label={getText('button.SEND')} borderColor={borderColor} onPress={this.props.sendHandler} />
					</View>
					<View style={styles.buttonContainer}>
						// @ts-ignore
						<PrimaryButton
							label={getText('button.RECEIVE')}
							borderColor={borderColor}
							onPress={this.props.receiveHandler}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}
