import React, { useContext, useEffect, useState } from 'react';
import {
  insertNewLead,
  loadAllLeadsCards,
  loadStagesFromDb,
} from '../helpers/dbFunctions';
import _ from 'lodash';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
//------------------------------------------------

export const addLeadToDBContext = React.createContext();
export const loadCards = React.createContext();
export const loadStagesContext = React.createContext();
export const loadLeadContext = React.createContext();
export const renderContext = React.createContext();
export const layoutNameContext = React.createContext();
export const stageStateContext = React.createContext();
export const dndDataContext = React.createContext();

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

//------------------------------------------------
export function DbFunctionsProvider({ children }) {
  // const [leadsCards, setLeadsCards] = useState([]);
  const [reRender, setRerender] = useState(true);
  const [layoutName, setLayoutName] = useState('Main Pipeline');
  const [stageState, setStageState] = useState([]);
  const [dndData, setDndData] = useState([]);

  // ---Authentication sign in-----
  const [currentUser, setCurrentUser] = useState();

  // signin user
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribed;
  }, []);
  //auth context value
  const value = {
    currentUser,
    signup,
    login,
  };
  //------------------------------
  function addLeadToDB(lead) {
    insertNewLead(lead);
  }

  async function loadCardsContent() {
    try {
      const data = await loadAllLeadsCards();
      const leadsCardArr = _.map(data, (data, key) => {
        return {
          id: key,
          title: data.name,
          stage: data.stage,
          phone: data.phone,
          company: data.companyName,
        };
      });

      return leadsCardArr;
    } catch (err) {
      console.log(err);
    }
  }

  async function loadStages() {
    try {
      const data = await loadStagesFromDb();
      const stagesArr = _.map(data, (data, key) => {
        return {
          id: key,
          name: data.name,
        };
      });

      setStageState(stagesArr);
      return stagesArr;
    } catch (err) {
      console.log(err);
    }
  }
  async function loadLead(LeadId) {
    try {
      const data = await loadAllLeadsCards();
      return data[LeadId];
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <addLeadToDBContext.Provider value={addLeadToDB}>
      <loadCards.Provider value={loadCardsContent}>
        <loadStagesContext.Provider value={loadStages}>
          <loadLeadContext.Provider value={loadLead}>
            <renderContext.Provider value={{ reRender, setRerender }}>
              <layoutNameContext.Provider value={{ layoutName, setLayoutName }}>
                <stageStateContext.Provider value={{ stageState }}>
                  <dndDataContext.Provider value={{ dndData, setDndData }}>
                    <AuthContext.Provider value={value}>
                      {children}
                    </AuthContext.Provider>
                    ;
                  </dndDataContext.Provider>
                </stageStateContext.Provider>
              </layoutNameContext.Provider>
            </renderContext.Provider>
          </loadLeadContext.Provider>
        </loadStagesContext.Provider>
      </loadCards.Provider>
    </addLeadToDBContext.Provider>
  );
}
