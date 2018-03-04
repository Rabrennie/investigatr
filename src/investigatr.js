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
            
            let pass, error;

            try {
                pass = options.tests[testName].apply(options, [options.data]);
            } catch (e) {
                pass = false;
                error = e.stack;
            }

            this.results[name][testName] = {
                pass,
                error,
                source: options.tests[testName].toString(),
            };
        }
    }

    this.init = function(options) {
        this.options = Object.assign(this.options, options);
    }

    this.displayResults = function() {
        
    }
});

function describe(name, options) {
    investigatr.tests[name] = options;
}