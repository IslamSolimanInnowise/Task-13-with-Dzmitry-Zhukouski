import { useReactiveVar } from '@apollo/client';

import { dialogVar } from './dialogService';

export const DialogsContainer = () => {
  const dialogs = useReactiveVar(dialogVar);

  return (
    <>
      {dialogs.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </>
  );
};
