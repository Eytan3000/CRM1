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
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
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
  const [loading, setLoading] = useState(true);

  // ---Authentication sign in-----
  const [currentUser, setCurrentUser] = useState();
  // signin user
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  // login user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout(email, password) {
    return signOut(auth, email, password);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function updateEmailCtx(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updatePasswordCtx(password) {
    return updatePassword(currentUser, password);
  }

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribed;
  }, []);
  //auth context value
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailCtx,
    updatePasswordCtx,
  };
  //------------------------------
  function addLeadToDB(lead) {
    insertNewLead(currentUser.uid, lead, currentUser.accessToken);
  }

  async function loadCardsContent() {
    try {
      const data = await loadAllLeadsCards(
        currentUser.uid,
        currentUser.accessToken
      );
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
      const data = await loadStagesFromDb(
        currentUser.uid,
        currentUser.accessToken
      );
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
  async function loadLeadCtx(LeadId) {
    try {
      const data = await loadAllLeadsCards(
        currentUser.uid,
        currentUser.accessToken
      );
      return data[LeadId];
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <addLeadToDBContext.Provider value={addLeadToDB}>
      <loadCards.Provider value={loadCardsContent}>
        <loadStagesContext.Provider value={loadStages}>
          <loadLeadContext.Provider value={loadLeadCtx}>
            <renderContext.Provider value={{ reRender, setRerender }}>
              <layoutNameContext.Provider value={{ layoutName, setLayoutName }}>
                <stageStateContext.Provider value={{ stageState }}>
                  <dndDataContext.Provider value={{ dndData, setDndData }}>
                    <AuthContext.Provider value={value}>
                      {!loading && children}
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
