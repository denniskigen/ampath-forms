# Other Validation Types

Beyond [date-based validation](/docs/validation/date-based-validation) and [expression-based validation](/docs/validation/js-expression-based-validation), the Form Engine supports the following validator types.

## conditionalAnswered

Use a `conditionalAnswered` validator when a question should only be answered if another question was answered with one of a specific set of values. If the question has a value while the referenced question is unanswered, or was answered with a value outside the allowed set, validation fails with the provided message.

The validator takes:

- `referenceQuestionId`: the `id` of the question this one depends on.
- `referenceQuestionAnswers`: an array of allowed answer values (concept UUIDs for coded questions) for the referenced question.
- `message`: the error message shown when validation fails.

The example below is from a form where a hospitalization diagnosis should only be provided if the patient was marked as hospitalized:

```json
{
  "label": "Hospitalization diagnosis",
  "type": "obs",
  "id": "hospitalizedDiagnosis",
  "questionOptions": {
    "concept": "a8a07a48-1350-11df-a1f1-0026b9348838",
    "rendering": "problem"
  },
  "validators": [
    {
      "type": "conditionalAnswered",
      "message": "Providing diagnosis but didn't answer that patient was hospitalized in question",
      "referenceQuestionId": "wasHospitalized",
      "referenceQuestionAnswers": ["a899b35c-1350-11df-a1f1-0026b9348838"]
    }
  ]
}
```

## Numeric constraints via questionOptions

For `number` and `decimal` renderings, the engine also derives validators from `questionOptions` — no `validators` array needed:

- `min` and `max`: bounds for the value. The engine registers these validators only when **both** are present.
- `minLength` and `maxLength`: bounds on the length of the entered value.
- `disallowDecimals`: when `true`, fails any value containing a decimal point with the message "Decimal values are not allowed".

```json
{
  "label": "Number of children",
  "type": "obs",
  "id": "numChildren",
  "questionOptions": {
    "concept": "a8a04b76-1350-11df-a1f1-0026b9348838",
    "rendering": "number",
    "min": "0",
    "max": "30",
    "disallowDecimals": true
  }
}
```
