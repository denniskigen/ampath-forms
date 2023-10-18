# Pages

Each page in your form schema gets rendered in a separate tab in the form viewer, so a page can be thought of as a way to encapsulate related form logic.

Below is an example of a page definition for a page capturing information related to an encounter. This page definition consists of a page `label` and a `sections` array. It has one section labelled `Encounter Info`. That section, in turn, has two questions labelled `Provider` and `Facility Name`, respectively.

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
              "label": "Facility name (site/satellite clinic required)",
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

Here's how this page definition gets rendered in the Form Viewer.

![Sample page](/screens/page.webp)

In practice, your form will likely have more than one page. As mentioned before, each page gets rendered as a tab in the form viewer. You can cycle through the pages by clicking the forward and back buttons at the bottom of the page. You can also click on a specific tab header to open that page.

Here's how a form with multiple pages looks like:

![Page with sections](/screens/page-with-sections.webp)
