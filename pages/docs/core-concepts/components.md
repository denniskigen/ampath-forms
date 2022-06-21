# Components

There may be situations where you might want to separate commonly-used form logic into disparate reusable bits. In such cases, you might want to structure that logic as a component form. Components can therefore be thought of as reusable forms that carry domain-specific information. Imagine a situation where you're creating a bunch of Forms for use in a Point of Care setting. You might find that multiple forms might need to have sections for collecting Pre-Clinic Review information. This Pre-Clinic Review information could include details such as:

- A patient's current HIV status
- Whether a visit was scheduled or not
- Reasons for a visit
- The current visit type
- A patient's insurance information

Now imagine having to define all of these sections and their accompanying questions in each of your forms. Components are the perfect tool for such situations. We'd need to create a Pre-Clinic Review component with all the relevant sections and questions. We'd then only need to reference this component in our forms and pick only the sections and questions we want.

As mentioned before, components and forms are functionally similar. The only difference between them is that you must use the prefix `component` in the form name when defining a component.

You can view a list of all the components available in the system by toggling the Forms List view from `POC Forms` to `Components`.

![Toggling between components and forms in the Forms List](/screens/toggle-components-forms.png)

Here's an example of an Adult HIV Status component schema:

```json
{
  "name": "component_adult-hiv-status",
  "uuid": "xxxx",
  "processor": "EncounterFormProcessor",
  "pages": [
    {
      "label": "Adult HIV Status",
      "sections": [
        {
          "label": "HIV Status",
          "questions": [
            {
              "label": "Current HIV status:",
              "type": "obs",
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
      ]
    }
  ]
}
```

Read more about components in the [Referencing forms](/docs/referencing-forms) guide.
