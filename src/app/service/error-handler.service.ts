export class CustomErrorHandler {
    public static parseError(err): Error {
        const e = new Error();
        if (err.error && err.error.errors) {
            e.message = err.error.errors[0].message;
        } else if (err.statusText) {
            e.message = err.statusText;
        } else if (err._body) {
            try {
                e.message = JSON.parse(err._body);
            } catch {
                e.message = `Unknown Error: ${err}`;
            }
        } else {
            e.message = `Unknown Error: ${err}`;
        }

        if (err.error) {
            e.name = err.error.message;
        } else if (err.name) {
            e.name = err.name;
        } else if (err.statusText) {
            e.name = err.statusText;
        } else if (err.message) {
            e.name = err.message;
        } else {
            e.name = 'Unexpected Error Occured';
        }
        console.error(err);
        return e;
    }
}
