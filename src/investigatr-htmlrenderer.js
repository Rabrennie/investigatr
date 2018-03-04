function InvestigatrHtmlRenderer(options) {
    this.options = Object.assign({
        containerEl: document.querySelector('.investigatr')
    }, options);

    this.render = function(time, results) {
        
        const timeEl = document.createElement('div');
        timeEl.innerHTML = `elapsed: ${time} secs`;

        this.options.containerEl.appendChild(timeEl);

        for (const result in results) {
            if (results.hasOwnProperty(result)) {
                const element = results[result];
                const resultEl = document.createElement('ul');
                for (const test in element) {
                    if (element.hasOwnProperty(test)) {
                        const testResult = element[test];
                        const testEl = document.createElement('li');
                        testEl.innerHTML = testResult.pass ? 'pass': 'fail';
                        testEl.innerHTML += ` - ${test} <pre>${testResult.assertion}</pre><pre>${testResult.error}</pre><pre>${testResult.source.split('\n        ').join('\n')}</pre>`
                        resultEl.appendChild(testEl);
                    }
                }
                this.options.containerEl.appendChild(resultEl);
            }
        }

    }
}