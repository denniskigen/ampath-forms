# Sections

A section is an element of a form schema that groups together related questions.

It consists of a label, an `isExpanded` boolean property, and a set of questions. Sections get rendered in 'collapsed mode' by default. Set `isExpanded` to `true` in the section definition if you want section rendered in 'expanded mode'.

Below is an example of an `Encounter Details` page with a section labelled `Encounter Info`.

```json
{
  "pages": [
    {
      "label": "Encounter Details",
      "sections": [
        {
          "label": "Encounter Info",
          "isExpanded": "true",
          "questions": [
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
            },
            {
              "type": "encounterProvider",
              "label": "Provider",
              "id": "provider",
              "required": "true",
              "default": "",
              "questionOptions": {
                "rendering": "ui-select-extended"
              }
            },
            {
              "type": "encounterLocation",
              "label": "Facility name",
              "id": "location",
              "required": "true",
              "questionOptions": {
                "rendering": "ui-select-extended"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Referencing Sections from Components

Sections can also be constructed by referencing other sections from components _imported in_ using the [Reference components](/docs/referencing-components) feature.

```json
{
  // reference forms
  "referencedForms": [
    {
      "formName": "component_lab-orders",
      "alias": "lo",
      "ref": {
        "uuid": "ba985719-b085-419c-a0c7-3f1c3e61dd3e",
        "display": "Lab Orders Component"
      }
    },
    {
      "formName": "component_art",
      "alias": "art",
      "ref": {
        "uuid": "bd4ff44f-8007-49b0-b468-669fe0125093",
        "display": "Anti-Retroviral Therapy Component"
      }
    },
  ]

  // and then use the references to build up sections
  {
    "pages": [
      {
        "label": "Plan",
        "sections": [
          {
            "reference": {
              "form": "lo",
              "page": "Test orders",
              "section": "Test Orders"
            }
          }
        ]
      },
      {
        "label": "Medication Plan",
        "sections": [
          {
            "reference": {
              "form": "art",
              "page": "ART ",
              "section": "ART Plan",
              "excludeQuestions": [
                "artStartedPed"
              ]
            }
          }
        ]
      }
    ]
  }
}
```
