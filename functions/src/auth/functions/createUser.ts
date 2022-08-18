import {auth, https, db} from "../../settings/globals";


exports.createUser = https.onRequest(async (req, res)=>{
  if (req.method == "POST") {
    const {email, password, firstName, lastName} = req.body;
    const user = await auth.createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${lastName}`,
    });
    if (user == undefined) {
      res.status(500).json({message: "Cannot create user"});
    } else {
      await db.collection("users").doc(user.uid).set({
        userId: user.uid,
        first_name: firstName,
        last_name: lastName,
        email: user.email,
      });
      res.status(200).json({message: "User created successfully"});
    }
  } else {
    res.status(500).json({message: "Method not allowed"});
  }
});
