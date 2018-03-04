describe("Test 1", {
    data: {
        test: 0,
    },
    beforeEach: function (data) {
        data.test += 1;
    },
    tests: {
        "1 == 1": function (data) {
            return assertEquals(data.test, 1);
        },
        "1 == 2": function (data) {
            return assertEquals(data.test, 2);
        },
        "test2": function (data) {
            return assertEquals(data.test, asd);
        }
    }
})

describe("Test 2", {
    data: {
        test: 0,
    },
    beforeEach: function (data) {
        data.test += 1;
    },
    tests: {
        "the best test": function (data) {
            return assertEquals(vcvc, asd);
        }
    }
})