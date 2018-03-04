testGroup('assertEquals', {
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