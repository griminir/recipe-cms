import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule =>
        rule
          .required()
          .error('required to know what it is')
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: rule =>
        rule
          .required()
          .warning('not required but will make things look more complete if added')
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: "price in NOK",
      validation: rule =>
        rule
          .required()
          .warning('Will make things look more complete if added')
    }),
    defineField({
      name: 'url',
      title: 'Link To Product',
      type: 'url',
      validation: rule =>
        rule
          .required()
          .warning('Will give people a easy place to find the product if needed')
    }),
  ],
})
