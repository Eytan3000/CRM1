import { formatLeadData } from './helpers';

const databaseURL =
  'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app/';

const userId = '';

export function insertNewLead(lead) {
  fetch(`${databaseURL}/users/${userId}/leads.json`, {
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
export function loadAllLeadsCards() {
  return fetch(`${databaseURL}/users/${userId}/leads.json`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
export function deleteLeadFromDb(id) {
  return fetch(`${databaseURL}/users/${userId}/leads/${id}.json`, {
    method: 'DELETE',
  });
}
export function loadStagesFromDb() {
  return fetch(`${databaseURL}/users/${userId}/stages.json`).then((res) =>
    res.json()
  );
}
export function updateStageToDb(newStage) {
  return fetch(`${databaseURL}/users/${userId}/stages.json`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: newStage,
    }),
  }).then((res) => res.json());
}
export function deleteStageFromDb(id) {
  return fetch(`${databaseURL}/users/${userId}/stages/${id}.json`, {
    method: 'DELETE',
  });
}
export const updateObjectDB = async (objectId, updatedData) => {
  try {
    const response = await fetch(
      `${databaseURL}/users/${userId}/leads/${objectId}.json`,
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

export function addNote(leadId, note) {
  return fetch(`${databaseURL}/users/${userId}/leads/${leadId}/notes.json`, {
    method: 'POST',
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('note added successfully. Auto-generated ID:', data.name);
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}

export function deleteNoteFromDb(leadId, noteId) {
  return fetch(
    `${databaseURL}/users/${userId}/leads/${leadId}/notes/${noteId}.json`,
    {
      method: 'DELETE',
    }
  );
}

export function loadLead(leadId) {
  return fetch(`${databaseURL}/users/${userId}/leads/${leadId}.json`)
    .then((response) => response.json())
    .then((data) => formatLeadData(data))
    .catch((error) => {
      console.error('Error adding data:', error);
    });
}
//-------------------
export async function addNewUser(uid, email) {
  const newUserDetails = {
    email,
    stages: {},
  };

  await fetch(`${databaseURL}/users/${uid}.json`, {
    method: 'PUT',
    body: JSON.stringify(newUserDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('User added successfully. Auto-generated user ID:', uid);
    })
    .catch((error) => {
      console.error('Error adding data:', error);
    });

  await updateStageToDb('leadIn');
  await updateStageToDb('noAnswer');
  await updateStageToDb('callBack');
  updateStageToDb('emailSent');
}
