const packagesData = [
    {
      title: 'MVP Kickstarter',
      price: '$8,333/qtr',
      description: 'Turn your website or app idea into a reality.',
      features: [
        { label: 'Dedicated Trello task board', included: true },
        { label: 'Access to 1-1 slack channel', included: false },
        { label: 'Website and app launch to any store', included: false },
      ],
      bannerColor: 'bg-gradient-to-r from-gray-100 to-white',
    },
    {
      title: 'Custom Software Builder',
      price: '$10,416/qtr',
      description: 'Solve unique problems with custom built software.',
      features: [
        { label: 'Everything in MVP Kickstarter', included: true },
        { label: '1-1 zoom consultation over 50% faster development', included: true },
        { label: 'Custom integration to best fit your organisation and team', included: true },
      ],
      bannerColor: 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100',
    },
    {
      noFreeTrial: true,
      title: 'Customer Software Deluxe',
      price: '$12,499/qtr',
      description: 'Expand functionality of existing software.',
      features: [
        { label: 'Everything in Custom Software', included: true },
        { label: 'Bug fixes of existing code', included: true },
        { label: 'Improve existing code base', included: true },
      ],
      bannerColor: 'bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-200',
    },
  ];

  export default packagesData;