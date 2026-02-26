// metaHelpers.js


export const getMetaDescriptionByMetaName = (data, metaName) => {
  // console.log("from meta helper",jsonData?.data);
  const foundItem = data?.find((item) => item.meta_name === metaName);
  // console.log("from meta helper", foundItem ? foundItem?.meta_value :null);
  return foundItem ? foundItem.meta_description : null;
};


export const getMetaValueByMetaName = (data, metaName) => {
  // console.log("from meta helper",jsonData?.data);
  const foundItem = data?.find((item) => item.meta_name === metaName);
  // console.log("from meta helper", foundItem ? foundItem?.meta_value :null);
  return foundItem ? foundItem.meta_value : null;
};

export const getMetaValueFromExtraFields = (jsonData, metaName) => {
  //console.log(jsonData?.extraFields);
  const foundItem = jsonData?.extraFields?.find((item) => item.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};

export const getMetaValueFromExtra_Fields = (jsonData, metaName) => {
  // console.log("from metaFrom extra:",jsonData, metaName);
  const foundItem = jsonData?.extra_fields?.find((item) => item?.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};



export const getImageFromExtraFields = (jsonData, metaName) => {
  //console.log(jsonData?.extraFields);
  const foundItem = jsonData?.extraFields?.find((item) => item.meta_name === metaName);
  return foundItem ? foundItem.single_image_url : null;
};




export const getMetaValueFromExtraFieldsNonCapital = (jsonData, metaName) => {
  //console.log(jsonData?.extraFields);
  const foundItem = jsonData?.extra_fields?.find((item) => item.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};

export const getMediaLinkByMetaName = (data, metaName) => {
  if (!data || !metaName) return null;

  const item = data.find(
    (dataItem) => dataItem.meta_name === metaName
  );
// console.log("from utils", item)
  if (item?.file_directory && item?.filename) {
    return item.file_directory + item.filename;
  }

  return null;
};



// {product?.extra_fields.find(field => field.meta_name === "product_model")?.meta_value}