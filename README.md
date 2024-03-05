# service endpoints:
GET/api/service *\
GET/api/service/:id\
POST/api/service/:id\
PATCH/api/service/:id\
DELETE/api/service/:id

# repairman endpoints:
GET/api/repairman *\
GET/api/repairman/:id\
POST/api/repairman/:id\
PATCH/api/repairman/:id\
DELETE/api/repairman/:id
# user endpoints:
POST/api/register\
POST/api/login
# like endpoints:
GET/api/repairman/:id/likes/getAll\
GET/api/repairman/:id/likes\
POST/api/repairman/:id/likes\
DELETE/api/repairman/:id/likes\

*has filter functionality example: ##GET/api/service?owner=ownername&sort=-address