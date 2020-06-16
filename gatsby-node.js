const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({actions}) => {
  const { createNode } = actions;

  const getWeeklySpecialData = () => axios.get(process.env.WEEKLY_SPECIAL_FUNCTION_URL);
  const res = await getWeeklySpecialData();

  res.data.map((special, i) => {
    const specialNode = {
      id: `${special.SpecialId}`,
      parent: `__SOURCE__`,
      internal: {
        type: `WeeklySpecial`
      },
      children: [],
      productId: special.Product.ProductId,
      name: special.Product.Name,
      productNumber: special.Product.ProductNumber,
      color: special.Product.Color,
      listPrice: special.Product.ListPrice,
      salePrice: special.SalePrice
    };

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(specialNode))
      .digest(`hex`);

    specialNode.internal.contentDigest = contentDigest;

    createNode(specialNode);
  });

}