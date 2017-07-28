# fidem-dsl

[ ![Codeship Status for fidemapps/fidem-dsl](https://codeship.com/projects/a18adc90-061b-0133-c43a-12a4c431c178/status?branch=master)](https://codeship.com/projects/89623)

Library for Fidem DSL

## Usage

```javascript
var result = fidemdsl.challengeRules.parse('aaa');
var literals = fidemdsl.challengeRules.literals;
```

## Release a version

1. Change the parser.
2. Change the test.
3. Update in lib the literals list.
4. (Optional) Update the .ebnf in the doc folder.

```
grunt
```

```
mversion patch -m
```

```
git push
```

```
git push --tags
```

```
npm publish .
```

## License

Commercial
