var investigatr = new (function () {
    this.options = {
        output: true,
    };
    
    this.tests = {};
    
    this.run = function () {
        var containerEl = document.querySelector('.investigatr');
        var timeEl = document.createElement('div');
        var startTime = performance.now();
        for (const test in this.tests) {
            if (this.tests.hasOwnProperty(test)) {
                this.runTest(test, this.tests[test]);
            }
        }
        var endTime = performance.now();
        if(this.options.output) {
            var milliseconds = endTime - startTime;
            var time = ((milliseconds % 60000) / 1000).toFixed(3);
            timeEl.innerHTML = time + " secs";
            containerEl.insertBefore(timeEl, containerEl.firstChild);
        }
    }

    this.runTest = function (name, test) {
        const options = test;
        var data = { ...options.data };
        if(this.options.output) {
            var resultEl = document.createElement('div');
            resultEl.innerHTML = `<h3>${name}</h3><ul></ul>`
            document.querySelector('.investigatr').appendChild(resultEl)
        }
        for (let testName in options.tests) {
            options.data = { ...data };
            options.beforeEach.apply(options, [options.data]);
            
            const testEl = document.createElement('li');
            try {
                var result = options.tests[testName].apply(options, [options.data]);
                if(this.options.output) {
                    testEl.innerHTML = `${result ? 'pass' : 'fail'} - ${testName}<pre style="color: grey;">${options.tests[testName].toString()}</pre>`;
                }
            } catch (e) {
                if(this.options.output) {
                    testEl.innerHTML = `fail - ${testName}<pre style="color: red;">${e.stack}</pre>`;
                }
            }
            if(this.options.output) {
                resultEl.querySelector('ul').appendChild(testEl);
            }
        }
    }

    this.init = function(options) {
        this.options = Object.assign(this.options, options);
    }
});

function describe(name, options) {
    investigatr.tests[name] = options;
}