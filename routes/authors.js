const express = require('express');
const authors = require('../models/authors');
const router = express.Router()
const author = require('../models/authors')

//All authors Route
router.get('/', async (req,res)=>{
  //  res.send('Hello World')
  let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
  try {
    const authors = await author.find(searchOptions)
    res.render('authors/index',{authors: authors, searchOptions:
    req.query })
  } catch
    {
        res.redirect('/')
    }

});
 
//New Author
router.get('/new', (req,res)=>{
    //  res.send('Hello World')
    res.render('authors/new',{author: new authors()})
  });

//Create Author Rout
router.post('/', async (req,res)=>{
    //  res.send('Hello World')
    const author = new authors({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new',{
                         author:author,
                         errorMessage: 'Error Creating Author' 
            })
    }
  });

module.exports = router;