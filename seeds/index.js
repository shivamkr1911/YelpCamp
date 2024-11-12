const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error:', err));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '672d0fd8f7b15d1dd3441bfd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Repudiandae id beatae rerum tempore possimus eum! Totam a eligendi ipsam explicabo architecto unde doloremque sit praesentium ratione! Dolor ullam reiciendis facilis!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgdtqxo9c/image/upload/v1731183550/YelpCamp/mipfkfx7pdslls0k7ty1.jpg',
                    filename: 'YelpCamp/mipfkfx7pdslls0k7ty1',
                },
                {
                    url: 'https://res.cloudinary.com/dgdtqxo9c/image/upload/v1731183551/YelpCamp/dxrkuhxn1zlapanvjpc0.jpg',
                    filename: 'YelpCamp/dxrkuhxn1zlapanvjpc0',
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})