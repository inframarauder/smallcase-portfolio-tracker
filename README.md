# portfolio-tracker-api

Solution for the smallcase backend assignment.
All API Routes are well documented. Postman collection is included in the repository.
The documentation can be viewed here :
API is deployed here :

**Important env variables**

- `DB_URI`
- `PORT`

**API Features**

- adding trades
- updating trades
- removing a trade
- fetching trades
- fetching portfolio
- fetching cumulative returns

**Validations**

- check to ensure total number of shares held is never 0
- check to ensure required number of shares are available for a security in current portfolio for sell trades
- other data type and enum validations.
