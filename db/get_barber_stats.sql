select
	*
from
	appointments
where
	barber_id = $1
and 
	start_time between $2 and $3
