import { FC, useCallback, useMemo, useRef } from 'react';
import { v4 } from 'uuid';

import { closeDialog, openDialog } from './dialogService';

export const createDialogHook = <T extends { onClose?: () => void }>(
  Component: FC<T>,
) => {
  Component.displayName = Component.name || 'DialogComponent';

  return function useDialog() {
    const idRef = useRef<string | undefined>(undefined);

    const handleClose = useCallback(() => {
      if (idRef.current) {
        closeDialog(idRef.current);
      }
    }, []);

    const memoComponent = useMemo(
      () => (props?: Omit<T, 'onClose'>) => () =>
        Component({
          ...props,
          onClose: handleClose,
        } as T) as React.ReactElement,
      [handleClose],
    );

    const handleOpen = useCallback(
      (props?: Omit<T, 'onClose'>) => {
        idRef.current = v4();
        openDialog(idRef.current, memoComponent(props));
      },
      [memoComponent],
    );

    return [handleOpen, handleClose] as const;
  };
};
