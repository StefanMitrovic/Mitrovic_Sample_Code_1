# Mitrovic_Sample_Code_1


1. npm i
2. create database titled "acme_schools_db"

This web application servers as a student and campus tracker for a university administrator. 
The user can create either a student or campus, both of which are defined on the back end using Sequelize. 

Using Axios and Express, the user can add, update, and delete either the student or campus, all of which 
will automatically update the front and back end. This functionality is further increased by using React and Redux
to render relevant information for the user while keeping a standardized state. If a user deletes a student, not only
will the student be removed from the student overview page, they will also be removed from the campus summary page, which
itself lists all students attending. 


