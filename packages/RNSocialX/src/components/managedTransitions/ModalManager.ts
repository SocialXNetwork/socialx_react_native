// TODO: @Serkan -> later review usage of this class and its static methods

export class ModalManager {
	public static toggleModalShow(visible: boolean) {
		if (!visible && ModalManager.afterModalClosedHandler !== null) {
			ModalManager.afterModalClosedHandler();
			ModalManager.afterModalClosedHandler = null;
		}
	}

	public static safeRunAfterModalClosed(handler: () => void) {
		ModalManager.afterModalClosedHandler = handler;
	}

	private static afterModalClosedHandler: (() => void) | null = null;
}
