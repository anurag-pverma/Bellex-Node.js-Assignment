# Bellex-Node.js-Assignment
A mini e-commerce for ordering products and viewing order data stored in the MySQL/Mongo DB using NodeJS
#### Singup
http://localhost:4000/role/singup
###### Use
{
  
"username":"firstname",
"password":"124324",
"role":"admin"

}

#### Login
http://localhost:4000/role/login
###### Use
{
  "username": "firstname",
  "password": "124324"
}
######  Next process
You Got access Tocken, use  tocken for next process for Post  product , get product 
http://localhost:4000/orders:
{
 "product_name":"watch",
 "product_price":999,
 "quantity":1

}


