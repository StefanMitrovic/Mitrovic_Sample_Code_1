const port = process.env.PORT || 3000;
const app = require('./app');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db')

const Campus = sequelize.define('campus', {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        verify: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.DataTypes.STRING,
    },
    address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        verify: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        verify: {
            notEmpty: true
        }
    }
})

const Student = sequelize.define('student', {
    firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        verify: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        verify: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        isUnique: true,
        verify: {
            isEmail: true,
            notEmpty: true
        }
    },
    imageUrl:{
        type: Sequelize.DataTypes.STRING,
    },
    gpa:{
        type: Sequelize.DataTypes.FLOAT, 
        validate: {
            min:0.00, 
            max:4.00
        }
    }
})

Student.belongsTo(Campus);
Campus.hasMany(Student);

app.get('/api/campuses', async(req, res, next) => {
    try{
        res.send( await Campus.findAll())
    }
    catch(e){
        next(e)
    }
})

app.get('/api/campuses/:id', async(req, res, next) => {
    try{
        const individualCampus = await Campus.findByPk(req.params.id);
        res.send(individualCampus);
    }
    catch(e){
        next(e);
    }
})

app.delete('/api/campuses/:id', async(req, res, next) => {
    try{
        const individualCampus = await Campus.findByPk(req.params.id);
        await individualCampus.destroy();
        res.sendStatus(204);
    }
    catch(e){
        next(e)
    }
})

app.post('/api/campuses', async(req, res, next) => {
    try{
        const newCampus = await Campus.create(req.body);
        res.status(201).send(newCampus);
    }
    catch(e){
        next(e)
    }
})

app.put('/api/campuses/:id', async(req, res, next) => {
    try{
        const campus = await Campus.findByPk(req.params.id);
        res.send(await campus.update(req.body))
    }   
    catch(e){
        next(e)
    }
})

app.get('/api/students', async(req, res, next) => {
    try{
        res.send( await Student.findAll())
    }
    catch(e){
        next(e)
    }
})

app.delete('/api/students/:id', async(req, res, next) => {
    try{
        const individualStudent = await Student.findByPk(req.params.id);
        await individualStudent.destroy();
        res.sendStatus(204);
    }
    catch(e){
        next(e)
    }
})

app.put('/api/students/:id', async(req, res, next) => {
    try{
        const student = await Student.findByPk(req.params.id);
        res.send(await student.update(req.body))
    }   
    catch(e){
        next(e)
    }
})

app.post('/api/students', async(req, res, next) => {
    try{
        console.log(req.body)
        const newStudent = await Student.create(req.body);
        res.status(201).send(newStudent)
    }
    catch(e){
        next(e)
    }
})

const syncAndSeed = async() => {
    try{
        await sequelize.sync({force: true})
        const campusTest1 = await Campus.create({
            name: 'UVA', address: 'Charlottesville, Virginia', description: 'The University of Virginia is a public research university in Charlottesville, Virginia, founded in 1819 by Thomas Jefferson. It is the flagship university of Virginia and home to the Academical Village, a UNESCO World Heritage Site.'
        });
        const campusTest2 = await Campus.create({
            name: 'Virginia Tech', address: 'Blacksburg, Virginia', description: 'Virginia Tech is a public land-grant research university with its main campus in Blacksburg, Virginia. It also has educational facilities in six regions statewide, a research center in Punta Cana, Dominican Republic, and a study-abroad site in Riva San Vitale, Switzerland.'
        });
        const student1 = await Student.create({firstName: 'John', lastName: 'Doe', email:'notarealemail@gmail.com', gpa: 3.5});
        const student2 = await Student.create({firstName: 'John', lastName: 'Deer', email:'maybeafakeemail@gmail.com', gpa: 3.7});
        const student3 = await Student.create({firstName: 'John', lastName: 'Smith', email:'anotherfakeemail@gmail.com', gpa: 2.4});
        const student4 = await Student.create({firstName: 'Jon', lastName: 'Doe', email:'thisonemightbereal@gmail.com', gpa: 4.0});
        student1.campusId=campusTest1.id;
        student2.campusId=campusTest2.id;
        student3.campusId=campusTest1.id;
        student4.campusId=campusTest1.id;

        await Promise.all([
            student1.save(),
            student2.save(),
            student3.save(),
            student4.save(),
        ])
    }
    catch(e){
        console.log(e)
    }
}

const start = () => {
    try{
        syncAndSeed();
    }
    catch(e){
        console.log(e)
    }
}

app.listen(port, ()=> console.log(`listening on port ${port}`));
start();