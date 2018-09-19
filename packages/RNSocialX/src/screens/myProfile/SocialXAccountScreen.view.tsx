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
	coins: number;
	contribution: number;
	returnPercentage: number;
	digitalCoins: AccountCurrencyData[];
	sendHandler: () => void;
	receiveHandler: () => void;
}

export class SocialXAccountScreenView extends Component<ISocialXAccountScreenViewProps, any> {
	public render() {
		const {getText} = this.props;

		return (
			<ScrollView style={styles.container} alwaysBounceVertical={false}>
				<SocialXAccountTitleCard
					myCoins={this.props.coins}
					myContribution={this.props.contribution}
					returnPercentage={this.props.returnPercentage}
					getText={this.props.getText}
				/>
				<Text style={styles.accountTitle}>{getText('socialx.account.screen.account')}</Text>
				{this.props.digitalCoins.map((coin, index) => (
					<SocialXAccountCurrencyItem key={index} {...coin} />
				))}
				<View style={styles.bottomContainer}>
					<View style={styles.buttonContainer}>
						{
							// @ts-ignore
							<PrimaryButton
								label={getText('button.SEND')}
								borderColor={borderColor}
								onPress={this.props.sendHandler}
							/>
						}
					</View>
					<View style={styles.buttonContainer}>
						{
							// @ts-ignore
							<PrimaryButton
								label={getText('button.RECEIVE')}
								borderColor={borderColor}
								onPress={this.props.receiveHandler}
							/>
						}
					</View>
				</View>
			</ScrollView>
		);
	}
}
