import { initializeApp } from 'firebase/app';
import {
  FieldPath,
  FieldValue,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

//----------------------------------------------------------

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBUjDRbNol-XzWCSVEPkl6VB-15gJI4oTM',
//   authDomain: 'mycrm-a7912.firebaseapp.com',
//   databaseURL:
//     'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'mycrm-a7912',
//   storageBucket: 'mycrm-a7912.appspot.com',
//   messagingSenderId: '921120278026',
//   appId: '1:921120278026:web:b33d9ef0a4bfcc8f7081f3',
// };

// Initialize Firebase app
// const app = initializeApp(firebaseConfig);

//init service
// const db = getFirestore();

// Emulator
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// collection ref
// const colRef = collection(db, 'boards');

//get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let boards = [];
//     snapshot.docs.forEach((doc) => {
//       boards.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(boards);
//   })
//   .catch((err) => console.log(err));

// Add Document

// // Deleting Document (by id)
// const docRef = doc(db, 'boards', '93KvjueAJWlhSdMtqcJV');
// deleteDoc(docRef);
//-------------
const lead0 = {
  name: 'eytan0',
  phone: '0508657032',
  email: 'eytankrief@gmail.com',
};
const lead1 = {
  name: 'eytan1',
  phone: '0508657032',
  email: 'eytankrief@gmail.com',
  notes: [
    {
      id: '0',
      note: 'lorem',
    },
  ],
};
const lead2 = {
  name: 'eytan2',
  phone: '0508657032',
  email: 'eytankrief@gmail.com',
  notes: [
    {
      id: '0',
      note: 'lorem2',
    },
  ],
};

//----------------------------------------------------------
//--FINALS--------------------------------------------------

//add new lead to stage
// export async function addLeadToStage(userId, board, stage, leadToAdd) {
//   const document = await doc(db, 'users', userId);
//   const path = `boards.${board}.stages.${stage}`;

//   await updateDoc(document, {
//     [path]: arrayUnion(leadToAdd),
//   });
// }
// addLeadToStage('8KxCLYupCv5jHY7BIWFd', 'mainBoard', 'noAnswer', lead2);
//-----

//Delete lead from stage
// export async function removeLeadFromStage(userId, board, stage, leadToRemove) {
//   const document = await doc(db, 'users', userId);
//   const path = `boards.${board}.stages.${stage}`;

//   await updateDoc(document, {
//     [path]: arrayRemove(leadToRemove),
//   });
// }
// removeLeadFromStage('8KxCLYupCv5jHY7BIWFd', 'mainBoard', 'leadIn', lead1);
//-----
// Get lead

// Add Stage -
// export async function addStage(userId, board, stageToAdd) {
//   const document = await doc(db, 'users', userId);
//   const path = `boards.${board}.stages.${stageToAdd}`;

//   // adding stage with empty string (this is the only way i found without fetching the whole stages map)
//   await updateDoc(document, {
//     [path]: arrayUnion(''),
//   });
//   //removeing empty string
//   await updateDoc(document, {
//     [path]: arrayRemove(''),
//   });
// }
// addStage('8KxCLYupCv5jHY7BIWFd', 'mainBoard', 'noAnswer');
//-----

// delete stage
// export async function removeFieldFromMap(userId, board, stageToRemove) {
//   const documentRef = doc(db, 'users', userId);
//   const path = `boards.${board}.stages.${stageToRemove}`;

//   await updateDoc(documentRef, {
//     [path]: deleteField(),
//   });
// }
// removeFieldFromMap('8KxCLYupCv5jHY7BIWFd', 'mainBoard', 'noAnswer');
//-----

// add new note (מוחק את כל הליד)
// export async function addNote(userId, board, stage, leadIndex, noteToAdd) {
//   const document = await doc(db, 'users', userId);
//   const path = `boards.${board}.stages.${stage}.${leadIndex}.notes`;

//   await updateDoc(document, {
//     [path]: arrayUnion(noteToAdd),
//   });
// }
// addNote('8KxCLYupCv5jHY7BIWFd', 'mainBoard', 'noAnswer', '0', {
//   id: 90,
//   note: 'lorem90',
// });
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------

// init

// export async function DBinit() {
//   const colRef = collection(db, 'users');
//   const doc = await addDoc(colRef, {
//     stages: [
//       {
//         id: 0,
//         name: 'leadIn2',
//       },
//       {
//         id: 1,
//         name: 'noAnswer',
//       },
//       {
//         id: 2,
//         name: 'callBack',
//       },
//     ],
//     leads: [],
//     boards: [
//       {
//         id: 0,
//         name: 'mainPipelines',
//       },
//     ],
//   });

//   return doc.id;
// }

// ADD -----------------------------------------------------

// // Add new stage
// export async function addStage(userId, stage) {
//   const document = await doc(db, 'users', userId);
//   const path = `stages`;

//   await updateDoc(document, {
//     [path]: arrayUnion(stage),
//   });
// }

// // Add new stage
// export async function addLead(userId, lead) {
//   const document = await doc(db, 'users', userId);
//   const path = `leads`;

//   await updateDoc(document, {
//     [path]: arrayUnion(lead),
//   });
// }
// // Update Lead
// export async function updateLead(userId, leadIndex, leadToUpdate) {
//   const document = await doc(db, 'users', userId);
//   const path = `leads`;

//   await updateDoc(document, {
//     [path]: arrayUnion(leadToUpdate),
//   });
// }

// /// Functions call:

// const lead00 = {
//   name: 'eytan krief',
//   email: 'eytankrief@gmail.com',
//   notes: [{ noteId: 0, note: 'lorem yoel 1' }],
// };
// const lead01 = {
//   name: 'Yoel krief',
//   email: 'Yoel@gmail.com',
//   notes: [{ noteId: 0, note: 'lorem yoel 1' }],
// };

// firebase Functions Calls
// DBinit().then((res) => console.log(res));

// addStage('brqprHk8Cto4jx3F4om8', {
//   id: 3,
//   name: 'newOne',
// });

// addLead('brqprHk8Cto4jx3F4om8', {
//   name: 'yoel krief',
//   email: 'orayn@gmail.com',
//   notes: [],
// });

// updateLead('brqprHk8Cto4jx3F4om8', 0, lead0);