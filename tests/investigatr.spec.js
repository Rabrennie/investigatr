testGroup('Investigatr', {
    data: {},
    beforeEach: function (data) {
        data.mockRenderer = new (function() {
            this.calls = 0;

            this.render = function() {
                this.calls += 1;
            }
        });
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

        "run calls renderer.render if options.output is true": function (data) {
            data.investigatr.init({
                renderer: data.mockRenderer
            });

            data.investigatr.run()

            assertEquals(data.mockRenderer.calls, 1);
        },

        "run doesn't call renderer.render if options.output is false": function (data) {
            data.investigatr.init({
                output: false,
                renderer: data.mockRenderer
            });

            data.investigatr.run()

            assertEquals(data.mockRenderer.calls, 0);
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