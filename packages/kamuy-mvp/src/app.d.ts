// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { PrismaClient } from '@prisma/client';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				name: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
		interface Platform {
			env: {
				DATABASE_URL: process.env.DATABASE_URL;
				NODE_VERSION: process.env.NODE_VERSION;
			};
		}
	}
	let db: PrismaClient;
}

export {};
