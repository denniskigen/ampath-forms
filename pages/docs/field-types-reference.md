# Field Types Reference

AMPATH Forms support multiple field types. The most commonly used fields include `text`, `textarea`, `number`, `date` and `select`.

Field types are defined in the `questionOptions` definition of a question using the following syntax:

```json
{
  "questionOptions": {
    "rendering": "" // field type goes here
  }
}
```

## text

Renders a text input.

Below is an example showing a text input. This input is shown when `Other treatment methods e.g. Hysterectomy, Cone biopsy` is selected as the answer to the `Treatment method` question. This input allows the user to specify the treatment method chosen for that visit by typing text into the text field.

![Text field](/screens/fields-reference/text.png)

The code for this is as follows:

```json
{
  "label": "Other treatment methods not listed above",
  "type": "obs",
  "id": "otherTreatmentMethod",
  "questionOptions": {
    "concept": "dc15823d-e6ec-48fc-beac-bc4239d9bfcb",
    "rendering": "text"
  },
  "validators": [],
  "hide": {
    "hideWhenExpression": "isEmpty(preCancerTreatment) || preCancerTreatment != 'a89ebb04-1350-11df-a1f1-0026b9348838'"
  }
},
```

## number

Renders a number input. You can specify optional `min` and `max` values in the `questionOptions` definition of a number input. When present, these serve as upper and lower bounds for constraining the provided input. Validation is automatically provided for min and max values.

Below is an example showing a couple of number inputs used to establish the number of pregnancies a patient has had (gravida), as well as the number of pregnancies that have been brought to term (parity).

![Number field](/screens/fields-reference/number.png)

The code for this is as follows:

```json
{
  "label": "Reproductive History",
  "isExpanded": "true",
  "questions": [
    {
      "label": "Number of pregnancies had (gravida)",
      "type": "obs",
      "id": "noPregnancy",
      "historicalExpression": "_.isEmpty(HD.getObject('prevEnc').getValue('a8aaf59a-1350-11df-a1f1-0026b9348838')) ? undefined : HD.getObject('prevEnc').getValue('a8aaf59a-1350-11df-a1f1-0026b9348838')",
      "questionOptions": {
        "concept": "a8aaf59a-1350-11df-a1f1-0026b9348838",
        "rendering": "number",
        "max": "50",
        "min": "0"
      },
      "validators": [],
      "hide": {
        "hideWhenExpression": "sex !== 'F'"
      }
    },
    {
      "label": "Number of pregnancies delivered (parity)",
      "type": "obs",
      "id": "noDelivery",
      "historicalExpression": "_.isEmpty(HD.getObject('prevEnc').getValue('a899a920-1350-11df-a1f1-0026b9348838')) ? undefined : HD.getObject('prevEnc').getValue('a899a920-1350-11df-a1f1-0026b9348838')",
      "questionOptions": {
        "concept": "a899a920-1350-11df-a1f1-0026b9348838",
        "rendering": "number",
        "min": "0"
      },
      "validators": [],
      "hide": {
        "hideWhenExpression": "sex !== 'F'"
      }
    }
  ]
}
```

## select

Renders a dropdown list.

