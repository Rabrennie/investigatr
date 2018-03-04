const investigatr = require('./investigatr.js');

window.Investigatr = investigatr.Investigatr;
window.investigatr = new investigatr.Investigatr();
window.testGroup = investigatr.testGroup;
window.assertEquals = investigatr.assertEquals;
window.assertNotEquals = investigatr.testGroup;
window.AssertException = investigatr.AssertException;
