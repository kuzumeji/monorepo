/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from 'svelte/store';
import { realmUser } from '$lib/stores';

export function collection(
	name: string
): Realm.Services.MongoDB.MongoDBCollection<any> {
	return get(realmUser).mongoClient('Cluster0').db('kamuy').collection(name);
}
