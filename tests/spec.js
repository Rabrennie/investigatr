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
});

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
        },

        "message is 'expected(2) is not equal to actual(1)' when 1 == 2 ": function(data) {
            let message = assertEquals(1,2).message;
            return assertEquals(message, 'expected(2) is not equal to actual(1)');
        }
    }
});

testGroup('.assertNotEqual()', {
    data: {},
    tests: {
        "result is false when 1 == 1 ": function(data) {
            let result = assertNotEquals(1,1).result;
            return assertEquals(result, false);
        },

        "result is true when 1 == 2 ": function(data) {
            let result = assertNotEquals(1,2).result;
            return assertEquals(result, true);
        },

        "message is 'expected(1) is equal to actual(1)' when 1 == 1 ": function(data) {
            let message = assertNotEquals(1,1).message;
            return assertEquals(message, 'expected(1) is equal to actual(1)');
        }
    }
})