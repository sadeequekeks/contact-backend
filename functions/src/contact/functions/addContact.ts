import {https, db, cfTrigger} from "../../settings/globals";

// adding contact
exports.addContact = https.onRequest(async (req, res)=>{
  if (req.method == "POST") {
    try {
      const {contactName, contactPhone, userId} = req.body;
      await db.collection("contacts").add({
        contactName: contactName,
        contactPhone: contactPhone,
        userId: userId,
      });
      res.status(200).json({message: "Contact add successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});

// adding contact id to the collection
exports.addContactId = cfTrigger.firestore
    .document("contacts/{contactId}")
    .onCreate((snap, context)=>{
      const contactId = context.params.contactId;
      return snap.ref.set({contactId}, {merge: true});
    });
