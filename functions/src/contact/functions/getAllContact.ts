import {https, db} from "../../settings/globals";


exports.getAllContact = https.onRequest(async (req, res)=>{
  if (req.method == "GET") {
    try {
      const userId = req.query.uid;
      await db.collection("contacts")
          .where("userId", "==", userId)
          .get()
          .then(
              (value) => {
                const result: FirebaseFirestore.DocumentData[] = [];
                value.forEach((snapshot)=>{
                  result.push(snapshot.data());
                });
                res.status(200).send(result);
              }
          );
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});


