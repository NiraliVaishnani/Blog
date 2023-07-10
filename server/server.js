const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer = require('multer');
app.use(express.static('public'));
const nodemailer = require('nodemailer');



const connection = mysql.createConnection({
    host: '40.114.69.227',
    user: 'dotnet_SumitM',
    password: 'LYqNqV4QKK8w',
    database: 'dotnet_SumitM'
})
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Successfull.......")
})
const sequelize = new Sequelize('dotnet_SumitM', 'dotnet_SumitM', 'LYqNqV4QKK8w', {
    host: '40.114.69.227',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    description: Sequelize.STRING,
    image: Sequelize.STRING,

}, {
    tableName: 'Blog',
    timestamps: false,
})

Blog.sequelize.sync()
    .then(() => {
        console.log("yes re sync")
    })


const EmailTemplate = sequelize.define('emailtemplate', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: Sequelize.STRING,
    body: Sequelize.STRING,

}, {
    tableName: 'BlogEmailTemplate',

})

const BlogSetting = sequelize.define('Setting', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Key: Sequelize.STRING,
    Value: Sequelize.STRING,

}, {
    tableName: 'BlogSetting'
})

const Register = sequelize.define('register', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,

}, {
    tableName: 'BlogUserregistration'
})


const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });


// app.get('/api/blog', async (req, res) => {
//     const sql = await Blog.findAll({
//         attributes: [
//             'id',
//             'title',
//             [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
//             'description', 'image'

//         ],

//     });
//     res.json(sql);
// })
const { Op } = require('sequelize');

app.get('/api/blog', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const perPage = 3; // Number of blogs per page
    const offset = (page - 1) * perPage; // Calculate the offset
    const searchTerm = req.query.search || '';
    try {

        const searchCondition = {
            [Op.or]: [
                { title: { [Op.like]: `%${searchTerm}%` } },
                { description: { [Op.like]: `%${searchTerm}%` } }
            ]
        };
        // Retrieve blogs from the database with pagination
        const blogs = await Blog.findAll({
            attributes: [
                'id',
                'title',
                [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                'description',
                'image'
            ],
            where: searchCondition,
            limit: perPage,
            offset: offset
        });

        // Count the total number of blogs
        const totalCount = await Blog.count({ where: searchCondition });

        res.json({
            blogs,
            totalPages: Math.ceil(totalCount / perPage),
            currentPage: page
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.get('/api/blog/search', async (req, res) => {

// });

app.get('/api/blog/search', async (req, res) => {
    const { title } = req.query; // Get the title query parameter

    try {
        // Perform search by title
        const blogs = await Blog.findAll({
            attributes: [
                'id',
                'title',
                [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                'description',
                'image'
            ],
            where: {
                title: {
                    [Sequelize.Op.like]: `%${title}%`
                }
            }
        });

        res.json({ blogs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/blog', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file; // Access the uploaded image file
    try {
        const sql = await Blog.create({ title, description, image: image.filename });
        res.json(sql);
        console.log(req.image);

    }
    catch (err) {
        console.log(err)
    }
});




// app.post('/api/blog', async (req, res) => {
//     const { title, description } = req.body;

//     try {
//         const sql = await Blog.create({ title, description });
//         res.json(sql);

//     }
//     catch (err) {
//         console.log(err)
//     }
// });


app.get('/api/blog/:id', async (req, res) => {
    const sql = await Blog.findByPk(req.params.id);
    res.json(sql);
})


app.post('/api/blog/:id', upload.single('image'), async (req, res) => {

    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const image = req.file; // Access the uploaded image file
        await Blog.update({ title, description, image: image.filename }, { where: { id: id } });
        const updatedTask = await Blog.findByPk(id); // Retrieve the updated task from the database
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.delete('/api/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Blog.destroy({ where: { id: id } });
        res.json('Deleted successfully')
    } catch {
        res.json('Error')
    }
})

app.get('/api/emailtemplate', async (req, res) => {
    const response = await EmailTemplate.findAll();
    res.json(response);
})

app.get('/api/emailtemplate/:id', async (req, res) => {
    const sql = await EmailTemplate.findByPk(req.params.id);
    res.json(sql);
})


app.post('/api/emailtemplate', async (req, res) => {
    const { subject, body } = req.body;
    try {
        const sql = await EmailTemplate.create({ subject, body });
        res.json(sql);
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/api/emailtemplate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { subject, body } = req.body;
        await EmailTemplate.update({ subject, body }, { where: { id: id } });
        const updatedTask = await EmailTemplate.findByPk(id); // Retrieve the updated task from the database
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.delete('/api/emailtemplate/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await EmailTemplate.destroy({ where: { id: id } });
        res.json('Deleted successfully')
    } catch {
        res.json('Error')
    }
})


app.get('/api/setting', async (req, res) => {
    const settings = await BlogSetting.findAll();
    res.json(settings);
});

app.get('/api/setting/:id', async (req, res) => {
    const setting = await BlogSetting.findByPk(req.params.id)
        .then((user) => {
            if (!user) {
                res.json('User not found');
            } else {
                res.json(user);
            }
        })
});


app.post('/api/setting', async (req, res) => {
    const { Key, Value } = req.body;
    try {
        const newSetting = await BlogSetting.create({ Key, Value });
        res.json(newSetting);
    } catch (error) {
        console.error('Error creating Setting:', error);
        res.status(500).send('Error creating Setting.');
    }
});
app.post('/api/setting/:id', async (req, res) => {
    const { Key, Value } = req.body;
    const id = req.params.id;
    try {
        await BlogSetting.update(
            {
                Key: Key,
                Value: Value,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        const updatedSetting = await BlogSetting.findByPk(id);
        res.json(updatedSetting);
    } catch (error) {
        console.error('Error updating Setting:', error);
        res.status(500).send('Error updating Setting.');
    }
});


app.delete('/api/setting/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BlogSetting.destroy({
            where: {
                id: id
            }
        });
        res.json('Deleted successfully')
    } catch (error) {
        res.json('Error')
    }
});


app.get('/api/account/register', async (req, res) => {
    const sql = await Register.findAll();
    res.json(sql);
})


app.post('/api/account/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const sql = await Register.create({ username, email, password })
        res.json(sql);

    }
    catch (err) {
        console.log(err)
    }
});

app.post('/api/account/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Register.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ email }, 'nirali');
                res.cookie('token', token);
                console.log(token);
                res.status(200).json({ message: 'Login successful', token }); // Include the token field in the response
            } else {
                res.json({ message: 'Invalid password' });
            }
        } else {
            res.json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();

    }
    else {
        res.send({ result: 'Token is not valid' })
    }

}
app.post("/api/account/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, 'nirali', (err, authData) => {
        if (err) {
            resp.send({ result: "invalid token" })
        } else {
            res.json({
                message: "profile accessed", authData
            })
        }
    })
})


const Country = sequelize.define('Country', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    tableName: 'UserCountry'
}
);

const State = sequelize.define('State', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    tableName: 'UserState'
});

const City = sequelize.define('City', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    tableName: 'UserCity'
});

