# Data sources

Data sources are a way to inject data into your application. This is useful for injecting data that is not available at build time, such as data from an API. The `DataSources` service allows you to register, access, and remove data sources in your application.

## Registering a data source

To register a data source, you first need to import the `DataSource` service into your component. Then, you can use the `registerDataSource` method to register a data source. The `registerDataSource` method takes two arguments: the unique name of the data source (the `key` parameter), the `unWrap` boolean property, and the data source object itself.

```ts
import { DataSources } from 'path/to/data-sources.service';

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

To remove a registered data source, you can use the `removeDataSource` method with the key you used to register the data source.

```ts
this.dataSources.removeDataSource('myDataSource')
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
