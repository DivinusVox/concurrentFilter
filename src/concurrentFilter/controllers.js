class CfCtrl {
    constructor(dataService, wwFilter) {
        // Save self due to promises losing scope of `this`
        let self = this;
        self.dataset = [];
        self.filter = wwFilter;

        dataService.getData().then(
            (data) => {
                self._dataset = data;
                self.dataset = data;
            }
        );
    }

    applyFilter(type, argument) {
        let self = this;
        self.filter.filter('postId', 1, self._dataset).then(
            (data) => { self.dataset = data });
    }
}
export { CfCtrl }