Below is an example of a select field from a Cervical Cancer screening visit form. Clicking inside the field reveals a dropdown with a list of options. You can only select one option from a select field. If you wish to be able to select more than one option, use a [multiCheckbox](/docs/field-types-reference#multicheckbox) field instead.

![Select field](/screens/fields-reference/select.png)

The code for this is as follows:

```json
{
  "questions": [
    {
      "label": "Treatment Plan",
      "sections": [
        {
          "label": "Pre-Cancer Treatment",
          "isExpanded": "true",
          "questions": [
            {
              "label": "Treatment method",
              "type": "obs",
              "id": "preCancerTreatment",
              "required": "true",
              "questionOptions": {
                "concept": "94f54710-6ee0-45cd-ad5f-a990fcb47bc1",
                "rendering": "select",
                "answers": [
                  {
                    "concept": "a899e0ac-1350-11df-a1f1-0026b9348838",
                    "label": "None"
                  },
                  {
                    "concept": "dcb72b0b-c1cb-4f32-aa82-e8f7b74cc16e",
                    "label": "Cryotherapy"
                  },
                  {
                    "concept": "b6fccd82-c622-4c3e-9563-39899e709b3b",
                    "label": "LEEP"
                  },
                  {
                    "concept": "a829a2a1-5ea5-400e-a3a5-2069f6d1e05b",
                    "label": "Thermocoagulation"
                  },
                  {
                    "concept": "a89ebb04-1350-11df-a1f1-0026b9348838",
                    "label": "Other treatment methods e.g. Hysterectomy, Cone biopsy"
                  }
                ]
              },
              "validators": []
            }
          ]
        }
      ]
    }
  ]
}
```

## date

Renders a date input. When clicked, the input reveals a date picker with the current date as the default value. You can optionally choose to show a dropdown with a list of weeks in addition to the date picker. When specified, choosing a week from the weeks list will result in the datepicker adjusting to show the first date of that week as its default value.

Below is an example of a date field where you can specify the patient's return to clinic date.

![Date field](/screens/fields-reference/date.png)

The code for this is as follows:

```json
{
  "label": "Next Appointment",
  "sections": [
    {
      "label": "Next Appointment",
      "isExpanded": "true",
      "questions": [
        {
          "label": "Return to clinic date",
          "type": "obs",
          "required": "true",
          "questionOptions": {
            "concept": "a8a666ba-1350-11df-a1f1-0026b9348838",
            "rendering": "date",
            "weeksList": [2, 4, 9, 13, 26, 52, 104, 156]
          },
          "validators": [
            {
              "type": "date",
              "allowFutureDates": "true"
            },
            {
              "type": "js_expression",
              "failsWhenExpression": "(new moment(encDate)).isAfter((new moment(myValue)), 'day') || (new moment(encDate)).isSame((new moment(myValue)), 'day')",
              "message": "Return to clinic date should be greater than the encounter date."
            }
          ]
        }
      ]
    }
  ]
}
```

## multiCheckbox

Renders a multiple-choice select field. This kind of field differs from a select in that it allows you to select more than one option.

Below is an example of a multiple-choice field showing three Cervical cancer screening methods as options: VIA or VIA/VILI, HPV, and Pap smear. In the screenshot below, `VIA or VIA/VILI` and `Pap smear` have been selected.

![Multi-Select field](/screens/fields-reference/multi-select.png)

The code for this is as follows:

```json
{
  "label": "Routine Screening",
  "isExpanded": "true",
  "questions": [
    {
      "label": "Screening method",
      "type": "obs",
      "id": "screeningMethod",
      "required": "true",
      "questionOptions": {
        "rendering": "multiCheckbox",
        "concept": "6750ddf9-bd32-4d8f-bee0-b5fc192a20a3",
        "answers": [
          {
            "concept": "b6d3b6cf-030e-4e35-8a91-7e3efe7ecd65",
            "label": "VIA or VIA/VILI"
          },
          {
            "concept": "a89b2dcc-1350-11df-a1f1-0026b9348838",
            "label": "HPV"
          },
          {
            "concept": "a8983ff4-1350-11df-a1f1-0026b9348838",
            "label": "Pap smear"
          }
        ]
      },
      "validators": []
    }
    // ... more questions
  ]
}
```

## textarea

Renders a textarea input. By default, the textarea will be 18 rows tall. You can configure the number of visible text lines for the input by providing a number to the rows property in your questionOptions definition.

![Textarea field](/screens/fields-reference/textarea.png)

The code for this is as follows:

```json
{
  "label": "Assessment",
  "sections": [
    {
      "label": "Assessment Notes",
      "isExpanded": "true",
      "questions": [
        {
          "label": "Please enter your assessment below",
          "type": "obs",
          "id": "assessmentNotes",
          "default": "",
          "questionOptions": {
            "concept": "23f710cc-7f9c-4255-9b6b-c3e240215dba",
            "rendering": "textarea",
            "rows": 10
          }
        }
      ]
    }
  ]
}
```

## radio

Renders a radio input. A radio input allows users to select an option from a list. All options are displayed at the same time and only one option from the available choices can be selected.

Below is an example of a radio input for a field labelled `Type of Care`:

![Radio field](/screens/fields-reference/radio.png)

The code for this is as follows:

```json
{
  "label": "Type of care:",
  "type": "obs",
  "id": "careType",
  "questionOptions": {
    "concept": "45389fad-ecb2-4346-aaad-053215081f5e",
    "rendering": "radio",
    "answers": [
      {
        "concept": "b412ae76-4ab4-4d00-800e-bd8d167769e1",
        "label": "HIV"
      },
      {
        "concept": "6b15e4fa-6897-4d69-adcf-5908abade719",
        "label": "TB"
      },
      {
        "concept": "a8a17d80-1350-11df-a1f1-0026b9348838",
        "label": "PMTCT"
      },
      {
        "concept": "12550258-d797-43d9-a282-e35908c33fe4",
        "label": "Resistance"
      },
      {
        "concept": "a8aaf3e2-1350-11df-a1f1-0026b9348838",
        "label": "Other"
      }
    ]
  }
}
```

## ui-select-extended

Renders a dropdown list with superpowers. You can hook this input up to a `DataSource` which will configure it behave like a search input with typeahead capabilities.

Below is an example of a ui-select-extended field hooked up to a resource that provides location data. The user can search for a location from the provided list by typing a few characters to filter the list.

![UI Select Extended field](/screens/fields-reference/ui-select-extended.gif)

The code for this is as follows:

```json
{
  "label": "At which AMPATH facility are you receiving HIV care?",
  "id": "careLocation",
  "type": "personAttribute",
  "questionOptions": {
    "rendering": "ui-select-extended",
    "attributeType": "8d87236c-c2cc-11de-8d13-0010c6dffd0f"
  },
  "validators": [
    {
      "type": "js_expression",
      "failsWhenExpression": "isEmpty(myValue) && hivStatus == 'a899b35c-1350-11df-a1f1-0026b9348838'",
      "message": "Please indicate the facility where the client is receiving HIV care"
    }
  ],
  "hide": {
    "hideWhenExpression": "isEmpty(currentlyOnArt) || currentlyOnArt != 'a899b35c-1350-11df-a1f1-0026b9348838'"
  }
}
```

## group

```json
{
  "label": "Transfer Out",
  "questions": [
    {
      "type": "obsGroup",
      "label": "Transfer care to other centre",
      "questionOptions": {
        "concept": "a8a170e2-1350-11df-a1f1-0026b9348838",
        "rendering": "group"
      },
      "questions": [
        {
          "label": "Transfer care to other centre:",
          "id": "transferOut",
          "questionOptions": {
            "concept": "a89c2e5c-1350-11df-a1f1-0026b9348838",
            "answers": [
              {
                "concept": "a89c2f42-1350-11df-a1f1-0026b9348838",
                "label": "AMPATH"
              },
              {
                "concept": "a89c301e-1350-11df-a1f1-0026b9348838",
                "label": "Non-AMPATH"
              },
              {
                "concept": "a8a17d80-1350-11df-a1f1-0026b9348838",
                "label": "MCH"
              }
            ],
            "rendering": "select"
          },
          "type": "obs",
          "validators": []
        },
        {
          "type": "personAttribute",
          "label": "Specify name of AMPATH clinic to which patient is being referred:",
          "id": "transfered_out_to_ampath",
          "required": "false",
          "questionOptions": {
            "rendering": "ui-select-extended",
            "attributeType": "8d87236c-c2cc-11de-8d13-0010c6dffd0f"
          },
          "hide": {
            "hideWhenExpression": "transferOut !== 'a89c2f42-1350-11df-a1f1-0026b9348838'"
          }
        },
        {
          "type": "obs",
          "label": "If Non-AMPATH specify where the patient is being referred:",
          "id": "transfered_out_to_non_ampath",
          "required": "false",
          "default": "",
          "questionOptions": {
            "rendering": "text",
            "concept": "a8a06fc6-1350-11df-a1f1-0026b9348838"
          },
          "hide": {
            "hideWhenExpression": "transferOut !== 'a89c301e-1350-11df-a1f1-0026b9348838'"
          }
        }
      ]
    }
  ]
}
```

## repeating

Renders a repeating group field.

![Repeating group field](/screens/fields-reference/repeating-group.gif)

```json
{
  "label": "Test orders",
  "sections": [
    {
      "label": "Test Orders",
      "isExpanded": "true",
      "questions": [
        {
          "type": "obsGroup",
          "label": "Test orders",
          "questionOptions": {
            "concept": "af46861e-597a-48a3-b3d4-a134d0b1c5fa",
            "rendering": "group"
          },
          "questions": [
            {
              "label": "Tests Ordered",
              "id": "order1",
              "type": "testOrder",
              "questionOptions": {
                "rendering": "repeating",
                "orderSettingUuid": "6f0c9a92-6f24-11e3-af88-005056821db0",
                "orderType": "testorder",
                "selectableOrders": [
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
                    "concept": "a8945d4e-1350-11df-a1f1-0026b9348838",
                    "label": "Sputum AFB"
                  },
                  {
                    "concept": "a8aaf3e2-1350-11df-a1f1-0026b9348838",
                    "label": "Other"
                  }
                ]
              },
              "validators": [],
              "hide": {
                "hideWhenExpression": " !arrayContains(['d164c76c-cc91-4ac2-89e9-ab7c29152ee0','824cf3e6-dd16-4767-ba41-2e04dede349e'], visitType.uuid)"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## drug

Renders a dropdown list that is hooked up to a Drug `DataSource`. This field will only render concepts with class `Drug`.

![Drug field](/screens/fields-reference/drug.gif)

```json
{
  "label": "Additional Medication Orders",
  "questions": [
    {
      "type": "obsGroup",
      "label": "Additional medication orders",
      "questionOptions": {
        "rendering": "repeating",
        "concept": "a8a0654e-1350-11df-a1f1-0026b9348838"
      },
      "questions": [
        {
          "label": "Drug",
          "questionOptions": {
            "concept": "a8a060c6-1350-11df-a1f1-0026b9348838",
            "rendering": "drug"
          },
          "type": "obs",
          "validators": []
        }
      ]
    }
  ]
}
```

## file

Renders a file uploader widget from which one can upload image and PDF files from their devices, as well as capturing live images from a webcam.

![File field](/screens/fields-reference/file.gif)

## field-set

TODO

## problem

Renders a dropdown list that is hooked up to a Problem `DataSource`. This field will include answers that have the `Diagnosis`, `Problem` or `Symptom` class.

![Problem field](/screens/fields-reference/problem.gif)
