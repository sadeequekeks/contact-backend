import * as admin from "firebase-admin";
import * as functions from "firebase-functions";


admin.initializeApp();

export const isAmin = admin.firestore();
export const https = functions.https;
export const auth = admin.auth();
export const db = admin.firestore();
export const cfTrigger = functions;

