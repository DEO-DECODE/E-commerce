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
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip=resultPerPage*(currentPage-1);
    this.query=this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
// Product.find() is acting as a query
// queryStr= ? ke baad keyword=samosa
module.exports = ApiFeatures;
/*
ApiFeatures Class: This class is designed to handle API features for querying products. It takes a query (presumably a MongoDB query object) and a queryStr as parameters during instantiation.

The code snippet this.query = this.query.find({ ...keyword }); is part of the search method within the ApiFeatures class. Let's break down what this line is doing:

javascript
Copy code
search() {
  const keyword = this.queryStr.keyword
    ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }
    : {};
  this.query = this.query.find({ ...keyword });
  return this;
}
Search Method:
The search method is designed to handle search functionality for querying products.

Creating a Keyword Query:
It starts by checking if there is a keyword in the query string (this.queryStr.keyword). If a keyword exists, it creates a keyword object representing a MongoDB query for a case-insensitive regular expression search on the "name" field.

Applying the Query:
The line this.query = this.query.find({ ...keyword }); then takes the existing query (this.query) and applies the newly created keyword query to it using the find method. The { ...keyword } syntax is used to spread the properties of the keyword object into a new object.

Returning the Instance:
Finally, return this; is used to return the modified ApiFeatures instance. This allows for method chaining, where multiple methods can be called on the same instance consecutively.

*/
