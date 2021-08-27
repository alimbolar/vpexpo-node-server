# Indexing

_Indexing takes the 'stress' out of searching and filtering as it uses the indexed files for this process and avoids having to run through all the documents when queried_

**Use .explain() method to get details on searches**

```
const getAll = await Tours.find().explain();

```

**For compound indexing use the format below in the model**

```
tourSchema.index({price :1,ratingsAverage:-1})

```

**For single indexing use the format below in the model**

_If a field has been indexed using compound index format it need not be indexed again even if one needs it as a single index_

```
tourSchema.index({slug:1});

```