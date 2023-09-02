import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import cookie from "cookie";
import CryptoJS from "crypto-js";
const key = "e8NjIshxJVGbsM4NSSL5brg8pkCFj37I";

export const decryptToken = () => {
	if (document.cookie)
		return JSON.parse(
			CryptoJS.AES.decrypt(
				cookie.parse(document.cookie)["authCookie"],
				key
			).toString(CryptoJS.enc.Utf8)
		);
	return false;
};

// Takes in response object from /login
export function encryptToken(data) {
	return CryptoJS.AES.encrypt(JSON.stringify(data), key);
}

export async function isLoggedIn() {
	const decryptedToken = decryptToken();
	if (decryptedToken && decryptedToken.userName) {
		const tokenName = decryptedToken.userName;
		const docs = await getDocs(collection(db, "residents"));
		for (const doc of docs.docs) {
			let residentName = doc.data().name;
			if (
				residentName.split(" ").slice(-1)[0] ===
				tokenName.split(" ").slice(-1)[0]
			) {
				return true;
			}
		}
	}
	return false;
}
