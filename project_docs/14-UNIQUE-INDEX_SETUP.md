# Unique Index

_When you want to have a rule about combination of multiple fields to be unique, you need to create a compound index with the option object with the unique:true setting_

**The code below needs to be added in the Model file to ensure that each user can update only one review**

```
reviewSchema.index({review:1,user:1},{unique:true})

```


