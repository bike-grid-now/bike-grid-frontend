import { writable } from 'svelte/store';

export const API_URL = writable(isProduction ? 'test' : 'http://localhost:1337');