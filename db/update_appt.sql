update
  appointments
set
  status = $2
from
	barbers,
	clients,
	services
where
	a_id = $1
returning
  a_id,
	b_first,
	b_last,
	c_first,
	c_last,
	service,
	price,
	start_time,
	status
