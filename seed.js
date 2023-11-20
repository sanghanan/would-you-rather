const bcrypt = require('bcrypt');
const sequelize = require('./database'); // Adjust the path to your sequelize instance
const User = require('./models/user'); // Adjust the path to your User model
const Poll = require('./models/poll'); // Adjust the path to your Poll model


async function seedDatabase() {
    try {
        // Create an admin user
        const hashedPassword = await bcrypt.hash('admin', 10);
        await User.create({
            username: 'admin',
            password: hashedPassword,
            isAdmin: true
        });

        // Create a poll question
        await Poll.create({
            question: 'Would you rather have invisibility or super strength?',
            option1Text: 'Invisibility',
            option2Text: 'Super Strength'
        });

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        sequelize.close(); // Close the connection after seeding
    }
}

sequelize.sync({ force: false }) // Set 'force' to true to recreate tables
    .then(() => {
        console.log('Tables have been synchronized');
        seedDatabase();
    })
    .catch(err => console.error('Error synchronizing tables:', err));



