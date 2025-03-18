import { makeVar } from '@apollo/client';
import { JSX } from 'react';

type DialogType = {
  id: string;
  Component: () => JSX.Element;
};

export const dialogVar = makeVar<DialogType[]>([]);

export const openDialog = (id: string, Component: () => JSX.Element) => {
  document.documentElement.style.overflow = 'hidden';
  dialogVar([...dialogVar(), { id, Component }]);
};

export const closeDialog = (id: string) => {
  const dialogs = dialogVar().filter((dialog) => dialog.id !== id);

  if (dialogs.length === 0) {
    document.documentElement.style.overflow = 'auto';
  }

  dialogVar(dialogs);
};

export const closeAllDialogs = () => {
  document.documentElement.style.overflow = 'auto';
  dialogVar([]);
};
