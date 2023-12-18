class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //   Now ading Search Features
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
            // Meaning case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
}
// Product.find() is acting as a query
// queryStr= ? ke baad keyword=samosa
module.exports = ApiFeatures;
