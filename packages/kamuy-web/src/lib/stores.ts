/* eslint-disable @typescript-eslint/no-unused-vars */
import { readable } from 'svelte/store';
// import { browser } from '$app/environment';
import * as Realm from 'realm-web';
const {
	BSON: { ObjectId }
} = Realm;

// Add your App ID
const app = new Realm.App({ id: 'data-gipvp' });
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
// Authenticate the user
const user = await app.logIn(credentials);
console.log('anonymous user.id: ' + user.id);
// `App.currentUser` updates to match the logged in user
if (app.currentUser != null && user.id === app.currentUser.id) {
	console.log('Now Login.');
}
export const realmUser = readable<Realm.User>(user);
// return localStorage.getItem("hoge");
