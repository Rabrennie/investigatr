const InvestigatrHtmlRenderer = require('./investigatr-htmlrenderer.js');

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
                options.beforeEach(options.data);
            }
            let pass = true, assertion, error;

            try {
                options.tests[testName](options.data);
            } catch (e) {
                pass = false;
                error = e.stack;
            }

            this.results[groupName][testName] = {
                pass,
                error,
                source: options.tests[testName].toString(),
            };
        }
    }

    this.init = function(options) {
        this.options = Object.assign(this.options, options);
    }
    
}

function testGroup(name, options) {
    investigatr.tests[name] = options;
}

function AssertException(message) {
    this.name = 'AssertException';
    this.stack = message;
}

function assertEquals(actual, expected) {
    if(actual != expected) {
        throw new AssertException(`expected(${expected}) is not equal to actual(${actual})`);
    }
}

function assertNotEquals(actual, expected) {
    if(actual == expected) {
        throw new AssertException(`expected(${expected}) is equal to actual(${actual})`);
    }
}

module.exports = {
    Investigatr,
    testGroup,
    AssertException,
    assertEquals,
    assertNotEquals,
}