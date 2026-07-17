# Data sources

Data sources are a way to inject data into your application. This is useful for injecting data that is not available at build time, such as data from an API. The `DataSources` service allows you to register, access, and remove data sources in your application.

## Built-in endpoint data source

The Form Engine includes an `endpoint` data source for [`remote-select`](/docs/field-types-reference#remote-select) questions. It lets a form schema populate a searchable dropdown from a browser-accessible HTTP GET endpoint without requiring the consuming application to implement and register a data source.

```json
{
  "label": "Doctor",
  "id": "doctor",
  "type": "obs",
  "questionOptions": {
    "concept": "<concept-uuid>",
    "rendering": "remote-select",
    "datasource": {
      "name": "endpoint",
      "config": {
        "endpointUrl": "/ws/rest/v1/provider",
        "labelKey": "display",
        "valueKey": "uuid",
        "searchParam": "q",
        "limit": 20
      }
    }
  }
}
```

Typing a search term sends `GET /ws/rest/v1/provider?q={term}&limit=20`. The initial request omits `q` but still includes `limit=20`. When editing a saved form, the data source URL-encodes the stored provider UUID and requests `GET /ws/rest/v1/provider/{value}` so the dropdown can display its label.

Search responses can be a JSON array or an array under the configured `resultsKey`. A saved-value response can be a single item, a JSON array, or an array under `resultsKey`. For array responses, the first item is used. A failed search or saved-value request displays an error that is distinct from a successful search with no matches.

These configuration properties are available:

| Property             | Default                 | Description                                                                  |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------- |
| `endpointUrl`        | Required                | Endpoint queried for options                                                 |
| `labelKey`           | `display`               | Item property displayed as the option label                                  |
| `valueKey`           | `uuid`                  | Item property stored as the selected value                                   |
| `searchParam`        | `q`                     | Query parameter containing the typed search term                             |
| `resultsKey`         | `results`               | Response property containing the item array                                  |
| `limit`              | `20`                    | Page size sent with every search request                                     |
| `limitParam`         | `limit`                 | Query parameter containing the page size                                     |
| `resolveUrlTemplate` | `{endpointUrl}/{value}` | URL used to resolve a saved value. The `{value}` placeholder is URL-encoded. |

Use a relative `endpointUrl` when possible so the schema remains portable between environments. The consuming application must provide Angular's `HttpClient` for the built-in source to be registered. Without it, the rest of the Form Engine continues to work, but an `endpoint` dropdown has no options. An application can override the built-in behavior by registering its own data source under the name `endpoint`.

## Registering a data source

For use cases that require custom behavior, import the `DataSources` service into your component and use its `registerDataSource` method. The method takes three arguments: the unique name of the data source (the `key` parameter), the data source object itself, and an optional `unWrap` boolean (defaults to `false`).

```ts
import { DataSources } from '@openmrs/ngx-formentry';

constructor(private dataSources: DataSources) {}

ngOnInit() {
  this.dataSources.registerDataSource('myDataSource', myDataSourceObject, false)
  // ...
}
```

If the `unWrap` parameter is set to `true`, the service will register all the properties of the `dataSource` object individually. Note that if a data source with the same name already exists, it will be overwritten.

## Accessing a Data Source

To access a registered data source, you can use the `dataSources` getter method with the key you used to register the data source.

```ts
const myDataSource = this.dataSources.dataSources['myDataSource']
```

## Removing a Data Source

To remove a registered data source, you can use the `clearDataSource` method with the key you used to register the data source.

```ts
this.dataSources.clearDataSource('myDataSource')
```

## Example: Setting up a Location data source

Here's an example of how you can set up a location data source. This example uses the `LocationResourceService` to fetch location data from an API.

```ts
public getDataSources() {
  return ({
    location: this.getLocationDataSource(),
  })
}

public getLocationDataSource() {
  const resolve = (uuid: string) => {
    return this.getLocationByUuid(uuid);
  };

  const find = (text: string) => {
    return this.findLocation(text);
  };

  return {
    resolveSelectedValue: resolve,
    searchOptions: find
  };
}

public getLocationByUuid(uuid: string) {
  this.getEncounterLocationSiblingLocations(uuid);
  const locationSearchResults: BehaviorSubject<any> = new BehaviorSubject([]);

  return this.locationResourceService
    .getLocationByUuid(uuid, false)
    .pipe(
      map((location) => {
        return {
          label: location.display,
          value: location.uuid
        };
      })
    )
    .pipe(
      flatMap((mappedLocation) => {
        locationSearchResults.next(mappedLocation);
        return locationSearchResults.asObservable();
      }),
      catchError((error) => {
        locationSearchResults.error(error);
        return locationSearchResults.asObservable();
      })
    );
}

public findLocation(searchText): Observable<Location[]> {
  const locationSearchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);
  const findLocation = this.locationResourceService.searchLocation(
    searchText,
    false
  );
  findLocation.subscribe(
    (locations) => {
      const mappedLocations = locations.map((l: any) => {
        return {
          value: l.uuid,
          label: l.display
        };
      });
      locationSearchResults.next(mappedLocations.slice(0, 10));
    },
    (error) => {
      locationSearchResults.error(error); // test case that returns error
    }
  );
  return locationSearchResults.asObservable();
}
```

- `getDataSources()` returns an object with a single key `location` whose value is the result of calling `getLocationDataSource()`.
- `getLocationDataSource()` returns an object with two keys:

  - `resolveSelectedValue`: a function that takes a UUID string as input and returns an observable that emits an object with label and value properties corresponding to the location with the given UUID.
  - `searchOptions`: a function that takes a search string as input and returns an observable that emits an array of location objects (with `label` and `value` properties) that match the search string.

- `getLocationByUuid(uuid: string)` retrieves a location by UUID from the data source, transforms it into an object with `label` and `value` properties, and returns an observable that emits this object. The observable is initially empty but will emit the location object once it has been retrieved. If an error occurs, the observable emits an error.
- `findLocation(searchText)` searches the data source for locations matching the given search string, transforms the search results into an array of location objects with `label` and `value` properties, and returns an observable that emits this array. The observable is initially empty but will emit the array once the search results have been retrieved. If an error occurs, the observable emits an error.

Overall, these methods provide a way to retrieve and search for location data from the data source in a reactive and asynchronous manner, using RxJS observables. Read this [file](https://github.com/AMPATH/ng2-amrs/blob/084b33460856ed816d43852fc2eb37db3671a9da/src/app/patient-dashboard/common/formentry/form-data-source.service.ts#L1) to learn more about how data sources work in AMPATH POC.

## Data source names the engine expects

Several field types look up a data source by a well-known name at render time. When your form uses one of these field types, the consuming application must register a data source under the corresponding name before creating the form:

| Name              | Used by                                                | Purpose                                                               |
| ----------------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| `location`        | `encounterLocation` questions                          | Searching and resolving locations                                     |
| `provider`        | `encounterProvider` questions                          | Searching and resolving providers                                     |
| `drug`            | `drug` rendering                                       | Searching and resolving drugs                                         |
| `problem`         | `problem` rendering                                    | Searching and resolving problems/diagnoses concepts                   |
| `personAttribute` | `personAttribute` rendering                            | Searching and resolving person attribute values (e.g. locations)      |
| `conceptAnswers`  | `select-concept-answers` rendering (default)           | Fetching the answers of the concept named in `dataSourceOptions`      |
| `diagnoses`       | `diagnosis` rendering (default)                        | Searching diagnosis concepts, optionally filtered by concept class    |
| `file`            | `file` rendering                                       | Uploading and fetching file attachments                               |
| `rawPrevEnc`      | [Historical expressions](/docs/historical-expressions) | The previous encounter(s), exposed to expressions as `HD` (`prevEnc`) |
| `rawPrevObs`      | Historical expressions (optional)                      | Previous observations, exposed as `prevObs`                           |

Notes:

- For `select-concept-answers` and `diagnosis` questions, you can point at a differently named data source via `questionOptions.dataSource`.
- `remote-select` questions carry their data source name in the schema itself — either `questionOptions.dataSource` (with `questionOptions.dataSourceOptions`) or the O3-style `questionOptions.datasource` object with `name` and `config` properties.
- The built-in [`endpoint` data source](#built-in-endpoint-data-source) does not require host application registration when Angular's `HttpClient` is available.
- Every registered data source is also exposed to [JavaScript expressions](/docs/expression-helpers) by name, alongside the form's helper functions.

The Form Engine's [demo app](https://github.com/openmrs/openmrs-ngx-formentry/blob/main/src/app/app.component.ts) registers mock implementations of all of these names and is a good starting point for wiring up your own.
