select
	a_id,
	c_first, c_last,
	service,
	start_time,
	end_time
from
	appointments,
	barbers,
	clients,
	services
where
	barber_id = barbers.b_id
and
	client_id = clients.c_id
and
	service_id = services.v_id
and
	barbers.b_id = $1
and
	status like 'scheduled'
 