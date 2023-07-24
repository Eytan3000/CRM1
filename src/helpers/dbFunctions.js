const databaseURL =
  'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app/';

const userId = 'Eytan_krief_ID';

// export function insertNewLead_JsonServer_(lead) {
//   fetch('http://localhost:8000/leads', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(lead),
//   }).catch((err) => console.log(err));
// }
// export function loadAllLeadsCards_JsonServer_() {
//   return fetch('http://localhost:8000/leads').then((res) => res.json());
// }
// export function deleteLeadFromDb_JsonServer_(id) {
//   fetch('http://localhost:8000/leads/' + id, {
//     method: 'DELETE',
//   });
// }
// export function deleteNoteFromDb(leadId) {
//   // You cant change specific values from within a database object, so that would be a function for a real database. for now all you can do is to change the entire lead.
// }

// export function updateStageToDb(newStage) {
//   return fetch('http://localhost:8000/stages', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify({
//       name: newStage,
//     }),
//   }).then((res) => res.json());
// }
// export function loadStagesFromDb() {
//   return fetch('http://localhost:8000/stages').then((res) => res.json());
// }
// export function deleteStageFromDb(id) {
//   fetch('http://localhost:8000/stages/' + id, {
//     method: 'DELETE',
//   });
// }
// export const updateObjectDB = async (objectId, updatedData) => {
//   try {
//     const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (response.ok) {
//       console.log('Object updated successfully');
//     } else {
//       console.error('Failed to update object');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
//------------------------------------------
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
  fetch(`${databaseURL}/users/${userId}/leads/${leadId}/notes.json`, {
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
