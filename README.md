# portfolio-tracker-api

Solution for the smallcase backend assignment.
All API Routes are well documented.

- The documentation can be viewed here : https://documenter.getpostman.com/view/7306181/UVRAHmR1
- API is deployed here : https://smallcase-portfolio.herokuapp.com/api

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7306181-782e90dd-5c09-4890-a729-9cd855a6b271?action=collection%2Ffork&collection-url=entityId%3D7306181-782e90dd-5c09-4890-a729-9cd855a6b271%26entityType%3Dcollection%26workspaceId%3Dc5395985-353e-4dd3-8998-04624306273c)

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

- check to ensure total number of shares held is never negative.
- check to ensure required number of shares are available for a security in current portfolio for sell trades
- other data type and enum validations.
