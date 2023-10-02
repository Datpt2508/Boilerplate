const images = {
  imageModal: require('~/resources/images/imageModal.png'),
  bird: require('~/resources/images/bird.png'),
  Cyberpunk: require('~/resources/images/Cyberpunk.png'),
  Fantasy: require('~/resources/images/Fantasy.png'),
  // Realistic: require('~/resources/images/Realistic.png'),
  // Anime: require('~/resources/images/Anime.png'),
  Image: require('~/resources/images/Image.png'),
  girl: require('~/resources/images/girl.png'),
  noImage: require('~/resources/images/noImage.png'),
  robo: require('~/resources/images/robo.png'),
  artifyElements: require('~/resources/images/ArtifyElements.png'),
  background_modal: require('~/resources/images/background_modal.png'),
  imageScroll: require('~/resources/images/OnBoardingImage/imageScroll.png'),

  imageBackground: require('~/resources/images/imageBackground.png'),
  imageBackgroundApp: require('~/resources/images/imageBackgroundApp.png'),
  imageBackgroundShareCode: require('~/resources/images/imageBackgroundShareCode.png'),
  imageOnboarding: require('~/resources/images/imageOnBoarding.png'),
  imageOnboarding1: require('~/resources/images/imageOnboarding1.png'),
  imageOnboarding2: require('~/resources/images/imageOnboarding2.png'),
  imageOnboarding3: require('~/resources/images/imageOnboarding3.png'),
  imageOnboarding4: require('~/resources/images/imageOnboarding4.png'),
  imageOnboarding5: require('~/resources/images/imageOnboarding5.png'),
  beLocateOnboarding: require('~/resources/images/beLocateOnboarding.png'),
  imagePermission: require('~/resources/images/imagePermission.png'),
  imageOnboardingAndroid1: require('~/resources/images/imageOnboardingAndroid1.png'),
  imageOnboardingAndroid2: require('~/resources/images/imageOnboardingAndroid2.png'),
  imageOnboardingAndroid3: require('~/resources/images/imageOnboardingAndroid3.png'),
  //profile
  backgroundProfile: require('~/resources/images/ProfileImage/backgroundProfile.png'),
  people: require('~/resources/images/people.jpeg'),
  person: require('~/resources/images/person.webp'),
  avatarFriend: require('~/resources/images/AddFriend/avatar.jpg'),
  noZoneAlert: require('~/resources/images/noZoneAlert.png'),
  geoLocation: require('~/resources/images/geoLocation.png'),
};

export default (imageName: keyof typeof images) => {
  return images[imageName];
};
