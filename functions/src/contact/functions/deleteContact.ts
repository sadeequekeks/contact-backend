import {https, db} from "../../settings/globals";


exports.deleteContact = https.onRequest(async (req, res)=>{
  if (req.method == "DELETE") {
    try {
      const {contactId} = req.body;
      await db.collection("contacts").doc(contactId).delete();
      res.status(200).json({message: "Contact deleted successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});
