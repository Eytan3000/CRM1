import { formatLeadData } from './helpers';
import _ from 'lodash';
const databaseURL =
  'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app';

const userId = 'Eytan_krief_ID';

export function insertNewLead(uid, lead, token) {
  fetch(`${databaseURL}/users/${uid}/leads.json?auth=${token}`, {
    method: 'POST',
    body: JSON.stringify(lead),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data added successfully. Auto-generated ID:', data.name);
      const updatedData = { id: data.name };
      updateObjectDB(uid, data.name, updatedData, token);
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export function loadAllLeadsCards(uid, token) {
  return fetch(`${databaseURL}/users/${uid}/leads.json?auth=${token}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export function deleteLeadFromDb(uid, id, token) {
  return fetch(`${databaseURL}/users/${uid}/leads/${id}.json?auth=${token}`, {
    method: 'DELETE',
  });
}
export function loadStagesFromDb(uid, token) {
  return fetch(`${databaseURL}/users/${uid}/stages.json?auth=${token}`).then(
    (res) => res.json()
  );
}

export function updateStageToDb(uid, newStage, token) {
  return fetch(`${databaseURL}/users/${uid}/stages.json?auth=${token}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: newStage,
    }),
  }).then((res) => res.json());
}
export function deleteStageFromDb(uid, id, token) {
  return fetch(`${databaseURL}/users/${uid}/stages/${id}.json?auth=${token}`, {
    method: 'DELETE',
  });
}
export const updateObjectDB = async (uid, objectId, updatedData, token) => {
  try {
    const response = await fetch(
      `${databaseURL}/users/${uid}/leads/${objectId}.json?auth=${token}`,
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
export function addNote(uid, leadId, note, token) {
  return fetch(
    `${databaseURL}/users/${uid}/leads/${leadId}/notes.json?auth=${token}`,
    {
      method: 'POST',
      body: JSON.stringify(note),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('note added successfully.'); //Auto-generated ID:', data.name
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}

export async function updateNote(uid, leadId, noteId, token, noteContent) {
  const updatedData = { content: noteContent };
  try {
    const response = await fetch(
      `${databaseURL}/users/${uid}/leads/${leadId}/notes/${noteId}.json?auth=${token}`,
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
      // return
    } else {
      console.error('Failed to update object');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
export function deleteNoteFromDb(uid, leadId, noteId, token) {
  return fetch(
    `${databaseURL}/users/${uid}/leads/${leadId}/notes/${noteId}.json?auth=${token}`,
    {
      method: 'DELETE',
    }
  );
}

export function loadLead(uid, leadId, token) {
  return fetch(`${databaseURL}/users/${uid}/leads/${leadId}.json?auth=${token}`)
    .then((response) => response.json())
    .then((data) => formatLeadData(data))
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export async function addNewUser(uid, email, token) {
  const newUserDetails = {
    email,
  };

  await fetch(`${databaseURL}/users/${uid}.json?auth=${token}`, {
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

  await updateStageToDb(uid, 'leadIn', token);
  await updateStageToDb(uid, 'noAnswer', token);
  await updateStageToDb(uid, 'callBack', token);
  updateStageToDb(uid, 'emailSent', token);
}

//returns an array of leads in stage
export async function fetchLeadByStage(uid, stage, token) {
  const data = await fetch(
    `${databaseURL}/users/${uid}/leads.json?auth=${token}`
  );
  const allLeads = await data.json();

  const leadsInStage = _.filter(allLeads, (data, key) => data.stage === stage);
  return leadsInStage;
}
