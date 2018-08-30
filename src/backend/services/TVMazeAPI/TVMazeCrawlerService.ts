import {TVMazeShowModel} from "../../models/TVMazeShowModel";
import {TVMazeAPIService} from "./TVMazeAPIService";
import {AgendaJobsService} from "../AgendaJobsService";
import InterfaceTVMazeAPIShowResponse = TVMazeAPIShowResponse.InterfaceTVMazeAPIShowResponse;
import InterfaceTVMazeAPIShowCastResponse = TVMazeAPIShowCastResponse.InterfaceTVMazeAPIShowCastResponse;


export class TVMazeCrawlerService {
    public static AGENDA_JOB_NAME = 'TVMazeCrawlerService';

    private static MAXIMUM_REQUESTS_PER_SECOND = 2;
    private static PAGE_RESPONSE_RESULTS = 250;

    private static async getLastTVShowId() {
        let result = 0;
        const lastTvShow = await TVMazeShowModel.findOne({}).select('tvmazeid').sort({tvmazeid: -1})
        if (lastTvShow) {
            result = lastTvShow.tvmazeid;
        }
        return result;
    }

    private static transformCastToEntity(casts: InterfaceTVMazeAPIShowCastResponse[]) {
        return casts.map(cast => {
            return {
                id: cast.person.id,
                name: cast.person.name,
                birthday: cast.person.birthday
            }
        }).sort((a, b) => {
            if (a.birthday == null) {
                return 1;
            }
            if (b.birthday == null) {
                return -1;
            }
            const aBirthday = Number(a.birthday.replace(/-/g, ''));
            const bBirthday = Number(b.birthday.replace(/-/g, ''));
            if (aBirthday === bBirthday) {
                return 0;
            }
            return aBirthday < bBirthday ? 1 : -1;
        })
    }

    private static async createModelFromResponse(show: InterfaceTVMazeAPIShowResponse, casts: InterfaceTVMazeAPIShowCastResponse[]) {
        let toCreate = {
            tvmazeid: show.id,
            name: show.name,
            cast: this.transformCastToEntity(casts)
        }

        const created = await TVMazeShowModel.create(toCreate);
        return created;
    }

    private static waitPromise(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private static async jobSetLockedAt(job) {
        job.attrs.lockedAt = new Date();
        await job.save()
    }

    private static async executeForShow(show: InterfaceTVMazeAPIShowResponse) {
        const workingPromise = Promise.resolve().then(async () => {
            const casts = await TVMazeAPIService.getShowCastById(show.id);
            await this.createModelFromResponse(show, casts);
        });
        // 1000 milliseconds times the amount of requests devided by the amount of maximum requests per second
        const waitingPromise = this.waitPromise(1000 / this.MAXIMUM_REQUESTS_PER_SECOND);
        return Promise.all([workingPromise, waitingPromise])
    }

    private static async executeForPageId(params: { page: number, lastShowId: number, job:any }) {
        const pageResults = await TVMazeAPIService.getShowsByPageId(params.page);

        if (pageResults.length === 0) {
            return;
        }

        for (let show of pageResults) {
            if (params.lastShowId < show.id) {
                await this.executeForShow(show);
                console.log(`TVMazeCrawlerService - runForPage - create show `, show.id)
            } else {
                console.log(`TVMazeCrawlerService - runForPage - show already exists `, show.id)
            }
            await params.job()
        }

        return this.executeForPageId({...params, page: params.page + 1})
    }

    private static async runForPage(job) {
        const lastShowId = await this.getLastTVShowId();
        const page = Math.trunc(lastShowId / this.PAGE_RESPONSE_RESULTS);
        return this.executeForPageId({job, page, lastShowId})
    }


    public static async setupAgendaBased() {
        return AgendaJobsService.define(
            this.AGENDA_JOB_NAME,
            '60 minute',
            async (job: any,done:any) => {
                (async () => {
                    await this.runForPage(async () => {
                        return this.jobSetLockedAt(job)
                    });
                })().then(done, done);
            },
            {lockLifetime: 1000 * 60 * 10, concurrency: 1}
        );
    }
}