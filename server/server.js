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

app.get('/api/blog', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
    const perPage = 3; // Number of blogs per page
    const offset = (page - 1) * perPage; // Calculate the offset

    try {
        // Retrieve blogs from the database with pagination
        const blogs = await Blog.findAll({
            attributes: [
                'id',
                'title',
                [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                'description',
                'image'
            ],
            limit: perPage,
            offset: offset
        });

        // Count the total number of blogs
        const totalCount = await Blog.count();

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


app.listen(5000)