const Role = sequelize.define('Country', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolename: Sequelize.STRING
}, {
    tableName: 'Userrole'
}
);

const UserProfile = sequelize.define('UserProfile', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    tableName: 'UserProfile',
})

const Address = sequelize.define('Address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country: {
        type: Sequelize.STRING,
        field: 'country'
    },
    state: {
        type: Sequelize.STRING,
        field: 'state'
    },
    city: {
        type: Sequelize.STRING,
        field: 'city'
    }
}, {
    tableName: 'UserAddress',
});

Address.sequelize.sync()
    .then(() => {
        console.log("yes re sync")
    })


Country.hasMany(State, { foreignKey: 'countryId' });
State.belongsTo(Country, { foreignKey: 'countryId' });

State.hasMany(City, { foreignKey: 'stateId' });
City.belongsTo(State, { foreignKey: 'stateId' });

Country.sequelize.sync()
    .then(() => {
        console.log("yes re sync")
    })

app.get('/api/address/countries', async (req, res) => {
    const countries = await Country.findAll();
    res.json(countries);
});

app.get('/api/address/state/:countryId', async (req, res) => {
    const states = await State.findAll({
        where: { countryId: req.params.countryId }
    });
    res.json(states);
});

app.get('/api/address/city/:stateId', async (req, res) => {
    const cities = await City.findAll({
        where: { stateId: req.params.stateId }
    });
    res.json(cities);
});


// app.post('/api/address', async (req, res) => {
//     const { country, state, city } = req.body;
//     try {
//         const newSetting = await Address.create({ country: countryId, state: stateId, city: selectedCity });
//         res.json(newSetting);
//     } catch (error) {
//         console.error('Error creating Setting:', error);
//         res.status(500).send('Error creating Setting.');
//     }
// });

