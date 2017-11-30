select
	tip,
	total,
	appt_length
from
	appointments
where
	barber_id = $1
