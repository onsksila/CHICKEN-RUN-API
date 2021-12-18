 ## Author
- [Ksila Ons](https://github.com/onsksila)
# CHICKEN-RUN-API

This API includes CRUD for chicken and farmyard objects.
A farmyard contains a list of chickens, a chicken can be added to only one farmyard.
You can also increase the chicken's steps.

## To launch the server :
###### npm run dev
#
### chicken routes : <br/>

#### To get the list of chickens :
> GET http://localhost:8001/chicken <br/>

#### To add a chicken to the list of chickens : 
> POST http://localhost:8001/chicken/ + body { "name" : "...", "birthday": "mm-dd-yyyy", "weight": ... } <br/>

#### To update a chicken by _id with put : 
> PUT http://localhost:8001/chicken/CHICKEN_id  + body {changes...} <br/>

#### To udate a chicken by _id with patch : 
> PATCH  http://localhost:8001/chicken/CHICKEN_id  + body {changes...} <br/>

#### To delete a chicken by _id : 
> DELETE http://localhost:8001/chicken/CHICKEN_id <br/>

#### To increase chicken's steps by 1 by its _id :  
> GET  http://localhost:8001/chicken/run/CHICKEN_id <br/>

#
### farmyard routes : <br/>
#### To get Farmyards : 
> GET http://localhost:8001/farmyard
#### To add a farmyard : 
> POST http://localhost:8001/farmyard/
#### To add a chicken by _id to a specific farmyard : 
> PATCH http://localhost:8001/farmyard/FARMYARD_id/CHICKEN_id
#### To delete a farmyard by _id : 
> DELETE http://localhost:8001/farmyard/FARMYARD_id
