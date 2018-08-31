import * as agendaModule from 'agenda';
import Config from "../config";

export class AgendaJobsService {
    private static AGENDA_INSTANCE = new agendaModule({db: {address: Config.MONGO_URL}});
    private static init = false;

    public static async getInstance() {
        if (this.init != true) {
            this.init = true;
            await this.AGENDA_INSTANCE.start();
        }
        return AgendaJobsService.AGENDA_INSTANCE;
    };

    public static define = async (
        name: string,
        time: string,
        cb: (job: any, done: () => void) => any,
        options?: { lockLifetime?: number; concurrency?: number }
    ) => {
        const instance = await AgendaJobsService.getInstance();
        const defineOptions = options || {};
        if (defineOptions.lockLifetime == null) {
            defineOptions.lockLifetime = 5 * 60 * 1000;
        }
        instance.define(name, defineOptions, cb);
        instance.on('ready', () => {
            instance.every(time, name);
            instance.start();
        });
    };
}
