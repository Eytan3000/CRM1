import React from 'react';
import { insertNewLead } from '../helpers/dbFunctions';

export const addLeadToDBContext = React.createContext();

export function DbFunctionsProvider({ children }) {
  function addLeadToDB(lead) {
    insertNewLead(lead);
  }
  return (
    <addLeadToDBContext.Provider value={addLeadToDB}>
      {children}
    </addLeadToDBContext.Provider>
  );
}
