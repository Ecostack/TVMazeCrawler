export class RouterHelper {

	public static parseQueryParam(queryParam, defaultValue) {
        if(queryParam) {
            return parseInt(queryParam);
        } else {
            return defaultValue;
        }
	}

	public static asyncMiddleware(fn){
	    return (req, res, next) => {
			Promise.resolve(fn(req, res, next))
				.catch(next);
		}
    }
}