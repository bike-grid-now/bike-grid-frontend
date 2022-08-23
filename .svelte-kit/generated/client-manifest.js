export { matchers } from './client-matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5')
];

export const dictionary = {
	"": [[1], [0], 2],
	"about": [[1], [0], 3],
	"email": [[1], [0], 4],
	"events/[slug]": [[1], [0], 5]
};