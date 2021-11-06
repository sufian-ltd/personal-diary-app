export const locale = {
    lang: 'en',
    data: {
        'NAV': [
            {
                id: 'dashboards',
                title: 'My Diary',
                type: 'group',
                icon: 'heroicons_outline:home',
                children: [
                    {
                        id: 'navigation-features.level.0',
                        title: 'Category',
                        icon: 'heroicons_outline:check-circle',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'navigation-features.level.0.1',
                                title: 'Category List',
                                type: 'basic',
                                link: '/categories'
                            }
                        ]
                    },
                    {
                        id: 'navigation-features.level.0',
                        title: 'Notes',
                        icon: 'heroicons_outline:check-circle',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'navigation-features.level.0.1',
                                title: 'Note List',
                                type: 'basic',
                                link: '/notes'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
