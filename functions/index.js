const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

firestore.settings({ timestampsInSnapshots: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.getAllPost = functions.https.onRequest(async (req, res) => {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json({ posts });
});

exports.sanitizeContent = functions.firestore
  .document("post/{postId}")
  .onWrite(async change => {
    // Delete
    if (!change.after.exists) return;

    const { content, sanitized } = change.after.data();

    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, "*********"),
        sanitized: true
      });
    }
    return null;
  });
