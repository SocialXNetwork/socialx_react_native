import * as React from 'react';

import { ITranslatedProps } from '../../types';
import {
	INewAdSetupAudienceData,
	NewAdSetupAudienceView,
} from './NewAdSetupAudience.view';

interface INewAdSetupAudienceProps extends ITranslatedProps {
	updateAdSetAudience: (audienceData: INewAdSetupAudienceData) => void;
	adSetupAudienceFormik: React.RefObject<any>;
}

export const NewAdSetupAudience: React.SFC<INewAdSetupAudienceProps> = ({
	updateAdSetAudience,
	getText,
	adSetupAudienceFormik,
}) => (
	<NewAdSetupAudienceView
		getText={getText}
		updateAdSetAudience={updateAdSetAudience}
		adSetupAudienceFormik={adSetupAudienceFormik}
	/>
);
