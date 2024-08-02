import capitalise from "./capitalise";

const capitaliseHeader = (sentence: string) => {
  const title = sentence?.split("</h1>")[0].split("<h1>")[1];
  const content = sentence?.split("</h1>")[1];
  const capitalisedTitle = capitalise(title);
  //addind the h1 tag
  const formattedTitle = "<h1>" + capitalisedTitle + "</h1>";
  const formattedArticle = formattedTitle + content;
  return formattedArticle;
};

export default capitaliseHeader;
