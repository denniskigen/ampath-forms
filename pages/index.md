---
title: AMPATH Forms - Build and test OpenMRS form schemas
---

{
// wrapped with {} to mark it as javascript so mdx will not put it under a p tag
}

<h1 className="text-center font-extrabold md:text-4xl mt-8 py-16">
  <div className="flex justify-center">
    ![AMPATH logo](logo.svg)
  </div>
</h1>

AMPATH Forms is a tool that helps you build and render OpenMRS form schemas. Conceptually, AMPATH Forms refers to a combination of two things - a [form builder](https://github.com/ampath/ngx-openmrs-formbuilder) and a [form engine](https://github.com/ampath/ngx-openmrs-formentry). The form builder enables users to build form schemas of arbitrary complexity. These schemas can be built interactively or by writing JSON code inside the embedded code editor. These schemas then get built and compiled by the form engine. The output of this process is a visual representation of the schema that users can interact with to enter data, test validations and more. These visual representations are an accurate mapping of how the related forms would appear in your frontend. Users can then save their forms to a server, making them available for use in a frontend for data entry.

<div className="py-20">![App screenshot](/screens/screen.png)</div>

<div className="mt-16 mb-20 text-center">
  [Get Started](/docs/getting-started) · [Form builder on
  GitHub](https://github.com/ampath/ngx-openmrs-formbuilder) · [Form engine on GitHub](https://github.com/ampath/ngx-openmrs-formentry)

</div>
