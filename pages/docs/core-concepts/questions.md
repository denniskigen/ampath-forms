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

## Defining a `question`

Here's a reference of the various properties you can specify in a question definition:

- `label`: The actual content of the question. This label is what gets rendered as the question label.
- `id`: An ID unique to that question. Used when validating the field input. It's recommended to use camel-case for your ID names.
- `type`: Provides information that the processor uses to render a field. An `obs` field, for example, will be rendered differently than an `encounterLocation` field. Learn more about the supported types in the [question types reference](/docs/core-concepts/questions#question-types) below.

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
  - `referenceQuestionId` - The ID of a question in the schema that relates to this particular question. When type is set to `conditionalRequired`, the question referenced by this ID is used to evaluate a condition that involves the answers set in the `referenceQuestionAnswers` array below.
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

## Question types

The following are the question types supported by the form engine:

### control

`control` questions typically use the [text](/docs/field-types-reference#text) rendering type.

Here's an example of a `control` field:

```json
{
  "label": "Morisky score rating:",
  "id": "scoreMo",
  "questionOptions": {
    "concept": "",
    "rendering": "text",
    "calculate": {
      "calculateExpression": "parseInt(moriskyScore) === 0 && parseFloat(moriskyScore) <= 0.25 ? 'Good' : parseFloat(moriskyScore) >=0.5 && parseInt(moriskyScore) <= 2 ? 'Inadequate' : parseInt(moriskyScore) >= 3 && parseInt(moriskyScore) <= 8 ? 'Poor' : 'Unknown'"
    }
  },
  "type": "control",
  "validators": [],
  "hide": {
    "hideWhenExpression": "isEmpty(moriskyScore4) || moriskyScore4 <3"
  }
}
```

### encounterDatetime

The `encounterDatetime` question type is used to capture the date and time of an encounter. The corresponding rendering type for `encounterDatetime` is [date](/docs/field-types-reference#date).

Here's an example of an `encounterDatetime` field:

```json
{
  "label": "Visit date",
  "type": "encounterDatetime",
  "required": "true",
  "default": "",
  "id": "encDate",
  "questionOptions": {
    "rendering": "date"
  },
  "validators": [
    {
      "type": "date"
    }
  ]
}
```

### encounterLocation

The `encounterLocation` question type is used to record the location of an encounter. `encounterLocation` questions typically use the [ui-select-extended](/docs/field-types-reference#ui-select-extended) rendering type. to render a dropdown list of locations.

Here's an example of an `encounterLocation` field:

```json
{
  "type": "encounterLocation",
  "label": "Facility name (site/satellite clinic required):",
  "id": "location",
  "required": "true",
  "questionOptions": {
    "rendering": "ui-select-extended"
  }
}
```

### encounterProvider

The `encounterProvider` question type is used to record the provider of an encounter. `encounterProvider` questions typically use the [ui-select-extended](/docs/field-types-reference#ui-select-extended) rendering type to render a dropdown list of providers.

Here's an example of an `encounterProvider` question:

```json
{
  "type": "encounterProvider",
  "label": "Provider",
  "id": "provider",
  "required": "true",
  "questionOptions": {
    "rendering": "ui-select-extended"
  }
}
```

### obs

The `obs` question type is used for capturing observations. `obs` questions are linked to a concept and can have multiple answers. `obs` fields are compatible with all rendering types.

Here's an example of an `obs` question:

```json
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
```

### obsGroup

The `obsGroup` question type is used to create an obs group. An obs group is used to link multiple `obs` concpets together. `obsGroup` questions require a grouping `concept`, which must be of type `ConvSet`. They may also be nested. `obsGroup` fields typically use the [group](/docs/field-types-reference#group) and [repeating](/docs/field-types-reference#repeating)
rendering types.

Here's an example of an `obsGroup` question:

```json
{
  "label": "TB Treatment Started, detailed",
  "type": "obsGroup",
  "questionOptions": {
    "concept": "a89fe6f0-1350-11df-a1f1-0026b9348838",
    "rendering": "group"
  },
  "questions": [
    {
      "label": "TB Treatment plan:",
      "id": "tbTreatmentPlan",
      "required": "true",
      "questionOptions": {
        "concept": "a89c1fd4-1350-11df-a1f1-0026b9348838",
        "answers": [
          {
            "concept": "a899e0ac-1350-11df-a1f1-0026b9348838",
            "label": "Not on TB treatment"
          },
          {
            "concept": "a89b7908-1350-11df-a1f1-0026b9348838",
            "label": "Continue regimen"
          },
          {
            "concept": "a89b77aa-1350-11df-a1f1-0026b9348838",
            "label": "Start induction"
          },
          {
            "concept": "a89b7c50-1350-11df-a1f1-0026b9348838",
            "label": "Change to continuation"
          },
          {
            "concept": "a898c938-1350-11df-a1f1-0026b9348838",
            "label": "Re-dose"
          },
          {
            "concept": "a8a00158-1350-11df-a1f1-0026b9348838",
            "label": "Substitution"
          },
          {
            "concept": "a8a00220-1350-11df-a1f1-0026b9348838",
            "label": "Restart"
          },
          {
            "concept": "a89b7d36-1350-11df-a1f1-0026b9348838",
            "label": "Stop"
          }
        ],
        "rendering": "select"
      },
      "type": "obs",
      "validators": []
    }
  ],
  "id": "__vo5wMCKuD"
}
```

### personAttribute

The `personAttribute` question type is used to capture person attributes. `personAttribute` fields require a backing person attribute type that's provided via the `attributeType` field in the `questionOptions` object. `personAttribute` fields typically use the [ui-select-extended](/docs/field-types-reference#ui-select-extended) rendering type to render a dropdown list of person attribute types.

Here's an example of a `personAttribute` field:

```json
{
  "type": "personAttribute",
  "label": "Specify which clinic the patient is being referred:",
  "id": "clinicTransferredOutTo",
  "required": "false",
  "questionOptions": {
    "rendering": "ui-select-extended",
    "attributeType": "8d87236c-c2cc-11de-8d13-0010c6dffd0f"
  },
  "hide": {
    "hideWhenExpression": "transferOut !== 'a89c2f42-1350-11df-a1f1-0026b9348838'"
  }
}
```

### testOrder

The `testOrder` question type is used to capture test orders. `testOrder` fields require an `orderSettingUuid` and an `orderType` in the `questionOptions` object. The `orderSettingUuid` is the UUID of the order setting to use when creating the order. The `orderType` is the type of order to create. `testOrder` fields typically use the [repeating](/docs/field-types-reference#repeating) rendering type.

Here's an example of a `testOrder` field:

```json
{
  "label": "Tests Ordered",
  "id": "testsOrdered",
  "type": "testOrder",
  "questionOptions": {
    "rendering": "repeating",
    "orderSettingUuid": "6f0c9a92-6f24-11e3-af88-005056821db0",
    "orderType": "testorder",
    "selectableOrders": [
      {
        "concept": "a8982474-1350-11df-a1f1-0026b9348838",
        "label": "Viral load"
      },
      {
        "concept": "a896cce6-1350-11df-a1f1-0026b9348838",
        "label": "CD4"
      },
      {
        "concept": "7243bed9-0bc7-4702-af28-a06ab1981e19",
        "label": "Crag test"
      },
      {
        "concept": "57677735-4310-4841-8902-dae4bac24d20",
        "label": "DST"
      },
      {
        "concept": "a898fe80-1350-11df-a1f1-0026b9348838",
        "label": "HIV DNA PCR "
      },
      {
        "concept": "a8908192-1350-11df-a1f1-0026b9348838",
        "label": "CXR"
      },
      {
        "concept": "a8945d4e-1350-11df-a1f1-0026b9348838",
        "label": "Sputum AFB"
      },
      {
        "concept": "a897e450-1350-11df-a1f1-0026b9348838",
        "label": "Creatinine"
      },
      {
        "concept": "a898f50c-1350-11df-a1f1-0026b9348838",
        "label": "CBC"
      },
      {
        "concept": "a896ca48-1350-11df-a1f1-0026b9348838",
        "label": "SGPT(ALT)"
      },
      {
        "concept": "a896c8ae-1350-11df-a1f1-0026b9348838",
        "label": "AST"
      },
      {
        "concept": "a8970a26-1350-11df-a1f1-0026b9348838",
        "label": " CD4 %"
      },
      {
        "concept": "a8999fb6-1350-11df-a1f1-0026b9348838",
        "label": "Elisa"
      },
      {
        "concept": "a8999dfe-1350-11df-a1f1-0026b9348838",
        "label": "Rapid HIV "
      },
      {
        "concept": "a8a47094-1350-11df-a1f1-0026b9348838",
        "label": "TB PCR "
      },
      {
        "concept": "741517cf-8bac-4755-b289-8dd2a2df7962",
        "label": "Gene Xpert"
      }
    ]
  }
}
```

### patientIdentifier

The `patientIdentifier` question type is used to capture patient identifiers. `patientIdentifier` fields have a backing identifier type that's specified using the `identifierType` property. `patientIdentifier` fields typically use the [text](/docs/field-types-reference#text) rendering type and typically validate the input against the specified identifier type.

Here's an example of a `patientIdentifier` field:

```json
{
  "type": "patientIdentifier",
  "label": "Recency ID",
  "id": "recencyId",
  "required": "false",
  "questionOptions": {
    "rendering": "text",
    "identifierType": "fd52829a-75d2-4732-8e43-4bff8e5b4f1a"
  },
  "validators": [
    {
      "type": "js_expression",
      "failsWhenExpression": "myValue && doesNotMatchExpression('^REC\\\\d{5}-\\\\d{5,6}$', recencyId)",
      "message": "Please provide the correct format for the recency id ie. REC+mflCode+number eg.REC11902-00062"
    }
  ],
  "hide": {
    "hideWhenExpression": "isEmpty(finalResult) || finalResult === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' || isEmpty(recencyScreening) || recencyScreening === '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' "
  }
}
```

```

```
