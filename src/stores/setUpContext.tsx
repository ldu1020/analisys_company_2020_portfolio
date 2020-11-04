/** @format */

import React from 'react';
import { createStore, TStore } from './createStore';
import { useLocalObservable, useLocalStore } from 'mobx-react';
import { autorun } from 'mobx';

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalObservable(createStore);
  autorun(() => {
    console.log(store.chosenCorpList);
  });
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
