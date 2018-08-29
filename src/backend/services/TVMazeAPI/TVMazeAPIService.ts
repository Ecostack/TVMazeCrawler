import InterfaceTVMazeAPIShowResponse = TVMazeAPIShowResponse.InterfaceTVMazeAPIShowResponse;
import InterfaceTVMazeAPIShowCastResponse = TVMazeAPIShowCastResponse.InterfaceTVMazeAPIShowCastResponse;



import requestPromise from 'request-promise';

class TVMazeAPIService {

    private static URL_SHOWS = 'https://api.tvmaze.com/shows';

    private static async fetchDataByURL(url:string) {
        return requestPromise(url);
    }

    public static async getShowById(id: string): Promise<InterfaceTVMazeAPIShowResponse> {
        const url = `${this.URL_SHOWS}/${id}`;
        const result = await this.fetchDataByURL(url);

        return result;
    }

    public static async getShowCastById(id: string): Promise<InterfaceTVMazeAPIShowCastResponse> {
        const url = `${this.URL_SHOWS}/${id}/cast`;
        const result = await this.fetchDataByURL(url);

        return result;
    }
}