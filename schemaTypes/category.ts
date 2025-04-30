import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().error('Needed to know what it is')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      hidden: context => context?.document?.title === undefined,
      validation: rule => rule.custom(description => {
        if (!description) return "This is not required but website will look better with it"
        return true
      }).warning()
    }),
  ],
})
