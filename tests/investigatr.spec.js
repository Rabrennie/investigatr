testGroup('Investigatr', {
    data: {},
    beforeEach: function (data) {
        data.investigatr = new Investigatr();
    },
    tests: {
        "options.output defaults to true": function (data) {
            assertEquals(data.investigatr.options.output, true);
        },

        "options.renderer defaults to InvestigatrHtmlRenderer": function (data) {
            assertEquals(data.investigatr.options.renderer.constructor.name, 'InvestigatrHtmlRenderer');
        },

        "init sets options.output": function (data) {
            data.investigatr.init({
                output: false
            });
            assertEquals(data.investigatr.options.output, false);
        },

        "init sets options.renderer": function (data) {
            data.investigatr.init({
                renderer: "test",
            });
            assertEquals(data.investigatr.options.renderer, "test");
        },
    }
});

testGroup('Failing tests for renderer', {
    data: {},
    tests: {
        "result is false when false == true ": function(data) {
            assertEquals(true, false);
        },

        "displays exception because sdf doesn't exist": function(data) {
            let a = sdf;
        },
    }
});