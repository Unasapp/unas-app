select
  barbers.b_first,
  barbers.b_last,
  clients.c_first,
  clients.c_last,
  services.service,
  appointments.start_time,
  services.price,
  appointments.tip,
  appointments.total,
  appointments.pay_mth,
  appointments.a_id,
  appointments.service_id2,
  appointments.service_id3,
  appointments.service_id4,
  appointments.service_id5
from
  appointments,
  barbers,
  services,
  clients,
  shops
where
  b_id = barber_id
and
  v_id = service_id
and
  c_id = client_id
and
  appointments.shop_id = $1
and
  appointments.status = 'completed'
and
	start_time between $2 and $3
