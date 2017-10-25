select
	a_id,
	b_first,
	b_last,
	c_first,
	c_last,
	service,
	price,
	start_time,
	status
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
