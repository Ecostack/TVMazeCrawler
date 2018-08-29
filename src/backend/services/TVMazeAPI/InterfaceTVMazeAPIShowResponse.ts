declare module TVMazeAPIShowResponse {

    export interface Schedule {
        time: string;
        days: string[];
    }

    export interface Rating {
        average?: any;
    }

    export interface Country {
        name: string;
        code: string;
        timezone: string;
    }

    export interface Network {
        id: number;
        name: string;
        country: Country;
    }

    export interface Externals {
        tvrage?: any;
        thetvdb?: any;
        imdb?: any;
    }

    export interface Image {
        medium: string;
        original: string;
    }

    export interface Self {
        href: string;
    }

    export interface Previousepisode {
        href: string;
    }

    export interface Links {
        self: Self;
        previousepisode: Previousepisode;
    }

    export interface InterfaceTVMazeAPIShowResponse {
        id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: any[];
        status: string;
        runtime: number;
        premiered: string;
        officialSite: string;
        schedule: Schedule;
        rating: Rating;
        weight: number;
        network: Network;
        webChannel?: any;
        externals: Externals;
        image: Image;
        summary: string;
        updated: number;
        _links: Links;
    }

}

