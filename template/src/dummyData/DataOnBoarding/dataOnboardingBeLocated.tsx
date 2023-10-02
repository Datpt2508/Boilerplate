import getImage from '~/libs/getImage';

export const dataOnboardingBeLocated = [
  {
    id: '1',
    image: require('../../resources/images/imageOnboarding2.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Check out 2 steps to start sharing your location:',
  },
  {
    id: '2',
    image: require('../../resources/images/imageOnboarding4.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Ask your loved one to send you the code on their “Locator" page',
  },
  {
    id: '3',
    image: require('../../resources/images/imageOnboarding5.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Tap “Add friend” button to get your code',
  },
];
