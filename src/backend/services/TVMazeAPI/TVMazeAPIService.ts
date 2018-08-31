import InterfaceTVMazeAPIShowResponse = TVMazeAPIShowResponse.InterfaceTVMazeAPIShowResponse;
import InterfaceTVMazeAPIShowCastResponse = TVMazeAPIShowCastResponse.InterfaceTVMazeAPIShowCastResponse;

const requestPromise = require('request-promise');

export class TVMazeAPIService {

    private static URL_SHOWS = 'https://api.tvmaze.com/shows';

    private static async fetchDataByURL(url:string) {
        return requestPromise(url).then(response => {
            return JSON.parse(response);
        });
    }

    public static async getShowById(id: number): Promise<InterfaceTVMazeAPIShowResponse> {
        const url = `${this.URL_SHOWS}/${id}`;
        const result = await this.fetchDataByURL(url);

        return result;
    }

    public static async getShowsByPageId(id: number): Promise<InterfaceTVMazeAPIShowResponse[]> {
        const url = `${this.URL_SHOWS}?page=${id}`;
        const result = await this.fetchDataByURL(url);

        return result;
    }

    public static async getShowCastById(id: number): Promise<InterfaceTVMazeAPIShowCastResponse[]> {
        const url = `${this.URL_SHOWS}/${id}/cast`;
        const result = await this.fetchDataByURL(url);

        return result;
    }
}