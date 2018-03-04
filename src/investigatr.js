var investigatr = new (function () {
    this.options = {
        output: true,
        containerEl: document.querySelector('.investigatr')
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
            const time = ((endTime - startTime % 60000) / 1000).toFixed(3);
            this.displayResults(time)
        }
    }

    this.runTest = function (name, test) {
        const options = test;
        const originalData = { ...options.data };

        this.results[name] = {};

        for (let testName in options.tests) {
            options.data = { ...originalData };
            options.beforeEach.apply(options, [options.data]);
            
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

    this.displayResults = function(time) {
        
        const timeEl = document.createElement('div');
        timeEl.innerHTML = `elapsed: ${time} secs`;

        this.options.containerEl.appendChild(timeEl);

        for (const result in this.results) {
            if (this.results.hasOwnProperty(result)) {
                const element = this.results[result];
                const resultEl = document.createElement('ul');
                for (const test in element) {
                    if (element.hasOwnProperty(test)) {
                        const testResult = element[test];
                        const testEl = document.createElement('li');
                        testEl.innerHTML = testResult.pass ? 'pass': 'fail';
                        testEl.innerHTML += ` - ${test} <pre>${testResult.assertion}</pre><pre>${testResult.error}</pre><pre>${testResult.source}</pre>`
                        resultEl.appendChild(testEl);
                        console.log(testResult);
                    }
                }
                this.options.containerEl.appendChild(resultEl);
            }
        }

    }
});

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