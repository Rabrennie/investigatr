function Investigatr() {
    this.options = {
        output: true,
        renderer: new InvestigatrHtmlRenderer(),
    };

    this.tests = {};

    this.results = {};
    
    this.run = function () {
        const startTime = performance.now();

        for (const groupName in this.tests) {
            if (this.tests.hasOwnProperty(groupName)) {
                this.runTest(groupName, this.tests[groupName]);
            }
        }

        const endTime = performance.now();
        
        if(this.options.output) {
            const time = ((endTime - startTime % 60000) / 1000);
            this.options.renderer.render(time, this.results);
        }
    }

    this.runTest = function (groupName, test) {
        const options = test;
        const originalData = { ...options.data };

        this.results[groupName] = {};

        for (let testName in options.tests) {
            options.data = { ...originalData };
            if(options.beforeEach != null) {
                options.beforeEach.apply(options, [options.data]);
            }
            let pass, assertion, error;

            try {
                const assert = options.tests[testName].apply(options, [options.data]);
                pass = assert.result;
                assertion = assert.message;
            } catch (e) {
                pass = false;
                error = e.stack;
            }

            this.results[groupName][testName] = {
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

const investigatr = new Investigatr();

function testGroup(name, options) {
    investigatr.tests[name] = options;
}

// TODO: maybe these should return errors
function assertEquals(actual, expected) {
    const assertionResponse =  {
        result: actual == expected,
    };

    if(!assertionResponse.result) {
        assertionResponse.message = `expected(${expected}) is not equal to actual(${actual})`;
    }

    return assertionResponse;
}

function assertNotEquals(actual, expected) {
    const assertionResponse =  {
        result: actual != expected,
    };

    if(!assertionResponse.result) {
        assertionResponse.message = `expected(${expected}) is equal to actual(${actual})`;
    }

    return assertionResponse;
}