# Expression Helper Functions

AMPATH Forms provide a swathe of expression helper functions that are useful for performing common domain-specific calculations in forms.

Below is a reference of the functions currently available.

## calcBMI

Computes a patient's BMI given a valid height and weight value.

```js
calcBMI(height, weight);
```

#### Parameters

- `height`: number
- `weight`: number

#### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

## calcBSA

Computes a patient's BMI given a valid height and weight value.

```js
calcBSA(height, weight);
```

#### Parameters

- `height`: number
- `weight`: number

#### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

## calcBMIForAgeZscore

Computes a patient's age and sex standardised BMI (BMIz) score .

```js
calcBMIForAgeZscore(bmiForAgeRef, height, weight);
```

#### Parameters

#### Return value

## calcWeightForHeightZscore

```js
calcWeightForHeightZscore(weightForHeightRef, height, weight);
```

#### Parameters

#### Return value

## calcHeightForAgeZscore

```js
calcHeightForAgeZscore(heightForAgeRef, height, weight);
```

#### Parameters

#### Return value

## isEmpty

```js
isEmpty(val);
```

#### Parameters

#### Return value

## arrayContains

```js
arrayContains(array, members);
```

#### Parameters

- `array`: An array of values, typically concept UUIDs.
- `members`: A value for which you want to assert its presence in the source array.

#### Return value

A boolean. Returns **true** if `members` is an empty array. If `members` is not an array, it returns **true** if `members` is not contained in the array. If `members` is an array, this function returns **true** if all of the elements in `members` are contained in the source array as well - and if otherwise, returns **false**.

## arrayContainsAny

```js
arrayContainsAny(array, members);
```

#### Parameters

#### Return value

## extractRepeatingGroupValues

```js
extractRepeatingGroupValues(key, array);
```

#### Parameters

#### Return value

## formatDate

```js
formatDate(value, format, offset);
```

#### Parameters

#### Return value
