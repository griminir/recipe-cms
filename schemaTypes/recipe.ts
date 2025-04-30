import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      hidden: (context) => !context?.document?.title,
      validation: (rule) =>
        rule.required().error('Needed to generate website'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) =>
        rule
          .custom((image) => {
            if (!image)
              return "We will provide a default image if you don't provide one but it looks better if you provide your own";
            return true;
          })
          .warning(),
    }),
    defineField({
      name: 'ingredientList',
      title: 'Ingredient List',
      type: 'array',
      of: [
        {
          type: 'object',
          options: {
            columns: 3,
          },
          fields: [
            defineField({
              name: 'amount',
              title: 'Amount',
              type: 'number',
              validation: (rule) =>
                rule.required().error('Amount is required'),
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              options: {
                list: [
                  'jar',
                  'ml',
                  'grams',
                  'dl',
                  'l',
                  'tsp',
                  'tbsp',
                  'fl oz',
                  'cup',
                  'pint',
                  'gal',
                  'mg',
                  'gallon',
                  'kg',
                  'lb',
                  'oz',
                  'inch',
                ],
              },
            }),
            defineField({
              name: 'ingredient',
              title: 'Ingredient',
              type: 'reference',
              to: [{ type: 'ingredient' }],
            }),
          ],
          preview: {
            select: {
              amount: 'amount',
              unit: 'unit',
              ingredientTitle: 'ingredient.title',
              picture: 'ingredient.image'
            },
            prepare({amount, unit, ingredientTitle, picture}){
              return {
                title: `${amount || ''} ${unit || ''}`,
                subtitle: ingredientTitle || 'No ingredient selected',
                media: picture || ''
              }
            }
          }
        },
      ],
    }),
  ],
});
