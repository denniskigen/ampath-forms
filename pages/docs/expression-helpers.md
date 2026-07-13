# Expression Helpers

AMPATH Forms provide expression helpers that are useful for computing common domain-specific calculations.

Here's a link to the expression helpers [implementation](https://github.com/AMPATH/ngx-openmrs-formentry/blob/2763b0062c386906ae94e312df961508069cdfec/projects/ngx-formentry/src/form-entry/helpers/js-expression-helper.ts). You can add your own custom expression helpers to this file to make them available in the Form Builder.

Below is a reference of the functions currently available.

## arrayContains

```js
arrayContains(array, members)
```

### Parameters

- `array`: An array of values, typically concept UUIDs.
- `members`: A value for which you want to assert its presence in the source array.

### Return value

A **boolean**. Returns **true** if `members` is an empty array. If `members` is not an array, it returns **true** if the `members` value is contained in the source array. If `members` is an array, this function returns **true** if all of the elements in `members` are contained in the source array as well - and if otherwise, returns **false**.

### Example

Here's a set of questions from the Client Enrollment section of a VDot Enrollment form.

```json
{
  "label": "Reason for referral",
  "type": "obs",
  "id": "referralReason",
  "questionOptions": {
    "concept": "1887AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "rendering": "multiCheckbox",
    "answers": [
      {
        "concept": "164075AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "label": "Sub optimal adherence"
      },
      {
        "concept": "64132ecd-3a0f-41b8-b743-78c26af2f4b9",
        "label": "Newly initiating ART"
      },
      {
        "concept": "5619AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "label": "Unstable Caregiver"
      },
      {
        "concept": "989AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "label": "Age 0-4 years"
      },
      {
        "concept": "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "label": "Other"
      }
    ]
  }
},
{
  "label": "Specify other reason",
  "type": "obs",
  "id": "otherReferralReason",
  "questionOptions": {
    "concept": "160632AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "rendering": "text"
  },
  "validators": []
}
```

We want to validate the `Specify other reason` question so that it only gets displayed when `Other` is chosen amongst the answers to the preceding question.

To achieve this, add the following `hide` expression to the `Specify other reason` question definition:

```json
"hide": {
  "hideWhenExpression": "isEmpty(referralReason) || !arrayContains(referralReason,'5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')"
}
```

This expression essentially says:

- Hide the `Specify other reason` question if the preceding question did not get answered. This is what the first part of the expression `isEmpty(referralReason)` does.
- Hide the `Specify other reason` question if `Other` is not selected amongst the answers to the preceding question.

## arrayContainsAny

Tests whether the source array contains `members` (or the values contained in `members` if it is an `Array`). Returns true if `members` is/are in `array`, and false otherwise.

```js
arrayContainsAny(array, members)
```

### Parameters

- `array`: array
- `members`: an array or any value

### Return value

A boolean. Returns **true** if `members` is/are in `array`, and **false** otherwise.

## calcBSA

Computes a total body surface area (BSA) given a valid height and weight value.

```js
calcBSA(height, weight)
```

### Parameters

- `height`: number
- `weight`: number

### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

Note: `calcBSA` and `formatDate` are exposed to schema expressions in engine builds after `20.0.0` (currently available on the `next` npm tag). In `20.0.0` and earlier they exist in the engine but cannot be called from schema expressions.

## calcBMI

Computes body mass index (BMI) given a valid height and weight value.

```js
calcBMI(height, weight)
```

### Parameters

- `height`: number
- `weight`: number

### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

## calcBMIForAgeZscore

Computes a patient's age and sex standardised BMI (BMIz) score .

```js
calcBMIForAgeZscore(bmiForAgeRef, height, weight)
```

### Parameters

- `bmiForAgeRef`
- `height`: number
- `weight`: number

### Return value

A **string** if the `height` and `weight` values are valid and a valid `bmiForAgeRef` is provided. Otherwise, returns **null**.

## calcHeightForAgeZscore

```js
calcHeightForAgeZscore(heightForAgeRef, height, weight)
```

### Parameters

