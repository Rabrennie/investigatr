testGroup('Investigatr', {
    data: {},
    beforeEach: function (data) {
        data.investigatr = new Investigatr();
    },
    tests: {
        "options.output defaults to true": function (data) {
            return assertEquals(data.investigatr.options.output, true);
        },

        "Init sets options.output": function (data) {
            data.investigatr.init({
                output: false
            });
            return assertEquals(data.investigatr.options.output, false);
        },

        "Init sets options.renderer": function (data) {
            data.investigatr.init({
                renderer: "test",
            });
            return assertEquals(data.investigatr.options.renderer, "test");
        },
    }
})

testGroup('.assertEqual()', {
    data: {},
    tests: {
        "result is true when 1 == 1 ": function(data) {
            let result = assertEquals(1,1).result;
            return assertEquals(result, true);
        },

        "result is false when 1 == 2 ": function(data) {
            let result = assertEquals(1,2).result;
            return assertEquals(result, false);
        }
    }
})