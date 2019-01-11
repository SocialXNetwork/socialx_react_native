import * as React from 'react';

import { IAdSetupAudienceData, ITranslatedProps } from '../../types';
import { NewAdSetupAudienceView } from './NewAdSetupAudience.view';

interface INewAdSetupAudienceProps extends ITranslatedProps {
	updateAdSetAudience: (audienceData: IAdSetupAudienceData) => void;
	adSetupAudienceFormik: React.RefObject<any>;
	onMultiSliderChange: (isStarting: boolean) => void;
	onManageCountries: () => void;
	onAgeRangeHandler: (values: number[]) => void;
	minAgeRange: number;
	maxAgeRange: number;
	estimatedReach: string;
}

export const NewAdSetupAudience: React.SFC<INewAdSetupAudienceProps> = ({
	updateAdSetAudience,
	getText,
	adSetupAudienceFormik,
	onMultiSliderChange,
	onAgeRangeHandler,
	onManageCountries,
	minAgeRange,
	maxAgeRange,
	estimatedReach,
}) => (
	<NewAdSetupAudienceView
		getText={getText}
		updateAdSetAudience={updateAdSetAudience}
		adSetupAudienceFormik={adSetupAudienceFormik}
		onMultiSliderChange={onMultiSliderChange}
		onAgeRangeHandler={onAgeRangeHandler}
		onManageCountries={onManageCountries}
		minAgeRange={minAgeRange}
		maxAgeRange={maxAgeRange}
		estimatedReach={estimatedReach}
	/>
);
