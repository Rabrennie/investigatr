function InvestigatrHtmlRenderer(options) {
    this.options = Object.assign({
        containerEl: document.querySelector('.investigatr')
    }, options);

    // TODO: refactor
    this.render = function(time, results) {
        this.options.containerEl.style.fontfamily = "Arial";
        console.log(this.options.containerEl.style);
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
                resultEl.innerHTML = `<h3 style="font-weight: 400">${groupName}</h3><ul style="list-style:none"></ul>`;
                for (const testName in group) {
                    if (group.hasOwnProperty(testName)) {
                        const testResult = group[testName];
                        const testEl = document.createElement('li');
                        testCount += 1;
                        if(testResult.pass) {
                            passCount += 1
                        }
                        testEl.innerHTML = `<div style="cursor: pointer; color: ${testResult.pass ? '#9c9c9c':'#a90303;'}"> ${testResult.pass ? '&#10003;': '&#10005;'} ${testName}</div>`;
                        if(testResult.assertion != null) {
                            testEl.innerHTML += `<pre style="margin-left: 30px;color: #ff6565;">${testResult.assertion}</pre>`;
                        }
                        if(testResult.error != null) {
                            testEl.innerHTML += `<pre style="margin-left: 30px;color: #ff6565;">${testResult.error}</pre>`;
                        }
                        if(testResult.source != null) {
                            testEl.innerHTML += `<pre class="test-source" style="margin-left: 30px; display: none">${testResult.source.split('\n        ').join('\n')}</pre>`;
                        
                        }
                        testEl.childNodes[0].addEventListener('click', function() {
                            var element = this.parentElement.querySelector('.test-source')
                            element.style.display = element.style.display == "none" ? "block" : "none";
                            
                        });
                        resultEl.querySelector('ul').appendChild(testEl);
                    }
                }
                this.options.containerEl.appendChild(resultEl);
            }
        }

        totalTests.innerHTML = `${(passCount / testCount * 100).toFixed(0)}%`

    }
}