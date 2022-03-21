const Joke = require('../models/jokes.model');

module.exports.helloWorld = (req, res) => {
    res.json({message:"hello world!"})
}

module.exports.getAllJokes = (req, res) => {
    Joke.find()
        .then(allJokes => res.json({ jokes: allJokes }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.getOneJoke = (req, res) => {
    Joke.findOne({ _id: req.params._id })
        .then(oneJoke => res.json({ joke: oneJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.getRandomJoke = (req, res) => {
    Joke.find()
        .then(allJokes => {
            let randomJoke = Math.floor(Math.random() * allJokes.length);
            res.json({ jokes: allJokes[randomJoke] })
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createJoke = (req, res) => {
    Joke.create(req.body)
        .then(newJoke => res.json({ joke: newJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateJoke = (req, res) => {
    Joke.findOneAndUpdate(
        { _id: req.params._id},
        req.body,
        { new: true, runValidators: true}
    )
        .then(updatedJoke => res.json({ joke: updatedJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteJoke = (req, res) => {
    Joke.deleteOne({ _id: req.params._id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}