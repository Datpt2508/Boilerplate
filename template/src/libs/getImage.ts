const images = {
  imageBackgroundApp: require('~/resources/images/imageBackgroundApp.png'),

  //animation
  homeAnimate: require('~/resources/json/homeAnimation.json'),
  moon: require('~/resources/json/moon.json'),
  profile: require('~/resources/json/profile.json'),
  moon2: require('~/resources/json/music.json'),
};

export default (imageName: keyof typeof images) => {
  return images[imageName];
};
