// import admin from 'firebase-admin';

// const db  = admin.firestore();

// async function getUserData(userId: any) {
//   try {
//     const userDocRef = db.collection('users').doc(userId);
//     const doc = await userDocRef.get();

//     if (!doc.exists) {
//       console.log('No such document!');
//       return null;
//     } else {
//       console.log('Document data:', doc.data());
//       return doc.data();
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return null;
//   }
// }

// const db = admin.database();

// async function getUserProfile(userId) {
//   try {
//     const userRef = db.ref(`users/${userId}`);

//     // Read the data once
//     const snapshot = await userRef.once('value');
    
//     if (snapshot.exists()) {
//       const userData = snapshot.val();
//       console.log('User data:', userData);
//       return userData;
//     } else {
//       console.log('No data available for this user.');
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// }
