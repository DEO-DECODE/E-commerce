class ApiFeatures {
  /*
  ApiFeatures Class: This class is designed to handle API features for querying products. It takes a query and a queryStr as parameters during instantiation.
  */
  /*
  Product.find() is acting as a query
  queryStr= ? ke baad keyword=samosa
  */
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //   Now ading Search Features
  search() {
    /*
  It starts by checking if there is a keyword in the query string (this.queryStr.keyword). If a keyword exists, it creates a keyword object representing a MongoDB query for a case-insensitive regular expression search on the "name" field.
*/
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
    /*
    The line this.query = this.query.find({ ...keyword }); then takes the existing query (this.query) and applies the newly created keyword query to it using the find method. 
    */
    return this;
    /*
    It is used to return the modified ApiFeatures instance. This allows for method chaining, where multiple methods can be called on the same instance consecutively.
    */
  }
  // Filter for category
  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove some Fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // Fields like "keyword", "page" and "limit" will get removed

    // Filter for Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    // Since mongoDB contains $before key name
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
  /*
    \b asserts a word boundary, ensuring that the match is a whole word.
    (gt|gte|lt|lte) is a capturing group that matches one of the specified words:   "gt",   "gte", "lt", or "lte".
    \b again asserts a word boundary.
    The g flag at the end of the regular expression stands for "global," meaning it will replace all occurrences in the string, not just the first one.
  */
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;

