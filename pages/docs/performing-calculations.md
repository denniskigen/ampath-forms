# Performing Calculations

You can obtain derived numerical values in your form inputs through the use of `calculateExpression`s. `calculateExpression`s are used in form inputs of type [number](/docs/field-types-reference#number). You can extend your input's `questionOptions` definition to include a `calculate` property in which you would nest your `calculateExpression` definition.

The following is an example of a `calculateExpression`:

```json {8-10}
{
  "label": "BMI:Kg/M2",
  "questionOptions": {
    "rendering": "number",
    "concept": "a89c60c0-1350-11df-a1f1-0026b9348838",
    "max": "100",
    "min": "0",
    "calculate": {
      "calculateExpression": "calcBMI(height,weight)"
    }
  },
  "type": "obs",
  "validators": [],
  "hide": {
    "hideWhenExpression": "age<18"
  }
}
```

Here, the `calculateExpression` returns the value of invoking [calcBMI](/docs/expression-helpers#calc-bmi) with the given `height` and `weight` values.

## More Examples

#### 1. Using [moment](https://momentjs.com/) to compute the difference between two dates in years

```json
"calculate": {
  "calculateExpression": "(moment().endOf('year')).diff(moment(dateOfBirth), 'years')"
}
```

#### 2. Computing `Morisky 4 Total Score` from decimal values

```json
"calculate": {
  "calculateExpression": "isNaN(parseFloat(feelsBetter) + parseFloat(feelsWorse) + parseFloat(notKeen) + parseFloat(forget)) ? undefined : (parseFloat(feelsBetter) + parseFloat(feelsWorse) + parseFloat(notKeen) + parseFloat(forget))"
}
```

#### 3. Computing `BmiForAgeZscore` using the `calcBMIForAgeZscore` and `isEmpty` expression helpers

```json
"calculate": {
  "calculateExpression": "!isEmpty(height) && !isEmpty(weight) ? calcBMIForAgeZscore(bmiForAgeRef,height,weight): ''"
}
```

#### 4. Computing `Estimated Delivery Date` using `moment`

```json
"calculate": {
  "calculateExpression": "moment(lastMenstrualPeriodDate).isValid() ? moment(lastMenstrualPeriodDate).add(280, 'days').toDate() : ''"
}
```