- `heightForAgeRef`
- `height`: number
- `weight`: number

### Return value

A **string** if the `height` and `weight` values are valid and a valid `heightForAgeRef` is provided. Otherwise, returns **null**.

## calcWeightForHeightZscore

```js
calcWeightForHeightZscore(weightForHeightRef, height, weight)
```

### Parameters

- `weightForHeightRef`
- `height`: number
- `weight`: number

### Return value

A **string** if the `height` and `weight` values are valid and a valid `weightForHeightRef` is provided. Otherwise, returns **null**.

## extractRepeatingGroupValues

```js
extractRepeatingGroupValues(key, array)
```

### Parameters

- `key`: any
- `array`: Array

### Return value

## formatDate

```js
formatDate(value, format, offset)
```

### Parameters

- `value`: Date or any
- `format`: string
- `offset`: string

### Return value

A **string** — the date formatted according to `format` (defaults to `yyyy-MM-dd`), with the given UTC `offset` (defaults to `+0300`) applied. Throws an exception if `value` is empty or not a valid date.

Note: `formatDate` and `calcBSA` are exposed to schema expressions in engine builds after `20.0.0` (currently available on the `next` npm tag). In `20.0.0` and earlier they exist in the engine but cannot be called from schema expressions.

## isEmpty

```js
isEmpty(val)
```

### Parameters

- `val`: The `id` of the question being referenced.

### Return value

A boolean. Returns **true** if the referenced value is empty — that is, `undefined`, `null`, an empty string, the strings `'null'` or `'undefined'`, or an empty array. Returns **false** otherwise.

## calcGravida

```js
calcGravida(parityTerm, parityAbortion)
```

Calculates gravida (the number of pregnancies) from parity values.

### Parameters

- `parityTerm`: number — the number of term births. Must be an integer to be counted.
- `parityAbortion`: number — the number of abortions or miscarriages. Must be an integer to be counted.

### Return value

A **number**. When both parameters are integers, returns `parityTerm + parityAbortion + 1`. When only one is an integer, returns that value plus one. Returns **0** when neither parameter is an integer.

## calcSouthEastAsiaNonLabCVDRisk

```js
calcSouthEastAsiaNonLabCVDRisk(sex, smoker, age, sbp, bmi)
```

Estimates the 10-year cardiovascular disease risk using the WHO non-laboratory-based risk chart for the South-East Asia region.

### Parameters

- `sex`: string — `'M'` or `'F'`.
- `smoker`: boolean — whether the patient is a current smoker.
- `age`: number — the patient's age in years. Values are clamped to the 40–74 range the chart covers.
- `sbp`: number — systolic blood pressure in mmHg.
- `bmi`: number — body mass index.

### Return value

A **number** representing the 10-year CVD risk percentage from the WHO chart. Returns **null** if any parameter is missing or has the wrong type.

## doesNotMatchExpression

```js
doesNotMatchExpression(regexString, val)
```

Tests a value against a regular expression. Useful in `js_expression` validators for rejecting malformed input.

### Parameters

- `regexString`: string — the regular expression pattern to test against.
- `val`: string — the value to test.

### Return value

A **boolean**. Returns **true** if the value is empty (`null`, `undefined`, an empty string, or the strings `'null'` or `'undefined'`) or does not match the pattern. Returns **false** when the value matches the pattern.

## getObsFromControlOrEncounter

```js
getObsFromControlOrEncounter(targetControl, rawEncounter, uuid)
```

Resolves a value from a form control, falling back to an observation in a raw encounter. This is useful when a form needs to read a value that may either have been entered in the current session or recorded in a previous encounter (for example, via the `rawPrevEnc` data source).

### Parameters

- `targetControl`: any — the current control value. Returned as-is when truthy.
- `rawEncounter`: object — a REST-representation encounter whose `obs` array (including nested `groupMembers`) will be searched.
- `uuid`: string — the concept UUID of the observation to look for.

### Return value

The `targetControl` value when it is truthy. Otherwise, the matching observation's value — for coded values, the answer concept's UUID; for simple values, the value itself. Returns **null** when nothing is found.
