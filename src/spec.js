describe('Investigatr', {
    data: {},
    beforeEach: function (data) {
        data.investigatr = new Investigatr();
    },
    tests: {
        "Init sets options.output": function (data) {
            data.investigatr.init({
                output: false
            });
            return assertEquals(data.investigatr.options.output, false);
        },

        "Init sets options.containerEl": function (data) {
            data.investigatr.init({
                containerEl: "testing"
            });
            return assertEquals(data.investigatr.options.containerEl, "testing");
        }
    }
})