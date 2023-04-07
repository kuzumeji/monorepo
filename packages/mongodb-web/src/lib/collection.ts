/* eslint-disable @typescript-eslint/no-explicit-any */
// import { realmUser } from '$lib/realmUser';

export function collection(
	user: Realm.User,
	name: string
): Realm.Services.MongoDB.MongoDBCollection<any> {
	return user.mongoClient('Cluster0').db('kamuy').collection(name);
}
