select
	barbers.b_first,
	appointments.start_time,
	appointments.total,
	appointments.tip,
  appointments.appt_length
from
	appointments,
	barbers
where
  appointments.barber_id = barbers.b_id
and
	shop_id = $1
and
	status = 'completed'
and
	start_time between $2 and $3;
