import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Tts from "react-native-tts";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// ✅ Full A–Z Dataset
const DATA = [
  { letter: "A", word: "Apple", image: require("./assets/apple.jpg") },
  { letter: "B", word: "Ball", image: require("./assets/ball.jpg") },
  { letter: "C", word: "Cat", image: require("./assets/cat.jpg") },
  { letter: "D", word: "Dog", image: require("./assets/dog.jpg") },
  { letter: "E", word: "Elephant", image: require("./assets/elephant.png") },
  { letter: "F", word: "Fish", image: require("./assets/fish.jpg") },
  { letter: "G", word: "Grapes", image: require("./assets/grapes.jpg") },
  { letter: "H", word: "House", image: require("./assets/house.jpg") },
  { letter: "I", word: "Ice Cream", image: require("./assets/icecream.jpg") },
  { letter: "J", word: "Juice", image: require("./assets/juice.jpg") },
  { letter: "K", word: "Kite", image: require("./assets/kite.jpg") },
  { letter: "L", word: "Lion", image: require("./assets/lion.jpg") },
  { letter: "M", word: "Monkey", image: require("./assets/monkey.jpg") },
  { letter: "N", word: "Nest", image: require("./assets/nest.jpg") },
  { letter: "O", word: "Orange", image: require("./assets/orange.jpg") },
  { letter: "P", word: "Parrot", image: require("./assets/parrot.jpg") },
  { letter: "Q", word: "Queen", image: require("./assets/queen.png") },
  { letter: "R", word: "Rabbit", image: require("./assets/rabbit.jpg") },
  { letter: "S", word: "Sun", image: require("./assets/sun.jpg") },
  { letter: "T", word: "Tiger", image: require("./assets/tiger.jpg") },
  { letter: "U", word: "Umbrella", image: require("./assets/umbrella.jpg") },
  { letter: "V", word: "Van", image: require("./assets/van.jpg") },
  { letter: "W", word: "Watch", image: require("./assets/watch.jpg") },
  { letter: "X", word: "Xylophone", image: require("./assets/xylophone.png") },
  { letter: "Y", word: "Yak", image: require("./assets/yak.jpg") },
  { letter: "Z", word: "Zebra", image: require("./assets/zebra.jpg") },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    Tts.setDefaultLanguage("en-US");
    Tts.setDefaultRate(0.5);
    speakLetter(DATA[index]);
    animate();
  }, [index]);

  const speakLetter = (item) => {
    Tts.stop();
    Tts.speak(`${item.letter} for ${item.word}`);
  };

  const animate = () => {
    opacity.value = 0;
    scale.value = 0.8;
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withTiming(1, { duration: 500 });
  };

  const nextLetter = () => {
    if (index < DATA.length - 1) setIndex(index + 1);
    else setIndex(0);
  };

  const prevLetter = () => {
    if (index > 0) setIndex(index - 1);
    else setIndex(DATA.length - 1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const item = DATA[index];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.letter}>{item.letter}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.word}>{`${item.letter} for ${item.word}`}</Text>
      </Animated.View>

      {/* Navigation Buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.button} onPress={prevLetter}>
          <Text style={styles.buttonText}>⬅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextLetter}>
          <Text style={styles.buttonText}>➡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4B5",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 20,
    width: width * 0.85,
    elevation: 8,
  },
  letter: {
    fontSize: 120,
    color: "#FF6347",
    fontWeight: "bold",
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginVertical: 20,
  },
  word: {
    fontSize: 36,
    color: "#333",
    fontWeight: "600",
  },
  navContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#FF6347",
    borderRadius: 50,
    padding: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
