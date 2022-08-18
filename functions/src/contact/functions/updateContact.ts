import {https, db} from "../../settings/globals";


exports.updateContact = https.onRequest(async (req, res)=>{
  if (req.method == "POST") {
    try {
      const {contactId, contactName, contactPhone} = req.body;
      await db.collection("contacts").doc(contactId).update({
        contactName: contactName,
        contactPhone: contactPhone,
      });
      res.status(200).json({message: "Update contact successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});
