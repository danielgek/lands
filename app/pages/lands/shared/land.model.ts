export class Land {
	id?: string;
	name: string;
	description: string;
	countryIdentifier: string;
	area: number;
	points: { latitude: number, longitude: number }[];
}

