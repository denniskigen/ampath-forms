# Troubleshooting

> **Angular Form Engine scope.** This page documents `@openmrs/ngx-formentry`. Equivalent schema fields may behave differently in the React Form Engine. See [About this documentation](/docs/about-this-documentation).

The Angular Form Engine rarely reports schema mistakes. Most problems show up as a form that behaves differently from what you expected, with no error. Find the symptom below, then follow the link for details.

## A question renders as a plain text input

- The rendering is misspelled, uses the wrong case, or comes from another engine. See [Field Types Reference](/docs/field-types-reference).
- The question uses `ui-select-extended` with a question type it doesn't support. See [ui-select-extended](/docs/field-types-reference#ui-select-extended).

## A question never hides

- The expression throws, usually because it references an id that isn't in the form, or it contains the word `return`. See [How expressions are evaluated](/docs/expression-helpers#how-expressions-are-evaluated).
- The `field` and `value` shorthand has a `value` that isn't an array. See [Using the field and value shorthand](/docs/conditional-rendering#using-the-field-and-value-shorthand).
- The `hide` property is misspelled, for example `hideExpressionWhen`. See [Defining a question](/docs/core-concepts/questions#defining-a-question).

## A validator never fails

- The `failsWhenExpression` throws. See [How expressions are evaluated](/docs/expression-helpers#how-expressions-are-evaluated).
- `required` is the boolean `true` instead of the string `"true"`. See [Defining a question](/docs/core-concepts/questions#defining-a-question).
- Only one of `min` and `max` is set. See [Numeric constraints](/docs/validation/other-validation-types#numeric-constraints-via-questionoptions).
- The validator has the type `decimal`, which the engine doesn't support. See [numeric and decimal](/docs/field-types-reference#numeric-and-decimal).

## A date field rejects future dates

- `allowFutureDates` is missing, misspelled, or isn't the string `"true"`. See [Validating Dates](/docs/validation/date-based-validation).

## A calculated question gets the value `false`

- The `calculateExpression` throws. See [How expressions are evaluated](/docs/expression-helpers#how-expressions-are-evaluated).

## Questions are missing from the form

- The questions use the `field-set` rendering, which the engine skips along with their child questions. See [field-set](/docs/field-types-reference#field-set).
- Every question in a section is hidden, which hides the section too. See [Hiding Fields](/docs/conditional-rendering).

## A value the user entered disappeared

- The question was hidden after the user filled it in. See [What happens to a hidden question](/docs/conditional-rendering#what-happens-to-a-hidden-question).

## A property seems to have no effect

- Property names are case-sensitive, and misspelled properties are ignored. See [Defining a question](/docs/core-concepts/questions#defining-a-question).
- `showWeeks` doesn't do anything. Use `weeksList`. See [date](/docs/field-types-reference#date).
- `historicalPrepopulate` ignores `allowedHistoricalValueAgeInDays` when it's a string. See [Prefilling the historical value](/docs/historical-expressions#prefilling-the-historical-value).
