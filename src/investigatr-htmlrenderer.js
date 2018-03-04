function InvestigatrHtmlRenderer(options) {
    this.options = Object.assign({
        containerEl: document.querySelector('.investigatr')
    }, options);

    this.render = function(time, results) {
        
        const timeEl = document.createElement('div');
        const totalTests = document.createElement('div');
        timeEl.innerHTML = `elapsed: ${time} secs`;

        this.options.containerEl.appendChild(timeEl);
        this.options.containerEl.appendChild(totalTests);

        let testCount = 0;
        let passCount = 0;

        for (const result in results) {
            if (results.hasOwnProperty(result)) {
                const element = results[result];
                const resultEl = document.createElement('div');
                resultEl.innerHTML = `<h3>${result}</h3><ul></ul>`;
                for (const test in element) {
                    if (element.hasOwnProperty(test)) {
                        const testResult = element[test];
                        const testEl = document.createElement('li');
                        testCount += 1;
                        if(testResult.pass) {
                            passCount += 1
                        }
                        testEl.innerHTML = testResult.pass ? 'pass': 'fail';
                        testEl.innerHTML += ` - ${test} <pre>${testResult.assertion}</pre><pre>${testResult.error}</pre><pre>${testResult.source.split('\n        ').join('\n')}</pre>`
                        resultEl.querySelector('ul').appendChild(testEl);
                    }
                }
                this.options.containerEl.appendChild(resultEl);
            }
        }

        totalTests.innerHTML = `${(passCount / testCount * 100).toFixed(0)}%`

    }
}