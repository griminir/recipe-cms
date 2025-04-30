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
      validation: rule => rule.required().error('recipe needs a title')
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
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'category'}],
      }
      ],
      validation: rule => rule.required().info('This will help the recipe show up in different search categories'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) =>
        rule
          .required()
          .warning("We will provide a default image if you don't provide one but it looks better if you provide your own"),
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
              validation: rule => rule.required().warning("You dont have to choose a unit of measurement but it will help the cook")
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
