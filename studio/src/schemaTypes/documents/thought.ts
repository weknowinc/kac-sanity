import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'thought',
    title: 'Thought',
    type: 'document',
    fields: [
        defineField({
            name: 'body',
            title: 'Body',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            options: {
                list: [
                    { title: 'X', value: 'X' },
                    { title: 'Instagram', value: 'Instagram' },
                    { title: 'Self', value: 'Self' },
                    { title: 'Other', value: 'Other' },
                ],
            },
            initialValue: 'Self',
        }),
        defineField({
            name: 'sourceUrl',
            title: 'Source URL',
            type: 'url',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'body',
            subtitle: 'source',
        },
    },
})
