# Expression Helpers

AMPATH Forms provide a swathe of expression helper functions that are useful for performing common domain-specific calculations in forms.

Below is a reference of the functions currently available.

## calcBMI

Computes a patient's BMI given a valid height and weight value.

```js
calcBMI(height, weight)
```

#### Parameters

- `height`: number
- `weight`: number

#### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

## calcBSA

Computes a patient's BMI given a valid height and weight value.

```js
calcBSA(height, weight)
```

#### Parameters

- `height`: number
- `weight`: number

#### Return value

A **number** if height and weight values are provided. Otherwise, returns **null**.

## calcBMIForAgeZscore

Computes a patient's age and sex standardised BMI (BMIz) score .

```js
calcBMIForAgeZscore(bmiForAgeRef, height, weight)
```

#### Parameters

#### Return value

## calcWeightForHeightZscore

```js
calcWeightForHeightZscore(weightForHeightRef, height, weight)
```

#### Parameters

#### Return value

## calcHeightForAgeZscore

```js
calcHeightForAgeZscore(heightForAgeRef, height, weight)
```

#### Parameters

#### Return value

## isEmpty

```js
isEmpty(val)
```

#### Parameters

- `val`: The `id` of the question being referenced.

#### Return value

A boolean. Returns **true** if the question being referenced has an answer and **false** otherwise.

## arrayContains

```js
arrayContains(array, members)
```

#### Parameters

- `array`: An array of values, typically concept UUIDs.
- `members`: A value for which you want to assert its presence in the source array.

#### Return value

A boolean. Returns **true** if `members` is an empty array. If `members` is not an array, it returns **true** if `members` is not contained in the array. If `members` is an array, this function returns **true** if all of the elements in `members` are contained in the source array as well - and if otherwise, returns **false**.

#### Example

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

```js
arrayContainsAny(array, members)
```

#### Parameters

#### Return value

## extractRepeatingGroupValues

```js
extractRepeatingGroupValues(key, array)
```

#### Parameters

#### Return value

## formatDate

```js
formatDate(value, format, offset)
```

#### Parameters

#### Return value
