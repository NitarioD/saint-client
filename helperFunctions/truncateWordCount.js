export default function (paragraph, noOfCharacters) {
  if (typeof paragraph != "string" && typeof noOfCharacters != "number") {
    return;
  }
  if (paragraph.length <= noOfCharacters) {
    return paragraph;
  }
  const newParagraph = paragraph.slice(0, noOfCharacters) + "...";
  return newParagraph;
}
