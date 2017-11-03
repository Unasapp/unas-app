select
	*
from
	appointments,
	barbers,
	clients,
	services
where
 	b_id = barber_id
and
  	v_id = service_id
and
  	c_id = client_id
and
	appointments.shop_id = $1
and
	(status = 'in-progress' or status = 'service-completed')
