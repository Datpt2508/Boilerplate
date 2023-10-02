import getImage from '~/libs/getImage';

export const dataOnboardingLocate = [
  {
    id: '1',
    image: require('../../resources/images/imageOnboarding1.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Check out 3 steps to start locating others:',
  },
  {
    id: '2',
    image: require('../../resources/images/imageOnboarding3.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Tap “Add friend” button to get your code',
  },
  {
    id: '3',
    image: require('../../resources/images/imageOnboarding4.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Send the invite code to your loved one',
  },
  {
    id: '4',
    image: require('../../resources/images/imageOnboarding5.png'),
    imageBackGround: getImage('imageBackgroundApp'),
    title: 'Ask your loved one to paste the code on their “Be Located” page',
  },
];
