# Historical Expressions

A historical expression is a JavaScript expression that can be evaluated to determine the value of a form field. The expression can reference historical encounter and observation data, as well as additional scope values. Historical expressions are optionally available for all form fields. They are useful for helping to determine the value of a form field based on historical data from a past encounter. If a historical value is available, a button gets shown next to the form labelled `Use value`. Clicking this button sets the value of the form field to the historical value.

Historical expressions are defined in the form schema as part of a [question definition](/docs/core-concepts/questions#defining-a-question) object.

```json filename="snippet.json"
{
  "label": "Height (cm)",
  "questionInfo": "",
  "id": "height",
  "historicalExpression": "HD.getObject('prevEnc').getValue('a8a6619c-1350-11df-a1f1-0026b9348838')",
  "questionOptions": {
    "rendering": "number",
    "concept": "a8a6619c-1350-11df-a1f1-0026b9348838",
    "max": "350",
    "min": "0"
  },
  "type": "obs",
  "validators": []
},
```

In the example above, the historical expression is `HD.getObject('prevEnc').getValue('a8a6619c-1350-11df-a1f1-0026b9348838')`. This expression is evaluated to determine the value of the `height` question. The expression is evaluated using the [HistoricalHelperService](https://github.com/openmrs/openmrs-ngx-formentry/blob/9dbbf324fcc6ec6fa49fe4f954801f173a00c764/projects/ngx-formentry/src/form-entry/helpers/historical-expression-helper-service.ts). `HD` represents an instance of the `HistoricalHelperService` class. The `getObject` function on the `HistoricalHelperService` class returns the previous encounter object (referred to here as `prevEnc`), whereas the `getValue` function on the `HistoricalEncounter` class returns the value of the question with the specified concept UUID. The `HistoricalHelperService` class is able to draw out the value of the question from the previous encounter because the question has the same backing concept UUID in the current encounter as it did in the previous encounter.

Defining a historical expression for a question is optional. If a question does not have a historical expression, it will be evaluated as normal. If it does have a historical expression, the expression will be evaluated and the result will be made available to use as the value of the question (see the GIF below for an example of this in practice).

Historical expressions are evaluated using the [HistoricalHelperService](https://github.com/openmrs/openmrs-ngx-formentry/blob/9dbbf324fcc6ec6fa49fe4f954801f173a00c764/projects/ngx-formentry/src/form-entry/helpers/historical-expression-helper-service.ts#L12) class, which provides a convenient way to evaluate expressions that depend on historical encounter and observation data.

## Syntax

Historical expressions typically consist of boolean logic that evaluates to true or false. The following snippet shows the code for a question in an `HIV Adult Return encounter` form that answers whether a patient is covered by the national health insurance scheme, NHIF.

```json {2-4}
{
  "label": "Is patient covered by NHIF",
  "id": "nhif",
  "historicalExpression": "_.isEmpty(HD.getObject('prevEnc').getValue('0b49e3e6-55df-4096-93ca-59edadb74b3f')) ? undefined : HD.getObject('prevEnc').getValue('0b49e3e6-55df-4096-93ca-59edadb74b3f')",
  "questionOptions": {
    "rendering": "select",
    "concept": "0b49e3e6-55df-4096-93ca-59edadb74b3f",
    "answers": [
      {
        "concept": "8b715fed-97f6-4e38-8f6a-c167a42f8923",
        "label": "Yes"
      },
      {
        "concept": "a899e0ac-1350-11df-a1f1-0026b9348838",
        "label": "No"
      }
    ]
  },
  "type": "obs",
  "validators": []
}
```

If we break down the historical expression, we can see that it consists of a ternary operator that checks whether the patient has a previous encounter. If the patient has a previous encounter, the expression returns the value of the NHIF question from the previous encounter. If the patient does not have a previous encounter, the expression returns `undefined`. It's using the `isEmpty` function from `lodash` and passing in the value of the NHIF question from the previous encounter. This value is obtained by calling the `getValue` function on the `HistoricalEncounter` object, which is obtained by calling the `getObject` function on the `HistoricalHelperService` class. The value passed to `getValue` is the backing concept UUID of the NHIF question. The `HistoricalHelperService` is able to draw out the value of the NHIF question from the previous encounter because the NHIF question has the same backing concept UUID in the current encounter as it did in the previous encounter.

Below is a GIF showing this in practice:

![Using historical values](/screens/use-historical-value.gif)

Here's a [snippet](https://github.com/openmrs/openmrs-esm-patient-chart/blob/9100fdc918386e926ddf98ca2e8791bbf0b294ec/packages/esm-form-entry-app/src/app/form-creation/form-creation.service.ts#L99-L220) from O3's [esm-form-entry-app](https://github.com/openmrs/openmrs-esm-patient-chart/tree/main/packages/esm-form-entry-app) which shows how the encounter data source gets wired up:

```ts
private async wireDataSources(createFormParams: CreateFormParams, formSchema: FormSchema) {
  const visitTypeUuid = this.singleSpaPropsService.getPropOrThrow('visitTypeUuid');
  const patient = this.singleSpaPropsService.getPropOrThrow('patient');

  // Clear any previously configured data sources.
  // Reason: If a config value changes in between two invocations, that data source would otherwise stick
  // until the page is refreshed (all other data sources would be overridden as expected).
  for (const dataSourceKey of Object.keys(this.dataSources.dataSources)) {
    this.dataSources.clearDataSource(dataSourceKey);
  }

  // Fixed data sources which are always required.
  // We re-register them during each form creation flow because props like the logged-in user or patient
  // can change in between.
  const dataSources = this.formDataSourceService.getDataSources(formSchema);
  this.dataSources.registerDataSource('location', dataSources.location);
  this.dataSources.registerDataSource('provider', dataSources.provider);
  this.dataSources.registerDataSource('drug', dataSources.drug);
  this.dataSources.registerDataSource('problem', dataSources.problem);
  this.dataSources.registerDataSource('personAttribute', dataSources.location);
  this.dataSources.registerDataSource('conceptAnswers', dataSources.conceptAnswers);
  this.dataSources.registerDataSource('diagnoses', dataSources.diagnoses);
  this.dataSources.registerDataSource('patient', { visitTypeUuid }, true);
  const patientObj = this.formDataSourceService.getPatientObject(patient);
  this.dataSources.registerDataSource('patient', patientObj, true);
  this.dataSources.registerDataSource('rawPrevEnc', createFormParams.previousEncounter, false);
  const rawPrevObs = await dataSources.recentObs(patient.id);
  this.dataSources.registerDataSource('rawPrevObs', rawPrevObs, false);
  this.dataSources.registerDataSource('userLocation', createFormParams.session.sessionLocation);
}
```

We're grabbing the previous encounter and registering it with the [HistoricalEncounterDataService's](https://github.com/openmrs/openmrs-ngx-formentry/blob/9dbbf324fcc6ec6fa49fe4f954801f173a00c764/projects/ngx-formentry/src/form-entry/services/historical-encounter-data.service.ts#L9) encounter store and making it accessible via a key called `rawPrevEnc`. This is what allows us to access the previous encounter data in the form schema. We're then registering observations from the previous encounter under the `rawPrevObs` key. This is what allows us to access the previous encounter observations in the form schema.
