# Validating Dates

This type of validation enforces certain conditions for [date](/docs/field-types-reference#date) inputs. You can use date validation to guarantee that a date input only allows:

- Past or present dates
- Past, present or future dates

Here's a question from the `Reproductive History` section of an `HIV Adult Return visit` form:

```json
{
  "label": "LMP",
  "id": "lmpDate1",
  "questionOptions": {
    "concept": "a89ff758-1350-11df-a1f1-0026b9348838",
    "rendering": "date"
  },
  "type": "obs",
  "validators": [
    {
      "type": "date"
    }
  ]
}
```

This question seeks to establish when the client last menstruated (LMP is short for `Last menstrual period`). Note that the first value of the validators array is a validator of type `date`. To properly understand what this date validator is doing, it might help to look at this snippet from its source code:

```javascript {8-9}
// Question validator factory
if (question.validators) {
  _.forEach(question.validators, (validator: ValidationModel) => {
    switch (validator.type) {
      case 'date':
        list.push(this.dateValidator);

        const allowFutureDates: boolean = (<DateValidationModel>validator)
          .allowFutureDates;

        if (!allowFutureDates) {
          list.push(this.futureDateRestrictionValidator);
        }
        break;
      }
    }
  }
}
```

We see that the validator optionally has a property named `allowFutureDates` and that this property defaults to `false`. The date validator will, by default, not allow you to set a future date as the value of the field. If you do so, it will render a validation error:

![Date based validation example](/screens/date-based-validation.gif)

You can override this behaviour and permit setting dates in the future by setting `allowFutureDates` to true in your validator definition:

```json
{
  "validators": [
    {
      "type": "date",
      "allowFutureDates": "true"
    }
  ]
}
```
