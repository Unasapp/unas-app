select 
* 
from
appointments,
barbers,
clients,
services
where 
appointments.shop_id = $1
and 
appointments.status = $2
and 
b_id = barber_id
and
c_id = client_id
and
v_id = service_id
