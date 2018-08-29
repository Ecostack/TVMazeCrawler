declare module TVMazeAPIShowCastResponse {

    export interface Country {
        name: string;
        code: string;
        timezone: string;
    }

    export interface Image {
        medium: string;
        original: string;
    }

    export interface Self {
        href: string;
    }

    export interface Links {
        self: Self;
    }

    export interface Person {
        id: number;
        url: string;
        name: string;
        country: Country;
        birthday: string;
        deathday?: any;
        gender: string;
        image: Image;
        _links: Links;
    }

    export interface Image2 {
        medium: string;
        original: string;
    }

    export interface Self2 {
        href: string;
    }

    export interface Links2 {
        self: Self2;
    }

    export interface Character {
        id: number;
        url: string;
        name: string;
        image: Image2;
        _links: Links2;
    }

    export interface InterfaceTVMazeAPIShowCastResponse {
        person: Person;
        character: Character;
        self: boolean;
        voice: boolean;
    }

}

