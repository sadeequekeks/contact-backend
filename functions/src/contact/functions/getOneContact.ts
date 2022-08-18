import {https, db} from "../../settings/globals";


exports.getOneContact = https.onRequest(async (req, res)=>{
  if (req.method == "GET") {
    try {
      const contactId = req.query.conId;
      const snapshot = await db.doc(`contacts/${contactId}`).get();
      const data = snapshot.data();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});
