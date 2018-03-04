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

testGroup('assertEqual', {
    data: {},
    tests: {
        "doesn't throw Assert Exception is true when 1 == 1 ": function(data) {
            assertEquals(1,1);
        },

        "throws AssertException when 1 == 2 ": function(data) {
            try {
                assertEquals(1,2)
            } catch(e) {
                assertEquals(e.constructor.name, 'AssertException');
            }
        },

        "message is 'expected(2) is not equal to actual(1)' when 1 == 2 ": function(data) {
            try {
                assertEquals(1,2)
            } catch(e) {
                assertEquals(e.stack, 'expected(2) is not equal to actual(1)');
            }
        }
    }
});

testGroup('assertNotEqual', {
    data: {},
    tests: {
        "throws AssertException when 1 == 1 ": function(data) {
            try {
                assertNotEquals(1,1)
            } catch(e) {
                assertEquals(e.constructor.name, 'AssertException');
            }
        },

        "doesn't throw AssertException when 1 == 2 ": function(data) {
            assertNotEquals(1,2);
        },

        "message is 'expected(1) is equal to actual(1)' when 1 == 1 ": function(data) {
            try {
                assertNotEquals(1,1)
            } catch(e) {
                assertEquals(e.stack, 'expected(1) is equal to actual(1)');
            }
        }
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