// API endpoint to handle form submission 
app.post('/api/address/submit', async (req, res) => {
    const { country, state, city } = req.body;
    try {
        // Create a new address record in the database   
        const address = await Address.create({ country, state, city });
        res.json({ message: 'Address stored successfully', address });
    }
    catch (error) {
        console.error('Error submitting address:', error);
        res.status(500).json({ error: 'Failed to submit address' });
    }
});

app.get('/api/address/submit', async (req, res) => {
    const address = await Address.findAll();
    res.json(address);
});



// Get all countries
app.get('/api/country', async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        console.error('Error retrieving countries:', error);
        res.status(500).send('Error retrieving countries.');
    }
});

// Get a specific country by ID
app.get('/api/country/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const country = await Country.findByPk(id);
        if (!country) {
            res.json('Country not found');
        } else {
            res.json(country);
        }
    } catch (error) {
        console.error('Error retrieving country:', error);
        res.status(500).send('Error retrieving country.');
    }
});

// Create a new country
app.post('/api/country', async (req, res) => {
    const { name } = req.body;
    try {
        const newCountry = await Country.create({ name });
        res.json(newCountry);
    } catch (error) {
        console.error('Error creating country:', error);
        res.status(500).send('Error creating country.');
    }
});

// Update a country
app.post('/api/country/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Country.update({ name }, { where: { id } });
        const updatedCountry = await Country.findByPk(id);
        res.json(updatedCountry);
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(500).send('Error updating country.');
    }
});

// Delete a country
app.delete('/api/country/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Country.destroy({ where: { id } });
        res.json('Country deleted successfully.');
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).send('Error deleting country.');
    }
});


app.get('/api/state', async (req, res) => {
    const states = await State.findAll();
    res.json(states);
});

app.get('/api/state/:id', async (req, res) => {
    const state = await State.findByPk(req.params.id);
    if (!state) {
        res.status(404).json({ error: 'State not found' });
    } else {
        res.json(state);
    }
});

// app.post('/api/state', async (req, res) => {
//     const { name } = req.body;
//     try {
//         const newState = await State.create({ name });
//         res.status(201).json(newState);
//     } catch (error) {
//         console.error('Error creating state:', error);
//         res.status(500).send('Error creating state.');
//     }
// });

app.post('/api/state', async (req, res) => {
    const { name, countryId } = req.body; // Add countryId to the destructured object
    try {
        const newState = await State.create({ name, countryId }); // Include countryId in the create method
        res.status(201).json(newState);
    } catch (error) {
        console.error('Error creating state:', error);
        res.status(500).send('Error creating state.');
    }
});


app.post('/api/state/:id', async (req, res) => {
    const { name, countryId } = req.body;
    const id = req.params.id;
    try {
        const state = await State.findByPk(id);
        if (!state) {
            res.status(404).json({ error: 'State not found' });
        } else {
            await state.update({ name, countryId });
            res.json(state);
        }
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(500).send('Error updating state.');
    }
});

app.delete('/api/state/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const state = await State.findByPk(id);
        if (!state) {
            res.status(404).json({ error: 'State not found' });
        } else {
            await state.destroy();
            res.json('State deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting state:', error);
        res.status(500).send('Error deleting state.');
    }
});

app.get('/api/city', async (req, res) => {
    const cities = await City.findAll();
    res.json(cities);
});

app.get('/api/city/:id', async (req, res) => {
    const city = await City.findByPk(req.params.id);
    if (!city) {
        res.status(404).json({ error: 'City not found' });
    } else {
        res.json(city);
    }
});

app.post('/api/city', async (req, res) => {
    const { name, stateId } = req.body;
    try {
        const newCity = await City.create({ name, stateId });
        res.status(201).json(newCity);
    } catch (error) {
        console.error('Error creating city:', error);
        res.status(500).send('Error creating city.');
    }
});

app.post('/api/city/:id', async (req, res) => {
    const { name, stateId } = req.body;
    const id = req.params.id;
    try {
        const city = await City.findByPk(id);
        if (!city) {
            res.status(404).json({ error: 'City not found' });
        } else {
            await city.update({ name, stateId });
            res.json(city);
        }
    } catch (error) {
        console.error('Error updating city:', error);
        res.status(500).send('Error updating city.');
    }
});

app.delete('/api/city/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const city = await City.findByPk(id);
        if (!city) {
            res.status(404).json({ error: 'City not found' });
        } else {
            await city.destroy();
            res.json('City deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting city:', error);
        res.status(500).send('Error deleting city.');
    }
});

