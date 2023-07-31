import { formatLeadData } from './helpers';
import _ from 'lodash';
const databaseURL =
  'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app/';

const userId = 'Eytan_krief_ID';

export function insertNewLead(uid, lead) {
  fetch(`${databaseURL}/users/${uid}/leads.json`, {
    method: 'POST',
    body: JSON.stringify(lead),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data added successfully. Auto-generated ID:', data.name);
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export function loadAllLeadsCards(uid) {
  return fetch(`${databaseURL}/users/${uid}/leads.json`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export function deleteLeadFromDb(uid, id) {
  return fetch(`${databaseURL}/users/${uid}/leads/${id}.json`, {
    method: 'DELETE',
  });
}
export function loadStagesFromDb(uid) {
  return fetch(`${databaseURL}/users/${uid}/stages.json`).then((res) =>
    res.json()
  );
}
export function updateStageToDb(uid, newStage) {
  return fetch(`${databaseURL}/users/${uid}/stages.json`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: newStage,
    }),
  }).then((res) => res.json());
}
export function deleteStageFromDb(uid, id) {
  return fetch(`${databaseURL}/users/${uid}/stages/${id}.json`, {
    method: 'DELETE',
  });
}
export const updateObjectDB = async (uid, objectId, updatedData) => {
  try {
    const response = await fetch(
      `${databaseURL}/users/${uid}/leads/${objectId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      console.log('Object updated successfully');
    } else {
      console.error('Failed to update object');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
export function addNote(uid, leadId, note) {
  return fetch(`${databaseURL}/users/${uid}/leads/${leadId}/notes.json`, {
    method: 'POST',
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('note added successfully.'); //Auto-generated ID:', data.name
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}

export function deleteNoteFromDb(uid, leadId, noteId) {
  return fetch(
    `${databaseURL}/users/${uid}/leads/${leadId}/notes/${noteId}.json`,
    {
      method: 'DELETE',
    }
  );
}

export function loadLead(uid, leadId) {
  return fetch(`${databaseURL}/users/${uid}/leads/${leadId}.json`)
    .then((response) => response.json())
    .then((data) => formatLeadData(data))
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export async function addNewUser(uid, email) {
  const newUserDetails = {
    email,
  };

  await fetch(`${databaseURL}/users/${uid}.json`, {
    method: 'PUT',
    body: JSON.stringify(newUserDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('User added successfully.'); //Auto-generated user ID:', uid
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });

  await updateStageToDb(uid, 'leadIn');
  await updateStageToDb(uid, 'noAnswer');
  await updateStageToDb(uid, 'callBack');
  updateStageToDb(uid, 'emailSent');
}

//returns an array of leads in stage
export async function fetchLeadByStage(uid, stage) {
  const data = await fetch(`${databaseURL}/users/${uid}/leads.json`);
  const allLeads = await data.json();

  const leadsInStage = _.filter(allLeads, (data, key) => data.stage === stage);
  return leadsInStage;
  // console.log(leadsInStage);
}
// fetchLeadByStage(userId, 'leadIn');
