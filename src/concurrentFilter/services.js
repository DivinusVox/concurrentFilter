class DataService {
    constructor($q, $timeout, comments) {
        this.comments = comments;
        this.deps = {
            q: $q,
            timeout: $timeout
        }
    }

    getData() {
        let deferred = this.deps.q.defer();

        this.deps.timeout(() => deferred.resolve(this.comments), 1000);

        return deferred.promise;
    }
}

class WebWorkerFilter {
    constructor($q) {
        // Dirty hack to get around URL requiremnet
        let blob = new Blob(['(',
            (() => {
                self.addEventListener('message',
                    (e) => {
                        let match = e.data.match, field = e.data.field, dataset = e.data.dataset;
                        self.postMessage(dataset.filter((element) => element[match] === field))
                    }
                )
            }).toString(),
            ')()'], {type: 'application/javascript'});

        let url = URL.createObjectURL(blob);

        this.q = $q;
        this.worker = new Worker(url);
        URL.revokeObjectURL(url);
    }

    filter(match, field, dataset) {
        // Save this ref for promises
        let self = this,
            deferred = self.q.defer();

        // named function for ease of removing event listener
        let resolve = (e) => {
            self.worker.removeEventListener(resolve);
            deferred.resolve(e.data);
        }

        this.worker.addEventListener('message', resolve);

        this.worker.postMessage({
            match: match,
            field: field,
            dataset: dataset
        });

        return deferred.promise;
    }
}

export { DataService, WebWorkerFilter }