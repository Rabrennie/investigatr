testGroup('assertNotEquals', {
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