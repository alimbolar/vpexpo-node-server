# Data Modelling

### Decide on emebedding or referencing based on use case

Structure your data based on the way the application queries and updates data

Basically Identify the questions that arise from your applications use case and
then model your data so that those questions get answered in the most efficient
way.

In general always favour embedding, unless there is a good reason not to.
Especially in 1:FEW and 1:MANY relations.

1:TON and MANY:MANY are usually good reasons to reference rather than embed.

Also favour referencing if the data needs to be updated a lot or if you need to
frequently access the dataset on its own.

Use embedding when database is mostly read but rarely updated a lot and when 2
datasets belong intrinsically together.

Don't allow arrays to grow indefinitely. Therefore if you need to normalize, use
child referencing for 1:MANY and parent referencing for 1:TON relationships

Use two way referencing for MANY:MANY relationships

**Embedding with pre-save**

```
tourSchema = new mongoose.Schema({
...

guides : Array
},
...

})


...
```

```

tourSchema.pre('save', async function(){
    const guidesPromises = this.guides.map(async id=> await User.findById(id))

    this.guides = Promise.all(guidesPromises);
})



```

**Child Referencing with populate() in query**

```
tourSchema = new mongoose.Schema({

...

guides : [
{
    type : mongoose.Schema.Object.Id,
    ref : 'User'
}

]


...
})

```

```
exports.getAllTours = async function (req,res,next){
const tours = await Tour.find().populate('guides')

```

OR

```
exports.getAllTours = async function (req,res,next){
const tours = await Tour.find().populate({
    path : 'guides',
    select: ('-v -passwordChangedAt')
})

```

**This can be assigned to all find queries by creating this pre-find query
middleware**

```
tourSchema.pre(/^find/, function(next) {
  this.populate("guides");
  next();
});

```

**Parent Referencing with Virtual Populate**

In the model of the Parent add the code below for virtual fields

```

tourSchema.virtual('reviews',{
    ref : "Review",
    foreignField : 'tour',
    localField : '_id'
})

```

And then add the populate() in the query

```

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'reviews',
    select: 'review'
  });
}

```