app.get('/api/userprofile', async (req, res) => {
    try {
        const profiles = await UserProfile.findAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/userprofile/:id', async (req, res) => {

    const profiles = await UserProfile.findAll({
        where: { id: req.params.id }
    });
    res.json(profiles[0]);
});


app.post('/api/userprofile', async (req, res) => {
    const { firstname, lastname, gender, email, password } = req.body;
    try {
        const newProfile = await UserProfile.create({ firstname, lastname, gender, email, password });
        res.status(201).json(newProfile);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).send('Error creating profile.');
    }
});


app.post('/api/userprofile/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, gender, email, password } = req.body;
    try {
        const updateValues = { firstname, lastname, gender, email };
        if (password) {
            updateValues.password = password;
        }
        await UserProfile.update(updateValues, { where: { id } });
        const updatedProfile = await UserProfile.findByPk(id);
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Error updating profile.');
    }
});

// Delete a profile
app.delete('/api/userprofile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserProfile.destroy({ where: { id } });
        res.json('Country deleted successfully.');
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).send('Error deleting country.');
    }
});


//Example route handler to send reset password email
app.post('/api/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Call the sendResetPasswordEmail function
        await sendResetPasswordEmail(email);

        res.json({ message: 'Reset password email sent' });
    } catch (error) {
        console.error('Error sending reset password email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
async function sendResetPasswordEmail(email) {
    try {
        // Create a Nodemailer transporter using SMTP or other transport options
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nirali.evince@gmail.com',
                pass: 'qaspbrvjqdsowvwz'
            }
        });

        const resetPasswordLink = `http://localhost:3000/userprofile/reset-password/${id}`; // Replace with your home page URL
        const linkName = 'Reset Password'; // The custom link name you want to display

        // Compose the email message
        const mailOptions = {
            from: 'nirali.evince@gmail.com',
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click the link below to ${linkName}:</p>
         <a href="${resetPasswordLink}">${linkName}</a>`,
        };
        // app.post('/api/user/reset-Password', async (req, res) => {
        //     const { email, password } = req.body;
        //     try {
        //         await UserProfile.update(password, { where: { email } });
        //         const updatedProfile = await UserProfile.findByPk(id);
        //         res.json(updatedProfile);
        //     } catch (error) {
        //         console.error('Error', error);
        //     }


        // });




        app.post('/api/user/reset-password', async (req, res) => {
            const { password } = req.body;
            const { email } = req.user; // Assuming you have the email in the request user object

            try {
                // Assuming you have a Sequelize model called UserProfile
                const userProfile = await UserProfile.findOne({ where: { email } });

                if (!userProfile) {
                    return res.status(404).json({ error: 'User not found' });
                }
                userProfile.password = password;
                await userProfile.save();

                res.json(userProfile);
            } catch (error) {
                console.error('Error', error);
                res.status(500).json({ error: 'An error occurred during password reset' });
            }
        });


        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw error;
    }
}





// Get all user roles
app.get('/api/userrole', async (req, res) => {
    try {
        const userRoles = await Role.findAll();
        res.json(userRoles);
    } catch (error) {
        console.error('Error retrieving user roles:', error);
        res.status(500).send('Error retrieving user roles.');
    }
});

// Get a specific user role by ID
app.get('/api/userrole/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userRole = await Role.findByPk(id);
        if (!userRole) {
            res.json('User role not found');
        } else {
            res.json(userRole);
        }
    } catch (error) {
        console.error('Error retrieving user role:', error);
        res.status(500).send('Error retrieving user role.');
    }
});

// Create a new user role
app.post('/api/userrole', async (req, res) => {
    const { rolename } = req.body;
    try {
        const newUserRole = await Role.create({ rolename });
        res.json(newUserRole);
    } catch (error) {
        console.error('Error creating user role:', error);
        res.status(500).send('Error creating user role.');
    }
});

// Update a user role
app.post('/api/userrole/:id', async (req, res) => {
    const { id } = req.params;
    const { rolename } = req.body;
    try {
        await Role.update({ rolename }, { where: { id } });
        const updatedUserRole = await Role.findByPk(id);
        res.json(updatedUserRole);
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Error updating user role.');
    }
});

// Delete a user role
app.delete('/api/userrole/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Role.destroy({ where: { id } });
        res.json('User role deleted successfully.');
    } catch (error) {
        console.error('Error deleting user role:', error);
        res.status(500).send('Error deleting user role.');
    }
});

app.listen(5000)











