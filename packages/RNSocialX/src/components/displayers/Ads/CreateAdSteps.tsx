import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-navigation';
import { ICreateAdSteps } from '../../../types';
import styles from './CreateAdSteps.style';

const STEPS_CONFIG = [
	{ icon: 'ios-create', name: ICreateAdSteps.SetupPost },
	{ icon: 'md-people', name: ICreateAdSteps.SetupAudience },
	{ icon: 'ios-card', name: ICreateAdSteps.SetupBudget },
];

interface ICreateAdStepsProps {
	currentStep: ICreateAdSteps;
	onGoToNextStep: () => void;
}

export const CreateAdSteps: React.SFC<ICreateAdStepsProps> = ({
	currentStep,
	onGoToNextStep,
}) => (
	<SafeAreaView
		style={styles.container}
		forceInset={{ top: 'never', bottom: 'always' }}
	>
		<View style={styles.content}>
			{STEPS_CONFIG.map((step, index: number) => (
				<React.Fragment key={step.name}>
					<View
						style={[
							styles.iconContainer,
							currentStep === step.name ? styles.iconContainerSelected : {},
						]}
					>
						<Icon
							name={step.icon}
							style={[
								styles.stepIcon,
								currentStep === step.name ? styles.stepIconSelected : {},
							]}
						/>
					</View>
					{!(index === STEPS_CONFIG.length - 1) && (
						<View style={styles.connectorView} />
					)}
				</React.Fragment>
			))}
			<View style={styles.nextIconContainer}>
				<TouchableOpacity onPress={onGoToNextStep}>
					<Icon name={'ios-arrow-forward'} style={styles.nextIcon} />
				</TouchableOpacity>
			</View>
		</View>
	</SafeAreaView>
);
