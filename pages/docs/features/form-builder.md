# Form Builder

When working with AMPATH Forms, the primary tool we'll be using is the Form Builder. The Form Builder provides an easy to use UI with which we can create forms of arbitrary complexity.

When you first visit the Form Builder [website](https://openmrs-spa.org/formbuilder/#/login), you'll see a login screen.

![Login page](/screens/login.png)

Choose `https://dev3.openmrs.org/openmrs` in the **OpenMRS Server URL** field and then enter your login credentials to sign in.

Once signed in, you should see this landing page.

![Landing page](/screens/landing.png)

Features on this page include:

- The `Create a new form` button. Clicking on this launches the Schema editor.
- The `Forms List view` dropdown. You can use it to toggle between displaying Forms and Components.
- The `Forms List search bar`. You can use it to search through the available forms by name.
- The `Forms List filter`. You can use this filter to limit your search to only forms that are published.
- The `Forms List` - A list of all the forms saved to the backend server. From it, you can see the form names and versions, their published status, their retired status, and a list of actions you can take. These actions include the ability to:
  - Edit a form schema. Clicking the `Edit` button loads the selected form's schema in the [Schema editor](#the-schema-editor).
  - Download a form schema by clicking the `Download` button.
  - Import a form schema by clicking the `Import` button. Useful for a when a form is missing the associated schema.
- `Pagination controls` - These are at the bottom of the Forms List. They allow you to navigate between the items in the Forms List.
