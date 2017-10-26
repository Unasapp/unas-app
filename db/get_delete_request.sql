select
  barbers.b_first,
  barbers.b_last,
  clients.c_first,
  clients.c_last,
  services.service,
  appointments.start_time,
  services.price,
  appointments.a_id
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
  v_id = services.shop_id
and
  shops.s_id = $1
and
  appointments.status = 'delete-request'
