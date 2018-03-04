describe("Test 1", {
    data: {
        test: 0,
    },
    beforeEach: function (data) {
        data.test += 1;
    },
    tests: {
        "test1": function (data) {
            return data.test == 1;
        },
        "test2": function (data) {
            return data.test == asd;
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
            return vcvc == asd;
        }
    }
})