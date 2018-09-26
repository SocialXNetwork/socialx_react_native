import numeral from 'numeral';
import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ITranslatedProps } from '../../types';
import styles, { customStyles } from './SocialXAccountTitleCard.style';

export interface ISocialXAccountTitleCardProps extends ITranslatedProps {
	myCoins: number;
	myContribution: number;
	returnPercentage: number;
}

export const SocialXAccountTitleCard: React.SFC<
	ISocialXAccountTitleCardProps
> = (props) => (
	<View style={styles.container}>
		<Text style={styles.myCoinsValue}>
			{'SOCX '}
			{numeral(props.myCoins).format('0,0')}
		</Text>
		<View style={styles.secondLine}>
			<View>
				<Text style={styles.opacityGrayText}>
					{props.getText('socialx.account.title.card.contribution')}
				</Text>
				<Text style={styles.myContribution}>
					{'SOCX '}
					{numeral(props.myContribution).format('0,0')}
				</Text>
			</View>
			<View style={styles.spacer}>
				<View style={styles.spacerLine} />
			</View>
			<View>
				<Text style={styles.opacityGrayText}>
					{props.getText('socialx.account.title.card.return')}
				</Text>
				<View style={styles.secondLineRight}>
					<Icon
						name={'md-trending-up'}
						size={customStyles.iconSize}
						color={customStyles.iconColor}
					/>
					<Text style={styles.returnPercentage}>
						{props.returnPercentage}
						{'%'}
					</Text>
				</View>
			</View>
		</View>
	</View>
);
