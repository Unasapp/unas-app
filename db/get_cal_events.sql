select
	a_id,
	b_first, b_last,
	c_first, c_last,
	service, date, color
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
	appointments.shop_id = 1
and
	status like 'scheduled'
