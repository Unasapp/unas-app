select
  barbers.b_first,
  barbers.b_last,
  clients.c_first,
  clients.c_last,
  services.service,
  appointments.date,
  services.price,
  appointments.tip,
  appointments.total
from
  appointments,
  barbers,
  services,
  clients
where
  b_id = barber_id
and
  v_id = service_id
and
  c_id = client_id
