import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Rating = ({ onRatingChange }: any) => {
  const [rating, setRating] = useState(0);

  const handleRatingPress = (value: any) => {
    setRating(value);
    onRatingChange && onRatingChange(value);
  };

  const renderRatingStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? 'gold' : 'gray';
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRatingPress(i)}>
          <Text style={{ color: starColor, fontSize: 30 }}>★</Text>
        </TouchableOpacity>,
      );
    }

    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderRatingStars()}</View>;
};

export default Rating;
