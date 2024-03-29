# Questions

A question is a field in a Form. It consists of a label, an associated input, and a set of answers.

Below is an example of a question that seeks to establish the patient's `Current HIV status`:

```json
{
  "questions": [
    {
      "label": "Current HIV status",
      "type": "obs",
      "id": "hivStatus",
      "questionOptions": {
        "rendering": "select",
        "concept": "9e4d6436-4040-46a3-a0ae-6dbc0acfe593",
        "answers": [
          {
            "concept": "a896f3a6-1350-11df-a1f1-0026b9348838",
            "label": "HIV positive"
          },
          {
            "concept": "a896d2cc-1350-11df-a1f1-0026b9348838",
            "label": "HIV negative"
          },
          {
            "concept": "a899b50a-1350-11df-a1f1-0026b9348838",
            "label": "Unknown"
          }
        ]
      },
      "validators": []
    }
  ]
}
```

## Defining a `Question`

Here's a reference of the various properties you can specify in a question definition:

- `label`: The actual content of the question. This label is what gets rendered as the question label.
- `id`: An ID unique to that question. Used when validating the field input. It's recommended to use camel-case for your ID names.
- `type`: Provides information that the processor uses to render a field. An `obs` field, for example, will be rendered differently than an `encounterLocation` field. Currently supported `type`s include: `obs`, `obsGroup`, `testOrder`, `control`, `complex-obs`, `encounterDatetime`, `encounterLocation`, `encounterProvider`, `personAttribute`.

- `questionOptions`: An object containing the following properties:

  - `rendering`: The field type of the question. The most commonly used field types are **text** (for text inputs), **select** (for select fields) and **date** (for date fields). See the [Field types reference](/docs/field-types-reference) for a full list of rendering types.
  - `concept`: The concept UUID of the backing concept for this field. You can get this concept UUID from searching in the Concept Dictionary.
  - `answers`: An array of answers scoped to a question. An answer definition consists of a concept UUID and label pair. Below is an example of answers to a `Current HIV status` question:

    ```json
    {
      "answers": [
        {
          "concept": "a896f3a6-1350-11df-a1f1-0026b9348838",
          "label": "HIV positive"
        },
        {
          "concept": "a896d2cc-1350-11df-a1f1-0026b9348838",
          "label": "HIV negative"
        },
        {
          "concept": "a899b50a-1350-11df-a1f1-0026b9348838",
          "label": "Unknown"
        }
      ]
    }
    ```

  - `calculate`: An object where you can specify `calculateExpressions`. These are predefined expression helpers that take inputs and return numeric values. Read more about `calculateExpressions` in the [Performing Calculations](/docs/performing-calculations) guide.

    ```json
    {
      "label": "BMI (Kg/M2):",
      "id": "bmi",
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
      "validators": []
    }
    ```

- `shownDateOptions` - A property that determines whether a date field should be shown or hidden based on the value of another date field. This property receives an object with the following properties:

  ```json
  {
    "questionOptions": {
      // ... rest omitted for brevity
      "shownDateOptions": {
        "validators": [
          {
            "type": "date"
          },
          {
            "type": "js_expression",
            "failsWhenExpression": "!isEmpty(ast_test) && isEmpty(myValue)",
            "message": "Date of result is required"
          }
        ],
        "hide": {
          "hideWhenExpression": "isEmpty(ast_test)"
        }
      }
    }
  }
  ```

- `required` - A property that determines whether a field is required or optional. Required fields must be filled before the form can be submitted. This property receives either a boolean value or an object. If a boolean value is provided, `true` marks the question as required whereas `false` marks the question as optional. In this case, the required property defaults to false, meaning all fields start out as optional by default. If set to **true**, that form field is considered a required field. Defaults to `false`. If the value provided is an object, it will have the following properties:

  - `type` - defaults to `conditionalRequired`.
  - `message` - a string that gets displayed when as an error message below the field if a condition is not met.
  - `referenceQuestionId` - The ID of a question in the schema that relates to this particular question. When type is set to  `conditionalRequired`, the question referenced by this ID is used to evaluate a condition that involves the answers set in the `referenceQuestionAnswers` array below.
  - `referenceQuestionAnswers` - an array of concept UUIDs that reference answers linked to the question referenced by `referenceQuestionId`. If the linked question gets answered with any of the answers in the array and the question with the `conditionalRequired` validation does not get answered, validation fails and the error message in `message` above gets displayed below the field.

  ```json
  {
    "required": {
      "errorMessage": "Please enter a value for this field",
      "conditionalRequired": [
        {
          "questionId": "onArt",
          "response": "a899b35c-1350-11df-a1f1-0026b9348838",
          "errorMessage": "Please enter a value for this field"
        }
      ]
    }
  }
  ```

- `validators`: An array in which you provide validation logic for the specific question. Read more about validation in the [Validation](/docs/validation) guide.
- `historicalExpression`: This allows you to hook your input up to the `HistoricalEncounterDataService`. This service 'remembers' the last value entered in the input from the last encounter and offers the user the option to reuse that value. Read more about `historicalExpressions` in the [Historical expressions](/docs/historical-expressions) guide.

  ![Historical expressions](/screens/historical-expressions.webp)

- `hide`: You can use this to define logic for hiding a question based on certain conditions. To do so, you provide a JavaScript expression that evaluates to a boolean value. Read more about hiding fields in the [Hiding fields](/docs/conditional-rendering) guide.

  ```json
  {
    "hide": {
      "hideWhenExpression": "onArt!== 'a899b35c-1350-11df-a1f1-0026b9348838'"
    }

    // This logic hides the question with the `onArt` id if the value of its
    // concept does not match the supplied value
  }
  ```

- `questionInfo`: You can specify helper text for the question here. When specified, a question mark icon gets displayed to the right of the question label. When you hover over it, the information you entered gets displayed as a tooltip. This is useful for providing additional context to the user about a question.

  ![Question info tooltip](/screens/question-info-tooltip.webp)

  The code for this is as follows:

  ```json
  {
    "label": "Person Collecting Medication",
    "questions": [
      {
        "label": "Visited by:",
        "id": "visitBy",
        "questionInfo": "Record the person that came for the clinic today, whether it is the patient or the treatment supporter.",
        "questionOptions": {
          "rendering": "select",
          "concept": "a89cd410-1350-11df-a1f1-0026b9348838",
          "answers": [
            {
              "concept": "a898c6f4-1350-11df-a1f1-0026b9348838",
              "label": "Self"
            },
            {
              "concept": "01b957da-23bb-4862-819d-036364fe3faf",
              "label": "Treatment supporter"
            }
          ]
        },
        "type": "obs",
        "validators": []
      }
    ]
  }
  ```
