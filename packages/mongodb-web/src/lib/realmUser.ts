/* eslint-disable @typescript-eslint/no-unused-vars */
import { browser } from '$app/environment';
import * as Realm from 'realm-web';
const {
	BSON: { ObjectId }
} = Realm;

export function realmUser(): Realm.User {
	if (!browser) throw new Error('not in browser.');
	// const realmUser = localStorage.getItem('realmUser');
	// if (realmUser != null) {
	// 	console.log('realmUser: ' + realmUser);
	// 	console.log('JSON.parse(realmUser): ' + JSON.parse(realmUser));
	// 	return JSON.parse(realmUser);
	// }
	// Add your App ID
	const app = new Realm.App({ id: 'data-gipvp' });
	// Create an anonymous credential
	const credentials = Realm.Credentials.anonymous();
	// Authenticate the user
	const user = app.logIn(credentials);
	user.then((data) => {
		console.log('anonymous user.id: ' + data.id);
		// `App.currentUser` updates to match the logged in user
		if (app.currentUser != null && data.id === app.currentUser.id) {
			// console.log('Now Login.');
			// console.log('JSON.stringify(data): ' + JSON.stringify(data));
			// localStorage.setItem('realmUser', JSON.stringify(user));
			return user;
		}
	});
	throw new Error('Login failed.');
}
