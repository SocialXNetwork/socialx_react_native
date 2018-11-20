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
	isOnFirstStep: boolean;
	isOnLastStep: boolean;
	onGoToNextStep: () => void;
	onGoToPreviousStep: () => void;
}

export const CreateAdSteps: React.SFC<ICreateAdStepsProps> = ({
	currentStep,
	onGoToNextStep,
	onGoToPreviousStep,
	isOnFirstStep,
	isOnLastStep,
}) => (
	<SafeAreaView style={styles.container} forceInset={{ top: 'never', bottom: 'always' }}>
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
							style={[styles.stepIcon, currentStep === step.name ? styles.stepIconSelected : {}]}
						/>
					</View>
					{!(index === STEPS_CONFIG.length - 1) && <View style={styles.connectorView} />}
				</React.Fragment>
			))}
			{!isOnFirstStep && (
				<View style={styles.backIconContainer}>
					<TouchableOpacity onPress={onGoToPreviousStep}>
						<Icon name="ios-arrow-back" style={styles.backIcon} />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.nextIconContainer}>
				<TouchableOpacity onPress={onGoToNextStep}>
					<Icon
						name={isOnLastStep ? 'md-checkmark' : 'ios-arrow-forward'}
						style={styles.nextIcon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	</SafeAreaView>
);
