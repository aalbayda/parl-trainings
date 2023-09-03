import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const reset_db = async () => {
	const q = await getDocs(query(collection(db, "residents")));
	q.forEach(async (docSnapshot) => {
		let docRef = doc(db, "residents", docSnapshot.id);
		await updateDoc(docRef, {
			attendance: 0,
			count_rounds_debated: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_judged: 0,
			average_judge_score: 0,
			feedbacks_received: 0,
		});
	});
};

export const update_db = async () => {
	// If no more ballots, reset the database
};
