const capitalise = (sentence: any) => {
  if (typeof sentence == "string") {
    const words = sentence.split(" ");
    const capitalizedWordsInArray = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      return firstLetter + word.slice(1);
    });
    return capitalizedWordsInArray.join(" ");
  }
};

export default capitalise;
