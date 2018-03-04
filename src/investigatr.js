function Investigatr() {
    this.options = {
        output: true,
        renderer: new InvestigatrHtmlRenderer(),
    };

    this.tests = {};

    this.results = {};
    
    this.run = function () {
        var startTime = performance.now();

        for (const test in this.tests) {
            if (this.tests.hasOwnProperty(test)) {
                this.runTest(test, this.tests[test]);
            }
        }

        var endTime = performance.now();
        
        if(this.options.output) {
            const time = ((endTime - startTime % 60000) / 1000);
            this.options.renderer.render(time, this.results);
        }
    }

    this.runTest = function (name, test) {
        const options = test;
        const originalData = { ...options.data };

        this.results[name] = {};

        for (let testName in options.tests) {
            options.data = { ...originalData };
            if(options.beforeEach != null) {
                options.beforeEach.apply(options, [options.data]);
            }
            let pass, assertion, error;

            try {
                const assert = options.tests[testName].apply(options, [options.data]);
                pass = assert.result;
                assertion = assert.assertion;
            } catch (e) {
                pass = false;
                error = e.stack;
            }

            this.results[name][testName] = {
                pass,
                error,
                assertion,
                source: options.tests[testName].toString(),
            };
        }
    }

    this.init = function(options) {
        this.options = Object.assign(this.options, options);
    }
    
}

var investigatr = new Investigatr();

function describe(name, options) {
    investigatr.tests[name] = options;
}

function assertEquals(a, b) {
    return {
        result: a == b,
        assertion: a + " == " + b
    };
}

function assertNotEquals(a, b) {
    return {
        result: a != b,
        assertion: a + " != " + b
    };
}