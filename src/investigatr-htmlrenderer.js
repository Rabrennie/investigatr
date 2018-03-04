function InvestigatrHtmlRenderer(options) {
    this.options = Object.assign({
        containerEl: document.querySelector('.investigatr')
    }, options);

    // TODO: refactor
    this.render = function(time, results) {
        
        const timeEl = document.createElement('div');
        const totalTests = document.createElement('div');
        timeEl.innerHTML = `elapsed: ${time} secs`;

        this.options.containerEl.appendChild(timeEl);
        this.options.containerEl.appendChild(totalTests);

        let testCount = 0;
        let passCount = 0;

        for (const groupName in results) {
            if (results.hasOwnProperty(groupName)) {
                const group = results[groupName];
                const resultEl = document.createElement('div');
                resultEl.innerHTML = `<h3>${groupName}</h3><ul></ul>`;
                for (const testName in group) {
                    if (group.hasOwnProperty(testName)) {
                        const testResult = group[testName];
                        const testEl = document.createElement('li');
                        testCount += 1;
                        if(testResult.pass) {
                            passCount += 1
                        }
                        testEl.innerHTML = testResult.pass ? 'pass': 'fail';
                        testEl.innerHTML += ` - ${testName} <pre>${testResult.assertion}</pre><pre>${testResult.error}</pre><pre>${testResult.source.split('\n        ').join('\n')}</pre>`
                        resultEl.querySelector('ul').appendChild(testEl);
                    }
                }
                this.options.containerEl.appendChild(resultEl);
            }
        }

        totalTests.innerHTML = `${(passCount / testCount * 100).toFixed(0)}%`

    }
}