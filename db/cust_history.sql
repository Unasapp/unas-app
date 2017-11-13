select
	barbers.b_first,
	barbers.b_last,
	services.service,
	appointments.start_time
from
	appointments,
	barbers,
	services
where
	client_id = $1
and
	appointments.shop_id = $2
and
	status = 'completed'
and
	barber_id = b_id
and
	service_id = v_id
