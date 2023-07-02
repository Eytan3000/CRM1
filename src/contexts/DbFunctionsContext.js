import React from 'react';
import {
  insertNewLead,
  loadAllLeadsCards,
  loadStagesFromDb,
  updateStageToDb,
} from '../helpers/dbFunctions';

export const addLeadToDBContext = React.createContext();
export const loadCards = React.createContext();
export const loadStagesContext = React.createContext();
export const loadLeadContext = React.createContext();

export function DbFunctionsProvider({ children }) {
  // const [leadsCards, setLeadsCards] = useState([]);

  function addLeadToDB(lead) {
    insertNewLead(lead);
  }

  //returns title and phone for Cards
  async function loadCardsContent() {
    try {
      const data = await loadAllLeadsCards();
      const leadsCardArr = data.map((lead) => {
        const titleVal =
          lead.companyName !== ''
            ? `${lead.name} / ${lead.companyName}`
            : lead.name;
        return {
          id: lead.id,
          title: titleVal,
          stage: lead.stage,
          phone: lead.phone,
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
      const stagesArr = data.map((stage) => {
        return {
          id: stage.id,
          name: stage.name,
        };
      });

      return stagesArr;
    } catch (err) {
      console.log(err);
    }
  }

  async function loadLead(LeadId) {
    try {
      const data = await loadAllLeadsCards();
      const lead = data.find((lead) => lead.id === LeadId); //returns only the lead with the right id.
      return lead;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <addLeadToDBContext.Provider value={addLeadToDB}>
      <loadCards.Provider value={loadCardsContent}>
        <loadStagesContext.Provider value={loadStages}>
          <loadLeadContext.Provider value={loadLead}>
            {children}
          </loadLeadContext.Provider>
        </loadStagesContext.Provider>
      </loadCards.Provider>
    </addLeadToDBContext.Provider>
  );
}
