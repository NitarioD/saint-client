// @ts-nocheck
const sortByTags = (data) => {
  try {
    //arrange the data based on the tags
    const newData = {};
    //get all the unique tags
    const uniqueTags = [];
    data.map((video) => {
      const tagName = video.tag.tag;

      if (!uniqueTags.includes(tagName)) {
        uniqueTags.push(tagName);
        newData[tagName] = [video];
      } else {
        newData[tagName].push(video);
      }
    });
    //return newData to array format
    return Object.entries(newData);
  } catch (error) {
    console.log(error);
  }
};

export default sortByTags;
