import * as React from 'react';

import { IAdSetupAudienceData, ITranslatedProps } from '../../types';
import { NewAdSetupAudienceView } from './NewAdSetupAudience.view';

interface INewAdSetupAudienceProps extends ITranslatedProps {
	updateAdSetAudience: (audienceData: IAdSetupAudienceData) => void;
	adSetupAudienceFormik: React.RefObject<any>;
	onMultiSliderChange: (isStarting: boolean) => void;
}

export const NewAdSetupAudience: React.SFC<INewAdSetupAudienceProps> = ({
	updateAdSetAudience,
	getText,
	adSetupAudienceFormik,
	onMultiSliderChange,
}) => (
	<NewAdSetupAudienceView
		getText={getText}
		updateAdSetAudience={updateAdSetAudience}
		adSetupAudienceFormik={adSetupAudienceFormik}
		onMultiSliderChange={onMultiSliderChange}
	/>
);
