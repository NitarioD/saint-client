export const listToObject = (object) => {
  const listOfObjects = object.map((list) => {
    const toObject = { [list[0]]: list[1] };
    return JSON.stringify(toObject);
  });
  const listToString = listOfObjects.join(",");
  return listToString;
};

export const objectToList = (list) => {
  const splittedLinks = list.split(",");
  const formatted_links = splittedLinks.map((link) => {
    //fuction to convert object key and value pair to list index 0 and 1
    const link_details_in_list_format = [];
    const linkInObjectFormat = JSON.parse(link);
    link_details_in_list_format.push(Object.keys(linkInObjectFormat)[0]);
    link_details_in_list_format.push(
      linkInObjectFormat[Object.keys(linkInObjectFormat)[0]]
    );
    return link_details_in_list_format;
  });
  return formatted_links;
};
