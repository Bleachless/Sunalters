const activity = [
    "She Knows",
    '505',
    'The Less I Know The Better',
    'What About Me',
    'What A Wonderful World',
    'The Moment',
  ];
  
  const getRandomActivity = () => {
    const randomIndex = Math.floor(Math.random() * activity.length);
    return activity[randomIndex];
  };
  
  module.exports = getRandomActivity