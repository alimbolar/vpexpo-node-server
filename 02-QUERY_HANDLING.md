# QUERY HANDLING

1. Structure the query
2. Call the query

---

## Structure the query

**Create APIFeatures Class in ./utils folder**

```
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1a : BASIC FILTERING
  filter() {
    // Create a shallow copy of the req.query so as to not mutate the original
    const queryObj = { ...this.queryString };

    // Create an array of keys to be able to delete these objectf from queryObj
    const excludedFields = ['sort', 'limit', 'page', 'skip', 'fields'];

    // Delete non-specific objects using their key from excludedFields array
    excludedFields.forEach(el => {
      delete queryObj[el];
    });

    // 1b : ADVANCED FILTERING

    // Create a new string from queryObj
    let queryStr = JSON.stringify(queryObj);

    // update the new string to update it for gte, lte, lt and lt variables
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`);


    // The argument object, which is the Mongoose Query, is then assigned the find method which used the parsed queryStr object
    this.query.find(JSON.parse(queryStr));

    // Return the original object so that it can be assigned other queries
    return this;
  }

  // 2 : SORTING
  sort() {
    // Check if there is sort argument in the req.query
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // // 3 : FIELDS LIMITING
  limitFields() {
    // Check if queryString (req.query) has 'fields'
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // 4 : PAGINATION
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;


```

## Call the query

**Create an instance of the APIFeatures class before a query in the controller**

```
const query = new APIFeatures(User.find(),req.query).filter().sort().limitFields().paginate();

const users = await query;

```
