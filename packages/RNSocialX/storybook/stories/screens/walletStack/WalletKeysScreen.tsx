import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { WalletKeysScreenView } from '../../../../src/screens/walletStack/WalletKeys.view';

storiesOf('Screens/walletStack', module).add('WalletKeysScreen', () => {
	return (
		<WalletKeysScreenView
			onGoBack={action('onGoBack')}
			onFinalize={action('onFinalize')}
			onExportKeys={action('onExportKeys')}
			ownerPub="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKLJjNo/x3qgsy37kA/sFgAlcU4T+vYl
            Ggz2gliP501FTeH4MYiK+IB6sGRAzUnwrjtQPnrlw/c2K4SdLgxJTykCAwEAAQ=="
			creatorPub="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANVTgaVKr+xF+6J75cT9s8BdwIaU1EdW
            pKUXozMO/lgk+EvCd0/tcgHAtFru4ZfDX+3ncGMSSSq8M6Pht/YzUw8CAwEAAQ=="
			ownerPriv="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANVTgaVKr+xF+6J75cT9s8BdwIaU1EdW
            pKUXozMO/lgk+EvCd0/tcgHAtFru4ZfDX+3ncGMSSSq8M6Pht/YzUw8CAwEAAQ=="
			creatorPriv="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANVTgaVKr+xF+6J75cT9s8BdwIaU1EdW
            pKUXozMO/lgk+EvCd0/tcgHAtFru4ZfDX+3ncGMSSSq8M6Pht/YzUw8CAwEAAQ=="
			getText={getTextMock}
		/>
	);
});
