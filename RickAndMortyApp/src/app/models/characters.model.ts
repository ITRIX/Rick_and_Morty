/**
 * Characters
 * @export
 * @interface Characters
 */
export interface Characters {
    info: Info;
    results: Result[];
}
/**
 * Result
 * @export
 * @class Result
 */
export class Result {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

/**
 * Origin
 * @export
 * @interface Origin
 */
export interface Origin {
    name: string;
    url: string;
}

/**
 * Location
 * @export
 * @interface Location
 */
export interface Location {
    name: string;
    url: string;
}

/**
 * Info
 * @export
 * @interface Info
 */
export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

/**
 * Filter
 * @export
 * @interface Filter
 */
export interface Filter {
    id: number;
    name: string;
}

