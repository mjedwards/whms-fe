import React from 'react';
import { throwError } from '../throw-error';
import { __DEV__ } from '../env';

export function createContext<ContextType>(displayName: string) {
  const Context = React.createContext<ContextType>(null!);

  if (__DEV__) Context.displayName = displayName;

  function useContext() {
    const context = React.useContext(Context);

    if (!context) throwError('UseContextError', 'You can not use context outside its Provider component', useContext);

    return context;
  }

  return [Context.Provider, useContext, Context.Consumer, Context.displayName] as const;