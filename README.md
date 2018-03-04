# investigatr

investigatr is a minimal, extensible JavaScript test framework that runs in the browser (node support coming soon). The main aim of investigatr is to allow testing without modification of existing code and fast setup of tests.  

## Basic Usage

First, clone `investigatr`

```bash
git clone https://github.com/Rabrennie/investigatr.git
```

Next, create `my.spec.js` and `myTestRunner.html` in the cloned folder. Our file structure will look like:
```
investigatr
  - src
  - tests
  - my.spec.js
  - myTestRunner.html
```

```javascript
// my.spec.js
testGroup('Test Group Name', {
    data: {},
    tests: {
        "verify investigatr is working": function (data) {
            assertEquals(1, 1);
        },
    }
});
```

```html
<!-- mytestRunner.html-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>investigatr test suite</title>
</head>

<body>
    <div class="investigatr">

    </div>
    <script src="../src/investigatr-htmlrenderer.js"></script>
    <script src="../src/investigatr.js"></script>
    <script src="./spec.js"></script>
    <script>
        investigatr.run();
    </script>
</body>

</html>
```

Open mytestRunner.html in a browser and you should see your test passing. For a more complicated example view the spec files in the tests folder.

## testGroup options

#### `data | object | required`

the data that should be set at the start of every test

#### `tests | object | required`

an object containing all the tests for this group. Keys are the test names and values should be functions.

```javascript
tests: {
    "test name": function() {
        assertEquals(1,1);
    }
}
```

#### `beforeEach | function(data) | optional`
function to call before every test. Can be used to set up data etc.


## investigatr options

investigatr allows options to be set with the init method.

example:
```javascript
investigatr.init({
    output: false;
})
```

#### `output | boolean`

if output is set to false the render method on the renderer will not be called

#### `renderer | instance of a class that implements a render method`

Renderer is how the results will be renderer. It should be an instance of a class that implements a render method.

## Extending investigatr

#### coming soon

# Contributing

## Running the tests

To run the tests simply clone this repository and open `tests/testRunner.html`. The tests use investigatr as a test framework.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
