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

export const add_db = () => {
	const collectionRef = collection(db, "residents");
	const new_residents = [
		{
			name: "Ken Lopez-Singson",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Enrique Salegumba",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Carlo Maramag",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Miro Fortuna",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Raine Tulio",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Kyle Bensali",
			track: "Debate",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
		{
			name: "Kyle Germita",
			track: "Admin",
			attendance: 0,
			average_judge_score: 0,
			average_speaker_score: 0,
			rounds_won: 0,
			count_rounds_debated: 0,
			count_rounds_judged: 0,
			feedbacks_received: 0,
			rounds: [],
		},
	];
	new_residents.map((new_resident) => {
		addDoc(collectionRef, new_resident)
			.then(() => {
				console.log("Added " + new_resident.name);
			})
			.catch((err) => console.error(err));
	});
};
